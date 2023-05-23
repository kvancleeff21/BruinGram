import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILES, PROFILE_LOADING, GET_FOLLOWING, GET_ALL_PROFILES, GET_CURRENT_PROFILE, CLEAR_PROFILE } from "./types";
import setAuthToken from "../utils/setAuthToken";
import {logoutUser} from "./authActions";

// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/profile"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete profile and account
export const deleteAccount = (history) => (dispatch) => {
  console.log("delete ptofile action");
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) => {
        
        dispatch(logoutUser());
        
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: {},
        })
      );
  }
};
// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(clearCurrentProfile());
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    );
};
// Get profile by handle
export const getProfileByHandle = (handle, history) => dispatch => {
dispatch(clearProfile());
  dispatch(setProfileLoading());
  console.log('action getProfileby handle')
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>{
      // console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
     } )
    .catch(err =>{
      
      history.push("/not-found");
    });
};

// Get all profiles
export const getAllProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  console.log("get all profiles");
  axios
    .get(`/api/profile/all`)
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//Clear profile
export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  }
}

//Get suggestion list
export const getSuggestionList = () => dispatch => {
   dispatch(setProfileLoading());
  axios
    .get("/api/profile/suggestions")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILES,
        payload: {}
      })
    })
};

//Follow a user
export const followUser = (profileId) => dispatch => {
  axios
    .post(`/api/profile/follow/${profileId}`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

//Unfollow a user
export const unfollowUser = (profileId) => dispatch => {
  axios
    .post(`/api/profile/unfollow/${profileId}`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err);
    })
}

//Get following list of current user
export const getFollowingList = () => dispatch => {
  dispatch({
    type: GET_FOLLOWING,
    payload: null
  });
  axios
    .get("/api/profile/following")
    .then(res => {
      
      let result = res.data.filter((item) => item.user !== null);
      result = result.map(item => item.user.toString());
      dispatch({
        type: GET_FOLLOWING,
        payload: result
      })
    })
    .catch(err => console.log(err));
}
// Upload avatar
export const addPicture = (newPic, history) => dispatch => {
     console.log(newPic);
  axios.post('/api/users/editAvatar', newPic).then(res =>{
  window.alert("Profile picture uploaded")
  history.push("/profile")
  })
  .catch((err) => {
      // console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    });
};
// Remove avatar
export const removeAvatar = () => (dispatch) => {
         axios
           .put("/api/users/removeAvatar")
           .then((res) => window.location.reload(true))
           .catch((err) => {
             // console.log(err)
             dispatch({
               type: GET_ERRORS,
               payload: {},
             });
           });
         
       };