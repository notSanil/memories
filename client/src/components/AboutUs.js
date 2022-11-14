import React from 'react';
import Team from './Team';

export default function AboutUs(props) {
  return (
    <div style={{color: props.mode==='light'? 'black': 'white', textAlign:'center'}}>
      <h3 className='my-3' style={{padding: "0 100px"}}>Meet our team!</h3>

      <div className="container" style={{margin: '30px 120px', display:'flex', justifyContent:'center'}}>
        <Team name="Ramjeet Singh" sid="20103005" mode={props.mode}/>
        <Team name="Sanath Chauhan" sid="20103012" mode={props.mode}/>
        <Team name="Sanil Gupta" sid="20103018" mode={props.mode}/>
        <Team name="Abhitash Singh" sid="20103019" mode={props.mode}/>
      </div>
    </div>
  )
}
