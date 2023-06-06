import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { connect } from "react-redux";
import { getSuggestionList } from "../../actions/profileActions";
import Comments from "./Comments";
import AddComment from "./AddComment";
import Moment from "react-moment";
import { addLikePosts, removeLikePosts } from "../../actions/postActions";
import { savePosts, unsavePosts } from "../../actions/postActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";


class PostItem extends Component {
  render() {
    const { post, loadingPost } = this.props;
    let comments = post.comments.filter(comment => comment.user !== null)
    
    let alreadyLiked = false;
    if (post.likes !== undefined) {
      if (
        post.likes.filter((like) => like.user === this.props.auth.user.id)
          .length > 0
      ) {
        alreadyLiked = true;
      }
    }
    let alreadySaved = false;
    if (post.saved !== undefined) {
      if (
        post.saved.filter((save) => save.user === this.props.auth.user.id)
          .length > 0
      ) {
        alreadySaved = true;
      }
    }
 
    const icons = (
      <div>
        {alreadyLiked === true ? (
          <div type='button' className='icons-post'>
            <i
              onClick={() => {
                this.props.removeLikePosts(post._id);
              }}
              className='fa fa-heart'
              style={{ fontSize: "1.5em", color: "red" }}
              aria-hidden='true'
            ></i>
          </div>
        ) : (
          <div
            type='button'
            onClick={() => this.props.addLikePosts(post._id)}
            className='icons-post'
          >
            <i
              className='fa fa-heart-o'
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            ></i>
          </div>
        )}
        <div type='button' className='icons-post'>
          <i
            style={{ fontSize: "1.5em" }}
            className='fa fa-comment-o'
            aria-hidden='true'
          ></i>
        </div>
        {alreadySaved === true ? (
          <div type='button' className='icons-post'>
            <i
              onClick={() => {
                this.props.unsavePosts(post._id);
              }}
              className='fa fa-bookmark'
              style={{ fontSize: "1.5em" }}
              aria-hidden='true'
            ></i>
          </div>
        ) : (
          <div
            type='button'
            onClick={() => this.props.savePosts(post._id)}
            className='icons-post'
          >
            <i
              className='fa fa-bookmark-o'
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            ></i>
          </div>
        )}
      </div>
    );
    let content;
    if (loadingPost) {
      content = <Spinner />;
    } else {
      content = (
        <div className='container'>
          <div className='row>'>
            <div
              className='card offset-sm-1'
              style={{
                width: "600px",
                // border: "0.8px solid",
                borderColor: "#D3D3D3",
                position: "relative",
              }}
            >
              <div
                //  className='card-header'
                // style={{ position: "relative" }}
              >
                <Link to={`/profile/${post.handle}`}>
                  <img className='avatar-icon' src={post.user.avatar} alt='Avatar' />
                </Link>
                <Link
                  to={`/profile/${post.handle}`}
                  className='name-of-account'
                >
                  {post.name}
                </Link>

                {/* <hr
                         style={{
                           marginBottom: "10px",
                         }}
                       /> */}
                <Link to={`/post/${post._id}`}>
                  {" "}
                  <img
                    className='card-img-top'
                    style={{
                      borderTop: "1px solid rgba(var(--b6a,219,219,219)",
                      marginTop: "20px",
                      borderRadius: "0",
                      width:"600px",
                      height: "600px",
                      objectFit: "cover"
                    }}
                    src={post.image}
                  />{" "}
                </Link>

                {/*  post description & comments on post */}
                <div
                  // className='comment-wrapper'
                  style={{
                    // border: "0.8px solid rgb(211, 211, 211)",
                    borderTop: "transparent",
                  }}
                >
                  <section className='row'>
                    <section id='icons'>
                      {/* Show like, save icons */}
                      {icons}

                      <div className='textStyle-date'>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "1.4em",
                            color: "black",
                            marginLeft: "10px",
                          }}
                        >
                          {post.likes && post.likes.length} Likes
                        </div>
                      </div>
                    </section>
                    {/* <!-- post description start--> */}
                    <div className=' col-lg-10'>
                      <div id='col-space'>
                        <Link
                          className='handlename-post'
                          to={`/profile/${post.handle}`}
                        >
                          {post.name}
                        </Link>
                        <span className='textStyle-comment'>
                          &nbsp; {post.text}
                        </span>
                      </div>
                    </div>
                    {/* <!-- post description end--> */}
                    {/* comments on post */}

                    <Comments
                      comments={comments}
                      postId={post._id}
                      showAvatar={true}
                      showDelete={true}
                    />
                    <Moment format="D MMM YYYY" style={{marginLeft: "25px", color: "grey", fontSize: "0.8rem"}}>{post.date}</Moment>
                  </section>
                  <hr />

                  <AddComment postId={post._id} />
                </div>
              </div>
            </div>

            
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getSuggestionList,
  addLikePosts,
  removeLikePosts,
  savePosts,
  unsavePosts,
})(PostItem);
