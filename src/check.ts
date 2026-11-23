import { join, relative, resolve } from "node:path";
import { type Config, loadConfig } from "./config.js";
import { diffSnapshots } from "./diff/index.js";
import { detectFramework, type SnapshotOptions, snapshotProject } from "./extract/index.js";
import { checkoutBase, git, repoRoot } from "./git.js";
import type { DiffResult, Snapshot } from "./types.js";

export interface CheckOptions extends SnapshotOptions {
  /** Project directory (where foundry.toml or hardhat.config lives). */
  root: string;
  base: string;
  config?: string;
  setupCommand?: string;
  configOverrides?: (c: Config) => void;
}

export interface CheckResult {
  result: DiffResult;
  config: Config;
  base: Snapshot;
  head: Snapshot;
  baseSha: string;
  headSha: string;
}

export function runCheck(opts: CheckOptions): CheckResult {
  const root = resolve(opts.root);
  const config = loadConfig(root, opts.config);
  opts.configOverrides?.(config);
  const head = snapshotProject(root, opts);
  const top = repoRoot(root);
  const headSha = git(top, ["rev-parse", "HEAD"]).stdout.trim();
  const checkout = checkoutBase(top, opts.base, { projectDir: root, setupCommand: opts.setupCommand, log: opts.log });
  let base: Snapshot;
  try {
    const baseRoot = join(checkout.root, relative(top, root));
    const framework = !opts.framework || opts.framework === "auto" ? detectFramework(baseRoot) : opts.framework;
    // Foundry's --artifacts means "read instead of build"; the base checkout always builds.
    base = snapshotProject(baseRoot, { ...opts, framework, build: true, artifacts: framework === "hardhat" ? opts.artifacts : undefined });
  } finally {
    checkout.cleanup();
  }
  return { result: diffSnapshots(base, head, config), config, base, head, baseSha: checkout.sha, headSha };
}
