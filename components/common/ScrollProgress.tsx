'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const total =
            document.documentElement.scrollHeight - window.innerHeight;
          const current = window.scrollY;
          setProgress((current / total) * 100);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-9999 h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gray-700 origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
