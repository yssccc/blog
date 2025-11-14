'use client';

import { HeadingInfo } from '@/types/post';
import { useEffect, useState, useRef } from 'react';

interface TOCProps {
  headings: HeadingInfo[];
}

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );

        if (visibleHeadings.length > 0) {
          const firstVisible = visibleHeadings[0].target as HTMLElement;
          setActiveId(firstVisible.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 },
    );

    headingElements.forEach((el) => observer.current?.observe(el));
    return () => observer.current?.disconnect();
  }, [headings]);

  return (
    <aside>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: `${(h.depth - 2) * 16}px` }}
            className={`${
              activeId === h.id ? 'text-main font-semibold' : 'text-gray-500'
            }`}
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
