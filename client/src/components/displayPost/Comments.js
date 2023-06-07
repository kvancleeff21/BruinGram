import React, { Component } from 'react'
import CommentItem from './CommentItem';

class Comments extends Component {
  
  render() {
   
    let filterComments; // to filter the deleted user's comments.
    if(this.props.comments) {
    filterComments = this.props.comments.filter(
      (comment) => comment.user !== null
    );
    
  
      filterComments = filterComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={this.props.postId}
          //  showAvatar={this.props.showAvatar}
          showDelete={this.props.showDelete}
        />
      ));
    }
    
    return <div>{filterComments}</div>;
  }
}

export default Comments
