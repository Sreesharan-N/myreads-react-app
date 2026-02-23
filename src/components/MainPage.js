import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

function MainPage({ books, updateShelf }) {
  const currentlyReading = books.filter((b) => b.shelf === "currentlyReading");

  const wantToRead = books.filter((b) => b.shelf === "wantToRead");

  const read = books.filter((b) => b.shelf === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <BookShelf
          title="Currently Reading"
          books={currentlyReading}
          updateShelf={updateShelf}
        />
        <BookShelf
          title="Want to Read"
          books={wantToRead}
          updateShelf={updateShelf}
        />
        <BookShelf title="Read" books={read} updateShelf={updateShelf} />
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default MainPage;
