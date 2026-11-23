import { spawnSync } from "node:child_process";

export interface RunOptions {
  cwd: string;
  env?: NodeJS.ProcessEnv;
  /** Stream the command's output to stderr while it runs (stdout stays clean for reports). */
  inherit?: boolean;
  allowFailure?: boolean;
}

export interface RunResult {
  status: number;
  stdout: string;
  stderr: string;
}

export function run(cmd: string, args: string[], opts: RunOptions): RunResult {
  const res = spawnSync(cmd, args, {
    cwd: opts.cwd,
    env: opts.env ?? process.env,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: opts.inherit ? ["ignore", 2, "inherit"] : ["ignore", "pipe", "pipe"],
  });
  if (res.error) throw new Error(`Failed to run ${cmd}: ${res.error.message}`);
  const out: RunResult = { status: res.status ?? 1, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
  if (out.status !== 0 && !opts.allowFailure) {
    const tail = (out.stderr || out.stdout).trim().split("\n").slice(-30).join("\n");
    throw new Error(`\`${[cmd, ...args].join(" ")}\` failed with exit code ${out.status}${tail ? `:\n${tail}` : ""}`);
  }
  return out;
}

/** Runs a user-supplied shell command line. */
export function runShell(command: string, opts: RunOptions): RunResult {
  return run("bash", ["-o", "pipefail", "-c", command], opts);
}
