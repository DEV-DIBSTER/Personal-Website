import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

export function getSortedPostsData() {
  // Get file names from the posts directory.
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove the .md extension from the file name to get the post ID.
    const id = fileName.replace(/\.md$/, '');

    // Read the markdown file as a string.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section.
    const matterResult = matter(fileContents);

    // Combine the data with the post ID.
    return {
      id,
      ...matterResult.data,
    };
  });
  
  // Sort posts by date in descending order.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Custom plugin to process code blocks with language detection.
function codeBlockPlugin() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      const language = node.lang || 'text';
      const code = node.value;
      
      // Create a custom HTML structure for code blocks.
      node.type = 'html';
      node.value = `
        <div class="code-block relative my-4" data-language="${language}">
          <div class="absolute top-2 right-2 z-10">
            <span class="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              ${language}
            </span>
          </div>
          <pre class="language-${language} bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-${language}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>
      `;
    });
  };
}

export async function getPostData(id) {
  if (!id) {
    throw new Error('Post ID is required');
  }
  
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  // Check if the file exists.
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file not found: ${id}.md`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section.
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string with custom code block processing.
  const processedContent = await remark()
    .use(codeBlockPlugin)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the post ID and HTML content.
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}