import React, { Component, Fragment } from 'react';
import avatar from '../../img/avatar.png';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { followUser, unfollowUser } from "../../actions/profileActions";

class ProfileCard extends Component {
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
    const { profile } = this.props;
    return (
     

    
         <div className='d-flex'>
          <div
            style={{
              width: "10rem",
              height: "10rem",
              margin: "10px",
              marginBottom: "100px"
            }}
          >
            {" "}
            <Link to={`/profile/${profile.handle}`}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "5%",
                  borderTopRightRadius: "5%",
                }}
                src={profile.user.avatar}
              />
            </Link>
            <div
              style={{
                borderLeft: "1px solid rgba(var(--ce3,219,219,219),1)",
                borderRight: "1px solid rgba(var(--ce3,219,219,219),1)",
                borderBottom: "1px solid rgba(var(--ce3,219,219,219),1)",
                height: "90px",
                borderBottomLeftRadius: "5%",
                borderBottomRightRadius: "5%",
                boxShadow: "0 1px 5px 1px #cccccc",
                marginTop: "-7px",
              }}
            >
              <div
                className='profile-card-truncate-text'
                style={{ marginTop: "5px", lineHeight: "34px" }}
              >
                {profile.user.name}
              </div>
              <div className='profile-card-card-footer' style={{textAlign:"center", marginTop:"-10px"}}>
                {!this.state.follow && (
                  <button
                    className='btn profile-card-button-follow'
                    onClick={this.handleFollow.bind(this, profile._id)}
                  >
                    Follow
                  </button>
                )}
                {this.state.follow && (
                  <button
                    className='btn profile-card-button-unfollow'
                    onClick={this.handleUnfollow.bind(this, profile._id)}
                  >
                    Following
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
     
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { followUser, unfollowUser})(ProfileCard);

