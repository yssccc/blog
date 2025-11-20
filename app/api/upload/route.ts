import { NextResponse } from 'next/server';

interface UploadRequest {
  filename: string;
  mdx: string;
}

export async function POST(req: Request) {
  const { filename, mdx } = (await req.json()) as UploadRequest;

  if (!filename || !mdx) {
    return NextResponse.json(
      { error: 'filename 또는 mdx 누락' },
      { status: 400 },
    );
  }

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;

  const path = `content/${filename}.mdx`;
  const githubResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `docs: upload ${filename}.mdx`,
        content: Buffer.from(mdx, 'utf-8').toString('base64'),
      }),
    },
  );

  if (!githubResponse.ok) {
    const msg = await githubResponse.text();
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
