import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex h-[70px] w-full justify-center bg-white shadow">
      <div className="mx-auto flex w-[1050px] items-center px-[195px]">
        <h1 className="text-xl font-bold">
          <Link href="/" className="cursor-pointer hover:opacity-80">
            YUNSEO
          </Link>
        </h1>
      </div>
    </header>
  );
}
