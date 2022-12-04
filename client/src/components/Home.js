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
          <p style={{ margin: "150px 0 0 30px", fontSize: '2.2em', fontFamily: "Georgia" }}>"You can close your eyes to reality<br />but not to memories."</p>
          <p style={{ marginLeft: "500px", fontWeight: 'bold', fontSize: '1em' }}>~ Stanislaw Jerzy Lec</p>
        </div>
      </div>
      <img src={props.mode === "light" ? quoteNeg : quote} alt="quote" style={{ width: "600px", marginLeft: '680px', position: "absolute" }} />

      <p style={{ fontSize: "180px", fontFamily: "fantasy", color: props.mode === "light" ? "black" : "white", opacity: "0.3", position: "absolute", margin: "475px 0 0 50px" }}>Upload</p>

      <form style={{ position: "absolute", margin: "800px 0 0 50px" }} className={`text-${props.mode === "light" ? "dark" : "light"}`}>
        <input type="file" name='image' className="form-control-file" multiple onChange={handleChange} accept=".png"/>
        {<button onClick={handleUpload} >Submit</button>}
      </form>

      <footer className={`text-center text-lg-start bg-${props.mode}  text-${props.mode === "light" ? "dark" : "light"}`} style={{position:"absolute", marginTop:"900px", width:"100%"}}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <p>Ramjeet Singh(20103005), Sanath Chauhan(20103012), Abhitash Singh(20103018), Sanil Gupta(20103019)</p>
          </div>
        </section>

        <div className="text-center p-4" >
          © 2022 Copyright: Team memories
        </div>
      </footer>
    </div>

  )
}
