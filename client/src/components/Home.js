import React from 'react'

import { useState } from 'react';    

import quote from './memories.jpg'
import quoteNeg from './memoriesNeg.jpg'

export default function Home(props) {
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    const formData  = new FormData();

    formData.append("id", 3);
    formData.append("file", file)

    e.preventDefault()
    fetch('http://localhost:5000/uploadimage', {
        'method': 'POST',
        body: formData
      })
        .then(response => response.json())
        .catch(error => console.log(error))

  }

  const handleChange = (event) => {
    setFile(event.target.files[0])
  }


  return (
    <div>
      <div className={`text-${props.mode==="light"? "dark" : "light"}`} style={{position:'absolute'}}>
        <div className="heading">
          <p style={{margin:"150px 0 0 30px", fontSize:'2.7em', fontFamily:"Georgia"}}>"You can close your eyes to reality<br/>but not to memories."</p>
          <p style={{marginLeft:"500px", fontWeight:'bold', fontSize:'1em'}}>~ Stanislaw Jerzy Lec</p>
        </div>

        <button type="button" class={`btn btn-${props.mode==="light"? "dark" : "light"}`} style={{margin:'170px 0 0 60px'}}>Upload Pictures</button>
        <button type="button" class={`btn btn-${props.mode==="light"? "dark" : "light"}`} style={{margin:'170px 0 0 20px'}}>Visit Gallery</button>
      </div>
      <img src={props.mode==="light"? quoteNeg:quote} alt="quote" style={{width:"600px", marginLeft:'800px', position:"absolute"}}/>
    </div>
    
  )
}
