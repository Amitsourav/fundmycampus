import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/notion";

const BASE = "https://www.fundmycampus.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now },
    { url: `${BASE}/abroad-study-loan`, lastModified: now },
    { url: `${BASE}/india-study-loan`, lastModified: now },
    { url: `${BASE}/tools`, lastModified: now },
    { url: `${BASE}/contact`, lastModified: now },
    { url: `${BASE}/blogs`, lastModified: now },
    { url: `${BASE}/privacy`, lastModified: now },
    // Course pages
    { url: `${BASE}/loan-for-btech`, lastModified: now },
    { url: `${BASE}/loan-for-mbbs`, lastModified: now },
    { url: `${BASE}/loan-for-mba`, lastModified: now },
    { url: `${BASE}/loan-for-bba`, lastModified: now },
    { url: `${BASE}/loan-for-bca`, lastModified: now },
    { url: `${BASE}/loan-for-bds`, lastModified: now },
    { url: `${BASE}/loan-for-ca`, lastModified: now },
    { url: `${BASE}/loan-for-bsc-nursing`, lastModified: now },
    { url: `${BASE}/loan-for-hotel-management`, lastModified: now },
  ];

  // Fetch blog post slugs dynamically
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { featured, posts } = await getAllPosts();
    const allPosts = featured ? [featured, ...posts] : posts;
    blogPages = allPosts.map((post) => ({
      url: `${BASE}/blogs/${post.id}`,
      lastModified: post.date ? new Date(post.date) : now,
    }));
  } catch {
    // Sitemap still works without blog posts
  }

  return [...staticPages, ...blogPages];
}
