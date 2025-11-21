import { NextResponse } from 'next/server';
import { savePreview } from '@/lib/preview-store';

export async function POST(req: Request) {
  const { mdx } = await req.json();

  const { id, url } = await savePreview(mdx);

  return NextResponse.json({ id, url });
}
