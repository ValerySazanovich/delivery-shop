import { SearchProduct } from "./searchProduct";

export interface SearchResultsProps {
  isLoading: boolean;
  groupedProducts: { category: string; products: SearchProduct[] }[];
  resetSearch: () => void;
  query: string;
}