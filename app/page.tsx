import { getAllCategories, getAllPosts } from '@/lib/posts';
import PostListPage from '@/components/posts/PostListPage';

export const metadata = {
  title: 'YUNSEO 블로그',
  description: '프론트엔드 개발 블로그',
  openGraph: {
    title: 'YUNSEO 블로그',
    description: '프론트엔드 개발 블로그입니다.',
    images: [
      {
        url: '/main.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/main.png'],
  },
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <PostListPage
      posts={posts}
      categories={categories}
      totalPostCount={posts.length}
    />
  );
}
