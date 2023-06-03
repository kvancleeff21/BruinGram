import React,{useState, useEffect} from "react";
import { useParams, useNavigate  } from "react-router-dom";

export default function UserProfile(){
    const {userId} = useParams()
    // It seems that username is not set up correctly when data is set
    // So trying to access it causes an error. Using a separate state allows us to only use it if its ready
    //const [username,setUsername] = useState([])
    console.log("User ID " + userId)

    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [pageData,setPageData] = useState([])
    const [page, setPage] = useState(1)
    // const [forYouData,setforYouData] = useState([])
    // const [followingData,setFollowingData] = useState([])
    const [profileData,setProfileData] = useState([])
     
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'
        getPosts();
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
        .catch(err=>{
            alert(err);
            console.log(err)
        })

    },[page]);

    async function getPosts() {
        const url = `http://localhost:8000/user/${userId}`;
        console.log(url);
        fetch(url+'/?'+ new URLSearchParams({
            page: page
        })
        ,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.errors){
                console.log("This is an error!" + JSON.stringify(data.errors));
                //alert(data.errors.message);
            }else{
                console.log(result)
                setData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
                setPageData(result.meta.pagination) 
            }

        })
        .catch(err=>{
            alert(err);
            console.log(err)
        })
    }

    async function follow() {
        console.log("USER DATA");
        console.log(profileData);
        const url = `http://localhost:8000/follow/${profileData._id}`;
        console.log(url);
        fetch(url
        ,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.errors){
                console.log("This is an error!" + JSON.stringify(data.errors));
                //alert(data.errors.message);
            }else{
                console.log("FOLLOW Succeeded")
                console.log(result)
                alert("Follow Succeeded");
                window.location.reload(false);
            }

        })
        .catch(err=>{
            alert(err);
            console.log(err)
        })
    }

    async function unfollow() {
        console.log("USER DATA");
        console.log(profileData);
        const url = `http://localhost:8000/unfollow/${profileData._id}`;
        console.log(url);
        fetch(url
        ,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.errors){
                console.log("This is an error!" + JSON.stringify(data.errors));
                //alert(data.errors.message);
            }else{
                console.log("UNFOLLOW Succeeded")
                console.log(result)
                alert("UNFollow Succeeded");
                window.location.reload(false);
            }

        })
        .catch(err=>{
            alert(err);
            console.log(err)
        })
    }

    function nextPage(){
        if (page < pageData.totalPages){
            setPage(page + 1)
        }
        console.log(pageData.totalPages)
        console.log(page)
        //window.location.reload(false);
        getPosts();
    }
    function prevPage(){
        if (page > 1){
            setPage(page - 1)
        }
        console.log(pageData.totalPages)
        console.log(page)
        //window.location.reload(false);
        getPosts();
    }

    return (
    <div>
        <h1>User Page</h1>
        <div className="profile">
            {profileData.avatar?
            <img src={profileData.avatar} alt="Avatar" style={{width:"50px", height:"50px", objectFit:"cover", borderRadius:"100px"}}/>
            :<img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
             alt="Avatar" style={{width:"50px", height:"50px", objectFit:"cover", borderRadius:"100px"}}/>
            }
            <h1>{profileData.username}</h1>
            <h3>{profileData.email}</h3>
            {!profileData.isFollow && <button onClick={()=>{follow()}}>Follow</button>}
            {profileData.isFollow && <button onClick={()=>{unfollow()}}>Unfollow</button>}
            <h3>Followers: {profileData.followersCount}</h3>
            <h3>Following: {profileData.followingsCount}</h3>
            <h3>Bio: {profileData.bio}</h3>
            <h5>Last active: {profileData.updatedAt}</h5>
            <h5>Created: {profileData.createdAt}</h5>
            <h5>Total Posts: {profileData.postCount}</h5>
        </div>

        <h2> {profileData.postCount} Posts </h2>
        <div className='posts' style={{display:"flex", flexWrap:"wrap", rowGap:"10px", paddingLeft:"20px"}}>
            {data.length === 0 && <h4>User has no posts</h4>}
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
                            <h5 style={{width:"190px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{item.description}</h5>
                        </div>
                    </div>
                )
            })}
        </div>
        <button onClick={()=>{prevPage()}}>Prev Page</button>
        <button onClick={()=>{nextPage()}}>Next Page</button>
        <h5>Page {pageData.currentPage}</h5>
        
    </div>
    )
}