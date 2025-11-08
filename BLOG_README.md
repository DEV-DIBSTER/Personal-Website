# Blog System Documentation

## Overview
This blog system allows you to easily add new blog posts to your Next.js portfolio site by simply creating `.md` files in the `src/app/blog/posts/` directory.

## How to Add New Blog Posts

### Method 1: Single File Upload
1. Create a new `.md` file in `src/app/blog/posts/`
2. Use the following front matter structure:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
image: "/images/your-image.jpg"  # Optional: URL to header image
excerpt: "A brief description of your blog post"
tags: ["tag1", "tag2", "tag3"]  # Optional: Array of tags
---

Your blog post content goes here in **Markdown** format.
```

### Method 2: Folder Structure
You can also organize posts in folders:
```
src/app/blog/posts/
├── 2024/
│   ├── january/
│   │   └── my-first-post.md
│   └── february/
│       └── another-post.md
└── my-post.md
```

## File Naming Conventions
- Use lowercase letters and hyphens for file names
- Example: `building-modern-web-apps.md`, `the-art-of-clean-code.md`
- The file name becomes the URL slug (e.g., `building-modern-web-apps` → `/blog/building-modern-web-apps`)

## Supported Features

### Front Matter Fields
- `title` (required): The title of your blog post
- `date` (required): Publication date in YYYY-MM-DD format
- `image` (optional): URL to a header image
- `excerpt` (required): Short description shown in the blog list
- `tags` (optional): Array of tags for categorization

### Markdown Features
- Headers (H1-H6)
- Bold and italic text
- Lists (ordered and unordered)
- Links
- Code blocks with syntax highlighting
- Images
- Tables
- Blockquotes

### Blog Layout
- **Homepage** (`/blog`): Grid layout with 2 posts per row
- **Individual Posts** (`/blog/[slug]`): Full article view with:
  - Header image
  - Title and metadata
  - Reading time estimation
  - Tags
  - Navigation back to blog

## Example Blog Post

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

## Key Features

- **Server-Side Rendering (SSR)**: Improved SEO and performance
- **Static Site Generation (SSG)**: Lightning-fast page loads
- **API Routes**: Build your backend right in your Next.js app
- **File-based Routing**: Intuitive URL structure

## Getting Started

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

And that's it! You're ready to start building amazing web applications.
```

## Deployment
The blog system works seamlessly with your existing Next.js deployment. Simply:
1. Add your `.md` files to the `posts` directory
2. Commit and push your changes
3. Your new blog posts will automatically appear on the site

## Customization
The blog system uses:
- **gray-matter** for front matter parsing
- **remark** and **remark-html** for Markdown processing
- **Tailwind CSS** for styling
- **Next.js Image** for optimized images

You can customize the styling in the blog components to match your site's design.