import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import BookmarksContext from '../BookmarksContext';

import './EditBookmark.css';

class EditBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      bookmarkValues: {
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1
      }
    }
  }

  updateTitle = (title) => {
    this.setState({
      bookmarkValues: {
        id: this.state.bookmarkValues.id,
        title: title,
        url: this.state.bookmarkValues.url,
        description: this.state.bookmarkValues.description,
        rating: this.state.bookmarkValues.rating
      }
    })
  }

  updateUrl = (url) => {
    this.setState({
      bookmarkValues: {
        id: this.state.bookmarkValues.id,
        title: this.state.bookmarkValues.title,
        url: url,
        description: this.state.bookmarkValues.description,
        rating: this.state.bookmarkValues.rating
      }
    })
  }

  updateDescription = (description) => {
    this.setState({
      bookmarkValues: {
        id: this.state.bookmarkValues.id,
        title: this.state.bookmarkValues.title,
        url: this.state.bookmarkValues.url,
        description: description,
        rating: this.state.bookmarkValues.rating
      }
    })
  }

  updateRating = (rating) => {
    this.setState({
      bookmarkValues: {
        id: this.state.bookmarkValues.id,
        title: this.state.bookmarkValues.title,
        url: this.state.bookmarkValues.url,
        description: this.state.bookmarkValues.description,
        rating: rating
      }
    })
  }

  updateBookmarkValues = (bookmark) => {
    this.setState({
      bookmarkValues: {
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
        description: bookmark.description,
        rating: bookmark.rating
      }
    })
  }

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId;
    fetch(`${config.API_ENDPOINT}/${bookmarkId}`, {
      headers: {
        'Authorization':`Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(bookmark => {
        this.updateBookmarkValues(bookmark);
      })
  }

  handleSubmit = (event, cb) => {
    event.preventDefault();

    fetch(`${config.API_ENDPOINT}/${this.state.bookmarkValues.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.bookmarkValues)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => Promise.reject(error));
      }
    })
    .then(() => {
      cb(this.state.bookmarkValues);
      this.props.history.push('/');
    })
    .catch(error => {
      console.error(error);
      this.setState({ error })
    });
  }
  
  render() {
    const bookmarkValues = this.state.bookmarkValues;

    return (
      <BookmarksContext.Consumer>
        {(context) => (
          <section>
            <h2>Edit Bookmark</h2>
            <form onSubmit={(e) => this.handleSubmit(e, context.updateBookmark)} className='edit-form'>
              <label htmlFor='title'>Title:</label>
              <input 
                onChange={(e) => this.updateTitle(e.target.value)} 
                value={bookmarkValues.title} 
                name='title' 
                id='title' 
                type='text'
                required
              />
              <label htmlFor='url'>Url:</label>
              <input 
                onChange={(e) => this.updateUrl(e.target.value)} 
                value={bookmarkValues.url} 
                name='url' 
                id='url' 
                type='url'
                required
              />
              <label htmlFor='description'>Description</label>
              <textarea onChange={(e) => this.updateDescription(e.target.value)} value={bookmarkValues.description} name='description' id='description'/>
              <label htmlFor='rating'>Rating:</label>
              <input 
                onChange={(e) => {this.updateRating(e.target.value)}} 
                value={bookmarkValues.rating} 
                name='rating' 
                id='rating' 
                type='number' 
                min={1} 
                max={5}
                required
              />
              <Link to='/'><button>Back</button></Link>
              <button type='submit'>Submit</button>
            </form>
          </section>
        )}
      </BookmarksContext.Consumer>
    )
  }
}

export default EditBookmark;