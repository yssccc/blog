import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { filename, mdx } = await req.json();

  if (!filename || !mdx) {
    return NextResponse.json(
      { error: 'filename 또는 mdx 누락' },
      { status: 400 },
    );
  }

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  const path = `content/${filename}.mdx`;
  const infoUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  const getFile = await fetch(infoUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  const sha = getFile.ok ? (await getFile.json()).sha : undefined;

  const contentBase64 = Buffer.from(mdx, 'utf-8').toString('base64');

  const uploadReq = await fetch(infoUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({
      message: sha
        ? `docs: ${filename}.mdx 업데이트`
        : `docs: ${filename}.mdx 업로드`,
      content: contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!uploadReq.ok) {
    const msg = await uploadReq.text();
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
