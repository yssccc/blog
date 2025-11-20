import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { filename } = await req.json();

    if (!filename) {
      return NextResponse.json(
        { error: 'filename is required' },
        { status: 400 },
      );
    }

    const owner = process.env.GITHUB_OWNER!;
    const repo = process.env.GITHUB_REPO!;
    const token = process.env.GITHUB_TOKEN!;
    const branch = process.env.GITHUB_BRANCH ?? 'main';

    const path = `content/${filename}.mdx`;

    const infoUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

    const getFileInfo = await fetch(infoUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!getFileInfo.ok) {
      return NextResponse.json(
        { error: '파일을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const fileData = await getFileInfo.json();
    const sha = fileData.sha;

    const deleteReq = await fetch(infoUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message: `docs: ${filename}.mdx 삭제`,
        sha,
        branch,
      }),
    });

    if (!deleteReq.ok) {
      const err = await deleteReq.json();
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('DELETE ERROR:', err);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
