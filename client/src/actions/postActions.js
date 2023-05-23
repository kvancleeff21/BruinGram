import axios from "axios";
import { GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, CLEAR_ERRORS, GET_USER_POSTS, CLEAR_POST, CLEAR_POSTS } from "./types";


//Add post
export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => {
      window.alert("Post successfully submitted")
      history.push("/profile")})
    .catch(err => 
      dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//Get post by id
export const getPost = (postId, history) => dispatch => {
  dispatch(clearPost());
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      console.log(res.data);
      dispatch({
      type: GET_POST,
      payload: res.data
    })})
    .catch(err => {
      history.push("/not-found")
    })
};

//Get post by id
export const refreshPost = (postId) => dispatch => {
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      console.log(res.data);
      dispatch({
      type: GET_POST,
      payload: res.data
    })})
    .catch(err => {
      // history.push("/not-found")
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

//Delete post
export const deletePost = (postId, history) => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => {
      // console.log(res.data);
      history.push("/profile")})
    .catch(err => {
      // console.log(err);
      dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

//Add comment
export const addComment = (commentInput, postId) => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentInput)
    .then(res => {
       console.log(res.data);
      // dispatch({
      //   type: GET_POST,
      //   payload: res.data
      // })
      dispatch(refreshPost(postId));
    })
    .catch(err => {
      // console.log(err.response.data);
      dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })})
}
// Add comment in postfeed
//Add comment
export const addCommentPosts = (commentInput, postId) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentInput)
    .then((res) => dispatch(refreshGetFollowingPosts()))
    .catch((err) => {
      // console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
}

//Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => {
      // console.log(res.data);
      // dispatch({
      //   type: GET_POST,
      //   payload: res.data
      // })
      dispatch(refreshPost(postId));
    })
    .catch(err => {
      // console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
}
//Get all posts of current user
export const getUserPosts = () => dispatch => {
  dispatch(setPostLoading());
axios
  .get("api/posts/currentUser")
  .then((res) => {
    // console.log(res);
    dispatch({
      type: GET_USER_POSTS,
      payload: res.data,
    });
  })
  .catch((err) => {
    // console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  });
}
//Get all posts of another user by their handle
export const getOtherUsersPosts = (handle) => dispatch => {
  console.log("posts by handle")
  dispatch(setPostLoading());
axios
  .get(`/api/posts/otheruserposts/${handle}`)
  .then((res) => {
    // console.log(res);
    dispatch({
      type: GET_USER_POSTS,
      payload: res.data,
    });
  })
  .catch((err) => {
    // console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  });
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
// Like a post 
export const addLike = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then((res) => {
    //  dispatch({
    //    type: GET_POST,
    //    payload: res.data,
    //  });
    dispatch(refreshPost(postId));
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// UnLike a post 
export const removeLike = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then((res) => {
      // dispatch({
      //   type: GET_POST,
      //   payload: res.data,
      // });
      dispatch(refreshPost(postId));
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Get all posts except current user's
export const allPostsExceptCurrentUsers = () => (dispatch) => {
  dispatch(clearPosts());
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/selected`)
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get all posts from following list
export const getFollowingPosts = () => (dispatch) => {
  dispatch(clearPosts());
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/following`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get all posts from following list without clearPost or setLoading
// the reason we need 2 actions are similar: getFollowingPosts and refreshPosts are --- getFollowingPosts are used when we move from other page to Home page -- the posts list in Redux store need to be clear

export const refreshGetFollowingPosts = () => (dispatch) => {

  axios
    .get(`/api/posts/following`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a post in PostFeed
export const addLikePosts = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then((res) => dispatch(refreshGetFollowingPosts()))
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// UnLike a post in PostFeed
export const removeLikePosts = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then((res) => dispatch(refreshGetFollowingPosts()))
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// save posts in PostFeed
export const savePosts= (postId) => (dispatch) => {
  axios
    .post(`/api/posts/save/${postId}`)
    .then((res) => dispatch(refreshGetFollowingPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    ); 
    
};

// Unsave a post in PostFeed
export const unsavePosts = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/unsave/${postId}`)
    .then((res) => dispatch(refreshGetFollowingPosts()))
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// save post
export const savePost = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/save/${postId}`)
    .then((res) => {
      dispatch(refreshPost(postId));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

};

// Unsave post

export const unsavePost = (postId) => (dispatch) => {
  axios
    .post(`/api/posts/unsave/${postId}`)
    .then((res) => {
      // dispatch({
      //   type: GET_POST,
      //   payload: res.data,
      // });
      dispatch(refreshPost(postId));
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
}; 
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearPost = () => {
  return {
    type: CLEAR_POST
  }
}

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}
