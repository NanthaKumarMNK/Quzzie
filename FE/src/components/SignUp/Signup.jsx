import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import { registerUser } from "../../apis/auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    cPassword: "",
  });
  const [wrongResponse, setWrongResponse] = useState();
  console.log(wrongResponse);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.password ||
      !formData.email ||
      !formData.cPassword
    ) {
      return alert("Fields can't be empty");
    }
    const response = await registerUser({ ...formData });
    setWrongResponse(response);
  };

  return (
    <>
      <div className={styles.LoginContainer}>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Name</p>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Email</p>{" "}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />{" "}
        </div>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Password</p>{" "}
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.Login}>
          <p className={styles.LoginAttribute}>Confirm Password</p>
          <input
            name="cPassword"
            type="password"
            className={wrongResponse?.cPassword ? styles.input : ""}
            onClick={() => setWrongResponse()}
            placeholder={
              wrongResponse?.cPassword ? wrongResponse.cPassword : ""
            }
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <p className={styles.Btn} onClick={handleSubmit}>
        Sign-Up
      </p>
    </>
  );
}
