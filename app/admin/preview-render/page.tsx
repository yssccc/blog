import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx';
import { getPreview } from '@/lib/preview-store';

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const id = params.id ?? '';

  const mdx = await getPreview(id);

  if (!mdx) return <p>미리보기 없음</p>;

  return (
    <article className="prose dark:prose-invert max-w-none p-6">
      <MDXRemote source={mdx} components={components} />
    </article>
  );
}
