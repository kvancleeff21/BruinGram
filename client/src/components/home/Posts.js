import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { allPostsExceptCurrentUsers, getFollowingPosts } from '../../actions/postActions';
import SuggestionsBox from './SuggestionsBox';
import { Link } from 'react-router-dom';

class Posts extends Component {
  componentDidMount() {
    // this.props.allPostsExceptCurrentUsers();
    this.props.getFollowingPosts();
  }

  render() {
    const { posts, loadingPost } = this.props.post;
    let postContent;

    if (loadingPost) {
      postContent = <Spinner />;
    } else {
      if (posts.length > 0 ) {
        postContent = <PostFeed posts={posts} />;
      } else {
        postContent = (
          <div style={{marginTop: "30px"}}>
            <span><Link to="/explore">Follow</Link> more people to see posts</span>
          </div>
        );
      }
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              
              {postContent}
            </div>
            {/* Suggestions*/}
            <div 
            // className="col-md-4"
            > 
              <SuggestionsBox />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { allPostsExceptCurrentUsers, getFollowingPosts })(Posts);
