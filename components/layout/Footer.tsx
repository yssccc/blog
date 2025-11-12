import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center min-h-50 gap-5">
      <Link
        href="https://github.com/yssccc"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
        title="GitHub로 이동"
      >
        <Image
          src="/github-mark.svg"
          alt="GitHub"
          width={30}
          height={30}
          className="opacity-80 hover:opacity-100 transition"
        />
      </Link>
      <div className="text-gray-400 text-center text-sm">
        © 2025 YUNSEO All rights reserved.
      </div>
    </footer>
  );
}
