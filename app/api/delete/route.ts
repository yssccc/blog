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

    const owner = process.env.GITHUB_REPO_OWNER!;
    const repo = process.env.GITHUB_REPO_NAME!;
    const token = process.env.GITHUB_TOKEN!;

    const getFileInfo = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/content/${filename}.mdx`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );

    if (!getFileInfo.ok) {
      return NextResponse.json(
        { error: '파일을 찾을 수 없음' },
        { status: 404 },
      );
    }

    const fileData = await getFileInfo.json();

    const deleteReq = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/content/${filename}.mdx`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          message: `Delete post: ${filename}`,
          sha: fileData.sha,
        }),
      },
    );

    if (!deleteReq.ok) {
      const err = await deleteReq.json();
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
