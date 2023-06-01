import React,{useState, useEffect} from "react";
import { useParams, Link, useNavigate  } from "react-router-dom";
import "../css/Image-display.css"




const ImageDisplay = ()=>{
    const navigate = useNavigate();
    const {postId} = useParams()
    const [data,setData] = useState([])
    const [comments,setComments] = useState([])
    const [reactions,setReactions] = useState([])

    // It seems that username is not set up correctly when data is set
    // So trying to access it causes an error. Using a separate state allows us to only use it if its ready
    const [username,setUsername] = useState([])
    console.log("Post ID " + postId)
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'
        // fetch('http://localhost:8000/?'+ new URLSearchParams({
        //     type: 'forYou'
        // })
        //let username = localStorage.getItem("user");
        //const encodedUsername = encodeURIComponent(username);
        //username = username.replace(/"/g, '');
        //console.log(username);

        // Fetch Post
        const url = `http://localhost:8000/post/${postId}`;
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

        // Fetch Comments
        fetch(`http://localhost:8000/comment/${postId}`
        ,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("comments")
            console.log(result)
            setComments(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
            //setUsername(result.data.user.username)
        })
        .catch(err=>{
            console.log(err)
        })

        // Fetch Reactions
        fetch(`http://localhost:8000/react/${postId}`
        ,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("reactions")
            console.log(result)
            setReactions(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
            //setUsername(result.data.user.username)
        })
        .catch(err=>{
            console.log(err)
        })

    },[postId])

    const makeComment = (comment)=>{
        fetch(`http://localhost:8000/comment/${postId}`
        ,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                comment:comment
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log("Posted Comment")
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
        //alert("User commented " + comment + "on post:" + postId);
        window.location.reload(false);

        
    }


    const likePost = ()=>{
        //alert("You liked a post!" + id);
        fetch(`http://localhost:8000/react/${postId}`
        ,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("Liked a post! -> reactions")
            console.log(result)
            setReactions(result.data) // data is nested inside an array. Make sure to use this data otherwise weird things happen
            window.location.reload(false);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const sharePost = (id)=>{
        alert("You shared a post???!" + id);
    }
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
                    
                    <h4 onClick={()=>{navigate(`/user/${username}`, { replace: true })}}>{username}</h4>
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
                <button onClick={()=>{likePost()}}> {data.likesCount} likes </button>
                {/* <button onClick={()=>{sharePost(50)}}>share</button>
                <p>10</p> */}
                <p>{data.createdAt}</p>
            </div>

        </div>

        <div className='commentsBox'>
            <h2>Comments {data.commentsCount}</h2>

            <form onSubmit={(e)=>{
                e.preventDefault()
                makeComment(e.target[0].value)
                }}>

                <input type="text" placeholder="add a comment"/>
                <button type="submit" >post</button>
            </form>


            <div className='comments'>
                {comments.map(item=>{
                    return(
                        <div>
                            <h5>{item.user.username}: {item.content}</h5>
                            <div className='timestamp'>{item.createdAt}</div>
                        </div>
                    )
                })}
                {console.log("printing comments!!")}
                {console.log(comments)}
            </div>
        </div>
    </div>

    )
}

export default ImageDisplay