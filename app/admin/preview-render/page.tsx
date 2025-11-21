import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from '@/components/mdx';
import { loadPreviewFromBlob } from '@/lib/preview-store';
import matter from 'gray-matter';
import PostHeader from '@/components/posts/post-detail/PostHeader';
import PostThumbnail from '@/components/posts/post-detail/PostThumbnail';
import { mdxOptions } from '@/lib/mdxOptions';

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  const url = params.url;
  if (!url) return <p>미리보기 없음</p>;

  const mdx = await loadPreviewFromBlob(url);
  if (!mdx) return <p>미리보기 없음</p>;

  const { data: frontmatter, content } = matter(mdx);

  return (
    <article className="prose prose-lg w-full max-w-[750px] min-w-[500px] p-4 pt-10 pb-22">
      <PostHeader
        title={frontmatter.title || ''}
        date={frontmatter.date || ''}
        categories={frontmatter.categories || []}
      />
      <PostThumbnail
        thumbnail={frontmatter.thumbnail}
        title={frontmatter.title}
      />
      <MDXRemote
        source={content}
        components={components}
        options={mdxOptions}
      />
    </article>
  );
}
