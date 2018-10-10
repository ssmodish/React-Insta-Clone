import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import PostList from './components/PostList/PostList'

import dummyData from './dummy-data';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      currentUser: '',
      newComment: '',
      searchText: '',
      filteredPosts: []
    };
  }

  componentDidMount() {
    setTimeout(this.setState({
      posts: dummyData,
      currentUser: 'BobBelcher'
    }), 2000);
  }

  searchPostHandler = event => {
    const posts = this.state.posts.filter(post => {
      if(post.username.includes(event.target.value)) {
        return post;
      } else {
        return null;
      }
    });
    this.setState({ filteredPosts: posts });
}

  addCommentHandler = timestamp => {
    console.log('handle comment');
    // gets comment - have to add an input field onClick
    let newComment = 'this is a new comment';

    // adds username and comment to the post
    const updatedComments = [...this.state.posts.map(post => {
      if (post.timestamp === timestamp) {
        const addComment = {
          username: this.state.currentUser,
          text: newComment
        }
        return { ...post, comments: [...post.comments, addComment] };
      } else {
        return post;
      }
    })]
    this.setState({
      posts: updatedComments
    })
  }

  addLikeHandler = timestamp => {
    // method adds a like to selected post
    const updatedLikes = [...this.state.posts.map(post => {
      if (post.timestamp === timestamp) {
        post.likes += 1;
        return post
      }
      else {
        return post;
      }
    })]
    this.setState({
      posts: updatedLikes
    })
  }


  render() {
    return (
      <div className="App">
        <SearchBar 
          searchPosts={this.searchPostHandler} 
          searchText={this.state.searchText}
        />
        <PostList 
          posts={
            this.state.filteredPosts.length > 0
              ? this.state.filteredPosts 
              : this.state.posts
          } 
          addCommentHandler={this.addCommentHandler} 
          addLikeHandler={this.addLikeHandler}
        />
      </div>
    );
  }
}

export default App;
