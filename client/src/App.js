import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import Login from './components/Login'
import Landing from './components/Landing';
import Register from './components/Register';
import Image from './components/Image';
import Upload from './components/Upload';
import Gallery from './components/Gallery';
import SignUp from './components/SignUp';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const adminUser = {
    username: "admin@admin.com",
    password: "admin123"
  }
  const [user, setUser] = useState({username:""});
  const [error, setError] = useState("");
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode==="light") {
      setMode("dark");
      document.body.style.backgroundColor = '#303030';
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = 'white';
    }
  }

  const login = details => {
    console.log(details);
    
    if (details.username === adminUser.username && details.password === adminUser.password) {
      console.log("Logged in");
      setUser({
        username: details.username
      });
    } else {
      console.log("Incorrect details");
      setError("Details do not match!")
    }
  }

  const signup = details => {
    console.log(details)

    if (details.password===details.cpassword) {
      setUser({
        username: details.username
      });
    } else {
      setError("Passwords do not match!")
    }
  }

  const logout = () => {
    console.log("Logout");
    setUser({username:""});
  }


  return (
    <div>
      {(user.username !== "") ? (
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} logout={logout}/> 

          <Routes>
            <Route exact path='/' element={<Home mode={mode}/>} />
            <Route exact path='/AboutUs' element={<AboutUs mode={mode}/>} />
            <Route exact path='/Gallery' element={<Gallery/>}/> 
          </Routes>
        </Router> 
      ):(
        <Router>
          <Routes>
            <Route exact path='/' element={<Landing/>} />
            <Route exact path='/LoginPage' element={<Login login={login} error={error}/>}/>
            <Route exact path='/RegisterPage' element={<Register error={error}/>}/>
            <Route exact path='/Home' element={<Home/>}/>
            <Route exact path='/Image' element={<Image/>}/>
            <Route exact path='/Upload' element={<Upload/>}/>
            <Route exact path='/SignUp' element={<SignUp signup={signup} error={error}/>}/>
          </Routes>
        </Router>
      )}
      
    </div>
    
  );
}

export default App;