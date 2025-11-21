'use client';

import { useToastContext } from '@/components/toast/ToastProvider';
import { CircleCheck } from 'lucide-react';

export default function Toast() {
  const { toastMessage, visible } = useToastContext();

  if (!visible) return null;

  return (
    <div
      className="
        fixed top-6 left-1/2 -translate-x-1/2 transform-gpu
        flex items-center gap-2
        px-5 py-4
        rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        bg-white text-gray-500
        animate-popUp z-9999 font-semibold
      "
    >
      <CircleCheck size={18} className="text-green-500" />
      {toastMessage}
    </div>
  );
}
