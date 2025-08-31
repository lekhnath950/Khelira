
"use client";
import { useState } from "react";
import Link from "next/link";
import learnData from "../../lib/learn.json";
import styles from "./learn.module.css";
import { slugify } from "@/utils/slugify";

export default function LearnHome() {
  const [query, setQuery] = useState("");

  // Flatten lessons with topic reference
  const lessons = Object.entries(learnData).flatMap(([key, val]) =>
    val.levels.map((lvl) => ({
      topicKey: key,
      topicTitle: val.title,
      lessonTitle: lvl.title,
      level: lvl.level,
    }))
  );

  // Filter lessons by search query
  const filtered = lessons.filter(
    (lesson) =>
      lesson.topicTitle.toLowerCase().includes(query.toLowerCase()) ||
      lesson.lessonTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className={styles.learnHome}>
      <h1>Learn Playground</h1>
      <p>Select a topic to get started:</p>

      {/* Search bar */}
      <div className={styles.searchBox}>
        <input 
          type="text"
          placeholder="Search topics or lessons..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* If no query → show topics */}
      {query === "" ? (
        <div className={styles.topicGrid}>
          {Object.entries(learnData).map(([key, val]) => (
            <Link
              key={key}
              href={`/learn/${key}/${slugify(val.levels[0].title)}`}
              className={styles.topicCard}
            >
              <h3>{val.title}</h3>
              <p>{val.levels.length} lessons</p>
            </Link>
          ))}
        </div>
      ) : (
        // Search results
        <div className={styles.resultList}>
          {filtered.length > 0 ? (
            filtered.map((lesson, i) => (
              <Link
                key={i}
                href={`/learn/${lesson.topicKey}/${slugify(
                  lesson.lessonTitle
                )}`}
                className={styles.resultItem}
              >
                <strong>{lesson.lessonTitle}</strong>
                <span>
                  ({lesson.topicTitle} - Level {lesson.level})
                </span>
              </Link>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </section>
  );
}
