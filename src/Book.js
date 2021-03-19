import React from "react";

const Book = (props) => {
  const { title, authors, imageLinks, shelf } = props.book;

  return (
    <li className="book-list-item">
      <div className="book-top">
        <div
          className="book-image"
          style={{ backgroundImage: `url(${imageLinks.thumbnail})` }}
        />
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={(event) => props.updateCategory(props.book, event)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-details">
        <p className="book-title">{title}</p>
        <p className="book-author">{authors}</p>
      </div>
    </li>
  );
};

export default Book;
