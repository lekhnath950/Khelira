"use client";
import styles from "./home.module.css";
import '../../styles/globals.css';
import Link from "next/link";
import SEO from "../../components/SEO";
import {  FaLaptopCode, FaGamepad, FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Home(){
  const [lastVisited, setLastVisited] = useState("/");
  useEffect(()=>{
    try {
      const v = localStorage.getItem("khelira:lastVisited");
      if (v) setLastVisited(v);
    } catch {}
  }, []);

  return (
    <>
      <SEO jsonld={{
        "@context":"https://schema.org",
        "@type":"WebSite",
        "name":"Khelira",
        "url":"https://khelira.example.com",
        "potentialAction": {
          "@type":"SearchAction",
          "target":"https://khelira.example.com/search?q={query}",
          "query-input":"required name=query"
        }
      }} />
      <section className={`${styles.hero}`} aria-labelledby="welcome">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 id="welcome">Khelira — playing with pixels</h1>
            <p>Welcome! Explore minimalist web games and playful experiments. Everything is fast, dark, and focused.</p>
            <div className={styles.heroActions}>
              <Link className="btn btn-accent" href="/projects">Browse Projects</Link>
              <Link className="btn" href="/gamerules">Read Game Rules</Link>
              <Link className="btn" href={lastVisited}>Jump back to: {lastVisited}</Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <div className={`parallax ${styles.heroParallax}`} role="img" aria-label="Abstract gaming background"></div>
          </div>
        </div>
      </section>

      <section className={styles.cards} aria-label="Highlights">
        <div className="grid" style={{gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"}}>
          <article className={styles.card}>
            <h3><FaGamepad aria-hidden="true" /> Play Web Games</h3>
            <p>Enjoy fun, interactive online games directly in your browser—no downloads required.</p>
          </article>
          <article className={styles.card}>
            <h3><FaLaptopCode aria-hidden="true" /> Learn Web Development</h3>
              <p>Step-by-step tutorials for HTML, CSS, JavaScript, and more—perfect for beginners and enthusiasts alike.</p>
          </article>
          <article className={styles.card}>
            <h3><FaUsers aria-hidden="true" /> Community & Challenges</h3>
            <p>Coming Soon..</p>
          </article>
        </div>
      </section>
    </>
  );
}
