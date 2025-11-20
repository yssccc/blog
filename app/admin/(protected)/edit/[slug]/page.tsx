import { getPostBySlug } from '@/lib/posts';
import EditClient from './EditClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPage({ params }: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <EditClient
      slug={slug}
      initialTitle={post.frontmatter.title || ''}
      initialThumbnail={post.frontmatter.thumbnail || ''}
      initialCategories={(post.frontmatter.categories || []).join(', ')}
      initialDescription={post.frontmatter.description || ''}
      initialDate={post.frontmatter.date || ''}
      initialContent={post.content}
    />
  );
}
