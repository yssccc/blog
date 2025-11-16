import Image from 'next/image';

interface PostThumbnailProps {
  thumbnail?: string;
  title: string;
}

export default function PostThumbnail({
  thumbnail,
  title,
}: PostThumbnailProps) {
  if (!thumbnail) return null;

  return (
    <div className="relative w-full aspect-5/3 mb-32">
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover rounded-xl"
        sizes="(max-width: 768px) 100vw, 750px"
        priority
      />
    </div>
  );
}
