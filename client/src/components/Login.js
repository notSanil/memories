import { useState } from 'react';
import React from 'react';
import background from './loginBack.jpg'

export default function Login(props) {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs)
        props.login(inputs)

      fetch('http://localhost:5000/auth/login', {
        'method': 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

  return(
    <div className='text-dark' style={{textAlign:"center", flexDirection:"column", alignItems:"center", justifyContent: "center", display: "flex", backgroundImage:`url(${background})`, padding:"120px 0 90px 0", height:"100vh"}}>
      {/* <p style={{display:"flex"}}>wnsiw</p> */}
      <h1 style={{fontFamily:"serif"}}>Enter credentials to login!</h1>

        <form style={{display:"flex", flexDirection:"column"}}>
          {(props.error !== "")? (<div className='error' style={{color:"red"}}>{props.error}</div>) : ""}

          <label style={{margin:"50px 0 20px 0", fontWeight:"bold"}}> Enter username: 
            <input style={{background:"transparent"}}
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
            />
          </label>

          <label style={{margin:"0 0 30px 0", fontWeight:"bold"}}> Enter password:
            <input style={{background:"transparent"}}
                type="password" 
                name="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
            />
          </label>

          <div>
            <button className='btn btn-outline-dark' type="submit" onClick={handleSubmit}>Login</button>
          </div>
        </form>
      {/* <div style={{display:"flex", flexDirection:"column", justifyContent: "center", height:"500px", width:"30%", backgroundColor:"#383838", opacity:"0.3"}}>
        
      </div> */}
    </div>
    
  )
}