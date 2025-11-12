export interface PostData {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  thumbnail?: string;
  categories?: string[];
}
