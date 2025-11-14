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
    <div className="flex flex-col gap-1 w-30">
      <Link
        href="/"
        className={`flex items-center p-1 gap-1 text-sm transition cursor-pointer
          ${!currentCategory ? 'text-main font-semibold' : ''}
        `}
      >
        <span>전체보기</span>
        <span className="text-gray-400">({totalPostCount})</span>
      </Link>

      {sortedCategories.map((category) => (
        <Link
          key={category.name}
          href={`/?category=${encodeURIComponent(category.name)}`}
          className={`flex items-center p-1 gap-1 text-sm transition cursor-pointer
            ${
              currentCategory === category.name ? 'text-main font-semibold' : ''
            }`}
        >
          <span>{category.name}</span>
          <span className="text-gray-400">({category.count})</span>
        </Link>
      ))}
    </div>
  );
}
