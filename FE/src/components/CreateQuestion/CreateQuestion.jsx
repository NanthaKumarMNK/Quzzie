import React, { useState,useEffect } from "react";
import Analytics from "../Analytics/Analytics";
import styles from "./CreateQuestion.module.css";
import Plus from "../../assets/images/Add.png";
import Cross from "../../assets/images/Cross.png";
import Delete from "../../assets/images/Delete.png";
import { postCreateQuiz,putEditQuiz } from "../../apis/quiz";
import { useNavigate,useLocation } from "react-router-dom";

export default function CreateQuestion() {
  const navigate = useNavigate();

  const {state} = useLocation()

  const [stateId] = useState(state?.id);

  const [stateData] = useState(state?.quizDetails);

  const [option, setOption] = useState("text");

  const [poll, setPoll] = useState("Q & A");

  const [questionCount, setQuestionCount] = useState(1);

  const [optionCount, setOptionCount] = useState(2);

  const [activeQuestion, setActiveQuestion] = useState("1");

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (stateData && stateData.quiz[1]) {
      const { option: { option1 } } = stateData.quiz[1];
      if (option1.text && !option1.image) {
        setOption("text");
      } else if (!option1.text && option1.image) {
        setOption("image");
      } else if (option1.text && option1.image) {
        setOption("both");
      }
    }
  }, [stateData]);

  const text = { text: "" };
  const image = { image: "" };
  const both = { text: "", image: "" };

  const optionObject =
    option === "text" ? text : option === "image" ? image : both;

  const qAObject = {
    question: "",
    answer: "",
    option: { option1: optionObject, option2: optionObject },
    selectedOptions: { option1: "0", option2: "0" },
  };
  const pollObject = {
    question: "",
    option: { option1: optionObject, option2: optionObject },
    selectedOptions: { option1: "0", option2: "0" },
  };

  const [questionNumber, setQuestionNumber] = useState(
    state ?  stateData:
{ questionOrPoll: poll !== "Q & A" ? "Poll" : "Q & A",
    impression: "0",
    timer: "0",
    quizName: "",
    quiz: { 1: poll !== "Q & A" ? pollObject : qAObject },
  });

  const handleTimer = (e) => {
    setQuestionNumber((prev) => ({
      ...prev,
      timer: e,
    }));
  };

  const addQuestion = () => {
    const newquestionCount = `${questionCount + 1}`;

    setQuestionNumber((prev) => ({
      quiz: {
        ...prev.quiz,
        [newquestionCount]: poll ? pollObject : qAObject,
      },
    }));
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const addOption = () => {
    const newOptionCount = `option${optionCount + 1}`;
    setQuestionNumber((prev) => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        [activeQuestion]: {
          ...prev.quiz[activeQuestion],
          option: {
            ...prev.quiz[activeQuestion].option,
            [newOptionCount]: optionObject,
          },
          selectedOptions: {
            ...prev.quiz[activeQuestion].selectedOptions,
            [newOptionCount]: "0",
          },
        },
      },
    }));
    setOptionCount((prevCount) => prevCount + 1);
  };

  const handleOptionChange = (e, optionKey, parameter) => {
    const { value } = e.target;

    setQuestionNumber((prev) => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        [activeQuestion]: {
          ...prev.quiz[activeQuestion],
          option: {
            ...prev.quiz[activeQuestion].option,
            [optionKey]: {
              ...prev.quiz[activeQuestion].option[optionKey],
              [parameter]: value,
            },
          },
        },
      },
    }));
  };

  const removeOption = (index) => {
    setQuestionNumber((prev) => {
      return {
        ...prev,
        quiz: {
          ...prev.quiz,
          [activeQuestion]: {
            ...prev.quiz[activeQuestion],
            option: Object.keys(prev.quiz[activeQuestion].option)
              .filter((key) => key !== `option${index + 1}`)
              .reduce((acc, key, i) => {
                const newIndex = i + 1;
                if (key !== `option${index + 1}`) {
                  acc[`option${newIndex}`] =
                    prev.quiz[activeQuestion].option[key];
                }
                return acc;
              }, {}),
            selectedOptions: Object.keys(
              prev.quiz[activeQuestion].selectedOptions
            )
              .filter((key) => key !== `option${index + 1}`)
              .reduce((acc, key, i) => {
                const newIndex = i + 1;
                if (key !== `option${index + 1}`) {
                  acc[`option${newIndex}`] =
                    prev.quiz[activeQuestion].selectedOptions[key];
                }
                return acc;
              }, {}),
          },
        },
      };
    });
    setOptionCount((prevCount) => prevCount - 1);
  };

  const removeQuestion = (questionKey) => {
    if (questionKey == parseInt(activeQuestion)) {
      setActiveQuestion(`${questionKey - 1}`);
    }
    setQuestionNumber((prev) => {
      const updatedQuiz = { ...prev.quiz };
      delete updatedQuiz[questionKey];

      const filteredQuiz = Object.keys(updatedQuiz)
        .filter((key) => key !== questionKey)
        .reduce((acc, key, index) => {
          acc[index + 1] = updatedQuiz[key];
          return acc;
        }, {});

      return { quiz: filteredQuiz };
    });
    setQuestionCount((prevCount) => prevCount - 1);
  };

  const handleInputClick = (option) => {
    setQuestionNumber((prev) => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        [activeQuestion]: {
          ...prev.quiz[activeQuestion],
          answer: option,
        },
      },
    }));
  };
  const handleOption = (selectedOptionType) => {
    setQuestionNumber((prev) => {
      const updatedQuiz = { ...prev.quiz };


      Object.keys(updatedQuiz).forEach((questionKey) => {
        const currentQuestion = updatedQuiz[questionKey];
        const currentOption = currentQuestion.option;

        if (selectedOptionType === "text") {
          Object.keys(currentOption).forEach((optionKey) => {
            updatedQuiz[questionKey].option[optionKey] = {
              text: currentOption[optionKey].text || "",
            };
          });
        }
        else if (selectedOptionType === "image") {
          Object.keys(currentOption).forEach((optionKey) => {
            updatedQuiz[questionKey].option[optionKey] = {
              image: currentOption[optionKey].image || "",
            };
          });
        }
        else if (selectedOptionType === "both") {
          Object.keys(currentOption).forEach((optionKey) => {
            updatedQuiz[questionKey].option[optionKey] = {
              text: currentOption[optionKey].text || "",
              image: currentOption[optionKey].image || "",
            };
          });
        }
      });

      return {  ...prev,quiz: updatedQuiz };
    });
  };

  const handlePoll = (poll) => {
    setPoll(poll);
    setQuestionNumber((prev) => ({
      ...prev,
      questionOrPoll: poll,
      quiz: { 1: poll !== "Q & A" ? pollObject : qAObject },
    }));
  };

  const handleHeading = (e) => {
    const { value } = e.target;
    setQuestionNumber((prev) => ({
      ...prev,
      quizName: value,
    }));
  };

  const handlePollInput = (e) => {
    const { name, value } = e.target;
    setQuestionNumber((prev) => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        [activeQuestion]: {
          ...prev.quiz[activeQuestion],
          question: value,
        },
      },
    }));
  };

  const CreateQuestion=async ()=>{
  const areAllValuesTruthy = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return Boolean(obj);
    }

    return Object.entries(obj).every(([key, value]) => {
      return areAllValuesTruthy(value);
    });
  };
  const present = areAllValuesTruthy(questionNumber);
