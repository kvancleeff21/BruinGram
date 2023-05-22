import React from 'react'
import "../css/Image-display.css"
/*
const Post = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
        description: { type: String },
        postAssets: { type: Array },
        likesCount: { type: Number, default: 0 },
        commentsCount: { type: Number, default: 0 },
        sharesCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

    useEffect(()=>{
        fetch('http://localhost:8000/getComments',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result)
        })
    },[])

getComments
const makeComment = (text,postId)=>{
        fetch("http://localhost:8000/comment" ,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }    
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })

    }

*/
/*
navBar
    post
        info
            pfp - title 
                - name                            
        pic   -   description(scroll?)
        Likes Shares        timestamp
    Comments box
        text box for comment - post
        list comments

*/
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
    return (
    <div style={{overflowX:'hidden'}}>
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

                {/* item.comments.map(record=>{
                    return(
                        <h6>
                            <span style={{fontWeight:"500"}}>
                                {record.postedBy.name}:
                            </span>
                                {record.text}
                        </h6>
                    )
                }) */}
            </div>


        </div>
    </div>

    )
}

export default ImageDisplay