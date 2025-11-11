import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

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
    <article className="prose mx-auto p-6">
      <h1>{data.title}</h1>
      <time>{data.date}</time>
      <MDXRemote source={content} />
    </article>
  );
}
