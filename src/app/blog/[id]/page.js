import { getSortedPostsData, getPostData } from '../lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Generate metadata for search engine optimization.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      images: postData.image ? [postData.image] : [],
      type: 'article',
      publishedTime: postData.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt,
      images: postData.image ? [postData.image] : [],
    },
  };
}

function formatDate(dateString) {
  // Use a consistent date format to avoid hydration issues.
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function ReadingTime({ content }) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span>{minutes} min read</span>
    </div>
  );
}

export default async function BlogPost({ params }) {
  try {
    // Await the parameters in Next.js 15 and above app router.
    const { id } = await params;
    
    if (!id) {
      return (
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      );
    }
    
    const postData = await getPostData(id);

    return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <SyntaxHighlighter />
      {/* Back navigation section. */}
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article header section. */}
      <article className="mb-12">
        <header className="mb-8">
          {/* Post image display. */}
          {postData.image && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={postData.image}
                alt={postData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post title. */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {postData.title}
          </h1>

          {/* Meta information section. */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={postData.date}>{formatDate(postData.date)}</time>
            </div>
            <ReadingTime content={postData.contentHtml} />
          </div>

          {/* Tags display. */}
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {postData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Post excerpt. */}
          {postData.excerpt && (
            <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4 py-2">
              {postData.excerpt}
            </p>
          )}
        </header>

        {/* Article content. */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className="prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary prose-a:underline hover:prose-a:no-underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:mb-4 prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-2"
          />
        </div>
      </article>

      {/* Navigation footer. */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="text-sm text-muted-foreground">
            Share this post
          </div>
        </div>
      </Card>
    </div>
  );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The blog post you're looking for doesn't exist.
        </p>
        <Link href="/blog" className="text-primary hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }
}