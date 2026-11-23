import { marker } from "./report/markdown.js";

export interface GitHubContext {
  token: string;
  apiUrl: string;
  repository: string;
  issueNumber: number;
}

async function api(ctx: GitHubContext, method: string, path: string, body?: unknown): Promise<Response> {
  return fetch(`${ctx.apiUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${ctx.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "slotguard",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

export async function findComment(ctx: GitHubContext, id: string): Promise<number | undefined> {
  const tag = marker(id);
  for (let page = 1; page <= 20; page++) {
    const res = await api(ctx, "GET", `/repos/${ctx.repository}/issues/${ctx.issueNumber}/comments?per_page=100&page=${page}`);
    if (!res.ok) throw new Error(`Listing PR comments failed: ${res.status} ${await res.text()}`);
    const comments = (await res.json()) as { id: number; body?: string }[];
    const hit = comments.find((c) => c.body?.includes(tag));
    if (hit) return hit.id;
    if (comments.length < 100) return undefined;
  }
  return undefined;
}

/** Creates or updates the sticky slotguard comment. With `createIfMissing` false, only an existing comment is updated. */
export async function upsertComment(ctx: GitHubContext, id: string, body: string, createIfMissing: boolean): Promise<"created" | "updated" | "skipped"> {
  const existing = await findComment(ctx, id);
  if (existing) {
    const res = await api(ctx, "PATCH", `/repos/${ctx.repository}/issues/comments/${existing}`, { body });
    if (!res.ok) throw new Error(`Updating PR comment failed: ${res.status} ${await res.text()}`);
    return "updated";
  }
  if (!createIfMissing) return "skipped";
  const res = await api(ctx, "POST", `/repos/${ctx.repository}/issues/${ctx.issueNumber}/comments`, { body });
  if (!res.ok) throw new Error(`Creating PR comment failed: ${res.status} ${await res.text()}`);
  return "created";
}
