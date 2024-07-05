import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import { registerUser } from "../../apis/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup({ onSignUp }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    cPassword: "",
  });
  const [wrongResponse, setWrongResponse] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setWrongResponse((prevResponse) => ({
      ...prevResponse,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.password ||
      !formData.email ||
      !formData.cPassword
    ) {
      setWrongResponse("Fields can't be empty");
      return;
    }
    const response = await registerUser({ ...formData });
    if (response.message) {
      toast.success(response.message);
      onSignUp();
    } else if (response.errorMessage) {
      toast.error(response.errorMessage);
      onSignUp();
    } else {
      setWrongResponse({});
      Object.keys(response).forEach((key) => {
        switch (key) {
          case "name":
          case "email":
          case "password":
          case "cPassword":
            setFormData((prevFormData) => ({
              ...prevFormData,
              [key]: "",
            }));
            setWrongResponse((prevResponse) => ({
              ...prevResponse,
              [key]: response[key],
            }));
            break;
        }
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <form className={styles.LoginContainer} onSubmit={handleSubmit}>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Name</p>
          <input
            name="name"
            type="text"
            value={formData.name}
            placeholder={wrongResponse.name || "Name"}
            onChange={handleInputChange}
            className={wrongResponse.name ? styles.red : ""}
          />
        </div>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Email</p>
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder={wrongResponse.email || "Email"}
            onChange={handleInputChange}
            className={wrongResponse.email ? styles.red : ""}
          />
        </div>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Password</p>
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder={wrongResponse.password || "Password"}
            onChange={handleInputChange}
            className={wrongResponse.password ? styles.red : ""}
          />
        </div>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Confirm Password</p>
          <input
            name="cPassword"
            type="password"
            value={formData.cPassword}
            placeholder={wrongResponse.cPassword || "Confirm Password"}
            onChange={handleInputChange}
            className={wrongResponse.cPassword ? styles.red : ""}
          />
        </div>
        <button type="submit" className={styles.Btn}>
          Sign-Up
        </button>
      </form>
    </>
  );
}
