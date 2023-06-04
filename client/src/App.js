import React, {useEffect, createContext, useReducer, useContext} from 'react';
import {BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

// import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import NavBar from './components/navbar/navbar.js';
// import Home from './pages/Home';
// import Upload from './pages/Upload';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ImageDisplay from './pages/Image-display';
// import UserProfile from './pages/Userprofile';
// import Search from "./pages/Search";
// import UpdateProfile from "./pages/UpdateProfile";


import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

// Run npm start to start the front end server

const Routing = ()=>{
  
  const navigate = useNavigate()

  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    console.log(state)
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({ type: "USER", payload:user})
    }else{
      navigate("/Login")
      //console.log("navigate to login")
    }
  },[])

  return(
    <>
      <Routes>
        {/* <Route path="/" element={<Home />}/>
        <Route path="/Upload" element={<Upload />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/post/:postId" element={<ImageDisplay />}/>
        <Route path="/user/:userId" element={<UserProfile />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/UpdateProfile" element={<UpdateProfile />}/> */}
      </Routes> 
    </>

  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  const user = JSON.parse(localStorage.getItem("user"))

  return (
  <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;