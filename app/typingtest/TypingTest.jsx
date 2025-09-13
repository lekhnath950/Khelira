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
    <TypingTestModule mode="normal" />
     </section>

  );
}
