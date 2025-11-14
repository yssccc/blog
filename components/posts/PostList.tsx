import { PostData } from '@/types/post';
import PostItem from './PostItem';

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </div>
  );
}
