import React from 'react';

export default function Books({book,updateShelf,fromSearch}) {

    const hasShelf = !!book.shelf && book.shelf!=="none";
    const dropDownHeader = fromSearch ? (hasShelf ? "Move to":"Add to"):"Move to";
    const selectValue = hasShelf ? book.shelf : "move";

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
            value={selectValue}
            onChange={(e) => updateShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              {dropDownHeader}
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {!fromSearch && <option value="none">None</option>}
            {fromSearch && hasShelf && <option value="none">None</option>}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(",")}</div>
    </div>
  );
}
