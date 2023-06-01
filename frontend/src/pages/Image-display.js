import React,{useState, useEffect} from "react";
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
    const [data,setData] = useState([])
    useEffect(()=>{ // to fetch using query, add a ? and then your query. ie. type: 'forYou'
        // fetch('http://localhost:8000/?'+ new URLSearchParams({
        //     type: 'forYou'
        // })
        let username = localStorage.getItem("user");
        //const encodedUsername = encodeURIComponent(username);
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
        })
    },[])

    return (
    <div style={{overflowX:'hidden', paddingLeft:"50px"}}>
        <h1>Image selection/display/pop up thing Page</h1>

        {data.map(item=>{
            return(
                <div className='post'>
                    <div className='info'>
                        <img  className='pfp' alt="pfp" src='https://m.media-amazon.com/images/I/81QUHsETINL.jpg'/>
                        
                        <div style={{
                            display:'flex', 
                            flexDirection:'column',
                            justifyContent:'space-evenly', 
                            }}>
                            <h4>{item.user.username}</h4> 
                            <h4>{item.user.email}</h4>
                        </div>
                    </div>
                    <div className='main'>
                        {item.postAssets.map(item=>{
                            <img  alt="post" src={item}/>
                        })}

                        <div className='pic' style={{width:"480px", height:"480px"}}>
                            {item.postAssets.map(item=>{
                                return(
                                <img  alt="post" src={item} style={{width:"480px", height:"480px", objectFit:"cover"}}/>
                                )
                            })}
                            {/* <img  alt="post" src={item.postAssets[0]} style={{width:"480px", height:"480px", objectFit:"cover"}}/> */}
                        </div>
                        <div className='description'>
                            <h3>Description</h3>
                            <p>{item.description}</p>
                            {/* <h5>{item.postAssets}</h5>
                            {item.postAssets.map(t=>{
                                return(
                                    <div>
                                        <p>Hello</p>
                                        <p>{t}</p>    
                                    </div>
                                    )
                            })} */}
                        </div>
                    </div>
                    <div className='interact'>
                        <button onClick={()=>{likePost(50)}}>like</button>
                        <p>{item.likesCount}</p>
                        <button onClick={()=>{sharePost(50)}}>share</button>
                        <p>{item.sharesCount}</p>
                        <p>{item.createdAt}</p>
                    </div>

                </div>
            )
        })}


        <div className='post'>
            <div className='info'>
                <img  className='pfp' alt="pfp" src='https://m.media-amazon.com/images/I/81QUHsETINL.jpg'/>
                
                <div style={{
                    display:'flex', 
                    flexDirection:'column',
                    justifyContent:'space-evenly', 
                    }}>
                    <h4>Title</h4> 
                    <h4>Author</h4>
                </div>
            </div>
            <div className='main'>
                <div className='pic'>
                    <img  alt="post" src='https://www.summerdiscovery.com/uploads/locations/2/thumbnails/UCLACampus-1_480x480.webp'/>
                </div>
                <div className='description'>
                    <h3>Description</h3>
                    <p>Hello there. asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasgegegegegegewgwgwggwgwgqgqg</p>
                </div>
            </div>
            <div className='interact'>
                <button onClick={()=>{likePost(50)}}>like</button>
                <p>40</p>
                <button onClick={()=>{sharePost(50)}}>share</button>
                <p>10</p>
                <p>timestamp</p>
            </div>

        </div>

        <div className='commentsBox'>
            <h2>Comments 20</h2>

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