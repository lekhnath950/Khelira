

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./TypingTestModule.module.css";

// const easyWords = ["cat", "dog", "home", "ball", "run", "smile"];
// const mediumWords = [
//   "typing", "keyboard", "history", "player", "journey", "mistake", "window"
// ];
// const hardWords = [
//   "psychology", "philosophy", "synchronization", "responsibility", "metamorphosis"
// ];

// export default function TypingTestModule() {
//   const router = useRouter();
//   const [mode, setMode] = useState("time");
//   const [duration, setDuration] = useState(60);
//   const [difficulty, setDifficulty] = useState("medium");
//   const [text, setText] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [typed, setTyped] = useState("");
//   const [errors, setErrors] = useState(0);
//   const [typedChars, setTypedChars] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(duration);
//   const [startTime, setStartTime] = useState(null);

//   // Stats
//   const [wpm, setWPM] = useState(0);
//   const [cpm, setCPM] = useState(0);
//   const [accuracy, setAccuracy] = useState(100);
//   const [accurateWPM, setAccurateWPM] = useState(0);

//   const inputRef = useRef(null);
//   const wordsRef = useRef(null);

//   useEffect(() => {
//     if (mode === "time") setTimeLeft(duration);
//   }, [duration, mode]);

//   const generateWords = (count = 30) => {
//     let pool =
//       difficulty === "easy"
//         ? easyWords
//         : difficulty === "hard"
//         ? hardWords
//         : mediumWords;
//     return Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]);
//   };

//   const startTest = () => {
//     setText(generateWords(mode === "words" ? duration : 30));
//     setIsRunning(true);
//     setStartTime(Date.now());
//     setTyped("");
//     setCurrentIndex(0);
//     setErrors(0);
//     setTypedChars(0);
//   };

//   const endTest = () => {
//     setIsRunning(false);

//     const history = JSON.parse(localStorage.getItem("khelira:history") || "[]");
//     const result = {
//       wpm,
//       cpm,
//       accuracy,
//       accurateWPM,
//       mode,
//       duration,
//       difficulty,
//       timestamp: new Date().toLocaleString(),
//     };
//     history.unshift(result);
//     localStorage.setItem("khelira:history", JSON.stringify(history));

//     router.push("/result");
//   };

//   useEffect(() => {
//     if (!isRunning || mode !== "time") return;
//     if (timeLeft <= 0) {
//       endTest();
//       return;
//     }
//     const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearTimeout(timer);
//   }, [timeLeft, isRunning, mode]);

//   // useEffect(() => {
//   //   if (!isRunning || !startTime) return;
//   //   const interval = setInterval(() => {
//   //     const minutes = (Date.now() - startTime) / 1000 / 60;
//   //     const grossWPM = (typedChars / 5) / minutes;
//   //     const acc = typedChars > 0 ? ((typedChars - errors) / typedChars) * 100 : 100;
//   //     const netWPM = grossWPM * (acc / 100);
//   //     const accWPM = (typedChars - errors) / 5 / minutes;

//   //     setWPM(netWPM.toFixed(2));
//   //     setCPM((typedChars / minutes).toFixed(2));
//   //     setAccuracy(acc.toFixed(2));
//   //     setAccurateWPM(accWPM.toFixed(2));
//   //   }, 1000);
//   //   return () => clearInterval(interval);
//   // }, [isRunning, typedChars, errors, startTime]);

//   // useEffect(() => {
//   //   if (wordsRef.current) {
//   //     wordsRef.current.scrollTop = wordsRef.current.scrollHeight;
//   //   }
//   // }, [currentIndex, text.length]);


//   useEffect(() => {
//   if (!isRunning || !startTime) return;
//   const interval = setInterval(() => {
//     const minutes = (Date.now() - startTime) / 1000 / 60;
//     const typedCharacters = typedChars > 0 ? typedChars : 1; // Prevent division by zero
    
//     const grossWPM = (typedCharacters / 5) / minutes;
//     const rawAccuracy = typedCharacters > 0 ? ((typedCharacters - errors) / typedCharacters) * 100 : 100;
//     const netWPM = grossWPM * (Math.max(0, rawAccuracy) / 100);

