import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
//import logo from './;
// const Login = ()=>{
//     return (
//     <div>
//         <h1>Login/Register? Page</h1>
//     </div>
//     )
// }

// export default Login


function Header() {
    return (
    <div className="bruingramlogo">
      {/* <img style={{ width: 100, height: 100 }} src={logo} alt="Logo" /> */}
      <h1> BruinGram </h1>
    </div>
    );
  }
  
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    fetch("http://localhost:8000/register",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          email:username,
          password:password
      })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
          if(data.errors){
              // Im not actually sure how to get error data
              console.log("This is an error!" + JSON.stringify(data.errors));
              alert(data.errors.message);
          }else{
              // Navigate to login when sign up succeeds (maybe automatically log them in too?)
              console.log("Registered Success!");
              navigate("/login");
          }
      })
      .catch(err=>{
          console.log(err)
      })
    }

  return (
    <> 
      <Header/>
      <div className="loginfields" style={{textAlign: "center"}}>
          <h2>!!!Register!!!</h2>
          <p>
            Email
          </p>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input>
          <p>
            Password
          </p>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
          <div>
            <button onClick={(e)=>{
              e.preventDefault() 
              handleClick()}}>
                SIGN UP
                
            </button>
          </div>

        
      </div>

      <div className="login" style={{textAlign: "center"}} >
          <Link to="/login" >Have an account? Log in</Link>
      </div>
    </>
  );

}