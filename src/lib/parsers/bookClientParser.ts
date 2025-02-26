import { BookClientSearchBooks } from "../../types/bookClientSearch";
import { SearchResult, SearchResults } from "../../types/search";

export const bookClientParser = (
  books: BookClientSearchBooks,
): SearchResults => {
  return books.map(
    (book) =>
      ({
        title: book.name,
        author: book.author,
        publisher: book.book_publisher,
        publish_date: book.date_of_publish,
      }) as SearchResult,
  );
};
