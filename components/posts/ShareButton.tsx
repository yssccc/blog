'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';
import Toast from '@/components/common/Toast';

export default function ShareButton() {
  const [toast, setToast] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setToast(true);
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-2.5 text-sm
                   rounded-md hover:opacity-90 transition
                   ml-auto text-gray-600 my-7"
      >
        <Share2 size={16} />
        공유
      </button>

      <Toast
        message="링크가 복사되었습니다!"
        visible={toast}
        onClose={() => setToast(false)}
      />
    </>
  );
}
