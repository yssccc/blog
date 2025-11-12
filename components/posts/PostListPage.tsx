'use client';

import { useState } from 'react';
import CategoryList from '../category/CategoryList';
import Pagination from './Pagination';
import PostList from './PostList';

interface PostData {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  thumbnail?: string;
  categories?: string[];
}

interface PostListPageProps {
  posts: PostData[];
}

export default function PostListPage({ posts }: PostListPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const pagedPosts = posts.slice(
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
        <CategoryList />
      </div>
    </div>
  );
}
