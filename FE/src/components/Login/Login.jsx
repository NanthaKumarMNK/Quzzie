import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });
  const [loginRes,setLoginRes]=useState('a')
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
       return alert("Fields can't be empty");
    }

    const response = await loginUser({...formData});
    
    if (!response?.userId) {
        setLoginRes('')
        alert('noresp')
       
    } 
    if (response?.userId) {
        setLoginRes('a')
        localStorage.setItem("token", response?.token); 
        localStorage.setItem("userId", response?.userId);
        alert('User Successfully Logged In')
        navigate("/dashboard");
    } 


};
  return (
    <>
    <div className={styles.LoginContainer}>
    <div className={styles.Login}> <p className={styles.LoginAttribute}>Email</p> <input name='email' type="email" value={formData.email} onChange={handleInputChange} /> </div>
    <div className={styles.Login}><p className={styles.LoginAttribute}>Password</p> <input name='password' type='password'  value={formData.password} onChange={handleInputChange} /></div>
  
</div>
    <p className={styles.Btn} onClick={handleSubmit}>Log In</p>
</>
  )
}
