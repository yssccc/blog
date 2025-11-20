'use client';

import { useState } from 'react';
import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  slug: string;
}

export default function DeleteButton({ slug }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: slug }),
    });

    if (res.ok) {
      alert('삭제 완료!');
      setModalOpen(false);
      window.location.reload();
    } else {
      const { error } = await res.json();
      alert('삭제 실패: ' + error);
    }
  };

  return (
    <>
      <ConfirmModal
        open={modalOpen}
        title="정말 삭제하시겠습니까?"
        message="삭제 후에는 되돌릴 수 없습니다."
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />

      <button
        onClick={() => setModalOpen(true)}
        className="h-8 px-3 rounded-md bg-gray-600 text-white text-xs font-medium 
                   flex items-center justify-center hover:bg-gray-500 transition"
      >
        삭제
      </button>
    </>
  );
}
