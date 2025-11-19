import { NextResponse } from "next/server";
import { savePreview } from "@/lib/preview-store";

interface PreviewRequest {
  mdx: string;
}

export async function POST(req: Request) {
  const { mdx } = (await req.json()) as PreviewRequest;

  const id = await savePreview(mdx);

  return NextResponse.json({ id });
}
