import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Header from "./Header";
import Shelf from "./Shelf";
import Search from "./Search";
import "./App.css";

class App extends Component {
  state = {
    books: [],
    shelves: [
      { category: "currentlyReading", name: "Currently Reading", books: [] },
      { category: "wantToRead", name: "Want to Read", books: [] },
      { category: "read", name: "Read", books: [] },
    ],
    query: "",
    foundBooks: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  updateCategory = (book, event) => {
    const shelf = event.target.value;
    book.shelf = shelf;
    BooksAPI.update(book, shelf);
    //.then(BooksAPI.getAll().then(books => this.setState({ books })));
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id).concat(book),
    }));
  };

  searchBook = (myQuery) => {
    const query = myQuery.trim();
    this.setState({ query });
    if (query === "") return this.setState({ foundBooks: [] });
    BooksAPI.search(query).then((searchResults) => {
      if (query === this.state.query) {
        if (searchResults && searchResults.length) {
          const foundBooks = searchResults.map((result) => {
            this.setShelf(result);
            if (result.imageLinks === undefined) result.imageLinks = "";
            return result;
          });

          this.setState({ foundBooks });
        } else {
          this.setState({ foundBooks: [] });
        }
      }
    });
  };

  setShelf = (foundBook) => {
    this.state.books.forEach((book) => {
      if (book.title === foundBook.title) {
        return (foundBook.shelf = book.shelf);
      }
    });
    if (foundBook.shelf === undefined) return (foundBook.shelf = "none");
  };

  //clear the search page after leaving it
  clearPage = () => {
    this.setState({ foundBooks: [] });
  };

  render() {
    return (
      <div>
        <Header />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                {this.state.shelves.map((shelf) => (
                  <Shelf
                    key={shelf.category}
                    shelfTitle={shelf.name}
                    books={this.state.books.filter(
                      (book) => book.shelf === shelf.category
                    )}
                    updateCategory={this.updateCategory}
                  />
                ))}
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            );
          }}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              searchBook={this.searchBook}
              foundBooks={this.state.foundBooks}
              updateCategory={this.updateCategory}
              clearPage={this.clearPage}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
