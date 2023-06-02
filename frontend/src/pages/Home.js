import React,{useState, useEffect} from "react";
import {Link, useNavigate  } from "react-router-dom";
//import "../css/Image-display.css"
// import axios from 'axios'
// import {CloudinaryContext, Transformation, Image} from 'cloudinary-react'
// import {render} from 'react-dom'

// class Main extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             gallery: []
//         }
//     }
//     componentDidMount(){
//         // Request images with specific tag (in this case "photo")
//         axios.get('https://res.cloudinary.com/nameOfCloud?/image/list/photo.json')
//          .then(res => {
//             console.log(res.data.resources);
//             this.setState({gallery: res.data.resources});
//          });
//     }
//     // Could add code here for upload using:
//     // uploadWidget() { . . .

//     render(){
//         return(
//             <div className="main">
//                 <h1>Gallery</h1>
//                 <div className="gallery">
//                     <CloudinaryContext cloudName="cloud_name">
//                         {
//                             this.state.gallery.map(data =>{
//                                 return (
//                                     <div className="responsive" key={data.public_id}>
//                                         <div className="img">
//                                             <a target = "_blank"
//                                             href={'https://res.cloudinary.com/cloudName/image/upload/${data.public_id}.jpg'}>
//                                                 <Image publicId={data.public_id}>
//                                                     <Transformation
//                                                         crop="scale"
//                                                         width="300"
//                                                         height="200"
//                                                         dpr="auto"
//                                                         responsive_placeholder="blank"
//                                                     />
//                                                 </Image>
//                                             </a>
//                                             <div className="desc">
//                                                 Created at {data.created_at}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </CloudinaryContext>
//                     <div className="clearfix"></div>
//                 </div>
//             </div>
//         )

//     }
// }

const Home = ()=>{
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [forYouData,setforYouData] = useState([])
    const [followingData,setFollowingData] = useState([])
    const [profileData,setProfileData] = useState([])
     
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'

        let username = localStorage.getItem("user");
        username = username.replace(/"/g, '');
        console.log(username);
        const url = `http://localhost:8000/user/${username}`;
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
        }).catch(err=>{
            console.log(err)
        })

        const userurl = `http://localhost:8000/${username}`;
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
        }).catch(err=>{
            console.log(err)
        })


        fetch('http://localhost:8000/?'+ new URLSearchParams({
             type: 'forYou'
         })
        ,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("FOR YOU")
            console.log(result)
            const temp = result.data
            const filteredArray = temp.filter((element) => element !== null)
            console.log(filteredArray)
            setforYouData(filteredArray) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        }).catch(err=>{
            console.log(err)
        })

        fetch('http://localhost:8000/?'+ new URLSearchParams({
             type: 'following'
         })
        ,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("Following")
            console.log(result)
            const temp = result.data
            const filteredArray = temp.filter((element) => element !== null)
            console.log(filteredArray)
            setFollowingData(filteredArray) // data is nested inside an array. Make sure to use this data otherwise weird things happen
        }).catch(err=>{
            console.log(err)
        })


    },[])
    return (
    <div>
        <h1>Home/Profile Page</h1>
        <div className="profile">
            <h3>{profileData.username}</h3>
            <h3>{profileData.email}</h3>
            <h3>Follow: {!profileData.isFollow && <p>no</p>}</h3>
            <h3>Followers: {profileData.followersCount}</h3>
            <h3>Following: {profileData.followingsCount}</h3>
            <h5>Bio: {profileData.bio}</h5>
            <h5>Last Active: {profileData.updatedAt}</h5>
            <h5>Created: {profileData.createdAt}</h5>
            <h5>Total Posts: {profileData.postCount}</h5>
        </div>

        {/* <Main /> */}
        <h2>Your Posts</h2>
        <div className='posts' style={{display:"flex", flexWrap:"wrap", rowGap:"10px", paddingLeft:"20px"}}>
            {data.length == 0 && <b1>You have no posts</b1>}
            {data.map(item=>{
                return(
                    <div className='m'>

                        <div className='pic' style={{width:"480px", height:"480px"}}>
                            <img  
                            alt="posts" 
                            src={item.postAssets[0]} 
                            style={{width:"480px", height:"480px", objectFit:"cover"}}
                            onClick={()=>{navigate(`/post/${item._id}`, { replace: true })}}
                            />
                        </div>
                        <div>
                            <div style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                                    {item.likesCount} Likes {item.commentsCount} Comments </div>
                            <p style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{item.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <h2>Following</h2>
        <div className='following'>
            {followingData.length == 0 && <b1>You are not following anyone</b1>}
            {followingData.map(item=>{
                return(
                    <h5>{item.username}</h5>
                )
            })}
        </div>
        <h2>For You</h2>
        <div className='forYou' style={{display:"flex"}}>
            {/* {forYouData.map(item=>{
                return(
                    <h5 onClick={()=>{navigate(`/user/${item.username}`, { replace: true })}}> | {item.username} | </h5>
                    
                )
            })} */}
            {forYouData.length == 0 && <b1>There are no posts</b1>}
            <div className='posts' style={{display:"flex", flexWrap:"wrap", rowGap:"10px", paddingLeft:"20px"}}>
                
                {forYouData.map(item=>{
                    return(
                        <div className='m'>

                            <div className='pic' style={{width:"200px", height:"200px"}}>
                                <img  
                                alt="posts" 
                                src={item.postAssets[0]} 
                                style={{width:"200px", height:"200px", objectFit:"cover"}}
                                onClick={()=>{navigate(`/post/${item._id}`, { replace: true })}}
                                />
                            </div>
                            <div>
                                <h6 style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{item.user.username}</h6>
                                <div style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                                    {item.likesCount} Likes {item.commentsCount} Comments </div>
                                <div style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{item.description}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default Home