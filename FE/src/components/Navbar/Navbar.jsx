import React, { useState } from 'react'
import styles from './Navbar.module.css'
import {  useNavigate } from "react-router-dom";
export default function() {
  const navigate = useNavigate();
  const [navOption,setNavOption]=useState(true)
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }


  return (
    <div className={styles.navbar}>
    <h1>Quizzie</h1>
    <div className={styles.navOption}>
        <p style={{boxShadow:navOption ? '0px 0px 50px 0px #0019FF3D':'none'}} onClick={()=>{
          navigate('/dashboard'),
          setNavOption(true)
          }}>Dashboard</p>
        <p style={{boxShadow:!navOption ? '0px 0px 50px 0px #0019FF3D':'none'}} onClick={()=>{
          navigate('/analytics'),
          setNavOption(false)
          }}>Analytics</p>
        <p  onClick={()=>navigate('/create_question')}>Create Quiz</p>
    </div>
        <p onClick={handleLogout} className={styles.logout} >Logout</p>
    </div>
  )
}
