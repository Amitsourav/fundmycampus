import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/notion";
import { BlogDetailClient } from "@/components/blog/BlogDetailClient";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | FundMyCampus Blog" };
  }

  const metaTitle = post.seoTitle || `${post.title} | FundMyCampus Blog`;
  const metaDescription = post.seoDescription || post.excerpt;
  const keywords = post.seoKeywords
    ? post.seoKeywords.split(",").map((k) => k.trim())
    : [];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: metaDescription,
      images: post.image ? [post.image] : [],
      type: "article",
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: metaDescription,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `https://www.fundmycampus.com/blogs/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, slug);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.image || undefined,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FundMyCampus",
      url: "https://www.fundmycampus.com",
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.fundmycampus.com/blogs/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
