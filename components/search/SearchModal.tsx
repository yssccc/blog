'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PostData } from '@/types/post';

export default function SearchModal({
  posts,
  onClose,
}: {
  posts: PostData[];
  onClose: () => void;
}) {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const filtered = debouncedKeyword
    ? posts.filter((p) => {
        const lower = debouncedKeyword.toLowerCase();
        return (
          p.title.toLowerCase().includes(lower) ||
          p.content.toLowerCase().includes(lower)
        );
      })
    : [];

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-22 sm:pt-32"
      onClick={onClose}
    >
      <div
        className="
          bg-white 
          rounded-xl 
          shadow-xl 
          p-6 
          w-[90%] sm:w-[600px] lg:w-[850px]
          min-h-[250px]
          max-h-[70vh] sm:max-h-[500px]
          flex 
          flex-col
          gap-4
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            className="p-2 hover:opacity-60 text-gray-500"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <input
          autoFocus
          type="text"
          placeholder="제목 또는 내용을 검색하세요"
          className="
            w-full
            h-[50px]
            shrink-0
            px-4
            text-lg
            border border-gray-300
            rounded-md
            outline-none
            focus:border-2
            focus:border-main
            bg-white
          "
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 mt-1 sm:mt-2">
          {debouncedKeyword && filtered.length === 0 && (
            <p className="text-gray-500 text-sm px-1">검색 결과가 없습니다.</p>
          )}
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              onClick={onClose}
              className="
                flex
                items-center
                w-full
                h-[70px]
                rounded-md
                py-2
                hover:bg-gray-100
                transition
              "
            >
              {post.thumbnail && (
                <div className="relative w-[70px] min-w-[70px] aspect-square rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="70px"
                  />
                </div>
              )}
              <span className="px-3 text-base font-normal overflow-hidden text-ellipsis line-clamp-2">
                {post.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
