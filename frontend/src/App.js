import React from "react";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import ImageDisplay from './pages/Image-display';

import logo from "./logo.svg";

// Run npm start to start the front end server

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        {/* Left */}
        <div className="navbar-collapse w-100 order-1">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active"><Link to="/App.js" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/Register" className="nav-link">Register</Link></li>
            <li className="nav-item"><Link to="/Login" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/Display" className="nav-link">Display</Link></li>
            <li className="nav-item"><Link to="/" className="nav-link">Profile</Link></li>
          </ul>
        </div>

        {/* Middle */}
        <div class="navbar-collapse w-100 order-2">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <img src={logo} width="30" height="30" class="navbar-brand mx-auto" alt="BruinGram Logo"/>
                </li>
                <li class="nav-item">
                  <Link to="/App" className="navbar-brand">BruinGram</Link>
                </li>
            </ul>
        </div>

        {/* Right */}
        <div class="navbar-collapse w-100 order-3">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <input type="text" placeholder="Search..."/>
                </li>
            </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Upload" element={<Upload />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Display" element={<ImageDisplay />}/>
      </Routes> 
      {/* <NavBar></NavBar> */}
    </BrowserRouter>
  );
}

export default App;