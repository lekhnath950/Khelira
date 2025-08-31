"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import '../styles/globals.css';
import { FaGamepad, FaBars, FaDeleteLeft} from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Navbar(){
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    // Basic localStorage example: remember last visited route
    try {
      localStorage.setItem("khelira:lastVisited", pathname || "/");
    } catch {}
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <nav className={styles.nav} aria-label="Primary">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Khelira home">
          <FaGamepad className={styles.brandIcon} aria-hidden="true" />
          <span>Khelira</span>
        </Link>
        <div className={styles.links} role="menubar">
          <Link className={`${styles.link} ${isActive("/") ? styles.active : ""}`} href="/">Home</Link>
          <Link className={styles.link} href="/projects">Projects</Link>
          {/* <Link className={styles.link} href="/gamerules">Game Rules</Link> */}
          <Link className={styles.link} href="/about">About</Link>
          <Link className={styles.link} href="/contact">Contact</Link>
          <Link className={styles.link} href="/typingtest">Typing Test</Link>
          <Link className={styles.link} href="/learn">Learn</Link>
        </div>
        {/* <button className={`btn ${styles.menuBtn}`} aria-expanded={open} aria-controls="drawer" onClick={()=>setOpen(v=>!v)}>
          <FaBars aria-hidden="true" /> Menu
        </button> */}

        <button className={`btn ${styles.menuBtn}`} aria-expanded={open} aria-controls="drawer" onClick={()=>setOpen(v=>!v)}>
  {/* Conditionally render the icon based on the 'open' state */}
  {open ? <FaDeleteLeft aria-hidden="true" className="close-button" /> : <FaBars aria-hidden="true" />}
</button>
      </div>
      {open && (
        <div id="drawer" className={styles.drawer} role="dialog" aria-modal="true">
          <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link href="/projects" onClick={()=>setOpen(false)}>Projects</Link>
          {/* <Link href="/gamerules" onClick={()=>setOpen(false)}>Game Rules</Link> */}
          <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
          <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
          <Link href="/typingtest" onClick={()=>setOpen(false)}>Typing Test</Link>
          <Link href="/learn" onClick={()=>setOpen(false)}>Learn</Link>
        </div>
      )}
    </nav>
  );
}
