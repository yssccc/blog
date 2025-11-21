import { getAllPosts } from '@/lib/posts';
import type { PostData } from '@/types/post';
import DashboardClient from './DashboardClient';

export default function AdminDashboardPage() {
  const posts: PostData[] = getAllPosts();

 return <DashboardClient posts={posts} />;
}