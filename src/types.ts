export type Severity = "error" | "warning" | "info";

/** Normalized storage type, independent of compiler AST ids. */
export type TypeNode =
  | { kind: "value"; label: string; bytes: number }
  | { kind: "bytes"; label: string }
  | { kind: "mapping"; label: string; key: TypeNode; value: TypeNode }
  | { kind: "array"; label: string; bytes: number; length: number | null; base: TypeNode }
  | { kind: "struct"; label: string; bytes: number; members: StructMember[] }
  | { kind: "ref"; label: string };

export interface StructMember {
  label: string;
  slot: string;
  offset: number;
  type: TypeNode;
}

export interface StorageVar {
  label: string;
  slot: string;
  offset: number;
  type: TypeNode;
}

export interface AbiParam {
  name?: string;
  type: string;
  internalType?: string;
  indexed?: boolean;
  components?: AbiParam[];
}

export interface AbiEntry {
  type: "function" | "event" | "error" | "constructor" | "fallback" | "receive";
  name?: string;
  inputs?: AbiParam[];
  outputs?: AbiParam[];
  stateMutability?: string;
  anonymous?: boolean;
}

export interface ContractSnapshot {
  source: string;
  name: string;
  /** False for abstract contracts and interfaces (no deployable bytecode). */
  deployable: boolean;
  storage: StorageVar[] | null;
  abi: AbiEntry[];
}

export interface Snapshot {
  tool: "slotguard";
  version: 1;
  framework: "foundry" | "hardhat" | "solc";
  contracts: Record<string, ContractSnapshot>;
}

export type RuleId =
  | "storage-var-removed"
  | "storage-var-moved"
  | "storage-var-inserted"
  | "storage-var-packed"
  | "storage-var-replaced"
  | "storage-var-renamed"
  | "storage-type-changed"
  | "storage-type-compatible"
  | "storage-var-appended"
  | "storage-gap-changed"
  | "storage-gap-consumed"
  | "storage-layout-missing"
  | "abi-function-removed"
  | "abi-function-outputs-changed"
  | "abi-function-mutability-changed"
  | "abi-event-removed"
  | "abi-event-indexed-changed"
  | "abi-error-removed"
  | "abi-receive-removed"
  | "abi-fallback-removed"
  | "abi-function-added"
  | "abi-event-added"
  | "contract-removed";

export interface Finding {
  rule: RuleId;
  severity: Severity;
  contract: string;
  message: string;
}

export interface ContractResult {
  contract: string;
  findings: Finding[];
  base?: ContractSnapshot;
  head?: ContractSnapshot;
}

export interface DiffResult {
  checked: string[];
  contracts: ContractResult[];
  counts: Record<Severity, number>;
}
