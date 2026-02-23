import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import Books from "./Books";

function SearchPage({ books, updateShelf }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

 useEffect(() => {
   const timer = setTimeout(async () => {
     if (!query.trim()) {
       setResults([]);
       return;
     }

     try {
       const data = await BooksAPI.search(query, 20);

       if (!data || data.error) {
         setResults([]);
         return;
       }

       const merged = data.map((result) => {
         const existing = books.find((b) => b.id === result.id);

         return existing ? existing : { ...result, shelf: "none" };
       });

       setResults(merged);
     } catch (error) {
       setResults([]);
     }
   }, 400);

   return () => clearTimeout(timer);
 }, [query, books]);


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((book) => (
            <li key={book.id}>
              <Books book={book} updateShelf={updateShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default SearchPage;
