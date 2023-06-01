import React,{useState, useEffect} from "react";
import { useParams, Link, useNavigate  } from "react-router-dom";
import "../css/Image-display.css"

const makeComment = (userId, postId, comment)=>{
    // fetch("http://localhost:8000/comment" ,{
    //     method:"put",
    //     headers:{
    //         "Content-Type":"application/json",
    //         "Authorization":"Bearer "+localStorage.getItem("jwt")
    //     },
    //     body:JSON.stringify({
    //         postId,
    //         text
    //     })
    // })
    alert("User: "+ userId +" commented " + comment + "on post:" + postId);
}

const likePost = (id)=>{
    alert("You liked a post!" + id);
}

const sharePost = (id)=>{
    alert("You shared a post???!" + id);
}


const ImageDisplay = ()=>{
    //const navigate = useNavigate();
    const {postid} = useParams()
    const [data,setData] = useState([])
    // It seems that username is not set up correctly when data is set
    // So trying to access it causes an error. Using a separate state allows us to only use it if its ready
    const [username,setUsername] = useState([])
    console.log("Post ID " + postid)
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'
        // fetch('http://localhost:8000/?'+ new URLSearchParams({
        //     type: 'forYou'
        // })
        //let username = localStorage.getItem("user");
        //const encodedUsername = encodeURIComponent(username);
        //username = username.replace(/"/g, '');
        //console.log(username);
        const url = `http://localhost:8000/post/${postid}`;
        console.log(url);
        fetch(url
        ,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
            setUsername(result.data.user.username)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
    <div style={{overflowX:'hidden', paddingLeft:"50px"}}>
        <h1>Image selection/display/pop up thing Page</h1>


        <div className='post'>
            <div className='info'>
                <img  className='pfp' alt="pfp" src='https://m.media-amazon.com/images/I/81QUHsETINL.jpg'/>
                
                <div style={{
                    display:'flex', 
                    flexDirection:'column',
                    justifyContent:'space-evenly', 
                    }}>
                    <h4>Title</h4>
                    <h4>{username}</h4>
                    {console.log(username)}
                </div>
            </div>
            <div className='main'>
                <div className='pic'>
                    {Array.isArray(data.postAssets) &&
                        <div>
                            {data.postAssets.map(m=>{
                                return (
                                    <div>
                                        <img  
                                        alt="posts" 
                                        src={m} 
                                        style={{width:"800px", height:"800px", objectFit:"cover"}}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className='description'>
                    <h3>Description</h3>
                    <p>{data.description}</p>
                </div>
            </div>
            <div className='interact'>
                <button onClick={()=>{likePost(50)}}>like</button>
                <p>{data.likesCount}</p>
                <button onClick={()=>{sharePost(50)}}>share</button>
                <p>10</p>
                <p>timestamp</p>
            </div>

        </div>

        <div className='commentsBox'>
            <h2>Comments {data.commentsCount}</h2>

            <form onSubmit={(e)=>{
                e.preventDefault()
                makeComment('User001', e.target[0].value, 50)
                }}>

                <input type="text" placeholder="add a comment"/>
                <button type="submit" >post</button>
            </form>


            <div className='comments'>
                <h3>Someone</h3> <p> This is a comment</p>
            </div>
        </div>
    </div>

    )
}

export default ImageDisplay