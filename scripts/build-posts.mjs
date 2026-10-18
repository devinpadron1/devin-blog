// Generates posts.json from posts/*.md.
// Title: the first "# Heading" line (falls back to the filename).
// Date: the day the file was first committed (falls back to today if uncommitted).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const firstCommitDate = (file) => {
  const out = execFileSync(
    "git",
    ["log", "--diff-filter=A", "--follow", "--format=%as", "--", file],
    { encoding: "utf8" }
  ).trim();
  return out.split("\n").pop() || new Date().toISOString().slice(0, 10);
};

const posts = readdirSync("posts")
  .filter((name) => name.endsWith(".md"))
  .map((name) => {
    const slug = name.slice(0, -3);
    const file = `posts/${name}`;
    const heading = readFileSync(file, "utf8").match(/^#\s+(.+)$/m);
    const title = heading ? heading[1].trim() : slug.replace(/-/g, " ");
    return { slug, title, date: firstCommitDate(file) };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

writeFileSync("posts.json", JSON.stringify(posts, null, 2) + "\n");
console.log(`posts.json: ${posts.length} posts`);
