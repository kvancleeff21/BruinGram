import React,{useState, useEffect, useContext} from "react";
import { useParams, useNavigate  } from "react-router-dom";
import {UserContext} from '../App.js'

export default function UpdateProfile(){
    //const {userId} = useParams()
    // It seems that username is not set up correctly when data is set
    // So trying to access it causes an error. Using a separate state allows us to only use it if its ready
    //const [username,setUsername] = useState([])
    //console.log("User ID " + userId)
    // const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

/*
avatar
bio
dateOfBirth
email
gender
name
phoneNumber
tick
username
website

*/

async function handleSubmit(e) {
    e.preventDefault();

    // For some reason getting the files by searching for the element works rather than using selectedImage
    const fileInput = document.getElementById('avatar');
    const files = fileInput.files[0];

    const formData = new FormData();
    files && formData.append('avatar', files);
    username.length !== 0 && formData.append("username",username);
    password.length !== 0 && formData.append("password",password);
    email.length !== 0 && formData.append("email",email);
    bio.length !== 0 && formData.append("bio",bio);
    dateOfBirth && formData.append("dateOfBirth",dateOfBirth);
    gender.length !== 0 && formData.append("gender",gender);
    name.length !== 0 && formData.append("name",name);
    phoneNumber.length !== 0 && formData.append("phoneNumber",phoneNumber);
    website.length !== 0 && formData.append("website",website);

    // Lets log the files just to make sure we are sending the right things
    console.log(files);
    console.log(formData);

    // // I am having trouble using axios and putting the authorization headers so I going to use what I know
    const response = await fetch("http://localhost:8000/me",{
    method:"PATCH",
    headers:{
    // I am putting the authorization token in the localStorage so we know who is logged in.
    // This probably is not the most secure way but it works
    // To see your local storage: inspect the page -> click on Application tab(might have to click on the '>>' first -> Local Storage) 
    "Authorization":"Bearer "+localStorage.getItem("jwt"),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS'
    },
    body:formData
    }).then(res=>res.json())
    .then(data=>{
    console.log(data);
        if(data.errors){
            console.log("This is an error!" + JSON.stringify(data.errors));
            alert(data.errors.message);
            setError(data.errors.message);
        }else{
            console.log("Registered Success!");
            navigate('/', { replace: true });
        // We might want to navigate to their profile once we upload
        }
    })
    .catch(err=>{
        alert(err);
        console.log(err)
        setError(err);
    })
    }

    const handleFileEvent =  (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        // Sending a large file to backend causes multer to crash without any error message
        // Here is an attempt to limit file size in the frontend.

        const fileSize = selectedFile.size / 1024 / 1024; // in MiB
        if (fileSize > 2) { // So far multer does not crash at 6 MiB but lets put 2 to be safe
            alert('File size exceeds 2 MiB');
            setError('File size exceeds 2 MiB');
            return;
        }else{
            setError('');
            setSelectedImage(selectedFile);
            setPreviewImage(URL.createObjectURL(selectedFile))
        }
    }

    return (
    <div>
        <h1>Edit Profile</h1>
        <div className="profile">

            <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>Profile Picture</div>
                <input id='avatar' type='file' name='avatar'
                    accept='image/png, image/jpg, image/jpeg'
                    onChange={handleFileEvent}
                />
                {previewImage && <img src={previewImage} alt="Preview" style={{width:"200px", height:"200px", objectFit:"cover", borderRadius:"100px"}} />}
                <div className="row">
                    <p>Username: </p>
                    <input type="text"onChange={(e) => setUsername(e.target.value)}/>

                    <p>Email: </p>
                    <input type="text"  onChange={(e) => setEmail(e.target.value)}/>
{/* 
                    <p>Password: </p>
                    <input type="text" onChange={(e) => setPassword(e.target.value)}/> */}
                    <p>Bio: </p>
                    <input type="text" onChange={(e) => setBio(e.target.value)}/>
                    <p>dateOfBirth: </p>
                    <input type="text" onChange={(e) => setDateOfBirth(e.target.value)}/>
                    <p>gender: </p>
                    <input type="text" onChange={(e) => setGender(e.target.value)}/>
                    <p>name: </p>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                    <p>phoneNumber: </p>
                    <input type="text" onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <p>website: </p>
                    <input type="text" onChange={(e) => setWebsite(e.target.value)}/>
                </div>


                <button style={{maxWidth:"200px"}}
                disabled={!selectedImage}
                >
                Save Changes
                </button>
            </form>
        </div>
        {error !== null &&
            <p className="Error">
              {error.message}
            </p>
        }
    </div>
    )
}