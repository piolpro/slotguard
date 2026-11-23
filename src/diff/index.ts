import picomatch from "picomatch";
import type { Config } from "../config.js";
import { RULES } from "../rules.js";
import type { ContractResult, ContractSnapshot, DiffResult, Finding, RuleId, Severity, Snapshot } from "../types.js";
import { diffAbi, signature } from "./abi.js";
import { collectStorage } from "./storage.js";

const UPGRADE_FUNCTIONS = new Set(["upgradeTo(address)", "upgradeToAndCall(address,bytes)", "proxiableUUID()"]);
const INITIALIZED_EVENTS = new Set(["Initialized(uint8)", "Initialized(uint64)", "Initialized(uint256)"]);

/** Heuristic: OpenZeppelin-style Initializable/UUPS contracts, or anything with an initializer or storage gap. */
export function looksUpgradeable(c: ContractSnapshot): boolean {
  for (const e of c.abi) {
    if (e.type === "function" && UPGRADE_FUNCTIONS.has(signature(e))) return true;
    if (e.type === "function" && e.name && /^initialize/i.test(e.name)) return true;
    if (e.type === "event" && INITIALIZED_EVENTS.has(signature(e))) return true;
  }
  return (c.storage ?? []).some((v) => /^_{1,2}gap/i.test(v.label) || v.label === "_initialized");
}

function matcher(globs: string[]): (fqn: string, source: string) => boolean {
  if (globs.length === 0) return () => false;
  const m = picomatch(globs, { dot: true });
  return (fqn, source) => m(source) || m(fqn);
}

export function selectContracts(snapshot: Snapshot, config: Config): Set<string> {
  const include = config.include.length ? matcher(config.include) : () => true;
  const exclude = matcher(config.exclude);
  const forced = matcher(config.contracts);
  const selected = new Set<string>();
  for (const [fqn, c] of Object.entries(snapshot.contracts)) {
    if (forced(fqn, c.source) || config.contracts.includes(c.name)) {
      selected.add(fqn);
      continue;
    }
    if (!include(fqn, c.source) || exclude(fqn, c.source)) continue;
    if (!c.deployable) continue;
    if (config.scope === "all" || looksUpgradeable(c)) selected.add(fqn);
  }
  return selected;
}

export function diffSnapshots(base: Snapshot, head: Snapshot, config: Config): DiffResult {
  const severity = (rule: RuleId): Severity | "off" => config.rules[rule] ?? RULES[rule].severity;
  // A contract is checked when it is in scope on the base branch: that is the deployed code being upgraded.
  const checked = [...selectContracts(base, config)].sort();
  const results: ContractResult[] = [];
  for (const fqn of checked) {
    const b = base.contracts[fqn];
    const h = head.contracts[fqn];
    const findings: Finding[] = [];
    const push = (rule: RuleId, message: string) => {
      const s = severity(rule);
      if (s !== "off") findings.push({ rule, severity: s, contract: fqn, message });
    };
    if (!h) {
      push("contract-removed", `\`${fqn}\` no longer exists. If it was renamed or moved, list the new name under "contracts" to keep checking it.`);
    } else {
      if (b.storage && h.storage) {
        collectStorage(fqn, b.storage, h.storage, findings, severity);
      } else {
        push("storage-layout-missing", `No storage layout for \`${fqn}\` on the ${b.storage ? "head" : "base"} side.`);
      }
      diffAbi(b.abi, h.abi, push);
    }
    results.push({ contract: fqn, findings, base: b, head: h });
  }
  const counts: Record<Severity, number> = { error: 0, warning: 0, info: 0 };
  for (const r of results) for (const f of r.findings) counts[f.severity]++;
  return { checked, contracts: results, counts };
}

export function shouldFail(result: DiffResult, failOn: Config["failOn"]): boolean {
  if (failOn === "never") return false;
  if (failOn === "info") return result.counts.error + result.counts.warning + result.counts.info > 0;
  if (failOn === "warning") return result.counts.error + result.counts.warning > 0;
  return result.counts.error > 0;
}
