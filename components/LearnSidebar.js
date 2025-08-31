// // components/LearnSidebar.js
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import learnData from "../lib/learn.json";
// import { slugify } from "@/utils/slugify";
// import styles from "../app/learn/learn.module.css";

// export default function Sidebar({ topic, title }) {
//   const [query, setQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();

//   const topicData = learnData[topic];
//   const levels = topicData ? topicData.levels : [];

//   // Flatten all lessons
//   const allLessons = Object.entries(learnData).flatMap(([key, val]) =>
//     val.levels.map((lvl) => ({
//       topicKey: key,
//       topicTitle: val.title,
//       lessonTitle: lvl.title,
//       level: lvl.level,
//     }))
//   );

//   const filtered = allLessons.filter(
//     (lesson) =>
//       lesson.topicTitle.toLowerCase().includes(query.toLowerCase()) ||
//       lesson.lessonTitle.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <>
//       <button
//         className={styles.toggleSidebarBtn}
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? "Hide Menu" : "Show Menu"}
//       </button>

//       <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
//         <button className={styles.allTopicsBtn} onClick={() => router.push("/learn")}>
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
//             <h3>{topicData.title}</h3>
//             <ul>
//               {levels.map((lvl) => (
//                 <li key={lvl.level}>
//                   <button
//                     className={slugify(lvl.title) === title ? styles.activeLesson : ""}
//                     onClick={() => router.push(`/learn/${topic}/${slugify(lvl.title)}`)}
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
//                         onClick={() =>
//                           router.push(`/learn/${key}/${slugify(val.levels[0].title)}`)
//                         }
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
//                   onClick={() =>
//                     router.push(`/learn/${lesson.topicKey}/${slugify(lesson.lessonTitle)}`)
//                   }
//                   className={styles.resultItem}
//                 >
//                   <strong>{lesson.lessonTitle}</strong>
//                   <span>({lesson.topicTitle} - Level {lesson.level})</span>
//                 </button>
//               ))
//             ) : (
//               <p>No results found.</p>
//             )}
//           </div>
//         )}
//       </aside>
//     </>
//   );
// }



// components/LearnSidebar.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify";
import learnData from "../lib/learn.json";
import styles from "../app/learn/learn.module.css";

export default function LearnSidebar({ currentTopic, currentTitle }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topicLevels = learnData[currentTopic]?.levels || [];
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
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      <button
        className={styles.toggleSidebarBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Hide Menu" : "Show Menu"}
      </button>

      <button
        className={styles.allTopicsBtn}
        onClick={() => router.push("/learn")}
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
          <h3>{learnData[currentTopic]?.title}</h3>
          <ul>
            {topicLevels.map((lvl) => (
              <li key={lvl.level}>
                <button
                  className={
                    slugify(lvl.title) === currentTitle ? styles.activeLesson : ""
                  }
                  onClick={() =>
                    router.push(`/learn/${currentTopic}/${slugify(lvl.title)}`)
                  }
                >
                  {lvl.title}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.otherTopics}>
            <h4>Other Topics</h4>
            <ul>
              {Object.entries(learnData)
                .filter(([key]) => key !== currentTopic)
                .map(([key, val]) => (
                  <li key={key}>
                    <button
                      onClick={() =>
                        router.push(`/learn/${key}/${slugify(val.levels[0].title)}`)
                      }
                    >
                      {val.title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.resultList}>
          {filtered.length > 0 ? (
            filtered.map((lesson, i) => (
              <button
                key={i}
                onClick={() =>
                  router.push(
                    `/learn/${lesson.topicKey}/${slugify(lesson.lessonTitle)}`
                  )
                }
                className={styles.resultItem}
              >
                <strong>{lesson.lessonTitle}</strong>
                <span>
                  ({lesson.topicTitle} - Level {lesson.level})
                </span>
              </button>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </aside>
  );
}
