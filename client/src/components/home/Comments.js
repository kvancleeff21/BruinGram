import React, { Component, Fragment } from 'react'
import CommentItem from './CommentItem';
import { Link } from "react-router-dom";

class Comments extends Component {

       
  render() {
    const {postId} = this.props;
    let filterComments =  this.props.comments.filter((comment, index) => index <=2) //filtering to get only first 3 comments
    // let comments;
    let first3comments;
    if(this.props.comments) {
     first3comments = filterComments.map(comment => (
        <CommentItem key={comment.id} comment={comment} postId={this.props.postId}
         showAvatar={this.props.showAvatar}
          showDelete={this.props.showDelete} s/>
      ));
     }
    return (
      <div 
      style={{overflow: "auto", width: "100%", overflowX: "hidden"
      }}
      >
         {this.props.comments.length > 3 &&  (<Link
          to={`/post/${postId}`}
          
          style={{ color: "gray", marginLeft: "25px" }}
        >
      <Fragment>View all {this.props.comments.length} comments</Fragment>
        </Link>)}
        {first3comments}

       
      </div>
    );
  }
}

export default Comments;
    