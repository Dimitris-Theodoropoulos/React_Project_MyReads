import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    bookShelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookShelfNotifiedForShelf: PropTypes.func.isRequired
  }

  notifyAppForShelf = (book, fromShelf, toShelf) => {
    this.props.bookShelfNotifiedForShelf(book, fromShelf, toShelf);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((bookTmp, i) => (
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

export default BookShelf
