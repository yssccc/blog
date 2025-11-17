'use client';

import { HeadingInfo } from '@/types/post';
import { useEffect, useRef, useState } from 'react';

interface PostAsideTOCProps {
  headings: HeadingInfo[];
}

export default function PostAsideTOC({ headings }: PostAsideTOCProps) {
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );

        if (visibleHeadings.length > 0) {
          setActiveId((visibleHeadings[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
      },
    );

    headingElements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [headings]);

  return (
    <aside
      className="hidden xl:block h-fit text-[14px] w-[200px] mt-38"
      style={{
        position: 'fixed',
        left: 'calc(50% + 450px)',
      }}
    >
      <ul className="space-y-2">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: `${(h.depth - 2) * 16}px` }}
            className={
              activeId === h.id ? 'text-main font-semibold' : 'text-gray-500'
            }
          >
            <a href={`#${h.id}`} className="hover:text-main transition-colors">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
