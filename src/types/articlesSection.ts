import { ArticleCardProps } from "./articlesListPageProps";

export interface ArticlesSectionProps {
  title: string;
  viewAllButton?: {
    text: string;
    href: string;
  };
  articles: ArticleCardProps[];
  compact?: boolean;
}
