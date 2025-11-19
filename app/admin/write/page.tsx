'use client';

import { useState, type ChangeEvent } from 'react';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [previewId, setPreviewId] = useState('');

  const updatePreview = async () => {
    const frontmatter = `---
title: "${title}"
date: "${date || new Date().toISOString().slice(0, 10)}"
thumbnail: "${thumbnail}"
description: "${description}"
categories: [${categories
      .split(',')
      .map((c) => `"${c.trim()}"`)
      .join(', ')}]
---

`;

    const fullMDX = frontmatter + content;

    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mdx: fullMDX }),
    });

    const data = await res.json();
    setPreviewId(data.id);
  };

  return (
    <div className="flex gap-6 p-8 min-h-screen">
      <section className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          placeholder="제목"
          className="border p-2"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="카테고리 (쉼표로 구분)"
          className="border p-2"
          value={categories}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCategories(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="썸네일 URL"
          className="border p-2"
          value={thumbnail}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setThumbnail(e.target.value)
          }
        />
        <textarea
          placeholder="설명(description) — 리스트/SEO에 사용됨"
          className="border p-2 h-20"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
        <input
          type="date"
          className="border p-2"
          value={date}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
        />
        <textarea
          className="w-full h-[300px] border p-3"
          placeholder="본문 MDX 입력"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <button
          onClick={updatePreview}
          className="bg-black text-white px-4 py-2 rounded"
        >
          미리보기 업데이트
        </button>
      </section>
      <section className="flex-1 border p-0 overflow-hidden">
        {previewId && (
          <iframe
            src={`/admin/preview-render?id=${previewId}`}
            className="w-full h-[700px] border-none"
          />
        )}
      </section>
    </div>
  );
}
