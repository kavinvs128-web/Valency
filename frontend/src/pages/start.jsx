// start.jsx
// Main landing page component.
// Imports: ./start.css for all styles, ./periodicTable.jsx for the background grid.

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/start.css";
import PeriodicBackground from "../components/periodicTable";
import valencyLogo from "../assets/valency-logo.svg";
export default function Start() {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Pulse ring animation on click (CSS class toggled for 620 ms)
  const handleStartClick = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.classList.remove("clicked");
    void btn.offsetWidth; // force reflow so re-clicking restarts animation
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 620);

    navigate("/signin");
  };

  return (
    <main className="start-page">
      {/* Dark gradient overlay */}
      <div className="start-page-overlay" />

      {/* Animated periodic table background */}
      <PeriodicBackground />

      {/* Hero content */}
      <section className="hero-content" aria-labelledby="pageTitle">
        {/*
          ── Logo ──────────────────────────────────────────────────────────
          Once you have the real image asset, replace the placeholder below with:

          <img
            className="site-logo"
            src="/assets/learning-about-chemistry-logo.png"
            alt="Chemutree chemistry learning logo"
          />
        */}
        <img
        className="site-logo-placeholder"
        src={valencyLogo}
        alt="Valency" />

        <h1 id="pageTitle">Learning about Chemistry</h1>

        <p className="tagline">Discover the science inside everything.</p>

        <p className="intro">
          Atoms, reactions, colors, energy — explained simply, one step at a
          time.
        </p>

        <button
          ref={buttonRef}
          className="start-button"
          id="startLearning"
          onClick={handleStartClick}
        >
          <span className="start-button-icon" aria-hidden="true"></span>
          Start learning
          <span className="start-button-arrow" aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}
