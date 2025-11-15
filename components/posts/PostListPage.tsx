'use client';

import { useMemo } from 'react';
import CategoryList from '../category/CategoryList';
import Pagination from './Pagination';
import PostList from './PostList';
import { useSearchParams, useRouter } from 'next/navigation';
import { CategoryData, PostData } from '@/types/post';

interface PostListPageProps {
  posts: PostData[];
  categories: CategoryData[];
  totalPostCount: number;
}

export default function PostListPage({
  posts,
  categories,
  totalPostCount,
}: PostListPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get('category');
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
      router.push(`/?${params.toString()}`);
      return;
    }
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const filteredPosts = useMemo(() => {
    if (!currentCategory) return posts;
    return posts.filter((post) => post.categories?.includes(currentCategory));
  }, [posts, currentCategory]);

  const postsPerPage = 9;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="flex gap-10 py-20">
        <div className="flex-1 min-w-0">
          <PostList posts={pagedPosts} />
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <aside className="hidden md:block max-w-[200px] shrink-0">
          <CategoryList
            categories={categories}
            totalPostCount={totalPostCount}
          />
        </aside>
      </div>
    </div>
  );
}
