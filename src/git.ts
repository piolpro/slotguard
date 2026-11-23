import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { run, runShell } from "./exec.js";

export interface BaseCheckout {
  /** Repository root of the base checkout. */
  root: string;
  sha: string;
  cleanup: () => void;
}

export interface CheckoutOptions {
  /** Project directory inside the repository (where foundry.toml or hardhat.config lives). */
  projectDir: string;
  /** Shell command run in the base project directory after checkout, replacing the default dependency setup. */
  setupCommand?: string;
  log?: (msg: string) => void;
}

const LOCKFILES: [string, string][] = [
  ["package-lock.json", "npm ci --ignore-scripts --no-audit --no-fund"],
  ["npm-shrinkwrap.json", "npm ci --ignore-scripts --no-audit --no-fund"],
  ["yarn.lock", "yarn install --frozen-lockfile --ignore-scripts"],
  ["pnpm-lock.yaml", "pnpm install --frozen-lockfile --ignore-scripts"],
  ["bun.lock", "bun install --frozen-lockfile --ignore-scripts"],
  ["bun.lockb", "bun install --frozen-lockfile --ignore-scripts"],
];

export function git(cwd: string, args: string[], allowFailure = false) {
  return run("git", args, { cwd, allowFailure });
}

export function repoRoot(dir: string): string {
  return git(dir, ["rev-parse", "--show-toplevel"]).stdout.trim();
}

export function resolveCommit(root: string, ref: string, log?: (msg: string) => void): string {
  const local = git(root, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], true);
  if (local.status === 0) return local.stdout.trim();
  log?.(`Fetching ${ref} from origin`);
  const remoteRef = ref.replace(/^origin\//, "");
  git(root, ["fetch", "--no-tags", "--depth=1", "origin", remoteRef]);
  return git(root, ["rev-parse", "--verify", "FETCH_HEAD^{commit}"]).stdout.trim();
}

function blob(root: string, sha: string, path: string): string | undefined {
  const res = git(root, ["show", `${sha}:${path}`], true);
  return res.status === 0 ? res.stdout : undefined;
}

/**
 * Checks out `ref` in a temporary worktree and makes its dependencies available,
 * reusing the head checkout's submodules and node_modules when they are identical.
 */
export function checkoutBase(headRoot: string, ref: string, opts: CheckoutOptions): BaseCheckout {
  const sha = resolveCommit(headRoot, ref, opts.log);
  const dir = join(mkdtempSync(join(tmpdir(), "slotguard-base-")), "repo");
  opts.log?.(`Checking out base ${ref} (${sha.slice(0, 12)}) in ${dir}`);
  git(headRoot, ["worktree", "add", "--detach", "--force", dir, sha]);
  const cleanup = () => {
    git(headRoot, ["worktree", "remove", "--force", dir], true);
    rmSync(dirname(dir), { recursive: true, force: true });
    git(headRoot, ["worktree", "prune"], true);
  };
  try {
    const rel = relative(headRoot, opts.projectDir);
    const baseProject = join(dir, rel);
    if (opts.setupCommand) {
      runShell(opts.setupCommand, { cwd: baseProject, inherit: true });
    } else {
      setupSubmodules(headRoot, dir, sha, opts.log);
      for (const prefix of new Set([rel, ""])) setupNodeModules(headRoot, dir, sha, prefix, opts.log);
      setupSoldeer(headRoot, dir, sha, rel, opts.log);
    }
    return { root: dir, sha, cleanup };
  } catch (e) {
    cleanup();
    throw e;
  }
}

function setupSubmodules(headRoot: string, baseRoot: string, sha: string, log?: (msg: string) => void): void {
  const tree = git(headRoot, ["ls-tree", "-r", sha]).stdout;
  const links = tree
    .split("\n")
    .map((line) => /^160000 commit ([0-9a-f]+)\t(.+)$/.exec(line))
    .filter((m): m is RegExpExecArray => Boolean(m));
  const missing: string[] = [];
  for (const [, commit, path] of links) {
    const headPath = join(headRoot, path);
    const headCommit = existsSync(join(headPath, ".git")) ? git(headPath, ["rev-parse", "HEAD"], true).stdout.trim() : "";
    if (headCommit === commit) {
      rmSync(join(baseRoot, path), { recursive: true, force: true });
      symlinkSync(headPath, join(baseRoot, path), "dir");
    } else {
      missing.push(path);
    }
  }
  if (missing.length) {
    log?.(`Initializing ${missing.length} submodule(s) for the base checkout`);
    git(baseRoot, ["submodule", "update", "--init", "--recursive", "--depth=1", "--", ...missing]);
  }
}

function setupNodeModules(headRoot: string, baseRoot: string, sha: string, prefix: string, log?: (msg: string) => void): void {
  const headModules = join(headRoot, prefix, "node_modules");
  if (!existsSync(headModules)) return;
  const target = join(baseRoot, prefix, "node_modules");
  if (existsSync(target)) return;
  const lock = LOCKFILES.find(([f]) => existsSync(join(headRoot, prefix, f)));
  if (!lock) {
    symlinkSync(headModules, target, "dir");
    return;
  }
  const [file, install] = lock;
  const baseLock = blob(headRoot, sha, join(prefix, file));
  const headLock = readFileSync(join(headRoot, prefix, file), "utf8");
  if (baseLock === undefined || baseLock === headLock) {
    symlinkSync(headModules, target, "dir");
  } else {
    log?.(`${join(prefix, file)} differs on the base branch; running \`${install}\``);
    runShell(install, { cwd: join(baseRoot, prefix), inherit: true });
  }
}

function setupSoldeer(headRoot: string, baseRoot: string, sha: string, prefix: string, log?: (msg: string) => void): void {
  const headDeps = join(headRoot, prefix, "dependencies");
  if (!existsSync(join(headRoot, prefix, "soldeer.lock")) || !existsSync(headDeps)) return;
  const target = join(baseRoot, prefix, "dependencies");
  const baseLock = blob(headRoot, sha, join(prefix, "soldeer.lock"));
  if (baseLock === readFileSync(join(headRoot, prefix, "soldeer.lock"), "utf8")) {
    rmSync(target, { recursive: true, force: true });
    symlinkSync(headDeps, target, "dir");
  } else {
    log?.("soldeer.lock differs on the base branch; running `forge soldeer install`");
    run("forge", ["soldeer", "install"], { cwd: join(baseRoot, prefix), inherit: true });
  }
}
