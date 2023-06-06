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
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
  
