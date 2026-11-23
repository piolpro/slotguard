import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const CLI = join(__dirname, "../../dist/cli.js");

export function has(cmd: string): boolean {
  return spawnSync(cmd, ["--version"], { stdio: "ignore" }).status === 0;
}

export function sh(cwd: string, cmd: string, args: string[]): string {
  return execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

/** Creates a git repo, commits `base`, then applies `head` to the working tree (and commits it if asked). */
export function repo(setup: (dir: string) => void, change: (dir: string) => void, commitHead = true): { dir: string; cleanup: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "slotguard-it-"));
  const g = (...args: string[]) => sh(dir, "git", ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", ...args]);
  g("init", "-q", "-b", "main");
  setup(dir);
  g("add", "-A");
  g("commit", "-q", "-m", "base");
  g("checkout", "-q", "-b", "feature");
  change(dir);
  if (commitHead) {
    g("add", "-A");
    g("commit", "-q", "-m", "head");
  }
  return { dir, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
}

export function copy(from: string, to: string): void {
  cpSync(from, to, { recursive: true });
}

export function cli(cwd: string, args: string[]): { status: number; stdout: string; stderr: string } {
  const r = spawnSync(process.execPath, [CLI, ...args], { cwd, encoding: "utf8" });
  return { status: r.status ?? 1, stdout: r.stdout, stderr: r.stderr };
}
