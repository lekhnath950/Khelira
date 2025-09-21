import styles from "./projects.module.css";
import '../../styles/globals.css';
import Link from "next/link";
import SEO from "../../components/SEO";
import { FaKeyboard, FaPuzzlePiece } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";

const items = [
  { href: "https://typing.khelira.com", title: "Typing Test", img: "/project-1.jpg", icon: <FaKeyboard />, desc: "Challenge your fingers and sharpen your skills. A sleek, distraction-free typing test to measure speed, accuracy, and growth in real time.", tag: "Test your skills and Practice" },
  { href: "https://hangman.khelira.com", title: "Hangman", img: "/project-2.jpg", icon: <FaPuzzlePiece />, desc: "A modern twist on the classic word-guessing game. Fun, minimal, and addictive — test your vocabulary and strategy skills!", tag: "Play with fun" },
  { href: "https://learn.khelira.com", title: "Learn - Web Development and Programming", img: "/project-2.jpg", icon: <SiCoursera />, desc: "Master the art of coding from the ground up. Explore programming languages, frameworks, and tools to become a full-stack developer with hands-on lessons and real-world projects.", tag: "Simple Learn" }
];

export default function Projects(){
  return (
    <div className={styles.wrap}>
      <SEO jsonld={{"@context":"https://schema.org","@type":"CollectionPage","name":"Khelira Projects"}} />
      <h1>Projects</h1>
      <p>Explore games and experiments. More coming soon.</p>
      <div className={`grid ${styles.grid}`} role="list">
        {items.map((x)=> (
          <article key={x.href} className={styles.card} role="listitem">
            {/* <img src={x.img} alt={x.title} loading="lazy" /> */}

            <Link href={x.href} aria-label={`Visit ${x.title}`}>
            <div className={styles.body}>
              <h3>{x.icon} {" "}{x.title}</h3>
              <p>{x.desc}</p>
              {/* <p className={styles.tag} aria-label={`Tag ${x.tag}`}>{x.tag}</p> */}
              <div style={{marginTop:'.5rem'}}>
                {/* <Link className="btn" href={x.href} aria-label={`Visit ${x.title}`}>Open</Link> */}
              </div>
            </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
