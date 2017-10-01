import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import { PropTypes } from 'prop-types'

class SearchPage extends Component {
  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    searchPageNotifiedForShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    bookResults: []
  }

  updateQuery(query) {
    this.setState({ query: query.trim() });
    this.updateBookResults(query);
  }

  updateBookResults(query) {
    if (query === '') {
      this.setState({ bookResults: [] });
    } else {
      BooksAPI.search(query, 20).then((res) => {
        if (query === this.state.query) {
          let bookResultsTmp = [];
          for (let bookResultTmp of res) {
            for (let bookTmp of this.props.shelfBooks) {
              if (bookTmp.id === bookResultTmp.id) {
                bookResultTmp.shelf = bookTmp.shelf;
                break;
              } else {
                bookResultTmp.shelf = 'none';
              }
            }
            bookResultsTmp.push(bookResultTmp);
          this.setState({
            bookResults: bookResultsTmp
          });
          }
      }}).catch((error) => {
        console.log(error);
        this.setState({ bookResults: [] })
      })
    }
  }

  notifyAppForShelf = (book, fromShelf, toShelf) => {
    this.props.searchPageNotifiedForShelf(book, fromShelf, toShelf);
    let updatedBookResults = [];
    book.shelf = toShelf;
    for (let bookTemp of this.state.bookResults) {
      if (bookTemp.id === book.id) {
        updatedBookResults.push(book)
      } else {
        updatedBookResults.push(bookTemp)
      }
    }
    this.setState({
      bookResults: updatedBookResults
    })
  }

  render() {
    const { query, bookResults } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {bookResults.map((bookTmp, i) => (
              <li key={i}>
                <Book
                  changeShelf={this.notifyAppForShelf}
                  book={bookTmp} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
