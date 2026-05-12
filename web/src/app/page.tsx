"use client";

import { useState, useEffect } from "react";
import NauseaCheckIn from "./components/NauseaCheckIn";
import VirtualFreezer from "./components/VirtualFreezer";
import TagSearch from "./components/TagSearch";
import Typewriter from "./components/Typewriter";

type NauseaLevel = "severe" | "moderate" | "mild" | "none";
type DairyTolerance = "yes" | "plant-only" | "no";

interface CheckInResult {
  nausea: NauseaLevel;
  dairy: DairyTolerance;
  flavor: string;
}

export default function Home() {
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null);
  const [activeTab, setActiveTab] = useState<"recipes" | "freezer">("recipes");
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Artificial initialization for brand effect
    const timer = setTimeout(() => setInitializing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (initializing) {
    return (
      <div style={{ 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        background: "var(--color-background)"
      }}>
        <div style={{ width: "20rem" }}>
          <Typewriter 
            variant="glitch"
            lines="INITIALIZING RECIPE ENGINE..."
            className="mono-font"
            style={{ fontSize: "0.875rem", color: "var(--color-primary)", letterSpacing: "0.1em" }}
          />
          <div style={{ 
            height: "2px", 
            width: "100%", 
            background: "var(--color-border)", 
            marginTop: "1rem",
            overflow: "hidden",
            position: "relative"
          }}>
            <div className="skeleton-shimmer" style={{ position: "absolute", inset: 0 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-slide" style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
      {/* Hero Section */}
      <section
        id="hero"
        style={{
          textAlign: "center",
          padding: "10rem 0 8rem",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Typographical Backdrop Layer */}
        <div className="hero-backdrop-text" style={{ fontSize: "25vw" }}>
          NINJA
        </div>

        <div
          className="animate-fade-slide"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "var(--color-primary-soft)",
            color: "var(--color-primary-deep)",
            borderRadius: "var(--radius-pill)",
            padding: "0.6rem 1.5rem",
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "3rem",
            border: "1px solid var(--color-primary)",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <span style={{ fontSize: "1rem" }}>🧘</span> Artisan Precision
        </div>

        <div style={{ position: "relative", marginBottom: "4rem" }}>
          <h1
            style={{
              fontSize: "clamp(4rem, 15vw, 10rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <span 
              className="display-font" 
              style={{ 
                fontSize: "0.4em", 
                fontStyle: "italic", 
                fontWeight: 600, 
                color: "var(--color-text-secondary)",
                marginBottom: "-0.1em",
                marginLeft: "-2em"
              }}
            >
              Mindful
            </span>
            <span 
              className="typewriter--gradient" 
              style={{ 
                fontWeight: 900, 
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase"
              }}
            >
              <Typewriter 
                variant="manifesto" 
                lines="CREAMI" 
                startDelay={800}
              />
            </span>
            <span 
              className="display-font" 
              style={{ 
                fontSize: "0.5em", 
                fontWeight: 700, 
                color: "var(--color-accent)",
                marginTop: "-0.2em",
                marginLeft: "2.5em"
              }}
            >
              Creation.
            </span>
          </h1>
        </div>

        <div
          style={{
            fontSize: "1.4rem",
            color: "var(--color-text-secondary)",
            maxWidth: "40rem",
            margin: "0 auto",
            lineHeight: 1.5,
            fontWeight: 500,
            minHeight: "4.5rem"
          }}
        >
          <p style={{ margin: "0 0 1rem" }}>Expertly curated recipes filtered for your prenatal journey.</p>
          <Typewriter 
            variant="whisper"
            lines="Precision engineered. Artisan crafted. Endlessly yours."
            startDelay={1800}
            style={{ color: "var(--color-text-primary)", fontWeight: 600 }}
          />
        </div>
      </section>

      {/* Daily Check-In Flow */}
      {!checkInResult ? (
        <section
          id="check-in-section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "6rem",
          }}
        >
          <NauseaCheckIn onComplete={(result) => setCheckInResult(result as CheckInResult)} />
        </section>
      ) : (
        <section
          id="check-in-summary"
          className="yogi-card"
          style={{
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "4rem",
            borderLeft: "6px solid var(--color-primary)",
            background: "var(--color-surface-glass)",
            backdropFilter: "blur(8px)"
          }}
        >
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <div style={{ fontSize: "2rem" }}>✨</div>
            <div>
              <p style={{ margin: "0 0 0.25rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Active Profile</p>
              <p style={{ margin: 0, fontSize: "1.1rem", color: "var(--color-text-primary)", fontWeight: 600 }}>
                {checkInResult.nausea} nausea • {checkInResult.dairy} dairy • {checkInResult.flavor}
              </p>
            </div>
          </div>
          <button
            id="check-in-reset"
            onClick={() => setCheckInResult(null)}
            className="yogi-btn-ghost"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.875rem" }}
          >
            Update Check-In
          </button>
        </section>
      )}

      {/* Main Experience Tabs */}
      <div
        id="main-tabs"
        role="tablist"
        className="glass-panel"
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: "0.5rem",
          width: "fit-content",
          margin: "0 auto 4rem",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        {(["recipes", "freezer"] as const).map((tab) => (
          <button
            key={tab}
            id={`tab-${tab}`}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.875rem 2.5rem",
              borderRadius: "var(--radius-lg)",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "1rem",
              transition: "all var(--duration-medium) cubic-bezier(0.4, 0, 0.2, 1)",
              background: activeTab === tab
                ? "var(--gradient-cta)"
                : "transparent",
              color: activeTab === tab ? "var(--color-text-inverse)" : "var(--color-text-muted)",
              boxShadow: activeTab === tab ? "var(--shadow-cta)" : "none"
            }}
          >
            {tab === "recipes" ? "🍦 Discover" : "❄️ The Vault"}
          </button>
        ))}
      </div>

      {/* Experience Content */}
      <div id="tab-content" style={{ paddingBottom: "8rem" }}>
        {activeTab === "recipes" && (
          <TagSearch
            nauseaFilter={checkInResult?.nausea ?? null}
            dairyFilter={checkInResult?.dairy ?? null}
          />
        )}
        {activeTab === "freezer" && <VirtualFreezer />}
      </div>
    </div>
  );
}
