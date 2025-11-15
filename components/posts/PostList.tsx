import { PostData } from '@/types/post';
import PostItem from './PostItem';

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post.slug} className="min-w-0">
          <PostItem {...post} />
        </div>
      ))}
    </div>
  );
}
