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
    <article className="prose prose-lg w-full max-w-[750px] min-w-[500px] p-4">
      <MDXRemote
        source={content}
        options={mdxOptions}
        components={components}
      />
      <div className="w-full h-px bg-gray-200 my-30" />
    </article>
  );
}
