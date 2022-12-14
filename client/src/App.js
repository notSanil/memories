import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login'
import Landing from './components/Landing';
import Gallery from './components/Gallery';
import SignUp from './components/SignUp';
import useToken from './components/Token';
import People from './components/People';
import PersonPage from './components/PersonPage'; 

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [error, setError] = useState("");
  const [mode, setMode] = useState('light');
  const { token, removeToken, setToken } = useToken();
  //const navigate = useNavigate();

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

  const logout = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/auth/logout', {
      'method': 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then((response) => {
        removeToken();
      })
      .catch(error => {
        setError("Username already registered")
      })
      //navigate('/')
  }


  return (
    <div>
      {!token && token !== "" && token !== undefined ? (
        <Router>
          <Routes>
            <Route exact path='/' element={<Landing/>} />
            <Route exact path='/LoginPage' element={<Login setToken={setToken} error={error}/>}/>
            <Route exact path='/SignUp' element={<SignUp setToken={setToken} error={error}/>}/>
          </Routes>
        </Router>
      ):(
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} logout={logout}/> 
          <Routes>
            <Route exact path='/' element={<Home mode={mode} token={token}/>} />
            <Route exact path='/People' element={<People mode={mode} token={token}/>} />
            <Route exact path='/Gallery' element={<Gallery token={token}/>}/> 
            <Route exact path='/Person' element={<PersonPage token={token}/>}/> 
          </Routes>
        </Router>
      )}
    </div>
    
  );
}

export default App;