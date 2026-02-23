import PropTypes from "prop-types";
import Books from "./Books";

function BookShelf({ title, books, updateShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>

      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Books book={book} updateShelf={updateShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default BookShelf;
