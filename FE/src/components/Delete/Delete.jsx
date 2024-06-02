import React, { useEffect } from "react";
import Analytics from "../Analytics/Analytics";
import styles from "./Delete.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { deleteQuiz } from "../../apis/quiz";
export default function Delete() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  console.log(quizId);
  const deleteUserQuiz = async () => {
    const response = await deleteQuiz(quizId);
    if (response) {
      navigate("/analytics");
    } else {
      alert("Quiz not deleted");
    }
  };

  return (
    <>
      <div className={styles.analyticsContainer}>
  <Analytics />
</div>
      <div className={styles.Delete}>
        <p>
          Are you confirm you
          <br /> want to delete ?
        </p>
        <div>
          <button
            onClick={deleteUserQuiz}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Confirm Delete
          </button>
          <button
            onClick={() => navigate("/analytics")}
            style={{
              boxShadow: "0px 0px 15px 0px #00000040",
              color: "#474444",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
