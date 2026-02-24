import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id }) as PageObjectResponse;
    const coverProp = page.properties["Cover image"];

    let imageUrl = "";
    if (coverProp?.type === "files" && coverProp.files.length > 0) {
      const file = coverProp.files[0];
      if (file.type === "file") imageUrl = file.file.url;
      else if (file.type === "external") imageUrl = file.external.url;
    } else if (coverProp?.type === "url") {
      imageUrl = coverProp.url ?? "";
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "No image found" }, { status: 404 });
    }

    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
    }

    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await imageResponse.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
