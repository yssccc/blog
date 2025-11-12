'use client';

import { useMemo, useState } from 'react';
import CategoryList from '../category/CategoryList';
import Pagination from './Pagination';
import PostList from './PostList';
import { useSearchParams } from 'next/navigation';
import { PostData } from '@/types/post';

interface Category {
  name: string;
  count: number;
}

interface PostListPageProps {
  posts: PostData[];
  categories: Category[];
  totalPostCount: number;
}

export default function PostListPage({
  posts,
  categories,
  totalPostCount,
}: PostListPageProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (!currentCategory) return posts;
    return posts.filter((post) => post.categories?.includes(currentCategory));
  }, [posts, currentCategory]);

  const postsPerPage = 3;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <div className="w-full flex py-[70px] justify-center">
      <div className="w-[1050px] flex justify-between">
        <div className="flex-col">
          <PostList posts={pagedPosts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <CategoryList categories={categories} totalPostCount={totalPostCount} />
      </div>
    </div>
  );
}
