import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { filename, mdx } = await req.json();

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  const path = `content/${filename}.mdx`;

  const fileInfo = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!fileInfo.ok) {
    return NextResponse.json(
      { error: '파일을 찾을 수 없습니다.' },
      { status: 404 },
    );
  }

  const { sha } = await fileInfo.json();

  const contentBase64 = Buffer.from(mdx).toString('base64');

  const update = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: `docs: ${filename} 수정`,
        content: contentBase64,
        sha,
        branch,
      }),
    },
  );

  if (!update.ok) {
    const err = await update.json();
    console.error('업데이트 오류:', err);
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
