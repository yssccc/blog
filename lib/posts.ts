import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { CategoryData, PostData } from '@/types/post';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function getMdxFiles(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(file);

  return {
    slug,
    frontmatter: data,
    content,
  };
}

export function getAllPosts(): PostData[] {
  const files = getMdxFiles();

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(CONTENT_DIR, filename);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id: slug,
      slug,
      title: data.title,
      content: data.description || '',
      date: data.date,
      thumbnail: data.thumbnail || undefined,
      categories: data.categories || [],
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllCategories(): CategoryData[] {
  const posts = getAllPosts();
  const map: Record<string, number> = {};

  posts.forEach((post) => {
    post.categories?.forEach((cat) => {
      map[cat] = (map[cat] || 0) + 1;
    });
  });

  return Object.entries(map).map(([name, count]) => ({ name, count }));
}

export function getAllSlugs() {
  return getMdxFiles().map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}
