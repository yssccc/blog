import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { mdxOptions } from '@/lib/mdxOptions';

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'app', 'posts');
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((name) => ({
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
    'app',
    'posts',
    `${resolvedParams.slug}.mdx`,
  );

  const source = await fs.promises.readFile(postPath, 'utf8');
  const { content, data } = matter(source);

  return (
    <article className="prose prose-lg mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <div className="flex items-center mb-6 gap-3">
        <time className="text-gray-500 text-sm">{data.date}</time>
        {data.categories && (
          <div className="flex gap-2">
            {data.categories.map((category: string) => (
              <span
                key={category}
                className="px-2 text-main flex items-center justify-center min-w-[30px] min-h-5 bg-gray-100 text-xs font-medium rounded-[15px]"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
      {data.thumbnail && (
        <div className="relative w-full max-w-[750px] aspect-5/3 mx-auto mb-8">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}
      <MDXRemote source={content} options={mdxOptions} />
    </article>
  );
}
