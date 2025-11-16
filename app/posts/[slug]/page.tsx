import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions } from '@/lib/mdxOptions';
import { getHeadingsFromMDX } from '@/lib/getHeadingsFromMDX';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';
import Callout from '@/components/posts/Callout';
import GiscusComments from '@/components/posts/GiscusComments';
import ShareButton from '@/components/posts/ShareButton';
import ScrollProgress from '@/components/common/ScrollProgress';
import { formatDotDate } from '@/lib/formatDate';
import PostAsideTOC from '@/components/posts/post-detail/PostAsideTOC';
import PostThumbnail from '@/components/posts/post-detail/PostThumbnail';

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

  const headings = await getHeadingsFromMDX(post.content);
  const components = { Callout };

  return (
    <div className="flex relative justify-center py-22">
      <ScrollProgress />
      <div className="flex flex-col gap-5">
        <article className="prose prose-lg w-full max-w-[750px] min-w-[500px] p-4">
          <h1 className="text-4xl font-bold mb-7">{post.frontmatter.title}</h1>
          <div className="flex items-center mb-6 gap-3">
            <time className="text-gray-400 text-[17px]">
              {formatDotDate(post.frontmatter.date)}
            </time>
            {post.frontmatter.categories && (
              <div className="flex gap-2">
                {post.frontmatter.categories.map((category: string) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
          <PostThumbnail
            thumbnail={post.frontmatter.thumbnail}
            title={post.frontmatter.title}
          />
          <MDXRemote
            source={post.content}
            options={mdxOptions}
            components={components}
          />
          <div className="w-full h-px bg-gray-200 my-30" />
        </article>
        <ShareButton />
        <GiscusComments />
      </div>
      <PostAsideTOC headings={headings} />
    </div>
  );
}
