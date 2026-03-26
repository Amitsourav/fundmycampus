import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/notion";

const BASE = "https://www.fundmycampus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/abroad-study-loan`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/india-study-loan`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE}/tools`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/blogs`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    // Course pages
    { url: `${BASE}/courses-loan/btech`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/courses-loan/mbbs`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/courses-loan/mba`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/courses-loan/bba`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/courses-loan/bca`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/courses-loan/bds`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/courses-loan/ca`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/courses-loan/bsc-nursing`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/courses-loan/hotel-management`, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Fetch blog post slugs dynamically
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { featured, posts } = await getAllPosts();
    const allPosts = featured ? [featured, ...posts] : posts;
    blogPages = allPosts.map((post) => ({
      url: `${BASE}/blogs/${post.id}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sitemap still works without blog posts
  }

  return [...staticPages, ...blogPages];
}
