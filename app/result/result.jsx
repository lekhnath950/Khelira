"use client";

import { useEffect, useState } from "react";

export default function Result() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    try {
      const saved =
        JSON.parse(localStorage.getItem("typingtest:results")) || [];
      setResults(saved);
    } catch {}
  }, []);

  const clearResults = () => {
    localStorage.removeItem("typingtest:results");
    setResults([]);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "2rem", fontFamily: "Fira Code, monospace" }}>
      <h1>Results</h1>
      {results.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {results.map((r, i) => (
            <li key={i}>
              {r.date} — {r.wpm} WPM, {r.accuracy}% (Mode: {r.mode}, {r.duration}s)
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={clearResults}
        style={{
          padding: "0.6rem 1.2rem",
          marginTop: "1rem",
          border: "none",
          borderRadius: "0.4rem",
          background: "red",
          color: "white",
          cursor: "pointer"
        }}
      >
        Clear All
      </button>
    </div>
  );
}
