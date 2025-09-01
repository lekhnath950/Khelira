// app/learn/[topic]/page.js

import Link from "next/link";
import learnData from "../../../lib/learn.json";
import styles from "../learn.module.css";
import { slugify } from "@/utils/slugify";
import Sidebar from "./[title]/SidebarClient";


export async function generateStaticParams() {
  const paths = Object.keys(learnData).map((topicKey) => ({
    topic: topicKey,
  }));
  return paths;
}

export default async function TopicPage({ params }) {
  const { topic } = await params;
  const topicData = learnData[topic];

  if (!topicData) {
    return <p>Topic not found.</p>;
  }

  return (
    <div className={styles.learnWrapper}>
      {/* Sidebar for navigation */}
      <Sidebar topic={topic} levels={topicData.levels} />

      <main className={styles.learnContent}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.learnBreadcrumb}>
          <a href="/learn">Learn</a>
          <span>›</span>
          <span className={styles.learnCurrentCrumb}>{topicData.title}</span>
        </nav>

        {/* Topic Title and Description */}
        <h1>{topicData.title}</h1>
        <p>{topicData.description}</p>

        {/* List of Lessons */}
        <div className={styles.learnLessonsGrid}>
          {topicData.levels.map((lesson) => (
            <Link
              key={slugify(lesson.title)}
              href={`/learn/${topic}/${slugify(lesson.title)}`}
              className={styles.learnLessonCard}
            >
              <h3>{lesson.title}</h3>
              <p>{lesson.description.substring(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}