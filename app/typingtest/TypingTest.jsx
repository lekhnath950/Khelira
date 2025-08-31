"use client";
import styles from "./typingtest.module.css";
import '../../styles/globals.css';
import { useEffect } from "react";
import { FaKeyboard } from "react-icons/fa6";
// import TypingTestModule from "@/components/TypingTestModule";
import TypingTestModule from "../../components/TypingTestModule";

export default function TypingTest(){
  useEffect(()=>{
    try { localStorage.setItem("khelira:lastVisited", "/typingtest"); } catch {}
  }, []);
  return (
    <section className={styles.wrap}>
      {/* <p className={styles.badge}><FaKeyboard aria-hidden="true" /> Coming Soon</p> */}
      {/* <h1>Typing Test </h1> */}
      {/* <p>Scaffold ready. The full experience is launching soon.</p> */}
    <TypingTestModule mode="normal" />
     </section>

  );
}
