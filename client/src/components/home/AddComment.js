import React, { Component } from 'react';
import { connect } from "react-redux";
import { addComment,addCommentPosts } from "../../actions/postActions";
import classnames from 'classnames';
import is_empty from '../../validation/is-empty';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newComment = {
      text: this.state.comment
    };
    console.log(this.props.postId);
    //this.props.addComment(newComment, this.props.postId);
    this.props.addCommentPosts(newComment, this.props.postId);
    this.setState({comment: ""});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const enabled = !is_empty(this.state.comment); 
    return (
      <form onSubmit={this.onSubmit}>
        <textarea
          type='text'
          name='comment'
          placeholder="Add new comment..."
          value={this.state.comment}
          onChange={this.onChange}
          className="comment-textarea"
        ></textarea>
        <input 
          type="submit" 
          className='post'
          value="Post"
          disabled={!enabled}
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addComment,addCommentPosts })(AddComment);

