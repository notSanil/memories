import React from 'react'
import { useState } from 'react';

export default function Image() {
  const [imgData, setData] = useState();

  const handleSubmit = (e) => {

    e.preventDefault()
    fetch('http://localhost:5000/getimage', {
        'method': 'GET'
      })
        .then(response => response.blob())
        .then((blob)=>{
          var imgURL = URL.createObjectURL(blob);
          setData(imgURL);
        })
        .catch(error => console.log(error))
  }

  return (
    <div>
      <img src={imgData}/>
      <button type="load" onClick={handleSubmit}>Load</button>
    </div>
  )
}
