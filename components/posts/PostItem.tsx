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
    <Link href={`/posts/${slug}`} className="block group">
      <div className="w-[320px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative w-full h-[260px]">
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
        <div className="flex flex-col p-5 gap-3 h-[170px]">
          <h2 className="font-bold text-[18px] leading-snug line-clamp-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 leading-snug line-clamp-2">
            {content}
          </p>
          <div className="flex items-center gap-2 mt-auto text-[13px] text-gray-500">
            <span className="opacity-70">{formatDotDate(date)}</span>

            {categories.map((category) => (
              <span
                key={category}
                className="px-2 rounded-full bg-gray-50 text-gray-700 border border-gray-100"
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
