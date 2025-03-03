import { Logger } from "../lib/logger";

export type SearchQueryParams = {
  author: string;
  offset: number;
  limit: number;
};
export type SearchAdapterProps = {
  searchQueryParams: SearchQueryParams;
  logger: Logger;
};

export type SearchResult = {
  title: string;
  author: string;
  publish_date?: string;
  publisher?: string;
};

export type SearchResults = SearchResult[];

export type Pagination = {
  limit: number;
  offset: number;
};

export type SearchResponse = {
  data: SearchResult[];
  pagination: Pagination;
};
