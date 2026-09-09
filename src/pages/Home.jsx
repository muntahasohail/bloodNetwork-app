import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import About from '../components/layout/About';
import Features from "../components/layout/Features";
import BloodCompatibility from "../components/layout/BloodCompatibility";
import Reviews from '../components/layout/reviews';
import Stats from "../components/layout/Stats";
import Footer from "../components/layout/Footer";

function Home() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "home-reveal-style";
    style.textContent = `
      .home-shell {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #fff7f7 0%, #ffffff 45%, #fff5f5 100%);
      }
      .home-shell::before,
      .home-shell::after {
        content: "";
        position: absolute;
        border-radius: 999px;
        filter: blur(18px);
        opacity: 0.6;
        pointer-events: none;
        animation: homeFloat 10s ease-in-out infinite;
      }
      .home-shell::before {
        width: 320px;
        height: 320px;
        background: radial-gradient(circle, rgba(220,38,38,0.18), transparent 70%);
        top: -70px;
        left: -80px;
      }
      .home-shell::after {
        width: 420px;
        height: 420px;
        background: radial-gradient(circle, rgba(127,29,29,0.12), transparent 70%);
        bottom: -120px;
        right: -90px;
        animation-duration: 14s;
      }
      .home-grid {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(220,38,38,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.05) 1px, transparent 1px);
        background-size: 36px 36px;
        mask-image: linear-gradient(180deg, rgba(0,0,0,0.45), transparent 85%);
        pointer-events: none;
        opacity: 0.65;
      }
      @keyframes homeFloat {
        0%, 100% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(18px,-16px,0) scale(1.06); }
      }
      .reveal-section {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.75s ease, transform 0.75s ease;
      }
      .reveal-section.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    const sections = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      document.getElementById("home-reveal-style")?.remove();
    };
  }, []);

  return (
    <div className="home-shell">
      <div className="home-grid" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <div id="about" className="reveal-section"><About /></div>
        <div id="features" className="reveal-section"><Features /></div>
        <div className="reveal-section"><BloodCompatibility /></div>
        <div className="reveal-section"><Stats /></div>
        <div id="reviews" className="reveal-section"><Reviews /></div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;