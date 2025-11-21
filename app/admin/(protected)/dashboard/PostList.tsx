import type { PostData } from '@/types/post';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '../../components/DeleteButton';

export default function PostList({ posts }: { posts: PostData[] }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          글 목록
        </h1>
        <Link
          href="/admin/write"
          className="px-4 py-2 rounded-lg bg-main text-white text-sm font-medium shadow-sm hover:opacity-90 transition"
        >
          + 새 글 작성
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex gap-5 items-stretch rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {post.thumbnail && (
              <div className="relative w-[150px] aspect-video overflow-hidden rounded-l-xl bg-gray-100">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between py-4 pr-4">
              <div className="flex items-start justify-between gap-3">
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

                <div className="flex gap-2">
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="h-8 px-3 rounded-md bg-neutral-900 text-white text-xs font-medium flex items-center justify-center hover:bg-neutral-700 transition"
                  >
                    수정
                  </Link>
                  <DeleteButton slug={post.slug} />
                </div>
              </div>

              {post.content && (
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {post.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
