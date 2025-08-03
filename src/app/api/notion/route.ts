import { NotionAPI } from "notion-client";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const notionUrl = searchParams.get("url");

  const notion = new NotionAPI();

  if (!notionUrl) {
    return NextResponse.json(
      { error: "Notion URL is required" },
      { status: 400 }
    );
  }

  try {
    const recordMap = await notion.getPage(notionUrl);
    return NextResponse.json(recordMap, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Notion API" },
      { status: 500 }
    );
  }
}
