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
const ImageDisplay = ()=>{
    return (
    <div>
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
                <button>like</button>
                <p>40</p>
                <button>share</button>
                <p>10</p>
                <p>timestamp</p>
            </div>


        </div>

        <div className='commentsBox'>
            <h2>Comments 20</h2>
            <input type="text" placeholder="add a comment"/> <button>Post</button>
            <div className='comments'>
                <h3>Someone</h3> <p> This is a comment</p>
            </div>
        </div>
    </div>

    )
}

export default ImageDisplay