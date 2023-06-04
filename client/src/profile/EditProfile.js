import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import Spinner from '../common/Spinner'

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      website: "",
      bio: "",
      phone: "",
      gender: "",
      facebook: "",
      youtube: "",
      twitter: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
   
  
  onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      website: this.state.website,
      bio: this.state.bio,
      gender: this.state.gender,
      phone: this.state.phone,
    };
    this.props.createProfile(profileData, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.currentProfile) {
      const profile = nextProps.profile.currentProfile;

      // If profile field doesnt exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.gender = !isEmpty(profile.website) ? profile.gender : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";

      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        gender: profile.gender,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
      });
    }
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    const { currentProfile } = this.props.profile;
    let content;
    if(currentProfile){
    console.log(currentProfile.handle)}
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <Fragment>
          <div className='form-group row profile-form-row'>
            <label className='col-lg-3 col-form-label'>Twitter</label>
            <div className='input-group col-lg-9 profile-form-input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text profile-form-input-group-text'>
                  <i className='fab fa-twitter'></i>
                </span>
              </div>
              <input
                style={{ fontSize: "14px" }}
                type='text'
                className={classnames("form-control", {
                  "is-invalid": errors.twitter,
                })}
                placeholder='Twitter URL'
                name='twitter'
                value={this.state.twitter}
                onChange={this.onChange}
              />
              {errors.twitter && (
                <div
                  style={{ textAlign: "center" }}
                  className='invalid-feedback'
                >
                  {errors.twitter}
                </div>
              )}
            </div>
          </div>

          <div className='form-group row profile-form-row'>
            <label className='col-lg-3 col-form-label'>Facebook</label>
            <div className='input-group col-lg-9 profile-form-input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text profile-form-input-group-text'>
                  <i className='fab fa-facebook'></i>
                </span>
              </div>
              <input
                style={{ fontSize: "14px" }}
                type='text'
                className={classnames("form-control", {
                  "is-invalid": errors.facebook,
                })}
                placeholder='Facebook URL'
                name='facebook'
                value={this.state.facebook}
                onChange={this.onChange}
              />
              {errors.facebook && (
                <div
                  style={{ textAlign: "center" }}
                  className='invalid-feedback'
                >
                  {errors.facebook}
                </div>
              )}
            </div>
          </div>

          <div className='form-group row profile-form-row'>
            <label className='col-lg-3 col-form-label'>Youtube</label>
            <div className='input-group col-lg-9 profile-form-input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text profile-form-input-group-text'>
                  <i className='fab fa-youtube'></i>
                </span>
              </div>
              <input
                style={{ fontSize: "14px" }}
                type='text'
                className={classnames("form-control", {
                  "is-invalid": errors.youtube,
                })}
                placeholder='YouTube URL'
                name='youtube'
                value={this.state.youtube}
                onChange={this.onChange}
              />
              {errors.youtube && (
                <div
                  style={{ textAlign: "center" }}
                  className='invalid-feedback'
                >
                  {errors.youtube}
                </div>
              )}
            </div>
          </div>
        </Fragment>
      );
    }
 if( currentProfile && currentProfile.user) {
  content = (
    <div className='card-body profile-form-card-body'>
      <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
      <hr className='profile-form-horizontal-line' />

      <div className='row' style={{ marginBottom: "20px" }}>
        <div className='col-lg-3 col-sm-3 col-md-3'>
          <img
            className='rounded-circle editProfileAvatar'
            src={currentProfile.user.avatar}
            alt='avatar'
            style={{ width: "50px" }}
          />
        </div>
        <h6
          className='col-lg-9 col-sm-9 col-md-9 nameLeftMargin'
          style={{
            paddingLeft: "0",
            paddingTop: "15px",
            textAlign: "left",
            fontSize: "1.2rem",
            paddingBottom: "4px",
          }}
        >
          {currentProfile.handle}
        </h6>
      </div>
      <form onSubmit={this.onSubmit}>
        <div className='form-group row profile-form-row'>
          <label className='col-lg-3 col-form-label'>Username</label>
          <input
            type='text'
            className='form-control col-lg-9'
            // className={classnames("form-control col-lg-9", {
            //   "is-invalid": errors.handle,
            // })}
            name='handle'
            disabled='disabled'
            value={currentProfile.handle}
            style={{ fontSize: "14px" }}
            // onChange={this.onChange}
          />
          {/* {errors.handle && (
            <div style={{ textAlign: "center" }} className='invalid-feedback'>
              {errors.handle}
            </div>
          )} */}
        </div>

        <div className='form-group row profile-form-row'>
          <label className='col-lg-3 col-form-label'>Website</label>
          <input
            style={{ fontSize: "14px" }}
            type='text'
            className={classnames("form-control col-lg-9", {
              "is-invalid": errors.website,
            })}
            name='website'
            value={this.state.website}
            onChange={this.onChange}
          />
          {errors.website && (
            <div style={{ textAlign: "center" }} className='invalid-feedback'>
              {errors.website}
            </div>
          )}
        </div>

        <div className='form-group row profile-form-row'>
          <label className='col-lg-3 col-form-label'>Bio</label>
          <textarea
            style={{ fontSize: "14px" }}
            className='form-control col-lg-9'
            name='bio'
            value={this.state.bio}
            onChange={this.onChange}
          />
        </div>

        <div className='form-group row profile-form-row'>
          <label className='col-lg-3 col-form-label'>Phone</label>
          <input
            style={{ fontSize: "14px" }}
            type='tel'
            className={classnames("form-control col-lg-9", {
              "is-invalid": errors.phone,
            })}
            name='phone'
            value={this.state.phone}
            onChange={this.onChange}
          />
          {errors.phone && (
            <div style={{ textAlign: "center" }} className='invalid-feedback'>
              {errors.phone}
            </div>
          )}
        </div>

        <div className='form-group row profile-form-row'>
          <label className='col-lg-3 col-form-label'>Gender</label>
          <input
            style={{ fontSize: "14px" }}
            type='text'
            className='form-control col-lg-9'
            name='gender'
            value={this.state.gender}
            onChange={this.onChange}
          />
        </div>

        {/* <label className='col-form-label'>Social Network Links</label> */}
        <div className='mb-3'>
          <button
            type='button'
            onClick={() => {
              this.setState((prevState) => ({
                displaySocialInputs: !prevState.displaySocialInputs,
              }));
            }}
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span className='text-muted'> Optional</span>
        </div>
        {socialInputs}

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary'
            style={{ marginRight: "10px" }}
          />
          <Link to='/profile' className='btn btn-secondary'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
} else {
  content = <Spinner />
}
    return (
      <div className='profile-form-container'>
        <div className='card profile-form-card'>
         {content}
        </div>
      </div>


    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
