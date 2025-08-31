import styles from "./gamerules.module.css";
import '../../styles/globals.css';
import SEO from "../../components/SEO";

export default function GameRules(){
  return (
    <section className={styles.wrap}>
      <SEO jsonld={{"@context":"https://schema.org","@type":"Article","headline":"Khelira Game Rules"}} />
      <h1>Game Rules</h1>
      <p className={styles.rule}><strong>Be kind.</strong> We want play, not pressure. Respect fellow players.</p>
      <h2>Typing Test</h2>
      <dl className={styles.dl}>
        <dt>Objective</dt>
        <dd>Type the given prompt as fast and accurately as you can.</dd>
        <dt>Scoring</dt>
        <dd>WPM and accuracy. Personal best is saved locally.</dd>
      </dl>
      <h2>Hangman</h2>
      <dl className={styles.dl}>
        <dt>Objective</dt>
        <dd>Guess the secret word by choosing letters.</dd>
        <dt>Scoring</dt>
        <dd>Fewer mistakes = higher score. Local history is stored.</dd>
      </dl>
    </section>
  );
}
