import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Post from "./components/displayPost/Post";
import CreateProfile from "./components/profile/CreateProfile";
import CreatePost from "./components/displayPost/CreatePost";
import Profiles from "./components/profile/Profiles";
import Posts from "./components/home/Posts";
import CurrentProfile from "./components/profile/CurrentProfile";
import HandleProfile from "./components/profile/HandleProfile";
import PrivateRoute from "./components/common/PrivateRoute";
//redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logoutUser } from "./actions/authActions";
import { getCurrentProfile } from "./actions/profileActions";
import NotFound from "./components/common/NotFound";
import Gallery from './components/gallery/Gallery';
import UploadAvatar from './components/profile/UploadAvatar'

//Check for token
if (localStorage.jwtToken) {
  //Set auth header with the token
  setAuthToken(localStorage.jwtToken);
  //Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //Write user data to redux store
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "/";
  } else {
    store.dispatch(getCurrentProfile());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/' component={Login} />
            <Switch>
              <PrivateRoute
                exact
                path='/current-profile'
                component={CurrentProfile}
              />{" "}
            </Switch>
            <Switch>
              <PrivateRoute exact path='/profile' component={CurrentProfile} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />{" "}
            </Switch>
            <Switch>
              {" "}
              <PrivateRoute exact path='/post/:id' component={Post} />
              <PrivateRoute
                exact
                path='/profile/:handle'
                component={HandleProfile}
              />{" "}
            </Switch>
            <Switch>
              {" "}
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />{" "}
            </Switch>
            <Switch>
              {" "}
              <PrivateRoute
                exact
                path='/create-post'
                component={CreatePost}
              />{" "}
            </Switch>
            <Switch>
              {" "}
              <PrivateRoute exact path='/explore' component={Profiles} />{" "}
            </Switch>
            <Switch>
              {" "}
              <PrivateRoute exact path='/home' component={Posts} />{" "}
              {/* <PrivateRoute
                exact
                path='/home/:handle'
                component={HandleProfile}
              />{" "} */}
            </Switch>
            <Switch>
              {" "}
              <PrivateRoute exact path='/not-found' component={NotFound} />{" "}
            </Switch>
            <Switch>
              <PrivateRoute exact path='/gallery' component={Gallery} />{" "}
            </Switch>
            <Switch>
              <PrivateRoute exact path='/upload' component={UploadAvatar} />{" "}
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
