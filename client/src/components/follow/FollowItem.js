import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { followUser, unfollowUser } from "../../actions/profileActions";

class FollowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollow: false
    };
  }

  componentDidMount() {
    const {follow, followingList} = this.props;
    if (followingList.indexOf(follow.user._id) === -1) {
      this.setState({isFollow: false})
    } else {
      this.setState({isFollow: true})
    }
  }

  handleFollow(profileId) {
    this.setState({isFollow: true});
    this.props.followUser(profileId);
  }
  handleUnFollow(profileId) {
    this.setState({isFollow: false});
    this.props.unfollowUser(profileId);
  }
  render() {
    const {follow, isCurrent} = this.props;

    let followButton;
    
    if (!isCurrent) {
      followButton = (
        <div className='spaceMargin col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
          {!this.state.isFollow && (
            <button
              className='btn'
              style={{
                lineHeight: "2px",
                float: "right",
                height: "30px",
                backgroundColor: "#0095f6",
                color: "white"
              }}
              onClick={this.handleFollow.bind(this, follow.profile)}
            >
             Follow 
            </button>
          )}
          {this.state.isFollow && (
            <button
              className='btn'
              style={{
                lineHeight: "2px",
                float: "right",
                height: "30px",
                backgroundColor: "white",
                border: "1px solid #dbdbdb",
                color: "black"
              }}
              onClick={this.handleUnFollow.bind(this, follow.profile)}
            >
             Following 
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="container" style={{marginBottom: "10px"}}>
        <div className="row">
          <div className='col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
            <Link to={`/profile/${follow.handle}`}>
              <img
                className='followers-avatar-icon'
                src={follow.user.avatar}
                alt='Avatar'
              />
            </Link>
          </div>

          <div className='col-sm-6 col-md-6 col-lg-6 col-xxs-6'>
          <Link
            to={`/profile/${follow.handle}`}
            class='fontStyleSizeColor'
            style={{ 
              marginLeft: "-50px", 
            fontSize: "16px" }}
          >
            {follow.handle}
          </Link>
          <div
            style={{
              marginTop: "-2px",
              marginLeft: "-50px",
              color: "#606060",
              fontSize: "-0.85em"
            }}
          >
            {follow.name}
          </div>
        </div>
            {followButton}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ 
});
export default connect(mapStateToProps, { followUser, unfollowUser })(FollowItem);
