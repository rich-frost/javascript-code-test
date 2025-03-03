import nock from "nock";
import { getEnvironment } from "../config/environment";

const sciFiBooks = [
  {
    name: "Dune",
    author: "Frank Herbert",
    book_publisher: "Chilton Books",
    date_of_publish: "1965-08-01",
  },
  {
    name: "Neuromancer",
    author: "William Gibson",
    book_publisher: "Ace",
    date_of_publish: "1984-07-01",
  },
  {
    name: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    book_publisher: "Ace Books",
    date_of_publish: "1969-01-01",
  },
  {
    name: "Foundation",
    author: "Isaac Asimov",
    book_publisher: "Gnome Press",
    date_of_publish: "1951-06-01",
  },
  {
    name: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    book_publisher: "Pan Books",
    date_of_publish: "1979-10-12",
  },
  {
    name: "1984",
    author: "George Orwell",
    book_publisher: "Secker & Warburg",
    date_of_publish: "1949-06-08",
  },
  {
    name: "Fahrenheit 451",
    author: "Ray Bradbury",
    book_publisher: "Ballantine Books",
    date_of_publish: "1953-10-19",
  },
  {
    name: "The Martian",
    author: "Andy Weir",
    book_publisher: "Crown Publishing Group",
    date_of_publish: "2011-02-11",
  },
  {
    name: "Snow Crash",
    author: "Neal Stephenson",
    book_publisher: "Bantam Books",
    date_of_publish: "1992-06-01",
  },
  {
    name: "Hyperion",
    author: "Dan Simmons",
    book_publisher: "Doubleday",
    date_of_publish: "1989-05-01",
  },
];

export const setupMockExternalAPI = () => {
  const environment = getEnvironment();

  const status = 200;
  const body = {
    books: sciFiBooks,
  };

  nock(environment.bookSearchClientBaseUrl)
    .get("/by-author")
    .query((actualQueryObject) => {
      return actualQueryObject.q === "frank";
    })
    .reply(status, body);

  nock(environment.bookSearchClientBaseUrl)
    .get("/by-author")
    .query((actualQueryObject) => {
      return actualQueryObject.q === "bob";
    })
    .reply(status, { books: [] });

  nock(environment.bookSearchClientBaseUrl)
    .get("/by-author")
    .query((actualQueryObject) => {
      return actualQueryObject.q === "foo";
    })
    .reply(500);
};
