// Generates posts.json from posts/*.md.
// Title: the first "# Heading" line (falls back to the filename).
// Date: the day the file was first committed (falls back to today if uncommitted).
//
// Local only: `node scripts/build-posts.mjs --drafts` also lists drafts/*.md,
// marked as drafts. The deploy runs without the flag, so drafts never reach prod.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const includeDrafts = process.argv.includes("--drafts");

const firstCommitDate = (file) => {
  const out = execFileSync(
    "git",
    ["log", "--diff-filter=A", "--follow", "--format=%as", "--", file],
    { encoding: "utf8" }
  ).trim();
  return out.split("\n").pop() || new Date().toISOString().slice(0, 10);
};

const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const collect = (dir, draft) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const base = name.slice(0, -3);
      const file = `${dir}/${name}`;
      const heading = readFileSync(file, "utf8").match(/^#\s+(.+)$/m);
      const title = heading ? heading[1].trim() : base.replace(/-/g, " ");
      const entry = { slug: draft ? toSlug(base) : base, title, date: firstCommitDate(file) };
      // Drafts can have any filename, so record the real path to fetch.
      return draft ? { ...entry, draft: true, path: file } : entry;
    });
};

const posts = collect("posts", false);
if (includeDrafts) {
  const taken = new Set(posts.map((p) => p.slug));
  posts.push(...collect("drafts", true).filter((d) => d.slug && !taken.has(d.slug)));
}
posts.sort((a, b) => b.date.localeCompare(a.date));

writeFileSync("posts.json", JSON.stringify(posts, null, 2) + "\n");
const drafts = posts.filter((p) => p.draft).length;
console.log(`posts.json: ${posts.length - drafts} posts${includeDrafts ? `, ${drafts} drafts` : ""}`);
