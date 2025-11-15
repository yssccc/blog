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
    </div>
  );
}
