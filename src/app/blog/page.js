import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getSortedPostsData } from './lib/posts';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'DIBSTER Portfolio - Blog',
  description: 'Thoughts on technology, development, and everything in between.',
  openGraph: {
    title: 'DIBSTER Portfolio - Blog',
    description: 'Thoughts on technology, development, and everything in between.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIBSTER Portfolio - Blog',
    description: 'Thoughts on technology, development, and everything in between.',
  },
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header section. */}
      <div className="flex flex-col items-center space-y-4 text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Blog
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Thoughts on technology, development, and everything in between.
        </p>
      </div>

      {/* Blog posts grid. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {allPostsData.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.id}`} className="block">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Post image display. */}
                {post.image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                
                {/* Card content section. */}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Tags display. */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Read more link. */}
                  <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                    <span className="text-sm font-medium">Read more</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </article>
        ))}
      </div>

      {/* Empty state display. */}
      {allPostsData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No blog posts yet.</p>
            <p className="text-sm">Check back soon for new content!</p>
          </div>
        </div>
      )}

      {/* Footer section. */}
      <div className="text-center border-t pt-8">
        <p className="text-muted-foreground">
          Subscribe to stay updated with the latest posts!
        </p>
      </div>
    </div>
  );
}