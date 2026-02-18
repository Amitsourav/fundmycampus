import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Types matching the existing blog data structure
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

// Helper: Format date to "January 15, 2024" style
function formatNotionDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper: Extract plain text from Notion rich text array
function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

// Helper: Extract rich text preserving bold markers
function extractRichText(richText: RichTextItemResponse[]): string {
  return richText
    .map((t) => {
      if (t.annotations.bold) return `**${t.plain_text}**`;
      return t.plain_text;
    })
    .join("");
}

// Helper: Get all block children with pagination
async function getAllBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    blocks.push(
      ...response.results.filter(
        (block): block is BlockObjectResponse => "type" in block
      )
    );
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

// Convert Notion blocks to the existing string[] content format
async function notionBlocksToContent(blocks: BlockObjectResponse[]): Promise<string[]> {
  const content: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph": {
        const text = extractRichText(block.paragraph.rich_text);
        if (text) content.push(text);
        break;
      }
      case "heading_1": {
        content.push(`## ${extractPlainText(block.heading_1.rich_text)}`);
        break;
      }
      case "heading_2": {
        content.push(`## ${extractPlainText(block.heading_2.rich_text)}`);
        break;
      }
      case "heading_3": {
        content.push(`## ${extractPlainText(block.heading_3.rich_text)}`);
        break;
      }
      case "bulleted_list_item": {
        content.push(`- ${extractRichText(block.bulleted_list_item.rich_text)}`);
        break;
      }
      case "numbered_list_item": {
        content.push(`- ${extractRichText(block.numbered_list_item.rich_text)}`);
        break;
      }
      case "quote": {
        content.push(`**${extractPlainText(block.quote.rich_text)}**`);
        break;
      }
      case "callout": {
        content.push(`**${extractPlainText(block.callout.rich_text)}**`);
        break;
      }
      case "table": {
        const rows = await getAllBlockChildren(block.id);
        const tableData: string[][] = rows
          .filter((row): row is BlockObjectResponse => row.type === "table_row")
          .map((row) =>
            row.table_row.cells.map((cell) => extractPlainText(cell))
          );
        if (tableData.length > 0) {
          content.push(`[TABLE]${JSON.stringify(tableData)}`);
        }
        break;
      }
      case "divider":
      case "image":
        break;
      default:
        break;
    }
  }

  return content;
}

// Extract properties from a Notion page
function pageToSummary(page: PageObjectResponse): BlogPostSummary {
  const props = page.properties;

  const getTextProp = (name: string): string => {
    const prop = props[name];
    if (prop?.type === "rich_text") return extractPlainText(prop.rich_text);
    if (prop?.type === "title") return extractPlainText(prop.title);
    return "";
  };

  const getFileProp = (name: string): string => {
    const prop = props[name];
    if (prop?.type === "files" && prop.files.length > 0) {
      const file = prop.files[0];
      if (file.type === "file") return file.file.url;
      if (file.type === "external") return file.external.url;
    }
    if (prop?.type === "url") return prop.url ?? "";
    return "";
  };

  const getDateProp = (name: string): string => {
    const prop = props[name];
    if (prop?.type === "date" && prop.date?.start) {
      return formatNotionDate(prop.date.start);
    }
    return "";
  };

  const getSelectProp = (name: string): string => {
    const prop = props[name];
    if (prop?.type === "select" && prop.select) return prop.select.name;
    return "General";
  };

  return {
    id: getTextProp("Slug") || page.id,
    title: getTextProp("Title") || "Untitled",
    excerpt: getTextProp("Excerpt"),
    image: getFileProp("Cover image"),
    author: getTextProp("Author"),
    date: getDateProp("Date"),
    readTime: getTextProp("Read Time"),
    category: getSelectProp("Catogery"),
  };
}

// Get category counts from posts
function getCategoryCounts(
  posts: BlogPostSummary[]
): { name: string; count: number }[] {
  const counts: Record<string, number> = {};
  posts.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return [
    { name: "All", count: posts.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, count })),
  ];
}

// PUBLIC API

export async function getAllPosts(): Promise<{
  featured: BlogPostSummary | null;
  posts: BlogPostSummary[];
  categories: { name: string; count: number }[];
}> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const allPosts = response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map(pageToSummary);

  const featured = allPosts[0] ?? null;
  const posts = allPosts.filter((p) => p.id !== featured?.id);
  const categories = getCategoryCounts(allPosts);

  return { featured, posts, categories };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
  });

  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  if (pages.length === 0) return null;

  const page = pages[0];
  const summary = pageToSummary(page);
  const blocks = await getAllBlockChildren(page.id);
  const content = await notionBlocksToContent(blocks);

  // Extract tags
  const tagsProp = page.properties["Tags"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  // Extract SEO fields
  const getTextProp = (name: string): string => {
    const prop = page.properties[name];
    if (prop?.type === "rich_text") return extractPlainText(prop.rich_text);
    return "";
  };

  const seoTitle = getTextProp("SEO title");
  const seoDescription = getTextProp("SEO Description");
  const seoKeywords = getTextProp("SEO keyword");

  return {
    ...summary,
    content,
    tags,
    seoTitle,
    seoDescription,
    seoKeywords,
  };
}

export async function getRelatedPosts(
  category: string,
  excludeSlug: string,
  limit = 3
): Promise<{ id: string; title: string; image: string; date: string }[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { does_not_equal: excludeSlug } },
      ],
    },
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: limit,
  });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map((page) => {
      const props = page.properties;

      const getTextProp = (name: string): string => {
        const prop = props[name];
        if (prop?.type === "rich_text") return extractPlainText(prop.rich_text);
        if (prop?.type === "title") return extractPlainText(prop.title);
        return "";
      };

      const coverProp = props["Cover image"];
      let image = "";
      if (coverProp?.type === "files" && coverProp.files.length > 0) {
        const file = coverProp.files[0];
        if (file.type === "file") image = file.file.url;
        else if (file.type === "external") image = file.external.url;
      } else if (coverProp?.type === "url") {
        image = coverProp.url ?? "";
      }

      return {
        id: getTextProp("Slug") || page.id,
        title: getTextProp("Title") || "Untitled",
        image,
        date: props["Date"]?.type === "date" && props["Date"].date?.start
          ? formatNotionDate(props["Date"].date.start)
          : "",
      };
    });
}
