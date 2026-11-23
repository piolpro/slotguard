import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { runCheck } from "./check.js";
import { git, repoRoot } from "./git.js";
import { loadConfig, parseFailOn, parseScope } from "./config.js";
import { diffSnapshots, shouldFail } from "./diff/index.js";
import { snapshotProject, type Framework } from "./extract/index.js";
import { renderMarkdown, renderText } from "./report/markdown.js";
import type { DiffResult, Snapshot } from "./types.js";
import { VERSION } from "./version.js";

const HELP = `slotguard ${VERSION}: catch storage layout and ABI breaks in upgradeable Solidity contracts

Usage:
  slotguard check [--base <ref>] [options]      Build the base ref and the working tree, then diff them
  slotguard snapshot [--out <file>] [options]   Write the storage layout + ABI snapshot of the working tree
  slotguard diff <base.json> <head.json>        Diff two snapshots

Options:
  --root <dir>             Project directory (default: current directory)
  --base <ref>             Base git ref for \`check\` (default: origin/main)
  --framework <name>       foundry, hardhat or auto (default: auto)
  --no-build               Read existing artifacts instead of building the working tree
  --artifacts <dir>        Artifacts directory (Foundry \`out\`, Hardhat \`artifacts\`)
  --build-command <cmd>    Custom build command
  --setup-command <cmd>    Command that installs dependencies in the base checkout
  --config <file>          Config file (default: .slotguard.json or slotguard.config.json)
  --scope <scope>          upgradeable (default) or all
  --fail-on <level>        error (default), warning, info or never
  --format <fmt>           text (default), markdown or json
  --markdown-out <file>    Also write the markdown report to a file
  --json-out <file>        Also write the JSON result to a file
  -q, --quiet              Only print the report
  -v, --version            Print the version
  -h, --help               Show this help

Exit codes: 0 no findings at --fail-on level, 1 findings, 2 usage or build error.
`;

function main(argv: string[]): number {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      root: { type: "string" },
      base: { type: "string" },
      framework: { type: "string" },
      "no-build": { type: "boolean" },
      artifacts: { type: "string" },
      "build-command": { type: "string" },
      "setup-command": { type: "string" },
      config: { type: "string" },
      scope: { type: "string" },
      "fail-on": { type: "string" },
      format: { type: "string" },
      out: { type: "string" },
      "markdown-out": { type: "string" },
      "json-out": { type: "string" },
      quiet: { type: "boolean", short: "q" },
      version: { type: "boolean", short: "v" },
      help: { type: "boolean", short: "h" },
    },
  });
  if (values.version) {
    process.stdout.write(`${VERSION}\n`);
    return 0;
  }
  const [command, ...rest] = positionals;
  if (values.help || !command) {
    process.stdout.write(HELP);
    return command || values.help ? 0 : 2;
  }
  const root = resolve(values.root ?? ".");
  const log = values.quiet ? undefined : (msg: string) => process.stderr.write(`slotguard: ${msg}\n`);
  const framework = (values.framework ?? "auto") as Framework | "auto";
  if (!["auto", "foundry", "hardhat"].includes(framework)) throw new UsageError("--framework must be foundry, hardhat or auto");
  const snapshotOpts = {
    framework,
    build: !values["no-build"],
    artifacts: values.artifacts,
    buildCommand: values["build-command"],
    log,
  };

  if (command === "snapshot") {
    const snap = snapshotProject(root, snapshotOpts);
    const json = JSON.stringify(snap, null, 2) + "\n";
    if (values.out) writeFileSync(values.out, json);
    else process.stdout.write(json);
    return 0;
  }

  const config = loadConfig(root, values.config);
  if (values.scope) config.scope = parseScope(values.scope, "--scope");
  if (values["fail-on"]) config.failOn = parseFailOn(values["fail-on"], "--fail-on");

  let result: DiffResult;
  let labels: { baseLabel?: string; headLabel?: string } = {};
  if (command === "diff") {
    if (rest.length !== 2) throw new UsageError("diff needs <base.json> <head.json>");
    const read = (f: string) => JSON.parse(readFileSync(f, "utf8")) as Snapshot;
    result = diffSnapshots(read(rest[0]), read(rest[1]), config);
    labels = { baseLabel: rest[0], headLabel: rest[1] };
  } else if (command === "check") {
    const base = values.base ?? "origin/main";
    const res = runCheck({
      ...snapshotOpts,
      root,
      base,
      config: values.config,
      setupCommand: values["setup-command"],
      configOverrides: (c) => {
        c.scope = config.scope;
        c.failOn = config.failOn;
      },
    });
    result = res.result;
    const dirty = git(repoRoot(root), ["status", "--porcelain", "--", "."]).stdout.trim() !== "";
    labels = {
      baseLabel: `${base} (${res.baseSha.slice(0, 7)})`,
      headLabel: dirty ? `working tree (on ${res.headSha.slice(0, 7)})` : `HEAD (${res.headSha.slice(0, 7)})`,
    };
  } else {
    throw new UsageError(`Unknown command "${command}"`);
  }

  const markdown = renderMarkdown(result, { ...labels, version: VERSION });
  if (values["markdown-out"]) writeFileSync(values["markdown-out"], markdown);
  if (values["json-out"]) writeFileSync(values["json-out"], JSON.stringify(stripSnapshots(result), null, 2) + "\n");
  const format = values.format ?? "text";
  if (format === "markdown") process.stdout.write(markdown);
  else if (format === "json") process.stdout.write(JSON.stringify(stripSnapshots(result), null, 2) + "\n");
  else if (format === "text") process.stdout.write(renderText(result, process.stdout.isTTY));
  else throw new UsageError("--format must be text, markdown or json");
  return shouldFail(result, config.failOn) ? 1 : 0;
}

export function stripSnapshots(result: DiffResult) {
  return { ...result, contracts: result.contracts.map(({ contract, findings }) => ({ contract, findings })) };
}

class UsageError extends Error {}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (e) {
  process.stderr.write(`slotguard: ${(e as Error).message}\n`);
  if (e instanceof UsageError) process.stderr.write("Run `slotguard --help` for usage.\n");
  process.exitCode = 2;
}
