'use client';

import ConfirmModal from '@/components/common/ConfirmModal';
import { useState, type ChangeEvent } from 'react';

interface EditPageProps {
  initialTitle: string;
  initialThumbnail: string;
  initialCategories: string;
  initialDescription: string;
  initialDate: string;
  initialContent: string;
  slug: string;
}

export default function EditPage({
  initialTitle,
  initialThumbnail,
  initialCategories,
  initialDescription,
  initialDate,
  initialContent,
  slug,
}: EditPageProps) {
  const [title, setTitle] = useState(initialTitle);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [categories, setCategories] = useState(initialCategories);
  const [description, setDescription] = useState(initialDescription);
  const [date, setDate] = useState(initialDate);
  const [content, setContent] = useState(initialContent);
  const [previewId, setPreviewId] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const buildMDX = (): string => {
    return `---
title: "${title}"
date: "${date}"
thumbnail: "${thumbnail}"
description: "${description}"
categories: [${categories
      .split(',')
      .map((c) => `"${c.trim()}"`)
      .join(', ')}]
---

${content}
`;
  };

  const updatePreview = async () => {
    const fullMDX = buildMDX();

    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mdx: fullMDX }),
    });

    const data = await res.json();
    setPreviewId(data.id);
  };

  const saveEdit = async () => {
    const fullMDX = buildMDX();

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: slug,
        mdx: fullMDX,
      }),
    });

    if (res.ok) {
      alert('수정 완료!');
    } else {
      const { error } = await res.json();
      alert('수정 실패: ' + error);
    }
  };

  const baseInput =
    'w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:border-main focus:ring-2 focus:ring-main/30 outline-none transition';

  return (
    <>
      <ConfirmModal
        open={modalOpen}
        title="수정된 내용을 저장할까요?"
        onConfirm={saveEdit}
        onCancel={() => setModalOpen(false)}
      />
      <div className="flex gap-6 p-10 min-h-screen bg-gray-50">
        <section className="flex-1 flex flex-col gap-6 p-8 bg-white shadow-sm rounded-2xl">
          <input
            type="text"
            placeholder="제목"
            className={baseInput}
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="카테고리 (쉼표로 구분)"
            className={baseInput}
            value={categories}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategories(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="썸네일 URL"
            className={baseInput}
            value={thumbnail}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setThumbnail(e.target.value)
            }
          />

          <textarea
            placeholder="글 설명(description)"
            className={`${baseInput} h-24 leading-relaxed`}
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />

          <input
            type="date"
            className={baseInput}
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
          />

          <textarea
            className={`${baseInput} h-[280px] font-mono text-sm leading-relaxed`}
            placeholder="본문 MDX 입력"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={updatePreview}
              className="px-5 py-3 rounded-lg bg-main text-white font-medium shadow hover:bg-main/90 transition"
            >
              미리보기
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-3 rounded-lg bg-gray-800 text-white font-medium shadow hover:bg-gray-700 transition"
            >
              수정 저장
            </button>
          </div>
        </section>

        <section className="flex-1 bg-white shadow-sm rounded-2xl overflow-hidden">
          {previewId ? (
            <iframe
              src={`/admin/preview-render?id=${previewId}`}
              className="w-full h-full border-none"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              미리보기가 없습니다.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
