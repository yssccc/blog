import Image from 'next/image';

interface PostItemProps {
  title: string;
  content: string;
  date: string;
  thumbnail: string;
}

export default function PostItem({
  title,
  content,
  date,
  thumbnail,
}: PostItemProps) {
  return (
    <div className="w-[780px] h-[147px] flex">
      <div className="flex flex-col justify-between flex-1">
        <h2 className="font-medium text-lg max-w-[500px] max-h-[60px] line-clamp-2">
          {title}
        </h2>
        <p className="font-light text-sm max-w-[535px] h-[60px] text-gray-700 overflow-hidden line-clamp-3">
          {content}
        </p>
        <div className="font-extralight text-sm text-gray-500">{date}</div>
      </div>
      <div className="relative w-[220px] aspect-220/147 rounded-[15px] overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
