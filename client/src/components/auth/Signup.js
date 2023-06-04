import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../img/logo.png';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import "./signup.css"; 

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",      
      password: "",
      password2: "",
      errors: {},
      handle: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,      
      password: this.state.password,
      password2: this.state.password2,
      handle: this.state.handle,
    };

    this.props.signupUser(newUser, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const {errors} = this.state;
    const {name} = this.state;
    const enabled = name.length > 0 ;
    return (
      <div className='margin'>
        <div className='d-flex flex-column'>
          <div className='card'>
            <div className='card-body'>
              <img className='logo' src={logo} alt='instagram' />
              <p className='info'>
                Sign up to see photos and videos from your friends.
              </p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder='Full Name'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.handle,
                    })}
                    placeholder='Username'
                    name='handle'
                    value={this.state.handle}
                    onChange={this.onChange}
                  />
                  {errors.handle && (
                    <div className='invalid-feedback'>{errors.handle}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder='Email'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder='Password2'
                    name='password2'
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className='invalid-feedback'>{errors.password2}</div>
                  )}
                </div>
                <input
                  type='submit'
                  value='Sign up'
                  disabled={!enabled}
                  
                  className='authButton'
                />
              </form>
              <br />
              <p className='terms'>
                By signing up,you agree to our{" "}
                <b>Terms, Data Policy and Cookies Policy.</b>
              </p>

              <p className='more-info'>
                Have an Account? &nbsp;
                <span>
                  <Link to='/'>Log in</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps, { signupUser })(withRouter(Signup));