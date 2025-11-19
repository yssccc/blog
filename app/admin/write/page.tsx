'use client';

import { useState, type ChangeEvent } from 'react';

export default function WritePage() {
  const [content, setContent] = useState('');
  const [previewId, setPreviewId] = useState('');

  const updatePreview = async () => {
    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mdx: content }),
    });

    const data = await res.json();
    setPreviewId(data.id);
  };

  return (
    <div className="flex gap-6 p-8 min-h-screen">
      <section className="flex-1 flex flex-col gap-4">
        <textarea
          className="w-full h-[400px] border p-3"
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
