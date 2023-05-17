import React from 'react'
import "./Image-display.css"


const ImageDisplay = ()=>{
    return (
    <div>
        <h1>Image selection/display/pop up thing Page</h1>
        <div className='post'>

            <h4>Name of Author</h4> <button>Follow</button>
            <div className='pic'>
                <img  alt="post" src='https://www.summerdiscovery.com/uploads/locations/2/thumbnails/UCLACampus-1_480x480.webp'/>
            </div>
            <div >
                <button>like</button>
                <h5>Title of Post</h5>
                <p>Caption of post</p>
                <input type="text" placeholder="add a comment"/>
            </div>
        </div>
    </div>

    )
}

export default ImageDisplay