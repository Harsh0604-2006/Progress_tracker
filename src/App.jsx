import { useEffect, useState } from 'react'
import Login from './components/login'
import Register from './components/register'
import {DotGrid,  NavBar,Introduction } from './components/LandingPage';
import Profile from './components/profile';
import { auth } from './components/firebase';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
function App() {
  const[user,setUser]=useState();
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
  })
  return(<>    <Router>
     <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
 <Routes>
 
 <Route
  path="/"
  element={
    <>
    <NavBar/>
    <Introduction/>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
        <DotGrid
          dotSize={6}

    gap={20}

      baseColor="#FF0000"     
  activeColor="white" 
    proximity={120}

    shockRadius={250}

    shockStrength={5}

    resistance={750}

    returnDuration={1.5}
        />
      </div>
      

    </>
  }
/>


  <Route path="/login" element={user?<Navigate to="/profile"/>:<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/profile" element={<Profile/>}/>
  </Routes> 
  <ToastContainer/>
  </div>
  </div>
  </div>
  </Router>
  </>

  );
}

export default App
