import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    e.preventDefault();
    BooksAPI.update(this.props.book, e.target.value);
    this.props.changeShelf(this.props.book, this.props.book.shelf, e.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{ width: 128,
                        height: 193,
                        backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}>
          </div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={this.handleChange}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {() => {if(this.props.book.authors !== "" && this.props.book.authors !== null) {
          (this.props.book.authors.map((author, i) => (
          <div className="book-authors" key={i}>{author}</div>)
        ))}}}
      </div>
    )
  }
}

export default Book
