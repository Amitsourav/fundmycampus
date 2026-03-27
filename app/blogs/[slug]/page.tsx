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

  // Convert human-readable date to ISO 8601 for schema
  const isoDate = post.date ? new Date(post.date).toISOString().split("T")[0] : undefined;
  // Ensure image URL is absolute
  const absoluteImage = post.image
    ? post.image.startsWith("http") ? post.image : `https://www.fundmycampus.com${post.image}`
    : undefined;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: absoluteImage,
    author: {
      "@type": "Organization",
      name: "FundMyCampus",
    },
    publisher: {
      "@type": "Organization",
      name: "FundMyCampus",
      url: "https://www.fundmycampus.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.fundmycampus.com/images/logo.png",
      },
    },
    datePublished: isoDate,
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
