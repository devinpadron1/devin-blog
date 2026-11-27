// Generates posts.json: { posts: [...], drafts: [...] }.
// Each entry's slug is its filename, so posts/<slug>.md or drafts/<slug>.md.
// Title: the first "# Heading" line (falls back to the filename).
// Posts: dated by first commit (today if uncommitted), newest first.
//
// Local only: `node scripts/build-posts.mjs --drafts` also fills drafts from
// drafts/*.md, ordered by last edit (no dates). The deploy runs without the
// flag, so drafts never reach prod.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
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

const read = (dir) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.slice(0, -3);
      const file = `${dir}/${name}`;
      if (!/^[a-z0-9-]+$/.test(slug)) {
        console.warn(`skipped ${file}: filename must be lowercase-with-hyphens`);
        return null;
      }
      const heading = readFileSync(file, "utf8").match(/^#\s+(.+)$/m);
      const title = heading ? heading[1].trim() : slug.replace(/-/g, " ");
      return { slug, title, file };
    })
    .filter(Boolean);
};

const posts = read("posts")
  .map(({ slug, title, file }) => ({ slug, title, date: firstCommitDate(file) }))
  .sort((a, b) => b.date.localeCompare(a.date));

const drafts = includeDrafts
  ? read("drafts")
      .map((d) => ({ ...d, edited: statSync(d.file).mtimeMs }))
      .sort((a, b) => b.edited - a.edited)
      .map(({ slug, title }) => ({ slug, title }))
  : [];

writeFileSync("posts.json", JSON.stringify({ posts, drafts }, null, 2) + "\n");
console.log(`posts.json: ${posts.length} posts${includeDrafts ? `, ${drafts.length} drafts` : ""}`);
