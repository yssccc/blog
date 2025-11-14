'use client';

import { useState } from 'react';
import SearchModal from '@/components/search/SearchModal';
import { Search } from 'lucide-react';
import type { PostData } from '@/types/post';
import Link from 'next/link';

export default function HeaderClient({ posts }: { posts: PostData[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-18 w-full bg-white shadow">
        <div className="mx-auto flex w-[1050px] items-center justify-between">
          <h1 className="text-xl font-bold cursor-pointer">
            <Link href="/" className="hover:opacity-80">
              YUNSEO
            </Link>
          </h1>
          <button
            onClick={() => setOpen(true)}
            className="p-2 hover:opacity-80"
          >
            <Search size={20} />
          </button>
        </div>
      </header>
      {open && <SearchModal posts={posts} onClose={() => setOpen(false)} />}
    </>
  );
}
