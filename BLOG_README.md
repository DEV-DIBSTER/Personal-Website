# Blog System Documentation

## Overview

Add blog posts by creating `.md` files in `src/app/blog/posts/`. Only flat files in that directory are supported (no nested folders).

## How to Add a Post

1. Create a new `.md` file in `src/app/blog/posts/`
2. Use this front matter structure:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
image: "/images/your-image.jpg"  # Optional
excerpt: "A brief description of your blog post"
tags: ["tag1", "tag2", "tag3"]  # Optional
---

Your blog post content goes here in **Markdown** format.
```

## File Naming

- Use lowercase letters and hyphens: `building-modern-web-apps.md`
- The file name becomes the URL slug (`/blog/building-modern-web-apps`)

## Front Matter Fields

- `title` (required)
- `date` (required, YYYY-MM-DD)
- `excerpt` (required)
- `image` (optional)
- `tags` (optional string array)

## Markdown Features

Headers, bold/italic, lists, links, fenced code blocks (syntax highlighting), images, tables, and blockquotes.

## Layout

- `/blog` — grid of posts
- `/blog/[slug]` — full article with reading time and tags

## Example

```markdown
---
title: "Getting Started with Next.js"
date: "2024-01-20"
image: "/images/nextjs-hero.jpg"
excerpt: "Learn how to build modern web applications with Next.js and React"
tags: ["Next.js", "React", "Web Development"]
---

# Getting Started with Next.js

Next.js is a powerful React framework that makes building web applications easier than ever.
```

## Stack

- Local front-matter parser (`src/app/blog/lib/matter.ts`)
- `remark` + `remark-html` for Markdown → HTML
- Tailwind Typography for prose styling