//     setWPM(Math.max(0, netWPM).toFixed(2));
//     setCPM(Math.max(0, (typedCharacters / minutes)).toFixed(2));
//     setAccuracy(Math.max(0, rawAccuracy).toFixed(2));
//     setAccurateWPM(Math.max(0, netWPM).toFixed(2));
//   }, 1000);
//   return () => clearInterval(interval);
// }, [isRunning, typedChars, errors, startTime]);
// useEffect(() => {
//     if (wordsRef.current) {
//         // Find the active word element
//         const activeWordElement = wordsRef.current.children[currentIndex];
        
//         if (activeWordElement) {
//             // Get the container's height and the active element's position
//             const containerHeight = wordsRef.current.clientHeight;
//             const elementHeight = activeWordElement.clientHeight;
//             const elementOffsetTop = activeWordElement.offsetTop;
            
//             // Calculate the desired scroll position to center the element
//             const scrollPosition = elementOffsetTop - (containerHeight / 1) + (elementHeight / 2);

//             wordsRef.current.scrollTop = scrollPosition;
//         }
//     }
// }, [currentIndex, text.length]);

//   useEffect(() => {
//     if (isRunning && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isRunning]);

//   useEffect(() => {
//     if (isRunning && currentIndex > 0 && currentIndex >= text.length - 10) {
//       setText(t => [...t, ...generateWords(30)]);
//     }
//   }, [currentIndex, isRunning, text.length]);


//   // const handleInput = (e) => {
//   //   const value = e.target.value;
    
//   //   if (value.endsWith(" ")) {
//   //     const currentWord = text[currentIndex];
//   //     if (value.trim() !== currentWord) {
//   //       setErrors((prev) => prev + 1);
//   //     }
//   //     setTypedChars((prev) => prev + currentWord.length + 1);
//   //     setCurrentIndex((i) => i + 1);
//   //     setTyped("");
//   //     if (mode === "words" && currentIndex + 1 >= duration) {
//   //       endTest();
//   //     }
//   //   } else {
//   //     setTyped(value);
//   //   }
//   // };


//   const handleInput = (e) => {
//   const value = e.target.value;
//   setTyped(value);

//   if (value.endsWith(" ")) {
//     const currentWord = text[currentIndex];
//     const typedWord = value.trim();
    
//     // Calculate characters typed for the word just completed
//     const charCount = typedWord.length + 1; // +1 for the space
//     setTypedChars(prev => prev + charCount);

//     // Calculate errors for the just-completed word
//     let wordErrors = 0;
//     for (let i = 0; i < Math.max(currentWord.length, typedWord.length); i++) {
//         if (typedWord[i] !== currentWord[i]) {
//             wordErrors++;
//         }
//     }
//     setErrors(prev => prev + wordErrors);

//     setCurrentIndex((i) => i + 1);
//     setTyped("");
    
//     if (mode === "words" && currentIndex + 1 >= duration) {
//       endTest();
//     }
//   }
// };

//   const renderWord = (word, wordIndex) => {
//     const typedWord = typed;

//     return word.split("").map((char, charIndex) => {
//       let className = "";
//       if (wordIndex < currentIndex) {
//         className = typedWord === word ? styles.correct : styles.incorrect;
//       } else if (wordIndex === currentIndex) {
//         if (charIndex < typedWord.length) {
//           className = char === typedWord[charIndex] ? styles.charCorrect : styles.charIncorrect;
//         } else if (charIndex === typedWord.length) {
//           className = styles.activeChar;
//         }
//       }

//       return (
//         <span key={charIndex} className={className}>
//           {char}
//         </span>
//       );
//     });
//   };


//   return (
//     <div className={styles.container}>
//       {!isRunning ? (
//         <div className={styles.setup}>
//           <h2>⚡ Typing Test</h2>
//           <div className={styles.controls}>
//             <label>Mode:</label>
//             <select value={mode} onChange={(e) => setMode(e.target.value)}>
//               <option value="time">Time</option>
//               <option value="words">Words</option>
//               <option value="infinite">Infinite</option>
//             </select>

//             {mode === "time" && (
//               <>
//                 <label>Duration:</label>
//                 <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//                   <option value={30}>30s</option>
//                   <option value={60}>60s</option>
//                   <option value={120}>120s</option>
//                 </select>
//               </>
//             )}

//             {mode === "words" && (
//               <>
//                 <label>Words:</label>
//                 <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </select>
//               </>
//             )}

//             <label>Difficulty:</label>
//             <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select> <br/>

