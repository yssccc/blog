import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions } from '@/lib/mdxOptions';
import Callout from '@/components/posts/Callout';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  const components = {
    Callout,
  };

  return (
    <div className="mt-10">
      <MDXRemote
        source={content}
        options={mdxOptions}
        components={components}
      />
      <div className="w-full h-px bg-gray-200 mt-30" />
    </div>
  );
}
