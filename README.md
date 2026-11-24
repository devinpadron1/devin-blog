# Devin Padrón

My ponderings.

## Publish a post

1. Create `posts/<slug>.md` (lowercase, hyphens: `my-new-post`). Start it with a `# Title` line.
2. Commit and push.

That's it. On push, a GitHub Action builds `posts.json` (title from the `# Title` line, date from the file's first commit, newest first) and deploys the site.

Drafts in `drafts/` aren't listed.

## Local preview

Run `node scripts/build-posts.mjs` to generate `posts.json`, then right-click `index.html` and click `Open with Live Server` (VSCode).

To also see drafts locally, run `node scripts/build-posts.mjs --drafts`. They show up in a Drafts section below Posts, newest edit first. Drafts edited in the last 7 days show their date; older ones show `xx/xx/xxxx`. Re-run it to refresh. The deploy builds without the flag, so drafts never appear in prod.
