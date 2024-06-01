import React, { useState } from 'react'
import styles from './Navbar.module.css'
import {  useNavigate } from "react-router-dom";
export default function() {
  const navigate = useNavigate();
  const [navOption,setNavOption]=useState('dashboard')
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  const handleOptionClick =async (option) => {
    await setNavOption(option);
    navigate(`/${option}`);
  };


  return (
    <div className={styles.navbar}>
    <h1>Quizzie</h1>
    <div className={styles.navOption}>
    <p
          style={{
            boxShadow: navOption === 'dashboard' ? '0px 0px 50px 0px #0000001F' : '',
          }}
          onClick={() => handleOptionClick('dashboard')}
        >
          Dashboard
        </p>
        <p
          style={{
            boxShadow: navOption === 'analytics' ? '0px 0px 50px 0px #0000001F' : '',
          }}
          onClick={() => handleOptionClick('analytics')}
        >
          Analytics
        </p>
        <p  onClick={()=>navigate('/create_question')}>Create Quiz</p>
    </div>
        <p onClick={handleLogout} className={styles.logout} >Logout</p>
    </div>
  )
}



