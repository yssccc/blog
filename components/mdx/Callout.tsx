import { ReactNode } from 'react';

interface CalloutProps {
  children: ReactNode;
}

export default function Callout({ children }: CalloutProps) {
  return (
    <div
      className="
    border-l-[3px] border-neutral-900 dark:border-neutral-400
    pl-4 my-6
    font-semibold text-[1.05rem]     leading-[1.7]
    text-neutral-900 dark:text-neutral-100
        whitespace-pre-line
  "
    >
      {children}
    </div>
  );
}
