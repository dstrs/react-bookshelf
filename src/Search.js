import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const Search = (props) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={props.clearPage}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => props.searchBook(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="book-list">
          {props.foundBooks.length > 0 &&
            props.foundBooks.map((book) => {
              return (
                <Book
                  book={book}
                  key={book.id}
                  updateCategory={props.updateCategory}
                />
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default Search;
