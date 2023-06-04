import React, { Component, Fragment } from 'react';
import Profile from './Profile';
import { getCurrentProfile, getFollowingList } from "../../actions/profileActions";
import { getUserPosts } from "../../actions/postActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from '../common/Spinner';

class CurrentProfile extends Component {

 componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getUserPosts();
    this.props.getFollowingList();
  }
  render() {
    // console.log(this.props.profile.profile);
    const {currentProfile, loading, followingList } = this.props.profile;
    let content;
     const { userPosts, loadingPost } = this.props.post;
        // console.log(userPosts)
          if (loading || loadingPost || currentProfile === null || userPosts === null || followingList === null) {
            content = ( <Spinner /> )
          } else {
            content = (
              <div>
                <Profile
                  profile={currentProfile}
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
  getCurrentProfile: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  // auth: state.auth,
  profile: state.profile,
  post: state.post,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  getUserPosts,
  getFollowingList,
})(CurrentProfile);

