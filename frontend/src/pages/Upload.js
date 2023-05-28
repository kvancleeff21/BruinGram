import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Upload() {
    document.title = 'BruinGram | New Post';

    // current user, must be signed in
    const [user, setUser] = useState(-1); 
    const [caption, setCaption] = useState('');
    const [author, setAuthor] = useState('');
    const [tagged, setTagged] = useState([]);
    const [likes, setLikes] = useState(1);
    const [comments, setComments] = useState([]);

    // const [newPost, setPost] = useState({ 
    //   caption: '',
    //   author: user,
    //   // can be helpful for "recommending" posts/users
    //   // "A B C" separated by spaces; idk if working with a list would be easier...
    //   tagged: '', 
    //   likes: '',
    //   comments: '',
    // });
    // handling multiple images

    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('typing');
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);


    if (status === 'success') {
      return <h1>Posted!</h1>
    }

    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('submitting');
      try {
        // await submitForm(answer);
        setStatus('success');
      } catch (err) {
        setStatus('typing');
        setError(err);
      }
    }
  
    function handleTextareaChange(e) {
      setCaption(e.target.value);
    }

    function handleTagChange(e) {
      setTagged(e.target.value);
    }
    // Image Uploading

    const handleImageUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);
// Need to fix destination, but I think this should work?
        const response = await axios.post('http://localhost:8000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  
    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>header</div>
          <div className="row">
            <p>Caption: </p>
            <input type="text" onChange={handleTextareaChange} disabled={status === 'submitting'} />
          </div>
          <div className="row">
            <p>Tagged: </p>
            <select id="state" name="state" defaultValue="CA" onChange={handleTagChange}>
              <option value="Friend 1">Friend 1</option>
              <option value="Friend 2">Friend 2</option>
              <option value="Friend 3">Friend 3</option>
            </select>
            {/* <input type="text" onChange={handleTagChange} disabled={status === 'submitting'} /> */}
          </div>
          <div className="row">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
          </div>

          <br></br>

          <button disabled={
            caption.length === 0 ||
            status === 'submitting'
          }>
            Submit
          </button>
          {error !== null &&
            <p className="Error">
              {error.message}
            </p>
          }
        </form>
      </div>
    );
}