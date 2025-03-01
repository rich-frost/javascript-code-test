import { describe, expect, it } from "vitest";
import { bookClientParser } from "./bookClientParser";
import { BookClientSearchBooks } from "../../types/bookClientSearch";
import { SearchResults } from "../../types/search";

describe("bookClientParser", () => {
  it("should correctly parse book search results", () => {
    // when
    const input: BookClientSearchBooks = [
      {
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        book_publisher: "Scribner",
        date_of_publish: "1925-04-10",
      },
      {
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        book_publisher: "J.B. Lippincott & Co.",
        date_of_publish: "1960-07-11",
      },
    ];

    const expectedOutput: SearchResults = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        publish_date: "1925-04-10",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publisher: "J.B. Lippincott & Co.",
        publish_date: "1960-07-11",
      },
    ];

    // then
    expect(bookClientParser(input)).toEqual(expectedOutput);
  });

  it("should return an empty array when given an empty input", () => {
    expect(bookClientParser([])).toEqual([]);
  });

  it("should handle missing fields gracefully", () => {
    // when
    const input: BookClientSearchBooks = [
      {
        name: "1984",
        author: "George Orwell",
        book_publisher: undefined, // Missing publisher
        date_of_publish: "1949-06-08",
      },
    ];

    const expectedOutput: SearchResults = [
      {
        title: "1984",
        author: "George Orwell",
        publisher: undefined,
        publish_date: "1949-06-08",
      },
    ];

    // then
    expect(bookClientParser(input)).toEqual(expectedOutput);
  });
});
