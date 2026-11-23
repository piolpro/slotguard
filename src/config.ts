import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { RULE_IDS } from "./rules.js";
import type { RuleId, Severity } from "./types.js";

export type Scope = "upgradeable" | "all";
export type FailOn = Severity | "never";

export interface Config {
  /** Globs over source paths or `path:Contract` names. Empty means everything. */
  include: string[];
  exclude: string[];
  /** Contracts always checked, even when they do not look upgradeable. */
  contracts: string[];
  scope: Scope;
  failOn: FailOn;
  rules: Partial<Record<RuleId, Severity | "off">>;
}

export const DEFAULT_EXCLUDE = [
  "lib/**",
  "node_modules/**",
  "dependencies/**",
  "@*/**",
  "test/**",
  "tests/**",
  "script/**",
  "scripts/**",
  "**/*.t.sol",
  "**/*.s.sol",
  "**/mocks/**",
  "**/mock/**",
  "**/test/**",
];

export const CONFIG_FILES = [".slotguard.json", "slotguard.config.json"];

export function defaultConfig(): Config {
  return { include: [], exclude: [...DEFAULT_EXCLUDE], contracts: [], scope: "upgradeable", failOn: "error", rules: {} };
}

export function loadConfig(root: string, explicit?: string): Config {
  const config = defaultConfig();
  const file = explicit ? join(root, explicit) : CONFIG_FILES.map((f) => join(root, f)).find((f) => existsSync(f));
  if (!file) return config;
  if (!existsSync(file)) throw new Error(`Config file not found: ${file}`);
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    throw new Error(`Could not parse ${file}: ${(e as Error).message}`);
  }
  return mergeConfig(config, raw, file);
}

export function mergeConfig(config: Config, raw: Record<string, unknown>, origin = "config"): Config {
  const list = (key: string): string[] | undefined => {
    const v = raw[key];
    if (v === undefined) return undefined;
    if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) throw new Error(`${origin}: "${key}" must be an array of strings`);
    return v as string[];
  };
  const include = list("include");
  const exclude = list("exclude");
  const extraExclude = list("extraExclude");
  const contracts = list("contracts");
  if (include) config.include = include;
  if (exclude) config.exclude = exclude;
  if (extraExclude) config.exclude.push(...extraExclude);
  if (contracts) config.contracts = contracts;
  if (raw.scope !== undefined) config.scope = parseScope(raw.scope, origin);
  if (raw.failOn !== undefined) config.failOn = parseFailOn(raw.failOn, origin);
  if (raw.rules !== undefined) {
    if (typeof raw.rules !== "object" || raw.rules === null) throw new Error(`${origin}: "rules" must be an object`);
    for (const [rule, level] of Object.entries(raw.rules)) {
      if (!RULE_IDS.includes(rule as RuleId)) throw new Error(`${origin}: unknown rule "${rule}"`);
      if (!["error", "warning", "info", "off"].includes(level as string)) {
        throw new Error(`${origin}: rule "${rule}" must be error, warning, info or off`);
      }
      config.rules[rule as RuleId] = level as Severity | "off";
    }
  }
  return config;
}

export function parseScope(v: unknown, origin = "option"): Scope {
  if (v === "upgradeable" || v === "all") return v;
  throw new Error(`${origin}: scope must be "upgradeable" or "all"`);
}

export function parseFailOn(v: unknown, origin = "option"): FailOn {
  if (v === "error" || v === "warning" || v === "info" || v === "never") return v;
  throw new Error(`${origin}: failOn must be error, warning, info or never`);
}
