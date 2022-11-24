import React from 'react'
import background from './imgLand.jpg'

export default function Landing() {
  return (
    <div>
        <div style={{display:'flex', justifyContent:"center" ,height:"100%", width:"100%" ,backgroundImage:`url(${background})`, position:'fixed'}}>
            <h1 style={{position:"absolute", marginTop:"160px", fontFamily:"serif", fontWeight:"bold", wordSpacing:"0.25em"}}>
                A place for all your precious memories!
            </h1>
            <h4 style={{position:"absolute", marginTop:"350px", fontFamily:"serif", fontWeight:"bold"}}>
                Group photos automatically based on the people in them.
            </h4>
            <h4 style={{position:"absolute", marginTop:"400px", fontFamily:"serif", fontWeight:"bold"}}>
                Get auto-generated captions for efficient searching.
            </h4>
            <a className="btn btn-primary bg-dark" href="/LoginPage" role="button" style={{height:"40px", marginTop:"500px", border:"0"}}>Login / SignUp</a>
        </div>
    </div>
  )
}
