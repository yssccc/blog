'use client';

import { CircleCheck } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({
  message,
  visible,
  onClose,
}: {
  message: string;
  visible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="
    fixed bottom-20 left-1/2 
        -translate-x-1/2 transform-gpu
        flex items-center gap-2
        px-5 py-4
        rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        bg-white text-gray-500
        animate-popUp z-1000 font-semibold
      "
    >
      <CircleCheck size={18} className="text-green-500" />
      {message}
    </div>
  );
}
