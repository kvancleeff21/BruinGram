import React from 'react'
import {Link} from 'react-router-dom'

//Pages to make = login page, home page, image uploading page, and image display page.

const NavBar = ()=>{
    return (
    <div>
        <h6>Navigation bar example</h6>
        <ul>
            <li><Link to="/Create">Upload image</Link></li>
            <li><Link to="/Login">Login/Signup</Link></li>
            <li><Link to="/Display">Image display</Link></li>
            <li><Link to="/">Profile</Link></li>
        </ul>
    </div>
    )
}

export default NavBar