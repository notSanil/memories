import React from 'react'
import { useState, useEffect } from 'react'
import Editable from './Editable';

export default function PersonCard(props) {
  const [name, setName] = useState(props.name);
  const [imgSrc, setImgSrc] = useState("data:image/png;base64,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")

  const backendAddress = "http://localhost:5000";

  useEffect(() => {
    fetch(backendAddress + '/getFaceThumbnail/' + props.faceID, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
      },
    })
      .then(response => response.blob())
      .then((blob) => {
        var imgURL = URL.createObjectURL(blob);
        setImgSrc(imgURL);
      })
      .catch(error => console.log(error)
      );
  }, []);


  return (
    <div className={`card bg-${props.mode}`} style={{ width: '18rem', margin: '0px 15px', borderColor: 'black' }}>
      <img src={imgSrc} className="card-img-top" alt="photo" />
      <div className="card-body">
        <Editable
          text={name}
          placeholder="Name"
          type="input"
          style={{ color: props.mode === "light" ? "black" : "white" }}
        >
          <input
            type="text"
            name="task"
            placeholder="Write a task name"
            className='card-title'
            style={{ color: props.mode === "light" ? "black" : "white", backgroundColor: props.mode === "light" ? "white" : "black" }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Editable>

        <a onClick={e => props.cardClick(props.faceID)} className={`btn btn-primary btn-${props.mode === 'light' ? 'dark' : 'light'}`}>View Photos</a>
        <a onClick={e => props.cardNameChange(props.faceID, name)} className={`btn btn-primary btn-${props.mode === 'light' ? 'dark' : 'light'}`}>Save Name</a>
      </div>
    </div>
  )
}