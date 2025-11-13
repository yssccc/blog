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
        <div className="relative w-[30px] h-[30px]">
          <Image
            src="/github-mark.svg"
            alt="GitHub"
            fill
            className="opacity-80 hover:opacity-100 transition"
          />
        </div>
      </Link>
      <div className="text-gray-400 text-center text-sm">
        © 2025 YUNSEO All rights reserved.
      </div>
    </footer>
  );
}
