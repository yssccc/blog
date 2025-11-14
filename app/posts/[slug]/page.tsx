import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxOptions } from '@/lib/mdxOptions';
import { getHeadingsFromMDX } from '@/lib/getHeadingsFromMDX';
import TOC from '@/components/posts/TOC';
import Image from 'next/image';
import Callout from '@/components/posts/Callout';
import GiscusComments from '@/components/posts/GiscusComments';
import ShareButton from '@/components/posts/ShareButton';
import ScrollProgress from '@/components/common/ScrollProgress';
import { formatDotDate } from '@/lib/formatDate';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postPath = path.join(process.cwd(), 'content', `${slug}.mdx`);
  const source = await fs.promises.readFile(postPath, 'utf8');
  const { data } = matter(source);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.thumbnail ? [data.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDir);
  return filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => ({
      slug: name.replace(/\.mdx$/, ''),
    }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const postPath = path.join(
    process.cwd(),
    'content',
    `${resolvedParams.slug}.mdx`,
  );

  const source = await fs.promises.readFile(postPath, 'utf8');
  const { content, data } = matter(source);
  const headings = await getHeadingsFromMDX(content);
  const components = {
    Callout,
  };

  return (
    <div className="relative flex justify-center py-32">
      <ScrollProgress />
      <div className="flex flex-col gap-5">
        <article className="prose prose-lg max-w-[750px] w-[700px]">
          <h1 className="text-4xl font-bold mb-7">{data.title}</h1>
          <div className="flex items-center mb-6 gap-3">
            <time className="text-gray-400 text-[17px]">
              {formatDotDate(data.date)}
            </time>
            {data.categories && (
              <div className="flex gap-2">
                {data.categories.map((category: string) => (
                  <span
                    key={category}
                    className="px-3 text-main flex items-center justify-center min-w-[30px] min-h-5 bg-gray-100 text-[13px] font-medium rounded-[15px]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
          {data.thumbnail && (
            <div className="relative w-full aspect-5/3 mb-32">
              <Image
                src={data.thumbnail}
                alt={data.title}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 750px"
                priority
              />
            </div>
          )}
          <MDXRemote
            source={content}
            options={mdxOptions}
            components={components}
          />
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-30" />
        </article>
        <ShareButton />
        <GiscusComments />
      </div>
      <aside
        className="hidden lg:block w-[220px] h-fit"
        style={{
          position: 'fixed',
          left: 'calc(50% + 520px)',
        }}
      >
        <TOC headings={headings} />
      </aside>
    </div>
  );
}
