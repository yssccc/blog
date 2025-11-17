import { getHeadingsFromMDX } from '@/lib/getHeadingsFromMDX';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import GiscusComments from '@/components/posts/post-detail/GiscusComments';
import ShareButton from '@/components/posts/ShareButton';
import ScrollProgress from '@/components/common/ScrollProgress';
import PostAsideTOC from '@/components/posts/post-detail/PostAsideTOC';
import PostThumbnail from '@/components/posts/post-detail/PostThumbnail';
import PostContent from '@/components/posts/post-detail/PostContent';
import PostHeader from '@/components/posts/post-detail/PostHeader';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.thumbnail ? [post.frontmatter.thumbnail] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const headings = await getHeadingsFromMDX(post.content);

  return (
    <div className="flex relative justify-center py-22">
      <ScrollProgress />
      <article className="prose prose-lg w-full max-w-[750px] min-w-[500px] p-4">
        <div className="flex flex-col">
          <PostHeader
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            categories={post.frontmatter.categories}
          />
          <PostThumbnail
            thumbnail={post.frontmatter.thumbnail}
            title={post.frontmatter.title}
          />
          <PostContent content={post.content} />
          <ShareButton />
          <GiscusComments />
        </div>
      </article>
      <PostAsideTOC headings={headings} />
    </div>
  );
}
