"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./TypingTestModule.module.css";

const easyWords = [
  "cat", "dog", "home", "ball", "run", "smile", "book", "tree", "fish", 
  "star", "play", "walk", "bird", "milk", "sun", "moon", "rain", "car", 
  "hat", "cake", "bed", "pen", "bag", "ship", "frog", "apple", "door",
  "cup", "map", "boy", "girl", "kite", "bus", "road", "duck", "toy",
  "leaf", "blue", "red", "jump", "sing", "ride", "foot", "hand", "day",
  "nose", "ear", "farm", "milk", "tree", "flag", "king", "queen", "gold",
  "bell", "ring", "sand", "wind", "ice", "snow", "lamp", "rose", "seed",
  "rock", "fish", "cook", "draw", "read", "work", "game", "town", "hill",
  "park", "wave", "rope", "song", "bird", "frog", "nest", "clap", "bake",
  "hair", "face", "corn", "rice", "boat", "salt", "fire", "wood", "milk",
  "bear", "lion", "wolf", "cow", "duck", "egg", "rain", "wind", "stone",
  "key", "rope", "bed", "soap", "lamp", "frog", "leaf", "pig", "bee", "ant"
];

const mediumWords = [
  "typing", "keyboard", "history", "player", "journey", "mistake", "window",
  "forest", "bridge", "castle", "energy", "secret", "travel", "dreams",
  "nature", "planet", "school", "market", "street", "future", "danger",
  "family", "puzzle", "escape", "adventure", "signal", "shadow", "memory",
  "hidden", "orange", "purple", "silver", "animal", "rocket", "pocket",
  "throne", "castle", "hunter", "dragon", "storm", "castle", "weapon",
  "leader", "battle", "shadow", "mirror", "music", "dance", "voice",
  "spirit", "castle", "prison", "freedom", "garden", "summer", "winter",
  "autumn", "spring", "mountain", "desert", "ocean", "island", "river",
  "bridge", "ladder", "circle", "square", "window", "handle", "candle",
  "future", "signal", "trouble", "master", "hunter", "mystery", "castle",
  "energy", "safety", "planet", "rocket", "travel", "danger", "memory",
  "action", "jungle", "silver", "prison", "castle", "hidden", "advice",
  "secret", "travel", "wander", "future", "battle", "planet", "legend"
];

const hardWords = [
  "psychology", "philosophy", "synchronization", "responsibility", "metamorphosis",
  "architecture", "transcendence", "consciousness", "photosynthesis", "civilization",
  "neuroscience", "authenticity", "revolutionary", "cryptography", "sustainability",
  "unpredictable", "vulnerability", "globalization", "artificiality", "extraordinary",
  "representation", "quantitative", "institutional", "infrastructure", "microbiology",
  "circumference", "communication", "misinterpretation", "configuration", "implementation",
  "phenomenon", "appreciation", "discrimination", "miscommunication", "hierarchical",
  "collaboration", "transportation", "documentation", "classification", "multiplication",
  "interrogation", "demonstration", "reconciliation", "magnification", "clarification",
  "consideration", "accommodation", "investigation", "sophistication", "identification",
  "revolutionary", "unification", "resurrection", "authorization", "acknowledgment",
  "contemplation", "biotechnology", "parliamentary", "extraordinarily", "unsuccessfully",
  "disproportionate", "characteristics", "comprehension", "congratulations",
  "transformation", "uncomfortable", "unsatisfactory", "interpretation", "philanthropy",
  "psychotherapy", "contradiction", "superintendent", "astrophysics", "astrobiology",
  "precondition", "contradictory", "microscopically", "unavailability", "rationalization",
  "phenomenology", "counterproductive", "multidimensional", "irreversibility",
  "categorization", "systematically", "hyperventilation", "irreproducible"
];


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
