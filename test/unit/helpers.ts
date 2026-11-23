import type { StorageVar, TypeNode } from "../../src/types.js";

export const u256: TypeNode = { kind: "value", label: "uint256", bytes: 32 };
export const u128: TypeNode = { kind: "value", label: "uint128", bytes: 16 };
export const addr: TypeNode = { kind: "value", label: "address", bytes: 20 };
export const bool: TypeNode = { kind: "value", label: "bool", bytes: 1 };

export function gap(n: number): TypeNode {
  return { kind: "array", label: `uint256[${n}]`, bytes: 32 * n, length: n, base: u256 };
}

export function v(label: string, slot: number, type: TypeNode = u256, offset = 0): StorageVar {
  return { label, slot: String(slot), offset, type };
}

export function mapping(key: TypeNode, value: TypeNode): TypeNode {
  return { kind: "mapping", label: `mapping(${key.label} => ${value.label})`, key, value };
}

export function struct(label: string, members: [string, TypeNode][]): TypeNode {
  return {
    kind: "struct",
    label,
    bytes: members.length * 32,
    members: members.map(([l, t], i) => ({ label: l, slot: String(i), offset: 0, type: t })),
  };
}
