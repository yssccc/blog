export interface PostData {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  thumbnail?: string;
  categories?: string[];
}

export interface CategoryData {
  name: string;
  count: number;
}

export interface HeadingInfo {
  id: string;
  text: string;
  depth: number;
}
