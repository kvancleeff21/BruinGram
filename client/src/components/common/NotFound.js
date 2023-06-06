import React, { Component } from 'react'
import "./notfound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <div className="not-found-text">Page Not Found</div>
        <div className="not-found-subtext">Sorry, this page does not exist!</div>
      </div>
    )
  }
}

export default NotFound;
