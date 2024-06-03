import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "../Analytics/Analytics";
import styles from "./Share.module.css";
import { useLocation } from "react-router-dom";
import { getLastQuizIdByUser } from "../../apis/quiz";

export default function Share() {
  const { state } = useLocation();

  const [stateId] = useState(state?.id);
  const [quizId, setQuizId] = useState();

  const [userId] = useState(localStorage.getItem("userId"));

  const textRef = useRef(null); // Define textRef here

  const getLastCreatedQuiz = async () => {
    const response = await getLastQuizIdByUser(userId);
    setQuizId(response.id);
  };

  useEffect(() => {
    if (!state) {
      getLastCreatedQuiz();
    }
  }, []);

  const copyText = () => {
    const textToCopy = textRef.current.innerText;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Link copied");
  };

  return (
    <>
      <div className={styles.analyticsContainer}>
        <Analytics />
      </div>
      <ToastContainer position="top-right" toastClassName="custom-toast" />
      <div className={styles.Share}>
        <h2>Congrats your Quiz is Published!</h2>
        <p ref={textRef}>{`http://localhost:5173/question/${state ? stateId : quizId}`}</p>
        <button onClick={copyText}>Share</button>
      </div>
    </>
  );
}
