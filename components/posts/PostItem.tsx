import { formatDotDate } from '@/lib/formatDate';
import Image from 'next/image';
import Link from 'next/link';

interface PostItemProps {
  slug: string;
  title: string;
  content: string;
  date: string;
  thumbnail?: string;
  categories?: string[];
}

export default function PostItem({
  slug,
  title,
  content,
  date,
  thumbnail,
  categories = [],
}: PostItemProps) {
  return (
    <Link href={`/posts/${slug}`} className="block w-full min-w-0 h-full group">
      <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition w-full">
        <div className="relative w-full aspect-4/3">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              priority
              loading="eager"
              sizes="300px"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          )}
        </div>
        <div className="flex flex-col flex-1 p-4 min-w-0">
          <h2 className="font-semibold text-lg line-clamp-2 mb-2 wrap-break-words">
            {title}
          </h2>
          <p className="font-light text-sm text-gray-700 line-clamp-2 mb-4 flex-1 wrap-break-words">
            {content}
          </p>
          <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 min-w-0">
            <span className="opacity-70">{formatDotDate(date)}</span>

            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
