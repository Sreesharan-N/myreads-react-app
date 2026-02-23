import React from "react";
import PropTypes from "prop-types";

const Books = React.memo(({ book, updateShelf }) => {
  const hasShelf = book.shelf && book.shelf !== "none";

  const dropDownHeader = hasShelf ? "Move to..." : "Add to...";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail || ""})`,
          }}
        ></div>

        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={(e) => updateShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              {dropDownHeader}
            </option>

            <option value="currentlyReading">Currently Reading</option>

            <option value="wantToRead">Want to Read</option>

            <option value="read">Read</option>

            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className="book-title">{book.title}</div>

      <div className="book-authors">{book.authors?.join(", ")}</div>
    </div>
  );
});

Books.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Books;
