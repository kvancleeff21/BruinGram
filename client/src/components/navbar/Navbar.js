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
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
  