if(!present){
    alert( 'Invalid quizNumber');
}

const quiz = Object.keys(questionNumber.quiz);
if (quiz.length < 1 || quiz.length > 5) {
    alert('Invalid number of questions' );
}

Object.keys(questionNumber.quiz).forEach(questionKey => {
    const optionData = questionNumber.quiz[questionKey].option;
    const optionKeys = Object.keys(optionData);

    if (optionKeys.length < 2 || optionKeys.length > 4) {

        alert('Invalid number of options' );
    }

    optionKeys.forEach(optionKey => {
      const option = optionData[optionKey];
      if (!option.hasOwnProperty("text") && !option.hasOwnProperty("image")) {
        alert('Invalid option type');
      }
    });
  });
  if (state.edit) {
    const response = await putEditQuiz(stateId, questionNumber);
    if (response.message) {
      alert(response.message);
      navigate('/share', { state: { quizId: stateId } });
    }
  
}else{
    const response =await postCreateQuiz(questionNumber)
    if(response.message){
      alert(response.message)
      navigate('/share')
    }
  }
    
  
}


  return (
    <>
      <Analytics />
      <div>
        <div
          style={{ display: display ? "flex" : "none" }}
          className={styles.QuestionOrPoll}
        >
          <input onChange={handleHeading} value={questionNumber.quizName} placeholder="Quiz name" />

          <div className={styles.QuizType}>
            <p style={{ boxShadow: "none" }}>Quiz type</p>
            <p
              className={poll === "Q & A" ? styles.PollBg : ""}
              style={{ fontSize: "1.7vw" }}
              onClick={() => handlePoll("Q & A")}
            >
              Q & A
            </p>
            <p
              className={poll !== "Q & A" ? styles.PollBg : ""}
              style={{ fontSize: "1.7vw" }}
              onClick={() => handlePoll("Poll")}
            >
              Poll Type
            </p>
          </div>
          <div className={styles.QuestionOrPollBtn}>
            <button
              onClick={() => navigate("/analytics")}
              style={{
                color: "#474444",
                boxShadow: "0px 0px 15px 0px #00000040",
                fontSize: "1.8vw",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() =>{
                  if(questionNumber.quizName.length>0){


               setDisplay(false)
               }else{
                alert('Quiz Name required')
               }
               }}
              style={{
                color: "white",
                backgroundColor: "#60B84B",
                fontSize: "1.7vw",
                fontSize: "1.8vw",
              }}
            >
              Continue
            </button>
          </div>
        </div>

        <div
          style={{ display: !display ? "flex" : "none" }}
          className={styles.Question}
        >
          <div className={styles.AddQuestion}>
            <div className={styles.QuestionNumber_Add}>
              {Object.keys(questionNumber?.quiz).map((key, index) => (
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className={styles.QuestionNumber}>
                    <div onClick={() => setActiveQuestion(key)}>{key}</div>
                    {key !== "1" && (
                      <img
                        className={styles.Cross}
                        onClick={() => removeQuestion(key)}
                        src={Cross}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div className={styles.Plus}>
                <img
                  style={{ display: questionCount === 5 && "none" }}
                  onClick={addQuestion}
                  src={Plus}
                />
              </div>
            </div>

            <div className={styles.MaxQuestion}>Max 5 questions</div>
          </div>

          <input
            onChange={handlePollInput}
            className={styles.Poll}
            placeholder="Poll Question"
            value={questionNumber.quiz[activeQuestion].question}
          />
          <div className={styles.OptionType}>
            <div style={{ color: "#9F9F9F", fontSize: "1.2vw" }}>
              Option Type
            </div>

<label
  className={styles.container}
  onClick={() => {
    handleOption("text");
    setOption("text");
  }}
>
  <input
    type="radio"
    name="optionType"
    checked={option === "text"} 
    onChange={() => {}}
  />
  <span className={styles.checkmark}></span>Text
</label>
<label
  className={styles.container}
  onClick={() => {
    handleOption("image");
    setOption("image");
  }}
>
  <input
    type="radio"
    name="optionType"
    checked={option === "image"} 
  />
  <span className={styles.checkmark}></span>Image
</label>
<label
  className={styles.container}
  onClick={() => {
    handleOption("both");
    setOption("both");
  }}
>
  <input
    type="radio"
    name="optionType"
    checked={option === "both"}
    onChange={() => {}}
  />
  <span className={styles.checkmark}></span>Text & Image
</label>

          </div>
          <div className={styles.Option}>
            <div className={styles.optionInputs}>
              {activeQuestion &&
                questionNumber.quiz[activeQuestion] &&
                Object.entries(questionNumber.quiz[activeQuestion].option).map(
                  ([optionKey, optionValue], index) => (
                    <div className={styles.Inputs} key={index}>
                     <label className={styles.container}>
               <input
                        type="radio"
                        name={`option${activeQuestion}`}
                        checked={
                          questionNumber.quiz[activeQuestion].answer ===
                          `option${index + 1}`
                        }
                        onChange={() => handleInputClick(`option${index + 1}`)}
                      />
             
              <span className={styles.checkmark}></span>
            </label>
                     
                      {(option === "both" || option === "text") && (
                        <input  style={{zIndex:"1",backgroundColor: questionNumber.quiz[activeQuestion].answer === `option${index + 1}` ? '#60B84B' : '',
                        color:questionNumber.quiz[activeQuestion].answer === `option${index + 1}` ? 'white' : '#9F9F9F' }}
                        
                          placeholder="Text"
                          value={optionValue.text}
                          onChange={(e) =>
                            handleOptionChange(e, optionKey, "text")
                          }
                        />
                      )}
                      {(option === "both" || option === "image") && (
                        <input  style={{zIndex:"1",backgroundColor: questionNumber.quiz[activeQuestion].answer === `option${index + 1}` ? '#60B84B' : '',color:questionNumber.quiz[activeQuestion].answer === `option${index + 1}` ? 'white' : '#9F9F9F' }}
                          placeholder="Image URL"
                          value={optionValue.image}
                          onChange={(e) =>
                            handleOptionChange(e, optionKey, "image")
                          }
                        />
                      )}
                      {index > 1 && (
                        <img className={styles.Delete} onClick={() => removeOption(index)} src={Delete} />
                      )}
                    </div>
                  )
                )}
              {questionNumber?.quiz?.[activeQuestion]?.option?.option4 ? (
                ""
              ) : (
                <button className={styles.addBtn} onClick={addOption}>Add option</button>
              )}
            </div>
            <div className={styles.Timer}>
              <p>Timer</p>
              <div>
              <button className={questionNumber.timer === '0' && styles.timerColor} onClick={() => handleTimer("0")}>OFF</button>
              <button className={questionNumber.timer === '5' && styles.timerColor} onClick={() => handleTimer("5")}>5 sec</button>
              <button className={questionNumber.timer === '10' && styles.timerColor} onClick={() => handleTimer("10")}>10 sec</button>
              </div>
            </div>
          </div>
          <div className={styles.CreateBtn}>
            <p
              onClick={() => navigate("/analytics")}
              style={{
                boxShadow: "0px 0px 15px 0px #00000040",
                color: "#474444",
              }}
            >
              Cancel
            </p>
            <p onClick={CreateQuestion} style={{ backgroundColor: "#60B84B", color: "white" }}>
              Create Quiz
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

