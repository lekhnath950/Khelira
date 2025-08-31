


// // components/LearnPage.js
// "use client";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import learnData from "../../../../lib/learn.json";
// import styles from "../../learn.module.css";
// import { slugify } from '../../../../utils/slugify'; // 👈 Import the slugify function

// export default function LearnPage() {
//   const { topic, title } = useParams();
//   const router = useRouter();
//   const [levelData, setLevelData] = useState(null);
//   const [levels, setLevels] = useState([]);
//   const [query, setQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (learnData[topic]) {
//       const topicLevels = learnData[topic].levels;
//       setLevels(topicLevels);

//       const current = topicLevels.find(
//         // Use slugify to match the URL title with the lesson title
//         (lvl) => slugify(lvl.title) === title
//       );
//       setLevelData(current);
//     }
//   }, [topic, title]);

//   if (!levelData) return <p>Loading...</p>;

//   const currentIndex = levels.findIndex(
//     (lvl) => lvl.level === levelData.level
//   );

//   // Flatten lessons for global search
//   const allLessons = Object.entries(learnData).flatMap(([key, val]) =>
//     val.levels.map((lvl) => ({
//       topicKey: key,
//       topicTitle: val.title,
//       lessonTitle: lvl.title,
//       level: lvl.level
//     }))
//   );

//   const filtered = allLessons.filter(
//     (lesson) =>
//       lesson.topicTitle.toLowerCase().includes(query.toLowerCase()) ||
//       lesson.lessonTitle.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className={styles.learnWrapper}>
//       {/* Mobile toggle button */}
//       <button
//         className={styles.toggleSidebarBtn}
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? "Hide Menu" : "Show Menu"}
//       </button>

//       {/* Sidebar */}
//       <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
//         <button
//           className={styles.allTopicsBtn}
//           onClick={() => router.push("/learn")}
//         >
//           ← All Topics
//         </button>

//         <input
//           type="text"
//           placeholder="Search lessons..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className={styles.searchInput}
//         />

//         {query === "" ? (
//           <>
//             <h3>{learnData[topic].title}</h3>
//             <ul>
//               {levels.map((lvl) => (
//                 <li key={lvl.level}>
//                   <button
//                     className={
//                       slugify(lvl.title) === title ? styles.activeLesson : "" // Use slugify here
//                     }
//                     onClick={() => router.push(`/learn/${topic}/${slugify(lvl.title)}`)} // Use slugify here
//                   >
//                     {lvl.title}
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <div className={styles.otherTopics}>
//               <h4>Other Topics</h4>
//               <ul>
//                 {Object.entries(learnData)
//                   .filter(([key]) => key !== topic)
//                   .map(([key, val]) => (
//                     <li key={key}>
//                       <button
//                         onClick={() => router.push(`/learn/${key}/${slugify(val.levels[0].title)}`)} // Use slugify heres
//                       >
//                         {val.title}
//                       </button>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </>
//         ) : (
//           <div className={styles.resultList}>
//             {filtered.length > 0 ? (
//               filtered.map((lesson, i) => (
//                 <button
//                   key={i}
//                   onClick={() => router.push(`/learn/${lesson.topicKey}/${slugify(lesson.lessonTitle)}`)} // Use slugify here
//                   className={styles.resultItem}
//                 >
//                   <strong>{lesson.lessonTitle}</strong>
//                   <span>
//                     ({lesson.topicTitle} - Level {lesson.level})
//                   </span>
//                 </button>
//               ))
//             ) : (
//               <p>No results found.</p>
//             )}
//           </div>
//         )}
//       </aside>

//       {/* Main content */}
//       <main className={styles.content}>
//         <nav className={styles.breadcrumb}>
//           <button onClick={() => router.push("/learn")}>Learn</button>
//           <span>›</span>
//           <button onClick={() => router.push(`/learn/${topic}/${slugify(levels[0].title)}`)}> 
//             {learnData[topic].title}
//           </button>
//           <span>›</span>
//           <span className={styles.currentCrumb}>{levelData.title}</span>
//         </nav>

//         <h1>
//           {learnData[topic].title} — {levelData.title}
//         </h1>
//         <ReactMarkdown>{levelData.description}</ReactMarkdown>

//         {levelData.example && (
//           <pre className={styles.codeBlock}>
//             <code>{levelData.example}</code>
//           </pre>
//         )}

//         <div className={styles.navButtons}>
//           <button
//             disabled={currentIndex === 0}
//             onClick={() => router.push(`/learn/${topic}/${slugify(levels[currentIndex - 1].title)}`)} // Use slugify here
//           >
//             ← Previous
//           </button>
//           <button
//             disabled={currentIndex === levels.length - 1}
//             onClick={() => router.push(`/learn/${topic}/${slugify(levels[currentIndex + 1].title)}`)} // Use slugify here
//           >
//             Next →
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }






// app/learn/[topic]/[title]/page.js
// import ReactMarkdown from "react-markdown";
// import learnData from "../../../../lib/learn.json";
// import styles from "../../learn.module.css";
// import { slugify } from "@/utils/slugify";
// import Sidebar from "@/components/LearnSidebar";

// // Server Component
// export default function LearnPage({ params }) {
//   const { topic, title } = params;

//   const topicData = learnData[topic];
//   if (!topicData) return <p>Topic not found</p>;

//   const levels = topicData.levels;
//   const levelData = levels.find((lvl) => slugify(lvl.title) === title);
//   if (!levelData) return <p>Lesson not found</p>;

//   const currentIndex = levels.findIndex((lvl) => lvl.level === levelData.level);

//   return (
//     <div className={styles.learnWrapper}>
//       {/* Sidebar as client component */}
//       <Sidebar topic={topic} title={title} />

//       {/* Main content */}
//       <main className={styles.content}>
//         <nav className={styles.breadcrumb}>
//           <a href="/learn">Learn</a>
//           <span>›</span>
//           <a href={`/learn/${topic}/${slugify(levels[0].title)}`}>{topicData.title}</a>
//           <span>›</span>
//           <span className={styles.currentCrumb}>{levelData.title}</span>
//         </nav>

//         <h1>{topicData.title} — {levelData.title}</h1>
//         <ReactMarkdown>{levelData.description}</ReactMarkdown>

//         {levelData.example && (
//           <pre className={styles.codeBlock}>
//             <code>{levelData.example}</code>
//           </pre>
//         )}

//         <div className={styles.navButtons}>
//           <a
//             className={currentIndex === 0 ? "disabled" : ""}
//             href={`/learn/${topic}/${slugify(levels[currentIndex - 1]?.title)}`}
//           >
//             ← Previous
//           </a>
//           <a
//             className={currentIndex === levels.length - 1 ? "disabled" : ""}
//             href={`/learn/${topic}/${slugify(levels[currentIndex + 1]?.title)}`}
//           >
//             Next →
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// // Generate all static params for Netlify static export
// export async function generateStaticParams() {
//   const params = [];
//   Object.entries(learnData).forEach(([topicKey, topicVal]) => {
//     topicVal.levels.forEach((lvl) => {
//       params.push({
//         topic: topicKey,
//         title: slugify(lvl.title),
//       });
//     });
//   });
//   return params;
// }







// app/learn/[topic]/[title]/page.js
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import learnData from "../../../../lib/learn.json";
import styles from "../../learn.module.css";
import { slugify } from "@/utils/slugify";
import LearnSidebar from "@/components/LearnSidebar";
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