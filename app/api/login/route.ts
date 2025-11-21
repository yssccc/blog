import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set({
      name: 'admin',
      value: 'true',
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  }

  return NextResponse.json({ error: 'wrong password' }, { status: 401 });
}
