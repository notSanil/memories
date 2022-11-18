import { useState } from 'react';
import React from 'react';

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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

  return(
    <form>
      {(props.error !== "")? (<div className='error'>{props.error}</div>) : ""}

      <label> Enter username:
        <input 
            type="text" 
            name="username" 
            value={inputs.username || ""} 
            onChange={handleChange}
        />
      </label>

      <label> Enter password:
        <input 
            type="password" 
            name="password" 
            value={inputs.password || ""} 
            onChange={handleChange}
        />
      </label>

      <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}