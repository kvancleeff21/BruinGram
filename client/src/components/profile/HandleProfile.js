import React, { Component, Fragment } from "react";
import Profile from "./Profile";
import { getOtherUsersPosts } from "../../actions/postActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfileByHandle, getFollowingList } from '../../actions/profileActions';
import { withRouter } from "react-router-dom";

class HandleProfile extends Component {
  componentDidMount() {
  // if (this.props.match.params.user_id) {
  //   this.props.getOtherUsersPosts(this.props.match.params.user_id);
  // }
   if (this.props.match.params.handle) {
    this.props.getProfileByHandle(this.props.match.params.handle, this.props.history);
    this.props.getOtherUsersPosts(this.props.match.params.handle);
    }
    this.props.getFollowingList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match && nextProps.match.params && this.props.match && this.props.match.params) {
      if (nextProps.match.params.handle !== this.props.match.params.handle) {
        // console.log(nextProps.match.params.handle);
        // console.log(this.props.match.params.handle)
        window.location.reload(true);
      }
    }
  }

  render() {
    // console.log(this.props.profile.profile);
    const { profile, loading, followingList } = this.props.profile;
    let content;
    const { userPosts, loadingPost } = this.props.post;
    // console.log(userPosts);
    // console.log(profile);
 

    if (loading || loadingPost || profile === null || userPosts === null || followingList === null) {
      content = ( <Spinner /> )
    } else {
      content = (
        <div>
          <Profile
            profile={profile}
            loading={loading}
            userPosts={userPosts}
            loadingPost={loadingPost}
            isCurrentProfile={true}
            followingList={followingList}
          />
        </div>
      );
    }
    return <div> {content}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getOtherUsersPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
  post: state.post,
});
export default connect(mapStateToProps, {
  getOtherUsersPosts,
  getProfileByHandle,
  getFollowingList
})(withRouter(HandleProfile));
