'use client';

import { useEffect } from 'react';
import type { PostData } from '@/types/post';
import PostList from './PostList';
import { useToast } from '@/hooks/useToast';

export default function DashboardClient({ posts }: { posts: PostData[] }) {
  const { pendingToast, showToast, clearPendingToast } = useToast();

  useEffect(() => {
    if (pendingToast) {
      showToast(pendingToast);
      clearPendingToast();
    }
  }, [pendingToast, showToast, clearPendingToast]);

  return <PostList posts={posts} />;
}
