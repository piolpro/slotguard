import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { runCheck } from "./check.js";
import { parseFailOn, parseScope } from "./config.js";
import { shouldFail } from "./diff/index.js";
import type { Framework } from "./extract/index.js";
import { upsertComment } from "./github.js";
import { headline, renderMarkdown, sortFindings } from "./report/markdown.js";
import { VERSION } from "./version.js";

function input(name: string, fallback = ""): string {
  return (process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] ?? "").trim() || fallback;
}

function setOutput(name: string, value: string | number): void {
  const file = process.env.GITHUB_OUTPUT;
  if (file) appendFileSync(file, `${name}<<__SLOTGUARD__\n${value}\n__SLOTGUARD__\n`);
}

function escapeData(s: string): string {
  return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}

function escapeProp(s: string): string {
  return escapeData(s).replace(/:/g, "%3A").replace(/,/g, "%2C");
}

interface Event {
  pull_request?: { number: number; base: { sha: string; ref: string } };
  merge_group?: { base_sha: string };
  before?: string;
  number?: number;
}

async function main(): Promise<void> {
  const event: Event = process.env.GITHUB_EVENT_PATH ? JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : {};
  const workspace = process.env.GITHUB_WORKSPACE ?? process.cwd();
  const workingDirectory = input("working-directory", ".");
  const root = resolve(workspace, workingDirectory);
  const before = event.before && !/^0+$/.test(event.before) ? event.before : "";
  const base = input("base-ref") || event.pull_request?.base.sha || event.merge_group?.base_sha || before;
  if (!base) throw new Error("No base ref: set the `base-ref` input, or run on pull_request, merge_group or push events.");

  const failOn = parseFailOn(input("fail-on", "error"), "fail-on");
  const scopeInput = input("scope");
  const framework = input("framework", "auto") as Framework | "auto";
  const log = (msg: string) => process.stdout.write(`${msg}\n`);

  process.stdout.write(`::group::slotguard ${VERSION}: build base and head\n`);
  let check;
  try {
    check = runCheck({
      root,
      base,
      framework,
      buildCommand: input("build-command") || undefined,
      setupCommand: input("base-setup-command") || undefined,
      config: input("config") || undefined,
      log,
      configOverrides: (c) => {
        if (scopeInput) c.scope = parseScope(scopeInput, "scope");
        c.failOn = failOn;
      },
    });
  } finally {
    process.stdout.write("::endgroup::\n");
  }
  const { result, baseSha, headSha } = check;
  const id = workingDirectory === "." ? "default" : workingDirectory;
  const markdown = renderMarkdown(result, {
    baseLabel: event.pull_request ? `${event.pull_request.base.ref} (${baseSha.slice(0, 7)})` : baseSha.slice(0, 7),
    headLabel: headSha.slice(0, 7),
    version: VERSION,
    id,
  });

  const reportPath = join(process.env.RUNNER_TEMP ?? root, "slotguard-report.md");
  const jsonPath = join(process.env.RUNNER_TEMP ?? root, "slotguard-report.json");
  writeFileSync(reportPath, markdown);
  writeFileSync(jsonPath, JSON.stringify({ ...result, contracts: result.contracts.map(({ contract, findings }) => ({ contract, findings })) }, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);

  for (const c of result.contracts) {
    for (const f of sortFindings(c.findings)) {
      if (f.severity === "info") continue;
      const file = c.base?.source ? join(workingDirectory, c.base.source) : undefined;
      const props = [`title=${escapeProp(`slotguard ${f.rule}`)}`, file ? `file=${escapeProp(file)}` : ""].filter(Boolean).join(",");
      process.stdout.write(`::${f.severity === "error" ? "error" : "warning"} ${props}::${escapeData(`${c.contract}: ${f.message.replace(/`/g, "")}`)}\n`);
    }
  }

  setOutput("errors", result.counts.error);
  setOutput("warnings", result.counts.warning);
  setOutput("checked", result.checked.length);
  setOutput("report-path", reportPath);
  setOutput("json-path", jsonPath);

  const mode = input("comment", "on-change");
  const prNumber = event.pull_request?.number;
  const token = input("github-token");
  if (prNumber && mode !== "never" && token && process.env.GITHUB_REPOSITORY) {
    const hasFindings = result.counts.error + result.counts.warning > 0;
    try {
      const outcome = await upsertComment(
        { token, apiUrl: process.env.GITHUB_API_URL ?? "https://api.github.com", repository: process.env.GITHUB_REPOSITORY, issueNumber: prNumber },
        id,
        markdown,
        mode === "always" || hasFindings,
      );
      log(`PR comment: ${outcome}`);
    } catch (e) {
      process.stdout.write(`::warning title=slotguard::${escapeData(`Could not comment on the PR (${(e as Error).message}). PRs from forks get a read-only token; the report is in the job summary.`)}\n`);
    }
  }

  log(headline(result));
  if (shouldFail(result, failOn)) {
    process.stdout.write(`::error title=slotguard::${escapeData(`${headline(result)} (fail-on: ${failOn})`)}\n`);
    process.exitCode = 1;
  }
}

main().catch((e: Error) => {
  process.stdout.write(`::error title=slotguard::${escapeData(e.message)}\n`);
  process.exitCode = 1;
});
