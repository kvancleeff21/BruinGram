import React,{useState, useEffect} from "react";
import { useParams, Link, useNavigate  } from "react-router-dom";

export default function UserProfile(){
    const {userId} = useParams()
    // It seems that username is not set up correctly when data is set
    // So trying to access it causes an error. Using a separate state allows us to only use it if its ready
    //const [username,setUsername] = useState([])
    console.log("User ID " + userId)

    const navigate = useNavigate();
    const [data,setData] = useState([])
    // const [forYouData,setforYouData] = useState([])
    // const [followingData,setFollowingData] = useState([])
    const [profileData,setProfileData] = useState([])
     
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'

        // Fetch the user profile
        // Fetch the user's posts
        // let username = userId
        // username = username.replace(/"/g, '');
        // console.log(username);
        const url = `http://localhost:8000/user/${userId}`;
        console.log(url);
        fetch(url
        ,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        })

        const userurl = `http://localhost:8000/${userId}`;
        console.log(userurl);
        fetch(userurl
        ,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfileData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        })


        // fetch('http://localhost:8000/?'+ new URLSearchParams({
        //      type: 'forYou'
        //  })
        // ,{
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Authorization":"Bearer "+localStorage.getItem("jwt")
        //     }
        // }).then(res=>res.json())
        // .then(result=>{
        //     console.log(result)
        //     setforYouData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        // })

        // fetch('http://localhost:8000/?'+ new URLSearchParams({
        //      type: 'following'
        //  })
        // ,{
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Authorization":"Bearer "+localStorage.getItem("jwt")
        //     }
        // }).then(res=>res.json())
        // .then(result=>{
        //     console.log("Following")
        //     console.log(result)
        //     setFollowingData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        // })


    },[])
    
    return (
    <div>
        <h1>User Page</h1>
        <div className="profile">
            <h1>{profileData.username}</h1>
            <h3>{profileData.email}</h3>
            <h3>Follow: {!profileData.isFollow && <p>no</p>}</h3>
            <h3>Followers: {profileData.followersCount}</h3>
            <h3>Following: {profileData.followingsCount}</h3>
            <h3>Bio: {profileData.bio}</h3>
            <h5>Last active: {profileData.updatedAt}</h5>
            <h5>Created: {profileData.createdAt}</h5>
            <h5>Total Posts: {profileData.postCount}</h5>
        </div>

        <h2> {profileData.postCount} Posts </h2>
        <div className='posts' style={{display:"flex", flexWrap:"wrap", rowGap:"10px", paddingLeft:"20px"}}>
            {data.length == 0 && <h4>User has no posts</h4>}
            {data.map(item=>{
                return(
                    <div className='m'>

                        <div className='pic' style={{width:"480px", height:"480px"}}>
                            <img  
                            alt="posts" 
                            src={item.postAssets[0]} 
                            style={{width:"480px", height:"480px", objectFit:"cover"}}
                            onClick={()=>{navigate(`/${item._id}`)}}
                            />
                        </div>
                        <div>
                            <h5 style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{item.description}</h5>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    )
}