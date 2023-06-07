import { useState } from 'react';
import logo from './BGlogo.png';
//import './App.css';

function Header() {
  return (
  <div className="bruingramlogo">
    <img style={{ width: 100, height: 100 }} src={logo} alt="Logo" />
    <h1> BruinGram </h1>
  </div>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    console.log(username);
    console.log(password);
    if ( (username==="hello") && (password==="world") ) {
      console.log("Success");
    }
    else {
      console.log("Failure");
    }
  }

  return (
    <> 
      <Header/>
      <div className="loginfields" style={{textAlign: "center"}}>
        <h2>Login</h2>
        <p>
          Username/Email
        </p>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input>
        <p>
          Password
        </p>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
        <div>
          <button onClick={handleClick}>
             LOG IN 

          </button>
        </div>
      </div>
    </>
  );

}