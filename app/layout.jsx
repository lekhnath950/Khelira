// import "./globals.css";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script"; // <-- Import the Script component

export const metadata = {
  metadataBase: new URL("https://khelira.com"),
  title: {
    default: "Khelira — Play Minimal, Win Big",
    template: "%s | Khelira",
  },
  description: "Khelira (खेलिरा) — a modern, dark, minimalist playground for web games and experiments.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Khelira — Play Minimal, Win Big",
    description: "A visually memorable gaming site with modern dark theme.",
    url: "https://khelira.com",
    siteName: "Khelira",
    images: [{ url: "/logo.svg", width: 256, height: 256 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main id="main" className="container">{children}</main>
        <Footer />
      
        <Script
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8017840986434846"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}