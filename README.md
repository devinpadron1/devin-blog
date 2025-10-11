# Devin's Notes

Minimal blog where each post is written in Markdown and rendered on demand in the browser. The homepage lists entries from `posts.json`, and individual post pages are served through `post.html?post=<slug>`.

## Local preview

Double-click `index.html` or serve the folder with a static file server. Some browsers block `fetch` when viewing files via the `file://` scheme; if the post list does not appear, run a quick local server instead:

```bash
npx serve .
```

## Add a new post

1. Create a Markdown file in `posts/` following the pattern `posts/<slug>.md`. Keep slugs lowercase with hyphens (`my-new-post`).
2. Open `posts.json` and insert a new object at the top with `slug`, `title`, ISO `date` (`YYYY-MM-DD`), and a short `excerpt`. Example:
   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post",
     "date": "2024-05-12",
     "excerpt": "Quick summary for the homepage."
   }
   ```

Posts appear on the homepage in the order they are listed in `posts.json`. The Markdown will be converted to HTML automatically when someone visits `post.html?post=<slug>`.

## Deploy

Everything is static, so you can host it anywhere (GitHub Pages, Netlify Drop, S3, your own server). Upload the entire `barebones-blog` directory as-is.
