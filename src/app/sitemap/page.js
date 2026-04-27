import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Code,
  FileText,
  Home,
  Mail,
  Map as MapIcon,
} from "lucide-react";
import { getSortedPostsData } from "../blog/lib/posts";

export const metadata = {
  title: "Sitemap | DIBSTER Portfolio",
  description:
    "Every page on dibster.dev in one place — main pages, blog posts, and more.",
};

const PAGES = [
  {
    path: "/",
    name: "Home",
    icon: Home,
    description: "Landing page and a quick intro.",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: Code,
    description: "A collection of work, side projects, and experiments.",
  },
  {
    path: "/certifications",
    name: "Certifications",
    icon: Award,
    description: "Industry certifications I've earned.",
  },
  {
    path: "/blog",
    name: "Blog",
    icon: BookOpen,
    description: "Thoughts on technology, development, and everything between.",
  },
  {
    path: "/contact",
    name: "Contact",
    icon: Mail,
    description: "How to reach me directly.",
  },
  {
    path: "/sitemap",
    name: "Sitemap",
    icon: MapIcon,
    description: "You are here.",
  },
];

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SitemapPage() {
  const posts = getSortedPostsData();

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col items-center space-y-4 text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Sitemap
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Every page on this site, in one place.
        </p>
        <p className="text-sm text-muted-foreground">
          Looking for the machine-readable version? See{" "}
          <Link
            href="/sitemap.xml"
            className="text-primary underline-offset-4 hover:underline"
          >
            <code className="font-mono">/sitemap.xml</code>
          </Link>
          .
        </p>
      </div>

      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-semibold tracking-tight">Pages</h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {PAGES.length} pages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.path}
                href={page.path}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
              >
                <Card className="h-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          aria-hidden="true"
                          className="rounded-lg bg-primary/10 p-2 text-primary shrink-0"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <CardTitle className="truncate leading-tight pb-0.5 group-hover:text-primary transition-colors">
                          {page.name}
                        </CardTitle>
                      </div>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 mt-2 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{page.description}</CardDescription>
                    <code className="mt-3 inline-block text-xs text-muted-foreground/80 font-mono">
                      {page.path}
                    </code>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {posts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Blog Posts
            </h2>
            <span className="ml-auto text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <Card className="overflow-hidden p-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <ul className="divide-y">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="group flex items-center justify-between gap-4 px-6 py-4 hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:bg-accent/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate group-hover:text-primary transition-colors">
                        {post.title || post.id}
                      </p>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {post.date && (
                        <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          <time dateTime={post.date}>
                            {formatDate(post.date)}
                          </time>
                        </span>
                      )}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}
    </div>
  );
}
