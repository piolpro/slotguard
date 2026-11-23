import type { RuleId, Severity } from "./types.js";

export interface RuleInfo {
  severity: Severity;
  description: string;
}

export const RULES: Record<RuleId, RuleInfo> = {
  "storage-var-removed": { severity: "error", description: "A state variable from the base layout no longer exists." },
  "storage-var-moved": { severity: "error", description: "A state variable now lives at a different slot or offset." },
  "storage-var-inserted": { severity: "error", description: "A new state variable occupies storage that was used in the base layout." },
  "storage-var-packed": {
    severity: "warning",
    description: "A new state variable was packed into bytes the base layout left unused, before the end of the layout.",
  },
  "storage-var-replaced": { severity: "error", description: "A different variable with an incompatible type occupies an existing slot." },
  "storage-var-renamed": { severity: "warning", description: "A variable at the same position was renamed (same type). Safe for storage, but check intent." },
  "storage-type-changed": { severity: "error", description: "A state variable's type changed in a way that reinterprets existing data." },
  "storage-type-compatible": { severity: "warning", description: "A type changed, but the encoding is compatible (e.g. address to contract type, struct members appended inside a mapping)." },
  "storage-var-appended": { severity: "info", description: "A new state variable was appended after the existing layout. Safe." },
  "storage-gap-changed": { severity: "error", description: "A storage gap was resized so that the variables after it shift." },
  "storage-gap-consumed": { severity: "info", description: "New variables use space reserved by a storage gap, and the gap shrank to match. Safe." },
  "storage-layout-missing": { severity: "warning", description: "No storage layout was produced for this contract, so storage could not be checked." },
  "abi-function-removed": { severity: "error", description: "A function was removed or its signature (selector) changed." },
  "abi-function-outputs-changed": { severity: "error", description: "A function's return types changed, so existing callers decode the wrong data." },
  "abi-function-mutability-changed": { severity: "warning", description: "A function's state mutability changed (e.g. view to nonpayable, payable to nonpayable)." },
  "abi-event-removed": { severity: "error", description: "An event was removed or its signature (topic) changed; indexers and subgraphs stop seeing it." },
  "abi-event-indexed-changed": { severity: "error", description: "An event kept its signature but changed which parameters are indexed, which changes its log layout." },
  "abi-error-removed": { severity: "warning", description: "A custom error was removed or its signature changed." },
  "abi-receive-removed": { severity: "error", description: "The receive function was removed; plain ETH transfers now revert." },
  "abi-fallback-removed": { severity: "error", description: "The fallback function was removed." },
  "abi-function-added": { severity: "info", description: "A function was added." },
  "abi-event-added": { severity: "info", description: "An event was added." },
  "contract-removed": { severity: "warning", description: "A contract that was checked on the base branch no longer exists." },
};

export const RULE_IDS = Object.keys(RULES) as RuleId[];
