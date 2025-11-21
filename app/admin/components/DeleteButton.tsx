'use client';

import { useState } from 'react';
import ConfirmModal from '@/components/common/ConfirmModal';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';

interface Props {
  slug: string;
}

export default function DeleteButton({ slug }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { setPendingToast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: slug }),
    });

    if (res.ok) {
      setModalOpen(false);
      setPendingToast('삭제 완료!');
      router.push('/admin/dashboard');
      return;
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
        className="h-7 px-3 rounded-md border border-red-300 text-red-600 text-xs flex items-center justify-center hover:bg-red-50 transition"
      >
        삭제
      </button>
    </>
  );
}
