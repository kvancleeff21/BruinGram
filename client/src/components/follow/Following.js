import React, { Component } from "react";
import "./follow.css";

import { Link } from "react-router-dom";
import FollowItem from "./FollowItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Following extends Component {
 
  render() {
    if (!this.props.showFollowing && !this.seen) {
      return null;
    }
    const {following, auth, followingList} = this.props;
    
     let content;
     if (following.length > 0) {
     let filterFollowing = following.filter(follow => follow.user !== null); // check if user is null to filter out deleted profiles
       content = filterFollowing.map((following) => {
         if (auth.user.id === following.user._id) {
           return (
             <FollowItem
               key={following.id}
               follow={following}
               followingList={followingList}
               isCurrent={true}
             />
           );
         } else {
           return (
             <FollowItem
               key={following.id}
               follow={following}
               followingList={followingList}
               isCurrent={false}
             />
           );
         }
       });
     }
    return (
      <div className='first'>
        <div className='second'>
          <div className='third'>
            <div className='followers-container'>
              <h5>Following </h5>
              <span>
                <Link onClick={() => window.location.reload(true)} className='X'>
                  <i className="fas fa-times"></i>
                </Link>
              </span>
              <hr />

              <div className='container scrolling'>
                <div
                  className='row'
                  // style={{position: "relative"}}
                >
                  {content}
                </div>
              </div>
              {/* followers-container ends */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ 
  auth: state.auth
});
export default connect(mapStateToProps)(Following);

