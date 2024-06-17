import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Fields can't be empty");
      return;
    }

    const response = await loginUser({ ...formData });

    if (!response?.userId) {
      toast.error("Invalid Username and password");
      return;
    }

    if (response?.userId) {

      localStorage.setItem("token", response?.token);
      localStorage.setItem("userId", response?.userId);
      toast.success("User Successfylly LoggedIn");
      navigate("/dashboard");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <form className={styles.LoginContainer} onSubmit={handleSubmit}>
        <div className={styles.margin}>
          <div className={styles.Login}>
            <p className={styles.LoginAttribute}>Email</p>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.Login}>
            <p className={styles.LoginAttribute}>Password</p>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className={styles.Btn}>
          Log In
        </button>
      </form>
    </>
  );
}
