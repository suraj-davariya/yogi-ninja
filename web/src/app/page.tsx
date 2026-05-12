"use client";

import { useState } from "react";
import NauseaCheckIn from "./components/NauseaCheckIn";
import VirtualFreezer from "./components/VirtualFreezer";
import TagSearch from "./components/TagSearch";

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

  return (
    <div>
      {/* Hero */}
      <section
        id="hero"
        style={{
          textAlign: "center",
          padding: "8rem 0 6rem",
          marginBottom: "4rem",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "var(--stone-200)",
            color: "var(--brand-primary)",
            borderRadius: "9999px",
            padding: "0.6rem 1.5rem",
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          Prenatal Safety • Dec 1 2026
        </div>
        <h1
          className="display-font"
          style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            color: "var(--text-primary)",
            margin: "0 0 2rem",
            lineHeight: 1,
          }}
        >
          Mindful <br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>Creami Creation.</span>
        </h1>
        <p
          style={{
            fontSize: "1.4rem",
            color: "var(--text-secondary)",
            maxWidth: "40rem",
            margin: "0 auto",
            lineHeight: 1.5,
            fontWeight: 400,
            fontFamily: "var(--font-sans)"
          }}
        >
          A curated collection of vegetarian recipes filtered for your current state. 
          Gentle, professional, and precise.
        </p>
      </section>

      {/* Daily check-in */}
      {!checkInResult ? (
        <section
          id="check-in-section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "5rem",
          }}
        >
          <NauseaCheckIn onComplete={(result) => setCheckInResult(result as CheckInResult)} />
        </section>
      ) : (
        <section
          id="check-in-summary"
          className="yogi-card"
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "3rem",
            borderLeft: "4px solid var(--yogi-violet)"
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ fontSize: "1.5rem" }}>🧠</div>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>
              Recipes matched to your check-in: 
              <span style={{ color: "var(--yogi-violet)", fontWeight: 700, marginLeft: "0.5rem" }}>
                {checkInResult.nausea} nausea • {checkInResult.dairy} dairy • {checkInResult.flavor}
              </span>
            </p>
          </div>
          <button
            id="check-in-reset"
            onClick={() => setCheckInResult(null)}
            className="yogi-btn-ghost"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            Update Profile
          </button>
        </section>
      )}

      {/* Tab bar */}
      <div
        id="main-tabs"
        role="tablist"
        className="yogi-card"
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: "0.4rem",
          width: "fit-content",
          marginBottom: "3rem",
          borderRadius: "1.25rem",
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
              padding: "0.75rem 2rem",
              borderRadius: "1rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.95rem",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              background: activeTab === tab
                ? "var(--gradient-primary)"
                : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-muted)",
              boxShadow: activeTab === tab ? "0 10px 15px -3px rgba(99, 102, 241, 0.3)" : "none"
            }}
          >
            {tab === "recipes" ? "🍦 Discover Recipes" : "🧊 My Virtual Freezer"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div id="tab-content">
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
