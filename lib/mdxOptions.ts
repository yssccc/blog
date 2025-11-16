import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { Pluggable } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'one-dark-pro', keepBackground: true }],
      rehypeSlug,
    ] as Pluggable[],
  },
};
