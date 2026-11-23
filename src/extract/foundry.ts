import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { run, runShell } from "../exec.js";
import { makeContract } from "../normalize.js";
import type { ContractSnapshot, Snapshot } from "../types.js";

export interface FoundryOptions {
  /** Directory with compiled artifacts to read instead of building. */
  artifacts?: string;
  /** Replaces the default `forge build` invocation. Must write artifacts with storageLayout to `$SLOTGUARD_OUT`. */
  buildCommand?: string;
  log?: (msg: string) => void;
}

interface FoundryArtifact {
  abi?: unknown;
  storageLayout?: unknown;
  bytecode?: { object?: string };
  metadata?: { settings?: { compilationTarget?: Record<string, string> } };
}

export function snapshotFoundry(root: string, opts: FoundryOptions = {}): Snapshot {
  let outDir = opts.artifacts;
  let tmp: string | undefined;
  if (!outDir) {
    tmp = mkdtempSync(join(tmpdir(), "slotguard-forge-"));
    outDir = join(tmp, "out");
    const env = { ...process.env, SLOTGUARD_OUT: outDir, FOUNDRY_OUT: outDir, FOUNDRY_CACHE_PATH: join(tmp, "cache") };
    opts.log?.(`Building ${root} with forge`);
    if (opts.buildCommand) {
      runShell(opts.buildCommand, { cwd: root, env, inherit: Boolean(opts.log) });
    } else {
      run(
        "forge",
        ["build", "--extra-output", "storageLayout", "--skip", "test", "--skip", "script", "--out", outDir, "--cache-path", join(tmp, "cache")],
        { cwd: root, env, inherit: Boolean(opts.log) },
      );
    }
  }
  try {
    return readFoundryArtifacts(outDir);
  } finally {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
  }
}

export function readFoundryArtifacts(outDir: string): Snapshot {
  const contracts: Record<string, ContractSnapshot> = {};
  let withLayout = 0;
  for (const file of walk(outDir)) {
    let artifact: FoundryArtifact;
    try {
      artifact = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      continue;
    }
    const target = artifact.metadata?.settings?.compilationTarget;
    if (!target) continue;
    const [source, name] = Object.entries(target)[0] ?? [];
    if (!source || !name) continue;
    const fqn = `${source}:${name}`;
    if (contracts[fqn]) continue;
    if (artifact.storageLayout) withLayout++;
    contracts[fqn] = makeContract(source, name, artifact.abi, artifact.storageLayout as never, artifact.bytecode?.object);
  }
  if (Object.keys(contracts).length === 0) throw new Error(`No Foundry artifacts found in ${outDir}`);
  if (withLayout === 0) {
    throw new Error(`Artifacts in ${outDir} have no storageLayout. Build with \`forge build --extra-output storageLayout\`.`);
  }
  return { tool: "slotguard", version: 1, framework: "foundry", contracts: sortKeys(contracts) };
}

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    if (entry === "build-info") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (entry.endsWith(".json")) yield full;
  }
}

export function sortKeys<T>(obj: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}
