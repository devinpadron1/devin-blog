# Devin's Notes

My ponderings.

## Local preview

Right-click `index.html` and click `Open with Live Server` (VSCode).

## Add a new post

1. Create a Markdown file in `posts/` following the pattern `posts/<slug>.md`. Keep slugs lowercase with hyphens (`my-new-post`).
2. Open `posts.json` and insert a new object at the top with `slug`, `title`, ISO `date` (`YYYY-MM-DD`). Example:
   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post",
     "date": "2024-05-12"
   }
   ```

Posts appear on the homepage in the order they are listed in `posts.json`. The Markdown will be converted to HTML automatically when someone visits `post.html?post=<slug>`.

