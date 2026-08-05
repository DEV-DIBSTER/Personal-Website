import fs from "node:fs";
import path from "node:path";
import matter, { type FrontMatterData } from "./matter";
import { remark } from "remark";
import html from "remark-html";
import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";

const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");

export type PostSummary = FrontMatterData & {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

export type PostData = PostSummary & {
  contentHtml: string;
};

export function getSortedPostsData(): PostSummary[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      title: String(matterResult.data.title ?? id),
      date: String(matterResult.data.date ?? ""),
      excerpt: String(matterResult.data.excerpt ?? ""),
      image: matterResult.data.image,
      tags: matterResult.data.tags,
    } satisfies PostSummary;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function codeBlockPlugin() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      const language = node.lang || "text";
      const code = node.value;

      Object.assign(node, {
        type: "html",
        value: `
        <div class="code-block relative my-4" data-language="${language}">
          <div class="absolute top-2 right-2 z-10">
            <span class="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              ${language}
            </span>
          </div>
          <pre class="language-${language} bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-${language}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
        </div>
      `,
      });
    });
  };
}

export async function getPostData(id: string): Promise<PostData> {
  if (!id) {
    throw new Error("Post ID is required");
  }

  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file not found: ${id}.md`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(codeBlockPlugin)
    .use(html, { sanitize: false })
    .process(matterResult.content);

  return {
    id,
    contentHtml: processedContent.toString(),
    title: String(matterResult.data.title ?? id),
    date: String(matterResult.data.date ?? ""),
    excerpt: String(matterResult.data.excerpt ?? ""),
    image: matterResult.data.image,
    tags: matterResult.data.tags,
  };
}
