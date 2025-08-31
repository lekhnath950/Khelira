import styles from "./gamerules.module.css";
import '../../styles/globals.css';
import SEO from "../../components/SEO";
import Link from "next/link";

export default function GameRules(){
  return (
    <section className={styles.wrap}>
      <SEO jsonld={{"@context":"https://schema.org","@type":"Article","headline":"Khelira Game Rules"}} />
      <h1>Game Rules</h1>
      <p className={styles.rule}><strong>Be kind.</strong> We want play, not pressure. Respect fellow players.</p>
    
      <Link href={"https://typing.khelira.com/"} passHref legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <h2>Typing Test</h2>
        </a>
      </Link>
    
      <dl className={styles.dl}>
        <dt>Objective</dt>
        <dd>Type the given prompt as fast and accurately as you can.</dd>
        <dt>Scoring</dt>
        <dd>WPM and accuracy. Personal best is saved locally.</dd>
      </dl>



          <Link href={"https://hangman.khelira.com/"} passHref legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <h2>Hangman</h2>
        </a>
      </Link>
      <dl className={styles.dl}>
        <dt>Objective</dt>
        <dd>Guess the secret word by choosing letters.</dd>
        <dt>Scoring</dt>
        <dd>Fewer mistakes = higher score. Local history is stored.</dd>
      </dl>
    </section>
  );
}
