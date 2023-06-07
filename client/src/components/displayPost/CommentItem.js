import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const {comment, auth, postId} = this.props;
    let deleteIcon;
    let avatar;
    // if (this.props.showAvatar === true) {
      avatar = (
        <div className='col-lg-2'>
          <Link to={`/profile/${comment.handle}`}>
            <img className='avatar-icon' src={comment.user.avatar} alt='Avatar'
           />
          </Link>
        </div>
    );
    // }   

    if (comment.user._id === auth.user.id)  {
      deleteIcon = (
        <div type="button" className='col-lg-2' onClick={this.onDeleteComment.bind(this, postId, comment._id)}>
          <div className='delete-post'>
            <i
              style={{
                fontSize: "0.9em",
                float: "right",
                padding: "5px",
                marginTop: "15px",
                fontWeight: "lighter",
              }}
              className='fa fa-trash'
              aria-hidden='true'
            ></i>
          </div>
        </div>
      );
    }
    
    return (
      // <div className="container">
        <section className='row'>      
        {avatar}
        <div className={`${comment.user._id === auth.user.id ? "col-lg-8" : "col-lg-10"}`}>
          <div id='col-space'>
            <Link to={`/profile/${comment.handle}`} className='handlename-post'>
              {comment.name}
            </Link>
            <span className='textStyle-comment'>
              &nbsp; {comment.text}
            </span>
          </div>
        </div>
        {deleteIcon}
      </section>
      // </div>
      
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);