//             <button onClick={startTest}>Start Test</button>
//           </div>
//         </div>
//       ) : (
//         <div className={styles.testArea}>
//           {mode === "time" && (
//             <div className={styles.progress}>
//               <div
//                 className={styles.progressBar}
//                 style={{ width: `${(timeLeft / duration) * 100}%` }}
//               ></div>
//             </div>
//           )}

//           <p ref={wordsRef} className={styles.words}>
//             {text.map((word, i) => (
//               <span
//                 key={i}
//                 className={
//                   i === currentIndex ? styles.active : (i < currentIndex ? styles.completed : "")
//                 }
//               >
//                 {renderWord(word, i)}{" "}
//               </span>
//             ))}
//           </p>

//           <input
//             ref={inputRef}
//             type="text"
//             value={typed}
//             onChange={handleInput}
//             disabled={!isRunning}
//             className={styles.input}
//           />

//           <div className={styles.stats}>
//             <p>WPM: {wpm}</p>
//             <p>CPM: {cpm}</p>
//             <p>Accuracy: {accuracy}%</p>
//             <p>Accurate WPM: {accurateWPM}</p>
//             {mode === "time" && <p>Time Left: {timeLeft}s</p>}
//           </div>

//           <button className={styles.endBtn} onClick={endTest}>
//             Doneeeee
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./TypingTestModule.module.css";

const easyWords = ["cat", "dog", "home", "ball", "run", "smile"];
const mediumWords = ["typing", "keyboard", "history", "player", "journey", "mistake", "window"];
const hardWords = ["psychology", "philosophy", "synchronization", "responsibility", "metamorphosis"];

