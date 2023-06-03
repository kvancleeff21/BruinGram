import React, { useState } from 'react';
//import axios from 'axios';


export default function Upload() {
    document.title = 'BruinGram | New Post';

    // current user, must be signed in
    // const [user, setUser] = useState(-1); 
    const [caption, setCaption] = useState('');
    // const [author, setAuthor] = useState('');
    const [tagged, setTagged] = useState([]);
    // const [likes, setLikes] = useState(1);
    // const [comments, setComments] = useState([]);

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

    // const [images, setImages] = useState([]);
    const [status, setStatus] = useState('typing');
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);


    if (status === 'success') {
      return <h1>Posted!</h1>
    }

    async function handleSubmit(e) {
      e.preventDefault();
      setStatus('submitting');

      // For some reason getting the files by searching for the element works rather than using selectedImage
      const fileInput = document.getElementById('fileUpload');
      const files = fileInput.files;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      formData.append("description",caption);

      // Lets log the files just to make sure we are sending the right things
      console.log(files);

      // I am having trouble using axios and putting the authorization headers so I going to use what I know
      fetch("http://localhost:8000/",{
      method:"post",
      headers:{
        // I am putting the authorization token in the localStorage so we know who is logged in.
        // This probably is not the most secure way but it works
        // To see your local storage: inspect the page -> click on Application tab(might have to click on the '>>' first -> Local Storage) 
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:formData
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
          if(data.errors){
            console.log("This is an error!" + JSON.stringify(data.errors));
            alert(data.errors.message);
            setStatus('typing');
            setError(data.errors.message);
          }else{
            console.log("Registered Success!");
            setStatus('success');
            // We might want to navigate to their profile once we upload
          }
      })
      .catch(err=>{
        alert(err);
        setStatus('typing');
        console.log(err)
        setError(err);
      })
    }

    function handleTextareaChange(e) {
      setCaption(e.target.value);
    }

    function handleTagChange(e) {
      setTagged(e.target.value);
    }

//     // Image Uploading
//     const handleImageUpload = async () => {
//       try {
//         const formData = new FormData();
//         formData.append('image', selectedImage);
// // Need to fix destination, but I think this should work?
//         const response = await axios.post('http://localhost:8000/api/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
  
//         console.log('Image uploaded successfully:', response.data);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     };
  
    // const handleImageChange = (event) => {
    //   const selectedFile = event.target.files[0];
    //   setSelectedImage(selectedFile);
    //   setPreviewImage(URL.createObjectURL(selectedFile));
    // };

    const handleFileEvent =  (e) => {
      const selectedFile = e.target.files;
      let previewImages = []
      // Sending a large file to backend causes multer to crash without any error message
      // Here is an attempt to limit file size in the frontend.
      for (let i = 0; i < selectedFile.length; i++) {
        const fileSize = selectedFile[i].size / 1024 / 1024; // in MiB
        if (fileSize > 2) { // So far multer does not crash at 6 MiB but lets put 2 to be safe
          alert('File size exceeds 2 MiB');
          setError('File size exceeds 2 MiB');
          return;
        }else{
          previewImages.push(URL.createObjectURL(selectedFile[i]))
        }
      }
      // These probably should be plural to reflect that it is an array of images
      // But Im going to leave it
      setSelectedImage(selectedFile);
      setPreviewImage(previewImages);

    }

    return (
      <div>
        <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}>

          <input id='fileUpload' type='file' name='files' multiple
            accept='image/png, image/jpg, image/jpeg'
            onChange={handleFileEvent}
          />

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
            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            {previewImage && previewImage.map(m => (
                <img src={m} alt="Preview" style={{width:"300px", height:"200px", objectFit:"cover"}} />
            ))}
            {/* <button onClick={handleImageUpload}>Upload Image</button> */}
            <button style={{maxWidth:"200px"}} disabled={
              caption.length === 0 ||
              status === 'submitting' ||
              !selectedImage
            }>
              Upload Image
            </button>
          </div>

          <br></br>


          {error !== null &&
            <p className="Error">
              {error.message}
            </p>
          }
        </form>
      </div>
    );
}