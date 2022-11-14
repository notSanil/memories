import React from 'react'
import {Link} from "react-router-dom"

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>

        <a className="navbar-brand mx-4" href="/">Memories</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                {/* <a className="nav-link active" href="/">Home</a> */}
                <Link className='nav-link active' aria-current="page" to="/">Home</Link>
            </li>

            <li className="nav-item">
                {/* <a className="nav-link" href="/AboutUs">About Us</a> */}
                <Link className='nav-link' to='/AboutUs'>Gallery</Link>
            </li>

            <li className="nav-item">
                {/* <a className="nav-link" href="/AboutUs">About Us</a> */}
                <Link className='nav-link' to='/AboutUs'>Upload</Link>
            </li>

            <li className="nav-item">
                {/* <a className="nav-link" href="/AboutUs">About Us</a> */}
                <Link className='nav-link' to='/AboutUs'>About Us</Link>
            </li>

            </ul>
        </div>

        <div className={`mx-3 form-check form-switch text-${props.mode==='light'? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
            <label className="form-check-label mx-2" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
        </div>
    </nav>
  )
}
