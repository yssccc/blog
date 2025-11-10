import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="flex items-center space-x-2 justify-center"
      style={{ paddingTop: '50px' }}
    >
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={24} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 px-3 py-1 rounded-full  ${
            currentPage === page ? 'bg-gray-200' : 'bg-white text-gray-500'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="p-2 rounded disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
