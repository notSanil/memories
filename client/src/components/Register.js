import { useState } from 'react';
import React from 'react';

export default function Register(props) {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs)

      fetch('http://127.0.0.1:5000/auth/register', {
        'method': 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
        mode: 'cors',
      })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

  return(
    <form>
      {/* {(props.error !== "")? (<div className='error'>{props.error}</div>) : ""} */}

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

      <label> Enter name:
        <input 
            type="text" 
            name="name" 
            value={inputs.name || ""} 
            onChange={handleChange}
        />
      </label>

      <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}