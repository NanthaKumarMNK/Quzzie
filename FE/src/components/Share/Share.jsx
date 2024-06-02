import React from 'react'
import Analytics from '../Analytics/Analytics'
import styles from './Share.module.css'
export default function Share() {
  return (
    <>
    <Analytics/>
    <div className={styles.Share}>
    <h2>Congrats your Quiz is <br/>Published!</h2>
    <p>adsdasd</p>
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
