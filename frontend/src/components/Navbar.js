import React from 'react'

//Pages to make = login page, home page, image uploading page, and image display page.

const NavBar = ()=>{
    return (
    <div>
        <h6>Navigation bar example</h6>
        <ul>
            <li><a href="/Create">Upload image</a></li>
            <li><a href="/Login">Login/Signup</a></li>
            <li><a href="/Display">Image display</a></li>
            <li><a href="/">Profile</a></li>
        </ul>
    </div>
    )
}

export default NavBar