export default function TypingTestModule() {
  const router = useRouter();
  const [mode, setMode] = useState("time");
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");
  const [text, setText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [startTime, setStartTime] = useState(null);

  // Stats
  const [wpm, setWPM] = useState(0);
  const [cpm, setCPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [accurateWPM, setAccurateWPM] = useState(0);

  const inputRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    if (mode === "time") setTimeLeft(duration);
  }, [duration, mode]);

  const generateWords = (count = 30) => {
    let pool =
      difficulty === "easy" ? easyWords :
      difficulty === "hard" ? hardWords :
      mediumWords;
    return Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]);
  };

  const startTest = () => {
    setText(generateWords(mode === "words" ? duration : 30));
    setIsRunning(true);
    setStartTime(Date.now());
    setTyped("");
    setCurrentIndex(0);
    setErrors(0);
    setTypedChars(0);
    setWPM(0);
    setCPM(0);
    setAccuracy(100);
    setAccurateWPM(0);
  };

  const endTest = () => {
    setIsRunning(false);
    // Remove interval effect before navigating
    setStartTime(null);

    const history = JSON.parse(localStorage.getItem("khelira:history") || "[]");
    const result = {
      wpm,
      cpm,
      accuracy,
      accurateWPM,
      mode,
      duration,
      difficulty,
      timestamp: new Date().toLocaleString(),
    };
    history.unshift(result);
    localStorage.setItem("khelira:history", JSON.stringify(history));

    router.push("/result");
  };

  // Timer for time mode
  useEffect(() => {
    if (!isRunning || mode !== "time") return;
    if (timeLeft <= 0) {
      endTest();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, mode]);

  // Stats calculation
  useEffect(() => {
    if (!isRunning || !startTime) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const minutes = Math.max( (now - startTime) / 1000 / 60 , 0.001 ); // Prevent divide by zero
      const typedCharacters = Math.max(typedChars, 1); // Avoid zero in denominator

      const grossWPM = (typedCharacters / 5) / minutes;
      const rawAccuracy = typedChars > 0 ? ((typedChars - errors) / typedChars) * 100 : 100;
      const netWPM = grossWPM * (Math.max(0, rawAccuracy) / 100);
      const accWPM = ((typedChars - errors) / 5) / minutes;

      setWPM((netWPM > 0 ? netWPM : 0).toFixed(2));
      setCPM((typedCharacters / minutes).toFixed(2));
      setAccuracy(rawAccuracy > 0 ? rawAccuracy.toFixed(2) : "0.00");
      setAccurateWPM((accWPM > 0 ? accWPM : 0).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, typedChars, errors, startTime]);

  // Scroll handling
  useEffect(() => {
    if (wordsRef.current) {
      const activeWordElement = wordsRef.current.children[currentIndex];
      if (activeWordElement) {
        const containerHeight = wordsRef.current.clientHeight;
        const elementHeight = activeWordElement.clientHeight;
        const elementOffsetTop = activeWordElement.offsetTop;
        const scrollPosition = elementOffsetTop - (containerHeight / 2) + (elementHeight / 2); // Correct centering
        wordsRef.current.scrollTop = scrollPosition;
      }
    }
  }, [currentIndex, text.length]);

  useEffect(() => {
    if (isRunning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRunning]);

  useEffect(() => {
    if (
      isRunning &&
      currentIndex > 0 &&
      currentIndex >= text.length - 10 &&
      mode !== "words"
    ) {
      setText(t => [...t, ...generateWords(30)]);
    }
  }, [currentIndex, isRunning, text.length, mode]);

  // Input handler
  const handleInput = (e) => {
    const value = e.target.value;
    setTyped(value);

    if (value.endsWith(" ")) {
      const currentWord = text[currentIndex] || "";
      const typedWord = value.trim();

      // Calculate typed chars - keep the space for consistency with stats
      const charCount = typedWord.length + 1;
      setTypedChars(prev => prev + charCount);

      // Errors for completed word
      let wordErrors = 0;
      for (let i = 0; i < Math.max(currentWord.length, typedWord.length); i++) {
        if (typedWord[i] !== currentWord[i]) {
          wordErrors++;
        }
      }
      setErrors(prev => prev + wordErrors);

      setCurrentIndex((i) => i + 1);
      setTyped("");

      // End test check for "words" mode
      if (mode === "words" && currentIndex + 1 >= duration) {
        endTest();
      }
      // For infinite mode, never end automatically
    }
  };

  // Word rendering
  const renderWord = (word, wordIndex) => {
    // Show feedback for past words
    let typedWord = "";
    if (wordIndex < currentIndex) {
      // Cannot use current input for past words
      typedWord = "" + word;
    }
    if (wordIndex === currentIndex) {
      typedWord = typed;
    }

    return word.split("").map((char, charIndex) => {
      let className = "";
      if (wordIndex < currentIndex) {
        // Word was already completed, should compare accuracy against word
        className = styles.correct;
      } else if (wordIndex === currentIndex) {
        if (charIndex < typedWord.length) {
          className = char === typedWord[charIndex] ? styles.charCorrect : styles.charIncorrect;
        } else if (charIndex === typedWord.length) {
          className = styles.activeChar;
        }
      }
      return (
        <span key={charIndex} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className={styles.container}>
      {!isRunning ? (
        <div className={styles.setup}>
          <h2>⚡ Typing Test</h2>
          <div className={styles.controls}>
            <label>Mode:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="time">Time</option>
              <option value="words">Words</option>
              <option value="infinite">Infinite</option>
            </select>

            {mode === "time" && (
              <>
                <label>Duration:</label>
                <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                  <option value={30}>30s</option>
                  <option value={60}>60s</option>
                  <option value={120}>120s</option>
                </select>
              </>
            )}

            {mode === "words" && (
              <>
                <label>Words:</label>
                <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </>
            )}

            <label>Difficulty:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select> <br/>

            <button onClick={startTest}>Start Test</button>
          </div>
        </div>
      ) : (
        <div className={styles.testArea}>
          {mode === "time" && (
            <div className={styles.progress}>
              <div
                className={styles.progressBar}
                style={{ width: `${(timeLeft / duration) * 100}%` }}
              ></div>
            </div>
          )}

          <p ref={wordsRef} className={styles.words}>
            {text.map((word, i) => (
              <span
                key={i}
                className={
                  i === currentIndex
                    ? styles.active
                    : i < currentIndex
                    ? styles.completed
                    : ""
                }
              >
                {renderWord(word, i)}{" "}
              </span>
            ))}
          </p>

          <input
            ref={inputRef}
            type="text"
            value={typed}
            onChange={handleInput}
            disabled={!isRunning}
            className={styles.input}
          />

          <div className={styles.stats}>
            <p>WPM: {wpm}</p>
            <p>CPM: {cpm}</p>
            <p>Accuracy: {accuracy}%</p>
            <p>Accurate WPM: {accurateWPM}</p>
            {mode === "time" && <p>Time Left: {timeLeft}s</p>}
          </div>

          <button className={styles.endBtn} onClick={endTest}>
            Doneeeee
          </button>
        </div>
      )}
    </div>
  );
}
