import React from "react";
import Book from "./Book";

const Shelf = (props) => {
  return (
    <div className="shelf">
      <h2 className="shelf-title">{props.shelfTitle}</h2>
      <ol className="book-list">
        {props.books.map((book) => (
          <Book
            book={book}
            key={book.id}
            shelf={book.shelf}
            updateCategory={props.updateCategory}
          />
        ))}
      </ol>
    </div>
  );
};

export default Shelf;
