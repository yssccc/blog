import { getAllPosts } from '@/lib/posts';
import PostListPage from '@/components/posts/PostListPage';

export default function PostsPage() {
  const posts = getAllPosts();
  return <PostListPage posts={posts} />;
}
