'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = '/admin/write';
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded-lg p-6 w-[300px] space-y-4">
        <h2 className="text-xl font-bold text-center">관리자 로그인</h2>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
