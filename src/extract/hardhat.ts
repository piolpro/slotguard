import { spawnSync } from "node:child_process";
import { accessSync, constants, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { run, runShell } from "../exec.js";
import { makeContract } from "../normalize.js";
import type { ContractSnapshot, Snapshot } from "../types.js";
import { sortKeys } from "./foundry.js";

export interface HardhatOptions {
  /** Hardhat artifacts directory, relative to the project root. Default `artifacts`. */
  artifacts?: string;
  build?: boolean;
  buildCommand?: string;
  log?: (msg: string) => void;
}

interface SolcOutputContract {
  abi?: unknown;
  storageLayout?: unknown;
  evm?: { bytecode?: { object?: string } };
}

interface SolcOutput {
  contracts?: Record<string, Record<string, SolcOutputContract>>;
}

interface BuildInfo {
  file: string;
  solcVersion?: string;
  solcLongVersion?: string;
  input?: { settings?: { outputSelection?: Record<string, Record<string, string[]>> } } & Record<string, unknown>;
  output?: SolcOutput;
}

export function snapshotHardhat(root: string, opts: HardhatOptions = {}): Snapshot {
  if (opts.build !== false) {
    opts.log?.(`Compiling ${root} with Hardhat`);
    if (opts.buildCommand) runShell(opts.buildCommand, { cwd: root, inherit: true });
    else run("npx", ["--no-install", "hardhat", "compile"], { cwd: root, inherit: true });
  }
  return readHardhatBuildInfo(join(root, opts.artifacts ?? "artifacts", "build-info"), opts.log);
}

/** Hardhat 2 keeps input and output in one file; Hardhat 3 writes `<id>.json` plus `<id>.output.json`. */
export function loadBuildInfos(dir: string): BuildInfo[] {
  if (!existsSync(dir)) throw new Error(`Hardhat build-info directory not found: ${dir}. Run \`npx hardhat compile\` first.`);
  const byId = new Map<string, BuildInfo>();
  for (const entry of readdirSync(dir).sort()) {
    if (!entry.endsWith(".json")) continue;
    const file = join(dir, entry);
    const data = JSON.parse(readFileSync(file, "utf8"));
    const id: string = data.id ?? entry.replace(/(\.output)?\.json$/, "");
    const info = byId.get(id) ?? { file };
    if (entry.endsWith(".output.json")) info.output = data.output;
    else {
      info.file = file;
      info.solcVersion = data.solcVersion;
      info.solcLongVersion = data.solcLongVersion;
      info.input = data.input;
      if (data.output) info.output = data.output;
    }
    byId.set(id, info);
  }
  return [...byId.values()];
}

/** Hardhat 3 prefixes project sources with `project/`. */
export function userSourceName(source: string): string {
  return source.startsWith("project/") ? source.slice("project/".length) : source;
}

export function readHardhatBuildInfo(dir: string, log?: (msg: string) => void): Snapshot {
  const contracts: Record<string, ContractSnapshot> = {};
  for (const info of loadBuildInfos(dir)) {
    let output = info.output;
    if (!output?.contracts) continue;
    const hasLayout = Object.values(output.contracts).some((byName) => Object.values(byName).some((c) => c.storageLayout));
    if (!hasLayout) output = recompileWithLayout(info, log);
    for (const [source, byName] of Object.entries(output.contracts ?? {})) {
      for (const [name, c] of Object.entries(byName)) {
        const src = userSourceName(source);
        const fqn = `${src}:${name}`;
        if (contracts[fqn]) continue;
        contracts[fqn] = makeContract(src, name, c.abi, c.storageLayout as never, c.evm?.bytecode?.object);
      }
    }
  }
  if (Object.keys(contracts).length === 0) throw new Error(`No compiled contracts found in ${dir}`);
  return { tool: "slotguard", version: 1, framework: "hardhat", contracts: sortKeys(contracts) };
}

const LAYOUT_HELP =
  'Add storageLayout to the compiler output in hardhat.config: solidity.settings.outputSelection = { "*": { "*": ["storageLayout"] } } ' +
  "(the OpenZeppelin upgrades plugin does this for you).";

/** Re-runs the exact compiler Hardhat used, from its cache, with storageLayout added to the output selection. */
function recompileWithLayout(info: BuildInfo, log?: (msg: string) => void): SolcOutput {
  if (!info.input || !info.solcLongVersion) throw new Error(`${info.file} has no storageLayout. ${LAYOUT_HELP}`);
  const solc = findSolc(info.solcLongVersion, info.solcVersion);
  if (!solc) {
    throw new Error(`${info.file} has no storageLayout and no native solc ${info.solcLongVersion} was found to recompile it. ${LAYOUT_HELP}`);
  }
  log?.(`Recompiling ${Object.keys((info.input.sources as object) ?? {}).length} sources with ${solc} to get storage layouts`);
  const input = structuredClone(info.input);
  input.settings ??= {};
  input.settings.outputSelection = { "*": { "*": ["abi", "storageLayout", "evm.bytecode.object"] } };
  const res = runSolc(solc, JSON.stringify(input));
  const parsed = JSON.parse(res) as SolcOutput & { errors?: { severity: string; formattedMessage?: string; message: string }[] };
  const errors = (parsed.errors ?? []).filter((e) => e.severity === "error");
  if (errors.length) throw new Error(`solc failed:\n${errors.map((e) => e.formattedMessage ?? e.message).join("\n")}`);
  return parsed;
}

function runSolc(solc: string, input: string): string {
  const res = spawnSync(solc, ["--standard-json"], { input, encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`${solc} --standard-json failed: ${res.stderr}`);
  return res.stdout;
}

export function findSolc(longVersion: string, version?: string): string | undefined {
  const roots = [
    process.env.XDG_CACHE_HOME && join(process.env.XDG_CACHE_HOME, "hardhat-nodejs"),
    join(homedir(), ".cache", "hardhat-nodejs"),
    join(homedir(), "Library", "Caches", "hardhat-nodejs"),
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "hardhat-nodejs", "Cache"),
    join(homedir(), ".svm"),
    join(homedir(), ".foundry", "svm"),
  ].filter((r): r is string => Boolean(r) && existsSync(r as string));
  const wanted = [longVersion, version].filter(Boolean) as string[];
  for (const root of roots) {
    const hit = search(root, wanted, 5);
    if (hit) return hit;
  }
  return undefined;
}

function search(dir: string, wanted: string[], depth: number): string | undefined {
  if (depth < 0) return undefined;
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return undefined;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      const hit = search(full, wanted, depth - 1);
      if (hit) return hit;
    } else if (/^solc/.test(entry) && !/\.(js|json|txt|md)$/.test(entry) && wanted.some((w) => entry.includes(w) || dir.endsWith(w))) {
      try {
        accessSync(full, constants.X_OK);
        return full;
      } catch {
        continue;
      }
    }
  }
  return undefined;
}
