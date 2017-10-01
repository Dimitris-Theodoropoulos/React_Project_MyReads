import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    appTitle: 'My Reads',
    totalBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ totalBooks: books })
      this.setState({ currentlyReading: this.state.totalBooks.filter((book) => book.shelf === 'currentlyReading') })
      this.setState({ wantToRead: this.state.totalBooks.filter((book) => book.shelf === 'wantToRead') })
      this.setState({ read: this.state.totalBooks.filter((book) => book.shelf === 'read') })
    })
  }

  appNotifiedForShelfChange = (book, fromShelf, toShelf) => {
    book.shelf = toShelf;
    if (toShelf === 'none') {
      this.setState((state) => {
        let obj = {};
        obj[fromShelf] = state[fromShelf].filter((bookTmp) => bookTmp.id !== book.id);
        return obj;
      })
    } else {
      this.setState((state) => {
        let obj = {};
        obj[toShelf] = state[toShelf].concat([book]);
        if (fromShelf !== 'none') {
          obj[fromShelf] = state[fromShelf].filter((bookTmp) => bookTmp.id !== book.id);
        }
        return obj;
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchPage
            searchPageNotifiedForShelf={this.appNotifiedForShelfChange}
            shelfBooks={this.state.totalBooks}/>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>{this.state.appTitle}</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  bookShelfNotifiedForShelf={this.appNotifiedForShelfChange}
                  bookShelfTitle='Currently Reading'
                  books={this.state.currentlyReading}/>
                <BookShelf
                  bookShelfNotifiedForShelf={this.appNotifiedForShelfChange}
                  bookShelfTitle='Want to Read'
                  books={this.state.wantToRead}/>
                <BookShelf
                  bookShelfNotifiedForShelf={this.appNotifiedForShelfChange}
                  bookShelfTitle='Read'
                  books={this.state.read}/>
              </div>
            </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
