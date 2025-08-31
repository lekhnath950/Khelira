"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import styles from "../../typingTest.module.css";
import styles from "../../components/TypingTestModule.module.css";


export default function Result() {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("khelira:history") || "[]");
    setHistory(h);
  }, []);

  const replay = () => {
    const last = history[0];
    if (last) {
      localStorage.setItem(
        "khelira:replayConfig",
        JSON.stringify({ mode: last.mode, duration: last.duration, difficulty: last.difficulty })
      );
      router.push("/typingtest");
    }
  };

  return (
    <div className={styles.resultPage}>
      <h2>🏆 Your Result</h2>
      {history.length > 0 && (
        <div className={styles.currentResult}>
          <p>WPM: {history[0].wpm}</p>
          <p>CPM: {history[0].cpm}</p>
          <p>Accuracy: {history[0].accuracy}%</p>
          <p>Accurate WPM: {history[0].accurateWPM}</p>
          <p>Mode: {history[0].mode} | Duration: {history[0].duration}</p>
          <p>Difficulty: {history[0].difficulty}</p>
          <button onClick={replay}>🔁 Replay Test</button>
        </div>
      )}

      <h3>📜 History</h3>
      <ul className={styles.historyList}>
        {history.map((res, i) => (
          <li key={i}>
            {res.timestamp} — {res.wpm} WPM | {res.accuracy}% | {res.mode} | {res.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
}
