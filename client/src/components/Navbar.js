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
                <Link className='nav-link active' aria-current="page" to="/">Home</Link>
            </li>

            <li className="nav-item">
                <Link className='nav-link' to='/Gallery'>Gallery</Link>
            </li>

            <li className="nav-item">
                <Link className='nav-link' to='/People'>Your People</Link>
            </li>

            </ul>
        </div>

        <div className={`mx-3 form-check form-switch text-${props.mode==='light'? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
            <label className="form-check-label mx-2" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
        </div>

        <Link className='mx-3' onClick={props.logout}>Logout</Link>
    </nav>
  )
}
