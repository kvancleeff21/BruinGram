import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// Pages
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Login from './pages/Login';
import ImageDisplay from './pages/Image-display';

// Run npm start to start the front end server

function App() {
  return (
    <BrowserRouter>
      <h1>Hello Bruins</h1>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Upload" element={<Upload />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Display" element={<ImageDisplay />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
