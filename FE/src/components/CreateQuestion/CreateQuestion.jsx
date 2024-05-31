import React, { useState } from "react";
import Analytics from "../Analytics/Analytics";
import styles from "./CreateQuestion.module.css";
import Plus from "../../assets/images/Add.png";
import Cross from "../../assets/images/Cross.png";
import Delete from "../../assets/images/Delete.png";
import {postCreateQuiz} from '../../apis/quiz'
import { useNavigate } from "react-router-dom";

export default function CreateQuestion() {
  const navigate = useNavigate()
  const [option, setOption] = useState("image");

  const [poll, setPoll] = useState(false);
  
  const [questionCount, setQuestionCount] = useState(1);

  const [optionCount, setOptionCount] = useState(2);

  const [activeQuestion, setActiveQuestion] = useState("1");

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
    selectedOptions: { option1: '0', option2: '0' },
  };

  

 

  const [questionNumber, setQuestionNumber] = useState({
    questionOrPoll: poll ? 'Poll' : 'Q & A' ,
    impression:'0',
    timer: '0',
    quizName:'',
    quiz: { 1: poll ? pollObject : qAObject },
  });

  const handleTimer=(e)=>{
    setQuestionNumber((prev) => ({
      ...prev,
      timer:e
    }));
  }

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
          selectedOptions:{
            ...prev.quiz[activeQuestion].selectedOptions,
            [newOptionCount]:'0'
          }
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
                acc[`option${newIndex}`] = prev.quiz[activeQuestion].option[key];
              }
              return acc;
            }, {}),
          selectedOptions: Object.keys(prev.quiz[activeQuestion].selectedOptions)
            .filter((key) => key !== `option${index + 1}`)
            .reduce((acc, key, i) => {
              const newIndex = i + 1;
              if (key !== `option${index + 1}`) {
                acc[`option${newIndex}`] = prev.quiz[activeQuestion].selectedOptions[key];
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
      
      setActiveQuestion(`${questionKey-1}`)
      }
      setQuestionNumber((prev) => {
      const updatedQuiz = { ...prev.quiz };
      delete updatedQuiz[questionKey];
  
      // Filter out the deleted question key
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

  const handleInputClick=(option)=>{
    setQuestionNumber((prev)=>({
      ...prev,
      quiz: {
        ...prev.quiz,
        [activeQuestion]: {
          ...prev.quiz[activeQuestion],
         answer:option
        }}
    }))
  }
  const handleOption=()=>{

  }

  const CreateQuestion=(...quizNumber)=>{
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

    const postQuestion=async()=>{
      const response =await postCreateQuiz(...questionNumber)
      if(response){
        alert('quiz created successfully')
        navigate('/analytics')
      }
    }



  }
  
  
  
  return (
    <>
      <Analytics/>
      <div>
      <div style={{display:'none'}} className={styles.QuestionOrPoll}>
          <input placeholder="Quiz name" />
          
      
        <div  className={styles.QuizType}>
          <p style={{boxShadow: 'none'}}>Quiz type</p>
          <p style={{fontSize:'1.7vw'}} onClick={() => setPoll(false)}>Q & A</p>
          <p style={{fontSize:'1.7vw'}}onClick={() => setPoll(true)}>Poll Type</p>
        </div>
        <div className={styles.QuestionOrPollBtn}>
          <button style={{color:'#474444',boxShadow: '0px 0px 15px 0px #00000040',fontSize:'1.8vw'}}>Cancel</button>
          <button style={{color:'white',backgroundColor:'#60B84B',fontSize:'1.7vw',fontSize:'1.8vw'}}>Continue</button>
        </div>
      </div>

      <div  className={styles.Question}>
        <div className={styles.AddQuestion}>
        <div className={styles.QuestionNumber_Add}>
  {Object.keys(questionNumber.quiz).map((key, index) => (
    <div key={key} style={{ display: "flex", alignItems: "center" }}>
    <div className={styles.QuestionNumber}>
      <div  onClick={() => setActiveQuestion(key)} >
        {key} 
      </div>
      {key !== "1" && <img className={styles.Cross}  onClick={() => removeQuestion(key)} src={Cross} />}
      </div>
    </div>
  ))}
  <div className={styles.Plus}><img
  
    style={{ display: questionCount === 5 && "none" }}
    onClick={addQuestion}
    src={Plus}
  /></div>
</div>


          <div className={styles.MaxQuestion}>Max 5 questions</div>
        </div>

        <div className={styles.Poll}>Poll Question </div>
        <div className={styles.OptionType}>
          <div style={{color: '#9F9F9F',fontSize:'1.2vw'}}>Option Type</div>

<label class={styles.container} onClick={()=> setOption('text')}>Text
  <input type="radio" name="radio"/>
  <span className={styles.checkmark}></span>
</label>
<label class={styles.container} onClick={()=> setOption('image')}>Image
  <input type="radio" name="radio"/>
  <span className={styles.checkmark}></span>
</label>
<label class={styles.container} onClick={()=> setOption('both')}>Text & Image
  <input type="radio" name="radio"/>
  <span className={styles.checkmark}></span>
</label>
        </div>
        <div className={styles.Option}>
          
            <div>
             
            {activeQuestion &&
              questionNumber.quiz[activeQuestion] && 
  Object.entries(questionNumber.quiz[activeQuestion].option || {}).map(
    ([optionKey, optionValue], index) => (
      <div className={styles.Inputs} key={index}>{console.log(activeQuestion)}
      
      <input
  type="radio"
  name={`option${activeQuestion}`}
  checked={questionNumber.quiz[activeQuestion].answer === `option${index + 1}`}
  onClick={() => handleInputClick(`option${index + 1}`)}
/>
        {option==='text' || option === 'both'&& <input
          
          placeholder="Text"
          value={optionValue.text}
          onChange={(e) => handleOptionChange(e, optionKey, 'text')}
        />}
       {option==='image' || option === 'both'&& <input
        
          placeholder="image URL"
          value={optionValue.image}
          onChange={(e) => handleOptionChange(e, optionKey, 'image')}
        />}
        {index > 1 && <img onClick={()=>removeOption(index)} src={Delete} />}
      </div>
    )
  )}
  {questionNumber.quiz[activeQuestion]?.option?.option4 ?  '': <button 
            onClick={addOption}
            >Add option</button>}

            </div>

           
          
          <div>
            <p>Timer</p>
            <button onClick={()=>handleTimer("0")}>OFF</button>
            <button onClick={()=>handleTimer("5")}>5 sec</button>
            <button onClick={()=>handleTimer("10")}>10 sec</button>
          </div>
        </div>
        <div className={styles.CreateBtn}>
          <p onClick={()=>navigate('/analytics')} style={{boxShadow: "0px 0px 15px 0px #00000040",color:'#474444'}}>Cancel</p>
          <p style={{backgroundColor:'#60B84B',color:'white'}}>Create Quiz</p>
        </div>
      </div>
      </div>
    </>
  );
}





