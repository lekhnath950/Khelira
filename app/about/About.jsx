import styles from "./about.module.css";
import '../../styles/globals.css';
import SEO from "../../components/SEO";

const team = [
  { name: "Sagar", role: "Founder / Dev" },
  { name: "Sagar Khanal", role: "Designer" },
  // { name: "Player Three", role: "Community" },
];

export default function About(){
  return (
    <section className={styles.wrap}>
      <SEO jsonld={{"@context":"https://schema.org","@type":"AboutPage","name":"About Khelira"}} />
      <h1>About</h1>
      <p>Khelira means “playing.” We craft tiny, focused experiences that feel smooth, modern, and welcoming.</p>
      <h2>Mission</h2>
      <p>Make games that load fast, respect attention, and spark curiosity.</p>
      {/* <h2>Team</h2>
      <div className={styles.team}>
        {team.map((t)=>(
          <article key={t.name} className={styles.card} aria-label={`${t.name} card`}>
            <div className={styles.avatar} role="img" aria-label={`${t.name} avatar`} />
            <h3 style={{marginBottom:0}}>{t.name}</h3>
            <p style={{color:"var(--muted)"}}>{t.role}</p>
          </article>
        ))}
      </div> */}
    </section>
  );
}
