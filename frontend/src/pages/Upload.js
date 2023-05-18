import React from 'react'
import React, { useState, useEffect } from 'react';


export default function Upload() {
    document.title = 'BruinGram | New Post';
    // const user = app.currentUser;
  
    const [user, setUser] = useState(); // for linking the user's id to a listing in mongo
    const [newPost, setPost] = useState({
      caption: '',
      author: user,
      // can be helpful for "recommending" posts/users
      // "A B C" separated by spaces; idk if working with a list would be easier...
      tagged: '', 
      likes: '',
      comments: '',
    });
    const [images, setImages] = useState([]);
  };