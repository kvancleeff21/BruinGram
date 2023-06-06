import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../actions/profileActions";

class SuggestionItem extends Component {
  constructor() {
    super();
    this.state = {
      follow: false,
    };
  }

  handleFollow(profileId) {
    this.setState({ follow: true });
    this.props.followUser(profileId);
  }

  handleUnfollow(profileId) {
    this.setState({ follow: false });
    this.props.unfollowUser(profileId);
  }
  render() {
    const {profile} = this.props;
    return (
      <div style={{ marginTop: "10px", marginLeft: "10px" }}>
        <Link to={`/profile/${profile.handle}`}>
          <img
            className='rounded-circle profile-card-avatar'
            style={{ width: "50px" }}
            src={profile.user.avatar}
            alt='avatar'
          />
        </Link>
        <span
          style={{
            marginLeft: "10px",
            color: "black",
            fontFamily: "inherit",
            fontWeight: "600",
            textTransform: "lowercase",
          }}
        >
          {profile.handle}
        </span>
        <span style={{ float: "right", marginTop: "10px" }}>
          {!this.state.follow && (
            <Link onClick={this.handleFollow.bind(this, profile._id)}>
              Follow
            </Link>
          )}
          {this.state.follow && (
            <Link onClick={this.handleUnfollow.bind(this, profile._id)}>
              Following
            </Link>
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { followUser, unfollowUser })(SuggestionItem);
