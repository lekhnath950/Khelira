import styles from "./projects.module.css";
import '../../styles/globals.css';
import Link from "next/link";
import SEO from "../../components/SEO";
import { FaKeyboard, FaPuzzlePiece } from "react-icons/fa6";

const items = [
  { href: "https://www.typing.khelira.com", title: "Typing Test", img: "/project-1.jpg", icon: <FaKeyboard />, desc: "Measure your typing speed with a clean, focused UI.", tag: "Test your skills and Practice" },
  { href: "https://www.hangman.khelira.com", title: "Hangman", img: "/project-2.jpg", icon: <FaPuzzlePiece />, desc: "Classic guessing game with a modern vibe.", tag: "Play with fun" },
  // { href: "/vrar", title: "VR/AR Preview", img: "/project-3.jpg", icon: <FaPuzzlePiece />, desc: "Futuristic playground for immersive demos.", tag: "Preview" },
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
            <div className={styles.body}>
              <h3>{x.icon} {" "}{x.title}</h3>
              <p>{x.desc}</p>
              <p className={styles.tag} aria-label={`Tag ${x.tag}`}>{x.tag}</p>
              <div style={{marginTop:'.5rem'}}>
                <Link className="btn" href={x.href} aria-label={`Visit ${x.title}`}>Open</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
