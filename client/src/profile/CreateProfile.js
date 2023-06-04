import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import classnames from "classnames";
import PropTypes from "prop-types";

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
      phone: this.state.phone,
      gender: this.state.gender,
    };
    this.props.createProfile(profileData, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
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
            </Fragment>);
     }
      return (
      <div className='profile-form-container'>
        <div className='card profile-form-card'>
          <div className='card-body profile-form-card-body'>
            <h3 style={{ textAlign: "center" }}>Create Profile</h3>
            <hr className='profile-form-horizontal-line' />

            <form onSubmit={this.onSubmit}>
              <div className='form-group row profile-form-row'>
                <label className='col-lg-3 col-form-label'>Username</label>
                <input
                  type='text'
                  className={classnames("form-control col-lg-9", {
                    "is-invalid": errors.handle,
                  })}
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                />
                {errors.handle && (
                  <div
                    style={{ textAlign: "center" }}
                    className='invalid-feedback'
                  >
                    {errors.handle}
                  </div>
                )}
              </div>

              <div className='form-group row profile-form-row'>
                <label className='col-lg-3 col-form-label'>Website</label>
                <input
                  type='text'
                  className={classnames("form-control col-lg-9", {
                    "is-invalid": errors.website,
                  })}
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                />
                {errors.website && (
                  <div
                    style={{ textAlign: "center" }}
                    className='invalid-feedback'
                  >
                    {errors.website}
                  </div>
                )}
              </div>

              <div className='form-group row profile-form-row'>
                <label className='col-lg-3 col-form-label'>Bio</label>
                <textarea
                  className='form-control col-lg-9'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                />
              </div>

              <div className='form-group row profile-form-row'>
                <label className='col-lg-3 col-form-label'>Phone</label>
                <input
                  type='tel'
                  className={classnames("form-control col-lg-9", {
                    "is-invalid": errors.phone,
                  })}
                  name='phone'
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                {errors.phone && (
                  <div
                    style={{ textAlign: "center" }}
                    className='invalid-feedback'
                  >
                    {errors.phone}
                  </div>
                )}
              </div>

              <div className='form-group row profile-form-row'>
                <label className='col-lg-3 col-form-label'>Gender</label>
                <input
                  type='text'
                  className='form-control col-lg-9'
                  name='gender'
                  value={this.state.gender}
                  onChange={this.onChange}
                />
              </div>

              {/* <label className='col-form-label'>Social Network Links</label> */}
               <div className="mb-3">
                   <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">  Optional</span>
                </div>
                {socialInputs}


              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-primary'
                  style={{ marginRight: "10px" }}
                />
                <Link to='/home' className='btn btn-secondary'>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
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
const mapStateToProps =  state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
