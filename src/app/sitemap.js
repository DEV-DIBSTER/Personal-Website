import { getSortedPostsData } from "./blog/lib/posts";

export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/certifications", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/sitemap", changeFrequency: "monthly", priority: 0.3 },
];

function safeDate(value) {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap() {
  const posts = getSortedPostsData();
  const buildTime = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: buildTime,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.id}`,
    lastModified: safeDate(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
