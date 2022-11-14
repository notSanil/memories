import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
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


  return (
    <div>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode}/>

        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/AboutUs' element={<AboutUs mode={mode}/>} />
        </Routes>
      </Router>
      
    </div>
    
  );
}

export default App;