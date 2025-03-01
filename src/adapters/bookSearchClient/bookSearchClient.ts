import { BOOK_SEARCH_CLIENT_SEARCH_BY_URL } from "../../constants/externalApiUrls";
import { bookClientParser } from "../../lib/parsers/bookClientParser";
import { SearchAdapterProps, SearchResponse } from "../../types/search";
import { getEnvironment } from "../../config/environment";

export const bookSearchClient = async ({
  searchQueryParams,
  logger,
}: SearchAdapterProps): Promise<SearchResponse> => {
  const environment = getEnvironment();

  const { author, offset, limit } = searchQueryParams;

  const queryParams = [
    `q=${encodeURIComponent(author)}`,
    `limit=${limit}`,
    `offset=${offset}`,
  ];

  const searchByUrl = BOOK_SEARCH_CLIENT_SEARCH_BY_URL["author"];
  const url = `${environment.bookSearchClientBaseUrl}${searchByUrl}?${queryParams.join("&")}`;

  logger.trace({ message: `Fetching books from: ${url}` });

  const response = await fetch(url);

  if (!response.ok) {
    logger.error({
      message: `Failed to fetch books bookSearchClient. Status: ${response.status}`,
      error: response,
    });
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }

  const data = await response.json();

  // TODO: Possibly add a type guard checker here prior to attempting to parse the data

  // Parse response into standard format
  logger.trace({ message: `Parsing returned books into standard format` });
  try {
    const parsedBooks = bookClientParser(data.books);
    const formattedResponse = {
      data: parsedBooks,
      pagination: {
        limit,
        offset,
      },
    };

    return formattedResponse;
  } catch (e) {
    logger.error({
      message: `Failed to parse books bookSearchClient`,
      error: e,
    });
    throw new Error(`Failed to parse books bookSearchClient ${e}`);
  }
};
