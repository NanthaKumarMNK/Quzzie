import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.css";
import Eye from "../../assets/images/Eye.png";
import { getTrendingQuiz } from "../../apis/quiz";

export default function Dashboard() {
  const [TrendingQuiz, setTrendingQuiz] = useState({});

  const fetchTrendingQuiz = async () => {
    const myResponse = await getTrendingQuiz();
    setTrendingQuiz(myResponse);
  };
  useEffect(() => {
    fetchTrendingQuiz();
  }, []);
  return (
    <div className={styles.DashboardContainer}>
      <Navbar />
      <div className={styles.Dashboard}>
        <div className={styles.counts}>
          <div>
            <p style={{ color: "#FF5D01" }}>
              <span>
                {TrendingQuiz.totalQuiz !== 0 && TrendingQuiz.totalQuiz}
              </span>
              {!TrendingQuiz.totalQuiz && "No"} Quiz Created
            </p>
          </div>
          <div>
            <p style={{ color: "#60B84B" }}>
              <span>
                {TrendingQuiz.totalQuestion !== 0 && TrendingQuiz.totalQuestion}
              </span>
              {!TrendingQuiz.totalQuestion && "No"} questions Created
            </p>
          </div>
          <div>
            <p style={{ color: "#5076FF" }}>
              <span>
                {TrendingQuiz.totalImpressions !== 0 &&
                  TrendingQuiz.totalImpressions}
              </span>
              {!TrendingQuiz.totalImpressions && "No"} Total Impressions
            </p>
          </div>
        </div>
        <div className={styles.Trending}>
          <h1>Trending Quizs</h1>
          <div className={styles.TrendingQuiz}>
            {TrendingQuiz.topQuizzes ? (
              TrendingQuiz.topQuizzes.map((quiz, index) => (
                <div className={styles.YesTrendingQuiz} key={index}>
                  <p className={styles.QuizName}>
                    <h5>{quiz.quizName}</h5>
                    <p>
                      <span>{quiz.impressions}</span>
                      <img src={Eye} alt="Eye" />
                    </p>
                  </p>
                  <p className={styles.CreatedOn}>
                    Created on: {quiz.createdOn}
                  </p>
                </div>
              ))
            ) : (
              <div className={styles.NoTrendingQuiz}>No Trending Quiz</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
