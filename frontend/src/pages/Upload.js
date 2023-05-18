import React from 'react'
import React, { useState, useEffect } from 'react';


export default function Upload() {
    document.title = 'BruinGram | New Post';

    // current user, must be signed in
    const [user, setUser] = useState(); 
    const [newPost, setPost] = useState({ 
      caption: '',
      author: user,
      // can be helpful for "recommending" posts/users
      // "A B C" separated by spaces; idk if working with a list would be easier...
      tagged: '', 
      likes: '',
      comments: '',
    });
    // handling multiple images
    const [images, setImages] = useState([]);
    
    return (
      <div>
        {user && <div className='status'>You are not logged in!</div>}
        <div className="row">
          <p>Caption: </p>
          <input type="text" onChange={handleChange} />
        </div>
        <div className="row">
          <p>Tagged: </p>
          <input type="text" onChange={handleChange} />
        </div>
      </div>
    );
  };