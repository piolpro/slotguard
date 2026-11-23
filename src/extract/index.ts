import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Snapshot } from "../types.js";
import { snapshotFoundry } from "./foundry.js";
import { snapshotHardhat } from "./hardhat.js";

export type Framework = "foundry" | "hardhat";

export interface SnapshotOptions {
  framework?: Framework | "auto";
  build?: boolean;
  buildCommand?: string;
  artifacts?: string;
  log?: (msg: string) => void;
}

const HARDHAT_CONFIGS = ["hardhat.config.ts", "hardhat.config.js", "hardhat.config.cjs", "hardhat.config.mjs", "hardhat.config.cts", "hardhat.config.mts"];

export function detectFramework(root: string): Framework {
  if (existsSync(join(root, "foundry.toml"))) return "foundry";
  if (HARDHAT_CONFIGS.some((f) => existsSync(join(root, f)))) return "hardhat";
  throw new Error(`No foundry.toml or hardhat.config.* in ${root}. Pass --framework or --working-directory.`);
}

export function snapshotProject(root: string, opts: SnapshotOptions = {}): Snapshot {
  const framework = !opts.framework || opts.framework === "auto" ? detectFramework(root) : opts.framework;
  if (framework === "foundry") {
    const artifacts = opts.artifacts ?? (opts.build === false ? join(root, "out") : undefined);
    return snapshotFoundry(root, { artifacts, buildCommand: opts.buildCommand, log: opts.log });
  }
  return snapshotHardhat(root, { artifacts: opts.artifacts, build: opts.build, buildCommand: opts.buildCommand, log: opts.log });
}
