import React, { Component } from 'react'
import {connect} from "react-redux";
import { getSuggestionList } from "../../actions/profileActions";
import spinner from "../common/spinner.gif";
import SuggestionLists from "./SuggestionLists";
import { Link } from "react-router-dom";

class SuggestionsBox extends Component {
  componentDidMount() {
    this.props.getSuggestionList();
  }

  render() {
    const { auth, profile } = this.props;
    //Get avatar from redux store
    const avatar = profile.currentProfile ? profile.currentProfile.user.avatar : spinner;
    let suggestionList;
    if (profile.profiles && profile.profiles.length > 0) {
      suggestionList = <SuggestionLists profiles={profile.profiles} />;
    }

    return (
       <div className='card d-none d-xl-block' 
       style={{
         // marginTop: "60px",
         // marginLeft: "20px",
         backgroundColor: "#fafafa",
         width: "300px",
         height: "500",
         border: "none",
        //  position: "absolute",
        //  right: "100px",
         marginTop: "15px",
       }}>
        {/* Avatar of current user */}
        <div
                // className='card-header'
                style={{
                  backgroundColor: "#fafafa",
                  border: "none",
                }}
              >
                <Link to='/current-profile'>
                  <img
                    className='avatar-icon'
                    src={avatar}
                    alt='Avatar'
                    style={{
                      marginLeft: ".5px",
                      width: "60px",
                    }}
                  />
                </Link>
                <Link to='/current-profile' className='name-of-account'>
                  {auth.user.name}
                </Link>
              </div>

              {/* Suggestions lists */}
              <div
                style={{
                  marginLeft: "10px",
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                Suggestions For You
                <Link to='/explore' style={{ float: "right", color: "black" }}>
                  See All
                </Link>
              </div>

              {/* <SuggestionLists profiles={profile.profiles}/> */}
              {suggestionList}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getSuggestionList
})(SuggestionsBox);

