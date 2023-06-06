import React, { Component } from "react";
import "./navbar.css";
import logo from "../../img/logo.png";
import { Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Search from "../search/Search";
import spinner from "../common/spinner.gif";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      home: false,
      explore: false,
      gallery: false,
      avatarIcon: false,
    };
    this.logoutUserHandle = this.logoutUserHandle.bind(this);
  }

  logoutUserHandle(e) {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  }

  checkPathName(pathName) {
    if (pathName == "/home") {
      this.setState({
        home: true,
        explore: false,
        gallery: false,
        avatarIcon: false,
      });
    } else if (pathName == "/explore") {
      this.setState({
        home: false,
        explore: true,
        gallery: false,
        avatarIcon: false,
      });
    } else if (pathName == "/gallery") {
      console.log("hit gallery");
      this.setState({
        home: false,
        explore: false,
        gallery: true,
        avatarIcon: false,
      })
    } else if (pathName == "/profile" || pathName == "/current-profile") {
      this.setState({
        home: false,
        explore: false,
        gallery: false,
        avatarIcon: true,
      })
    } else {
      this.setState({
        home: false,
        explore: false,
        gallery: false,
        avatarIcon: false,
      })
    }
  }

  componentDidMount() {
    const pathName = this.props.history.location.pathname;
    this.checkPathName(pathName);
  };
  componentWillReceiveProps(nextProps) {
    const pathName = nextProps.history.location.pathname;
    this.checkPathName(pathName);
  }
  
  render() {
    // console.log(this.props.history);
    const {isAuthenticated, user} = this.props.auth;
    const { currentProfile } = this.props.profile;
    // current user (spinner if loading)
    const avatar = currentProfile ? currentProfile.user.avatar : spinner;
    const {home, explore, gallery, avatarIcon} = this.state;
    // navbar contents 
    const navbar = (
      <nav
        className='navbar navbar-light navbar-expand-lg'
        style={{ backgroundColor: "white", padding: "0px" }}
      >
        <div className='container'>
          <Link className='navbar-brand' to=''>
            <img className='logo-navbar' alt='BruinGram' src={logo} />
          </Link>

          <Search/>
          <ul style={{ marginTop: "auto", marginBottom: "auto" }}>
            <li>
              <Link to='/home'>
                {/* <i className='fa fa-home navbarIcon' aria-hidden='true'></i> */}
                {!home && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"/>
                  <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                </svg>}
                {home && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door-fill navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
                  <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                </svg>}
              </Link>
            </li>
            <li>
              <Link to='/explore'>
                {/* <i className='fa fa-compass navbarIcon' aria-hidden='true'></i> */}
                {!explore && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cursor navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                </svg>}
                {explore && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cursor-fill navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                </svg>}
              </Link>
            </li>
            <li>
              <Link to='/gallery'>
                {/* <i className='fas fa-images navbarIcon' aria-hidden='true'></i> */}
                {!gallery && <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-grid-3x3-gap navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 2H2v2h2V2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2H7v2h2V2zm5 0h-2v2h2V2zM4 7H2v2h2V7zm5 0H7v2h2V7zm5 0h-2v2h2V7zM4 12H2v2h2v-2zm5 0H7v2h2v-2zm5 0h-2v2h2v-2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
                </svg>}
                {gallery && <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-grid-3x3-gap-fill navbarIcons" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
                </svg>}
              </Link>
            </li>

            <li>
              <Link to='/profile'>
                {!avatarIcon && <img className='avatar navbarIcon' src={avatar} alt='Avatar' />}
                {avatarIcon && <img className='avatar navbarIcon' src={avatar} alt='Avatar'  style={{border: "1px solid black", padding: "1.5px"}}/>}
              </Link>
            </li>
            
            <li style={{ marginTop: "10px" }}>
              <Link
                onClick={this.logoutUserHandle}
                // style={{
                //   fontSize: "0.9em",
                //   fontFamily: "sans-serif",
                //   color: "black",
                // }}
              >
                <span className='navbarIcon' style={{ fontSize: "0.9em" }}>
                  Log out
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
    return (
      <div>
        {/* Check if user is isAuthenticated, if yes - show Navbar, if no - hide Navbar */}
        {isAuthenticated ? navbar : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
  
