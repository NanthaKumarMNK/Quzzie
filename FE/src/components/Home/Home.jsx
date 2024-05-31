import React, { useState } from "react";
import Login from '../Login/Login'
import Signup from '../SignUp/Signup'
import styles from "./Home.module.css";

export default function Home() {
  const [toggleRegister,setToggleRegister]=useState(true)
 
  return (
    <div className={styles.HomeContainer}>
            <div className={styles.Heading}>
            <h1>QUIZZIE</h1>
            <div className={styles.toggleBtn}>
            <p style={{boxShadow:toggleRegister? '0px 0px 50px 0px #0019FF3D':'none'}} onClick={()=>setToggleRegister(true)}>Sign Up</p>
            <p style={{boxShadow:!toggleRegister? '0px 0px 50px 0px #0019FF3D':'none'}} onClick={()=>setToggleRegister(false)}>Log In</p></div>
            </div>
            {!toggleRegister ? <Login/> : <Signup/>}
       
    </div>
  )
}
