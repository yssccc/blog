import { MetadataRoute } from 'next';
import { getSitemapPostList, getPostBySlug } from '@/lib/posts';

const baseUrl = 'https://www.yssccc.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = getSitemapPostList();

  const posts = slugs.map((slug) => {
    const post = getPostBySlug(slug);

    return {
      url: `${baseUrl}/posts/${slug}`,
      lastModified: post?.frontmatter.date
        ? new Date(post.frontmatter.date)
        : new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
    },
    ...posts,
  ];
}
