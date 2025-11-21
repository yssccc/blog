import type { PostData } from '@/types/post';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '../../components/DeleteButton';

export default function PostList({ posts }: { posts: PostData[] }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-10">
      <div className="mb-8 flex justify-end">
        <Link
          href="/admin/write"
          className="px-4 h-10 flex items-center gap-2 rounded-xl border border-gray-300 text-gray-800 text-sm font-medium bg-white hover:bg-gray-50 hover:border-gray-400 shadow-xs transition-all"
        >
          <span className="text-lg leading-none">＋</span>새 글 작성
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="relative group rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="flex gap-5 items-stretch"
            >
              {post.thumbnail && (
                <div className="relative w-[150px] aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between py-4 pr-4">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 leading-snug">
                    {post.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{post.date}</span>
                    {Array.isArray(post.categories) &&
                      post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map((category) => (
                            <span
                              key={category}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
                {post.content && (
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {post.content}
                  </p>
                )}
              </div>
            </Link>
            <div
              className="absolute top-3 right-3 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href={`/admin/edit/${post.slug}`}
                className="h-7 px-3 rounded-md border border-gray-300 text-gray-700 text-xs flex items-center justify-center hover:bg-gray-100 transition"
              >
                수정
              </Link>
              <DeleteButton slug={post.slug} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
