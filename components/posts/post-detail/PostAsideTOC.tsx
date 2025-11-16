'use client';

import TOC from '@/components/posts/TOC';
import { HeadingInfo } from '@/types/post';

interface PostAsideTOCProps {
  headings: HeadingInfo[];
}

export default function PostAsideTOC({ headings }: PostAsideTOCProps) {
  return (
    <aside
      className="hidden xl:block h-fit text-[14px] w-[200px] mt-38"
      style={{
        position: 'fixed',
        left: 'calc(50% + 450px)',
      }}
    >
      <TOC headings={headings} />
    </aside>
  );
}
