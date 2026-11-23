import type { AbiEntry, ContractSnapshot, StorageVar, TypeNode } from "./types.js";

interface SolcTypeDef {
  encoding: string;
  label: string;
  numberOfBytes: string;
  base?: string;
  key?: string;
  value?: string;
  members?: SolcStorageItem[];
}

interface SolcStorageItem {
  label: string;
  slot: string;
  offset: number;
  type: string;
}

export interface SolcStorageLayout {
  storage: SolcStorageItem[];
  types: Record<string, SolcTypeDef> | null;
}

/** Turns a solc `storageLayout` into a self-contained list of variables with resolved types. */
export function normalizeStorageLayout(layout: SolcStorageLayout): StorageVar[] {
  const types = layout.types ?? {};
  const resolve = (id: string, path: Set<string>): TypeNode => {
    const def = types[id];
    if (!def) return { kind: "value", label: id, bytes: 32 };
    if (path.has(id)) return { kind: "ref", label: def.label };
    const next = new Set(path).add(id);
    const bytes = Number(def.numberOfBytes);
    switch (def.encoding) {
      case "mapping":
        return { kind: "mapping", label: def.label, key: resolve(def.key!, next), value: resolve(def.value!, next) };
      case "dynamic_array":
        return { kind: "array", label: def.label, bytes, length: null, base: resolve(def.base!, next) };
      case "bytes":
        return { kind: "bytes", label: def.label };
      default:
        if (def.members) {
          return {
            kind: "struct",
            label: def.label,
            bytes,
            members: def.members.map((m) => ({
              label: m.label,
              slot: String(m.slot),
              offset: Number(m.offset),
              type: resolve(m.type, next),
            })),
          };
        }
        if (def.base) {
          const match = /\[(\d+)\]$/.exec(def.label);
          return { kind: "array", label: def.label, bytes, length: match ? Number(match[1]) : 0, base: resolve(def.base, next) };
        }
        return { kind: "value", label: def.label, bytes };
    }
  };
  return layout.storage.map((item) => ({
    label: item.label,
    slot: String(item.slot),
    offset: Number(item.offset),
    type: resolve(item.type, new Set()),
  }));
}

export function makeContract(
  source: string,
  name: string,
  abi: unknown,
  storageLayout: SolcStorageLayout | undefined | null,
  bytecode: string | undefined,
): ContractSnapshot {
  const code = (bytecode ?? "").replace(/^0x/, "");
  return {
    source,
    name,
    // Unknown bytecode (not requested from the compiler) counts as deployable.
    deployable: bytecode === undefined || code.length > 0,
    storage: storageLayout && Array.isArray(storageLayout.storage) ? normalizeStorageLayout(storageLayout) : null,
    abi: Array.isArray(abi) ? (abi as AbiEntry[]) : [],
  };
}
