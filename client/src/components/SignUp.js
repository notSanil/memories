import { useState } from 'react';
import React from 'react';
import background from './loginBack.jpg'

export default function SignUp(props) {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.signup(inputs)
    }


  return (
    <div className='text-dark' style={{textAlign:"center", flexDirection:"column", alignItems:"center", justifyContent: "center", display: "flex", backgroundImage:`url(${background})`, padding:"120px 0 90px 0", height:"100vh"}}>
      
      <h1 style={{fontFamily:"serif"}}>Enter details to SignUp!</h1>

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

        <label style={{margin:"10px 0 30px 0", fontWeight:"bold"}}> Enter password:
          <input style={{background:"transparent"}}
              type="password" 
              name="password" 
              value={inputs.password || ""} 
              onChange={handleChange}
          />
        </label>

        <label style={{margin:"0 0 30px 0", fontWeight:"bold"}}> Confirm password:
          <input style={{background:"transparent"}}
              type="password" 
              name="cpassword" 
              value={inputs.cpassword || ""} 
              onChange={handleChange}
          />
        </label>

        <div>
          <button className='btn btn-outline-dark' type="submit" onClick={handleSubmit}>SignUp</button>
        </div>
      </form>
    </div>
  )
}
