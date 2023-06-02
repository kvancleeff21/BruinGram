import React from "react";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

// import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import ImageDisplay from './pages/Image-display';
import UserProfile from './pages/Userprofile';
import Search from "./pages/Search";

import logo from "./logo.svg";

// Run npm start to start the front end server

function App() {
  return (
    <BrowserRouter>
    {/* 
    {navbar} is for {navitem} formatting
    {navbar-expand} and {navbar-nav} is for making the vertical list horizontal

    Use https://getbootstrap.com/docs/4.0/utilities/spacing/ for spacing {eg mt-3} or padding {eg p-2} for the div class

    bootstrap nav is built with flexbox https://getbootstrap.com/docs/4.4/components/navs/
    Trying to use {justify-content-between} and maybe {container} takes 3 d-flex items and makes it Left, Middle, Center via Flexbox properties: https://getbootstrap.com/docs/4.0/utilities/flex/

    */}
    
      <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
        {/* Left */}
        <div class="">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/Upload" className="nav-link">Upload</Link></li>
            <li className="nav-item"><Link to="/Register" className="nav-link">Register</Link></li>
            <li className="nav-item"><Link to="/Login" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/" className="nav-link">Profile</Link></li>
            <li className="nav-item"><Link to="/search" className="nav-link">Search</Link></li>
          </ul>
        </div>
        
        {/* Middle */}
        <div class="mx-auto order-0">
          <ul class="navbar-nav">
            <li class="nav-item">
              <img src={logo} width="30" height="30" class="navbar-brand mx-auto" alt="BruinGram Logo"/>
            </li>
            <li class="nav-item"> <Link to="/" className="navbar-brand">BruinGram</Link> </li>
          </ul>
        </div>

        {/* Right */}
        <div class="">
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          </form>
        </div>
      </nav>

      {/* Routes provides a "path" which references our pages*/}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Upload" element={<Upload />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/post/:postId" element={<ImageDisplay />}/>
        <Route path="/user/:userId" element={<UserProfile />}/>
        <Route path="/search" element={<Search />}/>
      </Routes> 

      {/* Old NavBar is ./components/navbar: <NavBar></NavBar> */}
    </BrowserRouter>
  );
}

export default App;
