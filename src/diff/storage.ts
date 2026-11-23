import type { Finding, RuleId, StorageVar, TypeNode } from "../types.js";
import { compareTypes } from "./types-compare.js";

type Emit = (rule: RuleId, message: string) => void;

const GAP = /^_{1,2}gap/i;

function bytesOf(t: TypeNode): bigint {
  switch (t.kind) {
    case "value":
    case "array":
    case "struct":
      return BigInt(t.kind === "array" && t.length === null ? 32 : t.bytes);
    default:
      return 32n;
  }
}

function start(v: StorageVar): bigint {
  return BigInt(v.slot) * 32n + BigInt(v.offset);
}

function end(v: StorageVar): bigint {
  const size = bytesOf(v.type);
  // Structs and arrays always occupy whole slots.
  const whole = v.type.kind === "struct" || v.type.kind === "array";
  return start(v) + (whole ? ((size + 31n) / 32n) * 32n : size);
}

function pos(v: StorageVar): string {
  return v.offset === 0 ? `slot ${v.slot}` : `slot ${v.slot} (offset ${v.offset})`;
}

function describe(v: StorageVar): string {
  return `\`${v.label}\` (\`${v.type.label}\`)`;
}

function isGap(v: StorageVar): boolean {
  return GAP.test(v.label) && v.type.kind === "array" && v.type.length !== null;
}

interface Range {
  from: bigint;
  to: bigint;
}

export function diffStorage(base: StorageVar[], head: StorageVar[], emit: Emit): void {
  const headByLabel = new Map<string, StorageVar>();
  for (const v of head) if (!headByLabel.has(v.label)) headByLabel.set(v.label, v);
  const headByPos = new Map<string, StorageVar>();
  for (const v of head) headByPos.set(`${v.slot}:${v.offset}`, v);
  const baseLabels = new Set(base.map((v) => v.label));
  const lastBase = base.reduce<StorageVar | undefined>((acc, v) => (!acc || end(v) > end(acc) ? v : acc), undefined);
  const baseEnd = lastBase ? end(lastBase) : 0n;

  const consumed: Range[] = [];
  const claimed = new Set<StorageVar>();

  for (const b of base) {
    const h = headByLabel.get(b.label);
    if (isGap(b)) {
      if (!h) {
        consumed.push({ from: start(b), to: end(b) });
        emit("storage-gap-consumed", `Gap ${describe(b)} at ${pos(b)} was removed; its space is free for new variables.`);
        continue;
      }
      claimed.add(h);
      if (end(h) === end(b) && start(h) >= start(b) && h.type.kind === "array" && b.type.kind === "array") {
        if (start(h) > start(b)) {
          consumed.push({ from: start(b), to: start(h) });
          emit(
            "storage-gap-consumed",
            `Gap \`${b.label}\` shrank from \`${b.type.label}\` to \`${h.type.label}\` and still ends at the same slot.`,
          );
        }
        continue;
      }
      const span = end(b) - start(h);
      const fit = span % 32n === 0n ? span / 32n : 0n;
      const hint = fit > 0n && h.type.kind === "array" && h.type.base.label === "uint256"
        ? ` Resize it to \`uint256[${fit}]\` to keep it ending where it did.`
        : "";
      emit(
        "storage-gap-changed",
        `Gap \`${b.label}\` went from \`${b.type.label}\` at ${pos(b)} to \`${h.type.label}\` at ${pos(h)}, so it no longer ends at the same slot and everything after it shifts.${hint}`,
      );
      continue;
    }

    if (h) {
      claimed.add(h);
      if (h.slot !== b.slot || h.offset !== b.offset) {
        emit("storage-var-moved", `${describe(b)} moved from ${pos(b)} to ${pos(h)}. Existing data stays at the old slot.`);
        continue;
      }
      const r = compareTypes(b.type, h.type, b === lastBase);
      if (r.status === "breaking") {
        emit("storage-type-changed", `${describe(b)} at ${pos(b)} changed type: ${r.reasons.join("; ")}.`);
      } else if (r.status === "compatible") {
        emit("storage-type-compatible", `${describe(b)} at ${pos(b)}: ${r.reasons.join("; ")}.`);
      }
      continue;
    }

    const occupant = headByPos.get(`${b.slot}:${b.offset}`);
    if (occupant && !baseLabels.has(occupant.label) && !claimed.has(occupant)) {
      claimed.add(occupant);
      const r = compareTypes(b.type, occupant.type, b === lastBase);
      if (r.status === "breaking") {
        emit("storage-var-replaced", `${describe(b)} at ${pos(b)} was replaced by ${describe(occupant)}: ${r.reasons.join("; ")}.`);
      } else {
        emit("storage-var-renamed", `\`${b.label}\` at ${pos(b)} was renamed to \`${occupant.label}\`.`);
        if (r.status === "compatible") emit("storage-type-compatible", `\`${occupant.label}\` at ${pos(b)}: ${r.reasons.join("; ")}.`);
      }
      continue;
    }

    emit("storage-var-removed", `${describe(b)} at ${pos(b)} was removed. Its slot still holds the old value and may be reused by a later variable.`);
  }

  for (const h of head) {
    if (claimed.has(h) || baseLabels.has(h.label)) continue;
    const s = start(h);
    const e = end(h);
    if (s >= baseEnd) {
      emit("storage-var-appended", `${describe(h)} appended at ${pos(h)}.`);
    } else if (consumed.some((r) => s >= r.from && e <= r.to)) {
      emit("storage-var-appended", `${describe(h)} added at ${pos(h)} in space taken from a storage gap.`);
    } else {
      const overlapped = base.find((b) => start(b) < e && s < end(b));
      if (overlapped) {
        emit("storage-var-inserted", `${describe(h)} was inserted at ${pos(h)}, on top of base variable ${describe(overlapped)}. Variables after it shift and read the wrong data.`);
      } else {
        emit("storage-var-packed", `${describe(h)} was added at ${pos(h)}, in bytes the base layout left unused. Nothing moved, but the bytes must be zero on deployed proxies.`);
      }
    }
  }
}

export function collectStorage(contract: string, base: StorageVar[], head: StorageVar[], into: Finding[], severity: (r: RuleId) => Finding["severity"] | "off"): void {
  diffStorage(base, head, (rule, message) => {
    const s = severity(rule);
    if (s !== "off") into.push({ rule, severity: s, contract, message });
  });
}
