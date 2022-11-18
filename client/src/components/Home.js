import React from 'react'
import { useState } from 'react';

export default function Home() {
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
      <input type="file" name="image" accept="image/png, image/jpeg" onChange={handleChange}/>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  )
}
