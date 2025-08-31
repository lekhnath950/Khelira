
// app/learn/[topic]/[title]/page.js
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import learnData from "../../../../lib/learn.json";
import styles from "../../learn.module.css";
import { slugify } from "@/utils/slugify";
import Sidebar from "./SidebarClient";


export async function generateStaticParams() {
  const paths = [];
  for (const [topicKey, topicVal] of Object.entries(learnData)) {
    topicVal.levels.forEach((lvl) => {
      paths.push({
        topic: topicKey,
        title: slugify(lvl.title),
      });
    });
  }
  return paths;
}

export default async function LessonPage({ params }) {
  const { topic, title } = await params;

  const topicData = learnData[topic];
  if (!topicData) return <p>Topic not found</p>;

  const levels = topicData.levels;
  const current = levels.find((lvl) => slugify(lvl.title) === title);
  if (!current) return <p>Lesson not found</p>;

  const currentIndex = levels.findIndex((lvl) => lvl.title === current.title);

  return (
    <div className={styles.learnWrapper}>
      {/* Client-side interactive sidebar */}
      <Sidebar    topic={topic} currentTitle={title} levels={levels} />

      {/* Main content */}
      <main className={styles.content}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <a href="/learn">Learn</a>
          <span>›</span>
          <a href={`/learn/${topic}/${slugify(levels[0].title)}`}>
            {topicData.title}
          </a>
          <span>›</span>
          <span className={styles.currentCrumb}>{current.title}</span>
        </nav>

        <h1>
          {topicData.title} — {current.title}
        </h1>

        <ReactMarkdown>{current.description}</ReactMarkdown>

        {current.example && (
          <pre className={styles.codeBlock}>
            <code>{current.example}</code>
          </pre>
        )}

        {/* Navigation buttons */}
        <div className={styles.navButtons}>
          <a
            href={
              currentIndex > 0
                ? `/learn/${topic}/${slugify(levels[currentIndex - 1].title)}`
                : "#"
            }
            className={currentIndex === 0 ? styles.disabled : ""}
          >
            ← Previous
          </a>
          <a
            href={
              currentIndex < levels.length - 1
                ? `/learn/${topic}/${slugify(levels[currentIndex + 1].title)}`
                : "#"
            }
            className={currentIndex === levels.length - 1 ? styles.disabled : ""}
          >
            Next →
          </a>
        </div>
      </main>
    </div>
  );
}