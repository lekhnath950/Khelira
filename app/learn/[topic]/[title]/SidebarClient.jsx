
// components/Sidebar.js

"use client";
import { useState } from "react";
import learnData from "../../../../lib/learn.json";
import styles from "../../learn.module.css";
import { slugify } from "@/utils/slugify";

// This is the main component that renders the sidebar and its content.
export function SidebarContent({ topic, currentTitle, levels, onTopicClick }) {
  const [query, setQuery] = useState("");

  const allLessons = Object.entries(learnData).flatMap(([key, val]) =>
    val.levels.map((lvl) => ({
      topicKey: key,
      topicTitle: val.title,
      lessonTitle: lvl.title,
      level: lvl.level,
    }))
  );

  const filtered = allLessons.filter(
    (lesson) =>
      lesson.topicTitle.toLowerCase().includes(query.toLowerCase()) ||
      lesson.lessonTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        className={styles.allTopicsBtn}
        onClick={() => (window.location.href = "/learn")}
      >
        ← All Topics
      </button>

      <input
        type="text"
        placeholder="Search lessons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      {query === "" ? (
        <>
          <h3>{learnData[topic].title}</h3>
          <ul className="topic-title">
            {levels.map((lvl) => (
              <li key={lvl.level}>
                <a
                  href={`/learn/${topic}/${slugify(lvl.title)}`}
                  className={slugify(lvl.title) === currentTitle ? styles.activeLesson : ""}
                >
                  {lvl.title}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.otherTopics}>
            <h4>Other Topics</h4>
            <ul className="otherT">
              {Object.entries(learnData)
                .filter(([key]) => key !== topic)
                .map(([key, val]) => (
                  <li key={key}>
                    <a href={`/learn/${key}/${slugify(val.levels[0].title)}`}>
                      {val.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.resultList}>
          {filtered.length > 0 ? (
            filtered.map((lesson, i) => (
              <a
                key={i}
                href={`/learn/${lesson.topicKey}/${slugify(lesson.lessonTitle)}`}
                className={styles.resultItem}
              >
                <strong>{lesson.lessonTitle}</strong>
                <span>({lesson.topicTitle} - Level {lesson.level})</span>
              </a>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </>
  );
}

// This is the wrapper component for the sidebar logic and toggle button.
export default function SidebarWrapper({ topic, currentTitle, levels }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        className={styles.toggleSidebarBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Hide Menu" : "Show Menu"}
      </button>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <SidebarContent topic={topic} currentTitle={currentTitle} levels={levels} />
      </aside>
    </>
  );
}