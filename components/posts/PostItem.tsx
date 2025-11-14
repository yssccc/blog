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
    <Link href={`/posts/${slug}`}>
      <div className="w-[780px] h-[147px] flex">
        <div className="flex flex-col justify-between flex-1">
          <h2 className="font-medium text-lg max-w-[500px] max-h-[60px] line-clamp-2">
            {title}
          </h2>
          <p className="font-light text-sm max-w-[535px] h-[60px] text-gray-700 overflow-hidden line-clamp-3">
            {content}
          </p>
          <div className="flex gap-2 items-center font-extralight text-sm text-gray-500">
            <span>{date}</span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-2 text-main flex items-center justify-center min-w-[30px] min-h-5 bg-gray-100 text-xs font-medium rounded-[15px]"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="relative w-[220px] aspect-220/147 rounded-[15px] overflow-hidden">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              priority
              loading="eager"
              sizes="220px"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
