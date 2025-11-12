import rehypePrettyCode from 'rehype-pretty-code';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'one-dark-pro', keepBackground: true }],
    ],
  },
};
