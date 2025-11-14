import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Root, Heading, Text } from 'mdast';
import { HeadingInfo } from '@/types/post';

export async function getHeadingsFromMDX(
  content: string,
): Promise<HeadingInfo[]> {
  const tree = unified().use(remarkParse).parse(content) as Root;
  const headings: HeadingInfo[] = [];

  visit(tree, 'heading', (node) => {
    const heading = node as Heading;
    const text = heading.children
      .filter((child): child is Text => child.type === 'text')
      .map((child) => child.value)
      .join(' ');

    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-가-힣]/g, '');

    headings.push({ id, text, depth: heading.depth });
  });

  return headings;
}
