import { getAllPosts } from "@/lib/notion";
import { BlogListingClient } from "@/components/blog/BlogListingClient";

export const revalidate = 60;

export default async function BlogPage() {
  const { featured, posts, categories } = await getAllPosts();

  return (
    <BlogListingClient
      featured={featured}
      posts={posts}
      categories={categories}
    />
  );
}
