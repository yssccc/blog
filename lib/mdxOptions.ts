import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { Pluggable } from 'unified';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'one-dark-pro', keepBackground: true }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor-link'] },
        },
      ],
    ] as Pluggable[],
  },
};
