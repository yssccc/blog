import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllPosts() {
  const postsDir = path.join(process.cwd(), 'app', 'posts');
  const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));

  return filenames.map((filename, idx) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id: `${idx}`,
      slug: filename.replace(/\.mdx$/, ''),
      title: data.title,
      content: data.description || '',
      date: data.date,
      thumbnail: data.thumbnail || null,
      categories: data.categories || [],
    };
  });
}
