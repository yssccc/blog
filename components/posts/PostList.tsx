import { PostData } from '@/types/post';
import PostItem from './PostItem';

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col space-y-4 gap-10 min-h-[600px]">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          slug={post.slug}
          title={post.title}
          content={post.content}
          date={post.date}
          thumbnail={post.thumbnail}
          categories={post.categories}
        />
      ))}
    </div>
  );
}
