import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from '../../App.js'
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "../../logo.svg";

//Pages to make = login page, home page, image uploading page, and image display page.

const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"))
    const renderList = ()=>{
        if (user){
        return[
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid" style={{flexDirection:"column", alignItems:"stretch"}}>
                    <div className="navbar-grid">
                        {/* Left */}
                        <div className="d-flex flex-fill">
                            <ul className="navbar-nav">
                                <li className="nav-item"><Link to="/Upload" className="nav-link">Upload</Link></li>
                                {/* <li className="nav-item"><Link to="/Register" className="nav-link">Register</Link></li>
                                <li className="nav-item"><Link to="/Login" className="nav-link">Login</Link></li> */}
                                <li className="nav-item"><Link to="/" className="nav-link">Profile</Link></li>
                                <li className="nav-item"><Link to="/search" className="nav-link">Search</Link></li>
                            </ul>
                        </div>

                        
                        {/* Middle */}
                        <div className="navbar-brand d-flex justify-content-center">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                <img src={logo} width="30" height="30" className="navbar-brand mx-auto" alt="BruinGram Logo"/>
                                </li>
                                <li className="nav-item"> <Link to="/" className="navbar-brand">BruinGram</Link> </li>
                            </ul>
                        </div>

                        {/* Right */}
                        <div className="d-flex flex-fill justify-content-end">
                            <ul className="navbar-nav">
                                <form className="form-inline my-2 my-lg-0">
                                </form>
                                <li>
                                    <button className="btn btn-info" type="button" name="action" 
                                        onClick={()=>{
                                        localStorage.clear()
                                        dispatch({type:"CLEAR"})
                                        navigate("Login");
                                        //window.location.reload()
                                    }}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        ]
    }else{
      return[
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid" style={{flexDirection:"column", alignItems:"stretch"}}>
            <div className="navbar-grid">
                {/* Left */}
                <div className="d-flex flex-fill">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/Register" className="nav-link">Register</Link></li>
                        <li className="nav-item"><Link to="/Login" className="nav-link">Login</Link></li>
                    </ul>
                </div>

                {/* Middle */}
                <div className="navbar-brand d-flex justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <img src={logo} width="30" height="30" className="navbar-brand mx-auto" alt="BruinGram Logo"/>
                        </li>
                        <li className="nav-item"> <Link to="/Login" className="navbar-brand">BruinGram</Link> </li>
                    </ul>
                </div>

                {/* Right */}
                <div className="d-flex flex-fill justify-content-end">
                    <ul className="navbar-nav">
                        <form className="form-inline my-2 my-lg-0">
                        </form>
                    </ul>
                </div>
            </div>
          </div>
        </nav>
      ]
    }
  }
    return (
    <div>
        {renderList()}
    </div>
    )
}

export default NavBar