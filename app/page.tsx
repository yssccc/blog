import { getAllCategories, getAllPosts } from '@/lib/posts';
import PostListPage from '@/components/posts/PostListPage';

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
