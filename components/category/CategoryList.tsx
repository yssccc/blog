'use client';

import { CategoryData } from '@/types/post';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CategoryListProps {
  categories: CategoryData[];
  totalPostCount: number;
}

export default function CategoryList({
  categories,
  totalPostCount,
}: CategoryListProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-1 w-40">
      <Link
        href="/"
        className={`
          flex justify-between items-center px-2 py-1.5 rounded-md text-sm transition
          hover:bg-gray-50
          ${!currentCategory ? 'text-black' : 'text-gray-500'}
        `}
      >
        <span>전체보기</span>
        <span
          className={`${!currentCategory ? 'text-black' : 'text-gray-400'}`}
        >
          ({totalPostCount})
        </span>
      </Link>
      {sortedCategories.map((category) => {
        const isActive = currentCategory === category.name;
        return (
          <Link
            key={category.name}
            href={`/?category=${encodeURIComponent(category.name)}`}
            className={`
              flex justify-between items-center px-2 py-1.5 rounded-md text-sm transition
              hover:bg-gray-50
              ${isActive ? 'text-black' : 'text-gray-500'}
            `}
          >
            <span>{category.name}</span>
            <span className={`${isActive ? 'text-black' : 'text-gray-400'}`}>
              ({category.count})
            </span>
          </Link>
        );
      })}
    </div>
  );
}
