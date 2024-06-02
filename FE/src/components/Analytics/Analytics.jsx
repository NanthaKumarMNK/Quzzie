import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Analytics.module.css";
import Edit from "../../assets/images/Edit.png";
import Share from "../../assets/images/Share.png";
import Delete from "../../assets/images/Delete.png";
import { useNavigate } from "react-router-dom";
import { getUserQuiz } from "../../apis/quiz";

export default function Analytics() {
  const navigate = useNavigate();
  const [userQuiz, setUserQuiz] = useState();
  const [token] = useState(localStorage.getItem("token"));
  const [userId] = useState(localStorage.getItem("userId"));
  const fetchUserQuiz = async (userId) => {
    const myResponse = await getUserQuiz(userId);
    setUserQuiz(myResponse);
  };
  useEffect(() => {
    fetchUserQuiz(userId);
  }, []);

  const handleEdit = (quizId) => {
    if (quizId) {
      const targetId = quizId;
      const targetObject = userQuiz.find((obj) => obj.id === targetId);

      navigate("/create_question", {
        state: {
          id: targetObject._id,
          quizDetails: {
            questionOrPoll: targetObject.quizName,
            quizName: targetObject.quizName,
            timer: targetObject.timer,
            quiz: targetObject.quiz,
            impressions: targetObject.impressions,
          },
          edit: true,
        },
      });
    }
  };

  return (
    <>
      <div className={styles.AnalyticsContainer}>
        <Navbar />
        <div className={styles.Analytics}>
          <h1>Quiz Analysis</h1>

          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th
                    style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    S.No
                  </th>
                  <th>Quiz Name</th>
                  <th>Created on</th>
                  <th>Impression</th>
                  <th style={{ color: "#5076FF" }}>Created on</th>
                  <th
                    style={{
                      color: "#5076FF",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    Impression
                  </th>
                </tr>
              </thead>
              <tbody>
                {userQuiz &&
                  userQuiz.map((quiz, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td>{quiz.quizName}</td>
                      <td>{quiz.createdOn}</td>
                      <td>{quiz.impressions}</td>
                      <td>
                        <img
                          onClick={() => handleEdit(quiz.id)}
                          src={Edit}
                          alt="Edit"
                        />
                        <img
                          onClick={() => navigate(`/delete/${quiz.id}`)}
                          src={Delete}
                          alt="Delete"
                        />
                        <img src={Share} alt="Share" />
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/question_analysis/${quiz.id}`)
                        }
                        style={{
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                          textDecoration: "underline",
                        }}
                      >
                        Question Wise Analysis
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
