import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Books from "./Books";

function SearchPage({ books, updateShelf }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const data = await BooksAPI.search(value, 20);

    if (data && !data.error) {
      const updatedResults = data.map((result) => {
        const existing = books.find((b) => b.id === result.id);
        return existing ? existing : { ...result, shelf: "none" };
      });

      setResults(updatedResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book) => (
            <Books
              key={book.id}
              book={book}
              updateShelf={updateShelf}
              fromSearch="fromSearch"
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
