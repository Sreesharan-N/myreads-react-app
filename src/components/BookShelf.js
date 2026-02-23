import React from 'react'
import Books from './Books';

export default function BookShelf({title,books,updateShelf}) {
  return (

      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
                books.map((book)=>(
                    <Books key={book.id}
                    book={book}
                    updateShelf={updateShelf}/>
                ))
            }
          </ol>
        </div>
      </div>

  );
}
