"use client";

import { useState } from "react";

type NauseaLevel = "severe" | "moderate" | "mild" | "none";
type DairyTolerance = "yes" | "plant-only" | "no";
type FlavorMood = "neutral" | "fruity" | "creamy" | "minty" | "anything";

interface CheckInResult {
  nausea: NauseaLevel;
  dairy: DairyTolerance;
  flavor: FlavorMood;
}

interface Props {
  onComplete?: (result: CheckInResult) => void;
}

const nauseaOptions: { value: NauseaLevel; label: string; emoji: string; desc: string }[] = [
  { value: "severe", label: "Rough day", emoji: "😞", desc: "Keeping things very gentle" },
  { value: "moderate", label: "Okay-ish", emoji: "😐", desc: "Mild flavors preferred" },
  { value: "mild", label: "Pretty good", emoji: "🙂", desc: "Open to richer options" },
  { value: "none", label: "Feeling great", emoji: "😄", desc: "Bring on the treats!" },
];

const dairyOptions: { value: DairyTolerance; label: string; emoji: string }[] = [
  { value: "yes", label: "Yes, dairy is fine", emoji: "🥛" },
  { value: "plant-only", label: "Plant milk only", emoji: "🌱" },
  { value: "no", label: "Nothing dairy-based", emoji: "🚫" },
];

const flavorOptions: { value: FlavorMood; label: string; emoji: string }[] = [
  { value: "neutral", label: "Bland and simple", emoji: "⚪" },
  { value: "fruity", label: "Fresh fruit vibes", emoji: "🍓" },
  { value: "creamy", label: "Rich and creamy", emoji: "🍦" },
  { value: "minty", label: "Cool and minty", emoji: "🌿" },
  { value: "anything", label: "Surprise me!", emoji: "✨" },
];

export default function NauseaCheckIn({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [nausea, setNausea] = useState<NauseaLevel | null>(null);
  const [dairy, setDairy] = useState<DairyTolerance | null>(null);
  const [flavor, setFlavor] = useState<FlavorMood | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const steps = ["How are you feeling?", "Can you handle dairy?", "What sounds good?"];

  function handleSubmit() {
    if (!nausea || !dairy || !flavor) return;
    setSubmitted(true);
    onComplete?.({ nausea, dairy, flavor });
  }

  if (submitted) {
    return (
      <div
        id="check-in-complete"
        className="yogi-card animate-fade-slide"
        style={{ padding: "3rem 2rem", textAlign: "center" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
        <h2
          className="display-font"
          style={{ fontSize: "1.875rem", color: "var(--color-primary)", margin: "0 0 0.75rem" }}
        >
          Your curated discoveries are ready.
        </h2>
        <p style={{ color: "var(--color-text-secondary)", margin: "0 0 2rem", fontSize: "1rem" }}>
          We have filtered the vault to match your current needs.
        </p>
        <button
          id="check-in-redo"
          onClick={() => { setStep(0); setNausea(null); setDairy(null); setFlavor(null); setSubmitted(false); }}
          className="yogi-btn-ghost"
        >
          Update My Check-In
        </button>
      </div>
    );
  }

  return (
    <div
      id="nausea-check-in"
      className="yogi-card animate-fade-slide"
      style={{ padding: "2.5rem", maxWidth: "40rem", width: "100%" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "0 0 0.5rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Discovery Step {step + 1} of 3
        </p>
        <h2
          className="display-font"
          style={{ fontSize: "1.75rem", color: "var(--color-text-primary)", margin: "0 0 1.5rem" }}
        >
          {steps[step]}
        </h2>
        {/* Progress bar */}
        <div style={{ height: "6px", background: "var(--color-primary-soft)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${((step + 1) / 3) * 100}%`,
              background: "var(--gradient-brand)",
              borderRadius: "var(--radius-pill)",
              transition: "width var(--duration-medium) cubic-bezier(0.2, 1, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Step 0: Nausea level */}
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {nauseaOptions.map((opt) => (
            <button
              key={opt.value}
              id={`nausea-opt-${opt.value}`}
              onClick={() => { setNausea(opt.value); setStep(1); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                border: `1.5px solid ${nausea === opt.value ? "var(--color-primary)" : "var(--color-border)"}`,
                background: nausea === opt.value ? "var(--color-primary-soft)" : "var(--color-surface)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all var(--duration-fast) ease",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{opt.emoji}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: "var(--color-text-primary)", fontSize: "1rem" }}>{opt.label}</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 1: Dairy tolerance */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {dairyOptions.map((opt) => (
            <button
              key={opt.value}
              id={`dairy-opt-${opt.value}`}
              onClick={() => { setDairy(opt.value); setStep(2); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                border: `1.5px solid ${dairy === opt.value ? "var(--color-primary)" : "var(--color-border)"}`,
                background: dairy === opt.value ? "var(--color-primary-soft)" : "var(--color-surface)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all var(--duration-fast) ease",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{opt.emoji}</span>
              <p style={{ margin: 0, fontWeight: 700, color: "var(--color-text-primary)", fontSize: "1rem" }}>{opt.label}</p>
            </button>
          ))}
          <button
            id="dairy-step-back"
            onClick={() => setStep(0)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: "0.875rem", marginTop: "0.5rem", fontWeight: 600 }}
          >
            ← Previous Step
          </button>
        </div>
      )}

      {/* Step 2: Flavor mood */}
      {step === 2 && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
            {flavorOptions.map((opt) => (
              <button
                key={opt.value}
                id={`flavor-opt-${opt.value}`}
                onClick={() => setFlavor(opt.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "var(--radius-pill)",
                  border: `1.5px solid ${flavor === opt.value ? "var(--color-primary)" : "var(--color-border)"}`,
                  background: flavor === opt.value ? "var(--color-primary-soft)" : "var(--color-surface)",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: flavor === opt.value ? "var(--color-primary)" : "var(--color-text-secondary)",
                  transition: "all var(--duration-fast) ease",
                }}
              >
                <span>{opt.emoji}</span> {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              id="flavor-step-back"
              onClick={() => setStep(1)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: "0.875rem", fontWeight: 600 }}
            >
              ← Previous Step
            </button>
            <button
              id="check-in-submit"
              disabled={!flavor}
              onClick={handleSubmit}
              className="yogi-btn-primary"
              style={{ flex: 1, opacity: flavor ? 1 : 0.5 }}
            >
              Show My Discoveries →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
