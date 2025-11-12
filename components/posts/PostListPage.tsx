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

interface Category {
  name: string;
  count: number;
}

interface PostListPageProps {
  posts: PostData[];
  categories: Category[];
}

export default function PostListPage({ posts, categories }: PostListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체보기');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredPosts =
    selectedCategory === '전체보기'
      ? posts
      : posts.filter((post) => post.categories?.includes(selectedCategory));

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </div>
    </div>
  );
}
