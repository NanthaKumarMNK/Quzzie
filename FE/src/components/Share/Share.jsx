import React,{useState,useEffect} from 'react'
import Analytics from '../Analytics/Analytics'
import styles from './Share.module.css'
import { useLocation } from "react-router-dom";
import { getLastQuizIdByUser } from "../../apis/quiz";

export default function Share() {
  const {state} = useLocation()

  const [stateId] = useState(state?.id);
  const [quizId,setQuizId]=useState()
  
  const [userId] = useState(localStorage.getItem("userId"));

  const getLastCreatedQuiz=async()=>{
    const response=await getLastQuizIdByUser(userId)
    setQuizId(response.id)
  }

  useEffect(() => {
    if (!state) {
      getLastCreatedQuiz()
    }
  }, []);
  return (
    <>
    <Analytics/>
    <div className={styles.Share}>
    <h2>Congrats your Quiz is <br/>Published!</h2>
    <p>{`http://localhost:5173/question/${state ? stateId : quizId}`}</p>

    <button>Share</button>
    </div></>
  )
}

// import React, { useRef } from 'react';

// const CopyText = () => {
//   const textRef = useRef(null); // Create a ref for the div

//   const copyText = () => {
//     const textToCopy = textRef.current.innerText; // Get the text from the div using the ref
//     navigator.clipboard.writeText(textToCopy); // Copy the text to the clipboard
//     alert('Text copied to clipboard: ' + textToCopy); // Provide feedback to the user
//   }

//   return (
//     <div>
//       {/* Div containing the text, with a ref */}
//       <div ref={textRef}>This is the text to copy.</div>

//       {/* Button to trigger copying */}
//       <button onClick={copyText}>Copy Text</button>
//     </div>
//   );
// }

// export default CopyText;
