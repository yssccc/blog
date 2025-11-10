import PostItem from './PostItem';

interface PostData {
  id: string;
  title: string;
  content: string;
  date: string;
  thumbnail: string;
}

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col space-y-4 gap-10">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          thumbnail={post.thumbnail}
        />
      ))}
    </div>
  );
}
