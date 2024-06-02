import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./QuestionAnalysis.module.css";
import { useParams } from "react-router-dom";
import { getImpression } from "../../apis/quiz";

export default function QuestionAnalysis() {
  const { quizId } = useParams();

  const [quizImpression, setQuizImpression] = useState();

  const fetchQuiz = async () => {
    if (!quizId) return;
    const response = await getImpression(quizId);
    setQuizImpression(response);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className={styles.QuestionAnalysisContainer}>
      <Navbar />
      <div className={styles.QuestionAnalysis}>
        <div className={styles.QuestionName}>
          <h1>{quizImpression && quizImpression.quizName} Question Analysis</h1>
          <div>
            <p>Created on : {quizImpression && quizImpression.createdOn}</p>
            <p>Impressions : {quizImpression && quizImpression.impression}</p>
          </div>
        </div>

        <div className={styles.Questions}>
          {quizImpression &&
            quizImpression.analysis &&
            Object.keys(quizImpression.analysis).map((quiz, index) => {
              return (
                <div className={styles.QuestionsName} key={index}>
                  <h2>
                    Q.{index + 1} {quizImpression.analysis[quiz].question} ?
                  </h2>
                  <div className={styles.QuestionsSelected}>
                    {quizImpression.questionOrPoll === "Q & A" ? (
                      <>
                        <p>
                          <span>{quizImpression.impression}</span> people
                          attempted the question
                        </p>
                        <p>
                          <span>{quizImpression.analysis[quiz].correct}</span>{" "}
                          people answered correctly
                        </p>
                        <p>
                          <span>{quizImpression.analysis[quiz].incorrect}</span>{" "}
                          people answered incorrectly
                        </p>
                      </>
                    ) : (
                      Object.values(
                        quizImpression.analysis[quiz].selectedOptions
                      ).map((impression, index) => (
                        <p
                          style={{
                            flexDirection: "row",
                            fontSize: "1vw",
                            width: "23% ",
                            flexGrow: "unset",
                          }}
                          key={index}
                        >
                          <span style={{ marginRight: "1vw" }}>
                            {impression}
                          </span>
                          {`option ${index + 1}`}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
