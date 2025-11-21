'use client';

import type { FC } from 'react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div
        className="
          relative z-50 bg-white dark:bg-neutral-900
          rounded-xl shadow-lg p-6 w-[360px]
          border border-gray-200 dark:border-neutral-700
        "
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        {message && (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {message}
          </p>
        )}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onCancel}
            className="
              px-4 py-2 text-sm rounded-md 
              border border-gray-300 dark:border-neutral-600 
              text-neutral-700 dark:text-neutral-300
              hover:bg-gray-100 dark:hover:bg-neutral-800
              transition
            "
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="
              px-4 py-2 text-sm rounded-md 
              bg-gray-800 text-white
              hover:bg-gray-700
              transition
            "
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
