import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import PostList from './components/PostList/PostList'

import styled from 'styled-components';


import dummyData from './dummy-data';

// import './PostsPage.css';
let StyledPostsPage = styled.div`
  background-color: #eee;
`


class PostsPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      newComment: '',
      searchText: '',
      filteredPosts: [],
      currentUser: localStorage.getItem('user')
    };
  }

  componentDidMount() {
    setTimeout(this.setState({
      posts: dummyData
    }), 2000);
  }

  searchPostHandler = event => {
    const posts = this.state.posts.filter(post => {
      if (post.username.includes(event.target.value)) {
        return post;
      } else {
        return null;
      }
    });
    this.setState({ filteredPosts: posts });
  }

  inputEventHandler = (event) => {
    this.setState({
      newComment: event.target.value
    });
  }

  addCommentHandler = (event, timestamp) => {
    event.preventDefault();
    console.log('handle comment');
    console.log('currentUser = ' + this.state.currentUser )
    // gets comment - have to add an input field onClick
    // this.setState({
    //   newComment: event.target.value
    // });

    console.log(this.state.newComment);
    // adds username and comment to the post
    const updatedComments = [...this.state.posts.map(post => {
      if (post.timestamp === timestamp) {
        const addComment = {
          username: this.state.currentUser,
          text: this.state.newComment
        }
        return { ...post, comments: [...post.comments, addComment] };
      } else {
        return post;
      }
    })]
    this.setState({
      posts: updatedComments,
      newComment: ''
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
      <StyledPostsPage>
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
          newComment={this.state.newComment}
          addLikeHandler={this.addLikeHandler}
          inputEventHandler={this.inputEventHandler}
        />
      </StyledPostsPage>
    );
  }
}


export default PostsPage;
