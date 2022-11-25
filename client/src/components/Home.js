import React from 'react'
import quote from './memories.jpg'
import quoteNeg from './memoriesNeg.jpg'

export default function Home(props) {

  var photos = [];

  const handleChange = (event) => {
    photos = event.target.files;

    console.log(photos)
  }

  const handleUpload = (e) => {
    e.preventDefault();
    var formData = new FormData();

    for (var i = 0; i < photos.length; ++i) {
      formData.append("files", photos[i]);
    }
    
    console.log(formData)

    fetch('http://localhost:5000/uploadimage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.token}`,
      },
      body: formData
    })
      .then(response => response.json())
      .catch(error => console.log(error))



    console.log("submitted  " + photos)
  }

  return (
    <div>
      <div className={`text-${props.mode === "light" ? "dark" : "light"}`} style={{ position: 'absolute' }}>
        <div className="heading">
          <p style={{ margin: "150px 0 0 30px", fontSize: '2.7em', fontFamily: "Georgia" }}>"You can close your eyes to reality<br />but not to memories."</p>
          <p style={{ marginLeft: "500px", fontWeight: 'bold', fontSize: '1em' }}>~ Stanislaw Jerzy Lec</p>
        </div>
      </div>
      <img src={props.mode === "light" ? quoteNeg : quote} alt="quote" style={{ width: "600px", marginLeft: '800px', position: "absolute" }} />

      <p style={{ fontSize: "220px", fontFamily: "fantasy", color: props.mode === "light" ? "black" : "white", opacity: "0.3", position: "absolute", margin: "475px 0 0 50px" }}>Upload</p>

      <form style={{ position: "absolute", margin: "800px 0 0 50px" }} className={`text-${props.mode === "light" ? "dark" : "light"}`}>
        <input type="file" name='image' className="form-control-file" multiple onChange={handleChange} />
        {<button onClick={handleUpload} >Submit</button>}
      </form>
    </div>

  )
}
