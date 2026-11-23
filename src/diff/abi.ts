import type { AbiEntry, AbiParam, RuleId } from "../types.js";

type Emit = (rule: RuleId, message: string) => void;

export function canonicalType(p: AbiParam): string {
  if (p.type.startsWith("tuple")) {
    return `(${(p.components ?? []).map(canonicalType).join(",")})${p.type.slice("tuple".length)}`;
  }
  return p.type;
}

export function signature(e: AbiEntry): string {
  return `${e.name ?? ""}(${(e.inputs ?? []).map(canonicalType).join(",")})`;
}

function byType(abi: AbiEntry[], type: AbiEntry["type"]): Map<string, AbiEntry> {
  const map = new Map<string, AbiEntry>();
  for (const e of abi) if (e.type === type) map.set(signature(e), e);
  return map;
}

function sameNameHint(entry: AbiEntry, head: Map<string, AbiEntry>): string {
  const others = [...head.values()].filter((e) => e.name === entry.name).map((e) => `\`${signature(e)}\``);
  return others.length ? ` Now: ${others.join(", ")}.` : "";
}

function mutability(e: AbiEntry): string {
  if (e.stateMutability) return e.stateMutability;
  return "nonpayable";
}

export function diffAbi(base: AbiEntry[], head: AbiEntry[], emit: Emit): void {
  const bf = byType(base, "function");
  const hf = byType(head, "function");
  for (const [sig, b] of bf) {
    const h = hf.get(sig);
    if (!h) {
      emit("abi-function-removed", `Function \`${sig}\` was removed.${sameNameHint(b, hf)}`);
      continue;
    }
    const bo = (b.outputs ?? []).map(canonicalType).join(",");
    const ho = (h.outputs ?? []).map(canonicalType).join(",");
    if (bo !== ho) emit("abi-function-outputs-changed", `Function \`${sig}\` now returns \`(${ho})\` instead of \`(${bo})\`.`);
    if (mutability(b) !== mutability(h)) {
      emit("abi-function-mutability-changed", `Function \`${sig}\` changed from \`${mutability(b)}\` to \`${mutability(h)}\`.`);
    }
  }
  for (const sig of hf.keys()) if (!bf.has(sig)) emit("abi-function-added", `Function \`${sig}\` was added.`);

  const be = byType(base, "event");
  const he = byType(head, "event");
  for (const [sig, b] of be) {
    const h = he.get(sig);
    if (!h) {
      emit("abi-event-removed", `Event \`${sig}\` was removed.${sameNameHint(b, he)}`);
      continue;
    }
    const bi = (b.inputs ?? []).map((p) => (p.indexed ? "1" : "0")).join("");
    const hi = (h.inputs ?? []).map((p) => (p.indexed ? "1" : "0")).join("");
    if (bi !== hi || Boolean(b.anonymous) !== Boolean(h.anonymous)) {
      const show = (e: AbiEntry) =>
        `${e.anonymous ? "anonymous " : ""}${e.name}(${(e.inputs ?? []).map((p) => `${canonicalType(p)}${p.indexed ? " indexed" : ""}`).join(", ")})`;
      emit("abi-event-indexed-changed", `Event \`${sig}\` changed from \`${show(b)}\` to \`${show(h)}\`.`);
    }
  }
  for (const sig of he.keys()) if (!be.has(sig)) emit("abi-event-added", `Event \`${sig}\` was added.`);

  const ber = byType(base, "error");
  const her = byType(head, "error");
  for (const [sig, b] of ber) {
    if (!her.has(sig)) emit("abi-error-removed", `Error \`${sig}\` was removed.${sameNameHint(b, her)}`);
  }

  if (base.some((e) => e.type === "receive") && !head.some((e) => e.type === "receive")) {
    emit("abi-receive-removed", "The `receive()` function was removed.");
  }
  if (base.some((e) => e.type === "fallback") && !head.some((e) => e.type === "fallback")) {
    emit("abi-fallback-removed", "The `fallback()` function was removed.");
  }
}
