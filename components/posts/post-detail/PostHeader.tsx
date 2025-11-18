import { formatDotDate } from '@/lib/formatDate';

interface PostHeaderProps {
  title: string;
  date: string;
  categories?: string[];
}

export default function PostHeader({
  title,
  date,
  categories,
}: PostHeaderProps) {
  return (
    <header className="text-center flex flex-col items-center mb-10">
      <h1 className="text-4xl font-bold mb-5">{title}</h1>
      <div className="flex items-center gap-3">
        <time className="text-gray-400 text-[17px]">{formatDotDate(date)}</time>

        {categories && categories.length > 0 && (
          <div className="flex gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
