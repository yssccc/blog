'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface HeadingInfo {
  id: string;
  text: string;
  depth: number;
}

export default function PostAsideTOC() {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeId, setActiveId] = useState('');
  const pathname = usePathname();

  const extractHeadings = useCallback(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    if (headingElements.length === 0) return;

    const extracted = headingElements.map((el) => ({
      id: el.id,
      text: el.textContent || '',
      depth: Number(el.tagName[1]),
    }));

    setHeadings(extracted);
  }, []);

  useEffect(() => {
    const timer = setTimeout(extractHeadings, 0);
    return () => clearTimeout(timer);
  }, [pathname, extractHeadings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    const observer = new IntersectionObserver(
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

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside
      className="hidden xl:block h-fit text-[14px] w-[200px] mt-43"
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
