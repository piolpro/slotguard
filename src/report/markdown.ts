import { RULES } from "../rules.js";
import type { ContractResult, DiffResult, Finding, Severity, StorageVar } from "../types.js";

export interface ReportContext {
  baseLabel?: string;
  headLabel?: string;
  version?: string;
  /** Distinguishes several reports on one PR (e.g. monorepo packages). */
  id?: string;
}

export const REPO_URL = "https://github.com/piolpro/slotguard";

export function marker(id = "default"): string {
  return `<!-- slotguard:${id} -->`;
}

const LABEL: Record<Severity, string> = { error: "Error", warning: "Warning", info: "Info" };

function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

export function headline(result: DiffResult): string {
  const { error, warning } = result.counts;
  if (error) return `slotguard: ${plural(error, "breaking change")} found`;
  if (warning) return `slotguard: ${plural(warning, "warning")}, no breaking changes`;
  return "slotguard: no breaking storage or ABI changes";
}

export function renderMarkdown(result: DiffResult, ctx: ReportContext = {}): string {
  const out: string[] = [marker(ctx.id), `## ${headline(result)}`, ""];
  const { error, warning, info } = result.counts;
  if (error) {
    out.push(
      "> [!CAUTION]",
      "> This change breaks the storage layout or ABI of contracts that look upgradeable. Upgrading a deployed proxy to this code can corrupt its state or break integrations.",
      "",
    );
  }
  const range = ctx.baseLabel && ctx.headLabel ? `Compared \`${ctx.baseLabel}\` → \`${ctx.headLabel}\` · ` : "";
  out.push(`${range}${plural(result.checked.length, "contract")} checked · ${plural(error, "error")} · ${plural(warning, "warning")} · ${info} info`, "");

  const clean: string[] = [];
  for (const c of result.contracts) {
    const serious = c.findings.filter((f) => f.severity !== "info");
    if (serious.length === 0) {
      clean.push(c.contract);
      continue;
    }
    const e = serious.filter((f) => f.severity === "error").length;
    const w = serious.length - e;
    const parts = [e && plural(e, "error"), w && plural(w, "warning")].filter(Boolean).join(", ");
    out.push(`### \`${c.contract}\` (${parts})`, "", "| Severity | Rule | Finding |", "| --- | --- | --- |");
    for (const f of sortFindings(serious)) out.push(`| ${LABEL[f.severity]} | [\`${f.rule}\`](${REPO_URL}/blob/main/docs/rules.md#${f.rule}) | ${cell(f.message)} |`);
    out.push("");
    const infos = c.findings.filter((f) => f.severity === "info");
    if (infos.length) out.push(...details(`${plural(infos.length, "safe change")}`, infos.map((f) => `- ${f.message}`)));
    if (c.base?.storage && c.head?.storage && serious.some((f) => f.rule.startsWith("storage-"))) {
      out.push(...details("Storage layout, base → head", layoutTable(c.base.storage, c.head.storage)));
    }
  }
  if (clean.length) {
    const lines = result.contracts
      .filter((c) => clean.includes(c.contract))
      .map((c) => {
        const infos = c.findings.length;
        return `- \`${c.contract}\`${infos ? ` (${plural(infos, "safe change")})` : ""}`;
      });
    out.push(...details(`${plural(clean.length, "contract")} with no issues`, lines));
  }
  if (result.checked.length === 0) {
    out.push(
      "No upgradeable contracts were found on the base branch. slotguard detects OpenZeppelin-style initializers, UUPS functions and storage gaps; list contracts explicitly under `contracts` in `.slotguard.json`, or set `scope` to `all`.",
      "",
    );
  }
  out.push(`<sub>[slotguard](${REPO_URL})${ctx.version ? ` v${ctx.version}` : ""} · [rules](${REPO_URL}/blob/main/docs/rules.md) · configure with \`.slotguard.json\`</sub>`);
  return out.join("\n") + "\n";
}

function details(summary: string, lines: string[]): string[] {
  return ["<details>", `<summary>${summary}</summary>`, "", ...lines, "", "</details>", ""];
}

const ORDER: Record<Severity, number> = { error: 0, warning: 1, info: 2 };

export function sortFindings(findings: Finding[]): Finding[] {
  return [...findings].sort((a, b) => ORDER[a.severity] - ORDER[b.severity]);
}

export function layoutTable(base: StorageVar[], head: StorageVar[]): string[] {
  const key = (v: StorageVar) => `${v.slot}:${v.offset}`;
  const rows = new Map<string, { slot: string; offset: number; base?: StorageVar; head?: StorageVar }>();
  for (const v of base) rows.set(key(v), { slot: v.slot, offset: v.offset, base: v });
  for (const v of head) {
    const row = rows.get(key(v)) ?? { slot: v.slot, offset: v.offset };
    row.head = v;
    rows.set(key(v), row);
  }
  const sorted = [...rows.values()].sort((a, b) => {
    const d = BigInt(a.slot) - BigInt(b.slot);
    return d !== 0n ? (d < 0n ? -1 : 1) : a.offset - b.offset;
  });
  const show = (v?: StorageVar) => (v ? `\`${cell(v.label)}\`: \`${cell(v.type.label)}\`` : "");
  const lines = ["| Slot | Offset | Base | Head | |", "| --- | --- | --- | --- | --- |"];
  for (const r of sorted) {
    const same = r.base && r.head && r.base.label === r.head.label && r.base.type.label === r.head.type.label;
    lines.push(`| ${r.slot} | ${r.offset} | ${show(r.base)} | ${show(r.head)} | ${same ? "" : "changed"} |`);
  }
  return lines;
}

export function renderText(result: DiffResult, color = false): string {
  const paint = (code: string, s: string) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
  const sev: Record<Severity, string> = { error: paint("31", "error  "), warning: paint("33", "warning"), info: paint("2", "info   ") };
  const lines: string[] = [];
  for (const c of result.contracts as ContractResult[]) {
    if (!c.findings.length) continue;
    lines.push(paint("1", c.contract));
    for (const f of sortFindings(c.findings)) lines.push(`  ${sev[f.severity]}  ${f.rule.padEnd(32)} ${f.message.replace(/`/g, "")}`);
    lines.push("");
  }
  const { error, warning, info } = result.counts;
  lines.push(`${plural(result.checked.length, "contract")} checked: ${plural(error, "error")}, ${plural(warning, "warning")}, ${info} info`);
  return lines.join("\n") + "\n";
}

export function ruleDescription(rule: Finding["rule"]): string {
  return RULES[rule].description;
}
