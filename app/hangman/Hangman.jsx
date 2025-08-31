"use client";
import styles from "./hangman.module.css";
import '../../styles/globals.css';
import { useEffect } from "react";
import { FaPuzzlePiece } from "react-icons/fa6";

export default function Hangman(){
  useEffect(()=>{
    try { localStorage.setItem("khelira:lastVisited", "/hangman"); } catch {}
  }, []);
  return (
    <section className={styles.wrap}>
      <p className={styles.badge}><FaPuzzlePiece aria-hidden="true" /> Coming Soon</p>
      <h1>Hangman</h1>
      <p>Scaffold ready. Guess we'll hang tight for the release. 😉</p>
    </section>
  );
}
