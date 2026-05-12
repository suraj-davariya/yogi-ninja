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
  const progress = ((step / 3) * 100).toFixed(0);

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
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✨</div>
        <h2
          className="display-font"
          style={{ fontSize: "1.5rem", color: "var(--yogi-violet)", margin: "0 0 0.5rem" }}
        >
          Your recipes are ready.
        </h2>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          We filtered everything to match how you feel today.
        </p>
        <button
          id="check-in-redo"
          onClick={() => { setStep(0); setNausea(null); setDairy(null); setFlavor(null); setSubmitted(false); }}
          className="yogi-btn-ghost"
          style={{ marginTop: "1.25rem" }}
        >
          Update my check-in
        </button>
      </div>
    );
  }

  return (
    <div
      id="nausea-check-in"
      className="yogi-card animate-fade-slide"
      style={{ padding: "2rem", maxWidth: "36rem", width: "100%" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "0 0 0.35rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Step {step + 1} of 3
        </p>
        <h2
          className="display-font"
          style={{ fontSize: "1.4rem", color: "var(--text-primary)", margin: "0 0 1rem" }}
        >
          {steps[step]}
        </h2>
        {/* Progress bar */}
        <div style={{ height: "5px", background: "var(--surface-2)", borderRadius: "9999px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${step === 0 ? "33" : step === 1 ? "66" : "100"}%`,
              background: "linear-gradient(135deg, var(--yogi-violet), var(--yogi-teal))",
              borderRadius: "9999px",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Step 0: Nausea level */}
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {nauseaOptions.map((opt) => (
            <button
              key={opt.value}
              id={`nausea-opt-${opt.value}`}
              onClick={() => { setNausea(opt.value); setStep(1); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: "0.875rem 1.1rem",
                borderRadius: "0.875rem",
                border: `1.5px solid ${nausea === opt.value ? "var(--yogi-violet)" : "var(--border-soft)"}`,
                background: nausea === opt.value ? "var(--yogi-violet-pale)" : "var(--surface-1)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{opt.emoji}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>{opt.label}</p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 1: Dairy tolerance */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {dairyOptions.map((opt) => (
            <button
              key={opt.value}
              id={`dairy-opt-${opt.value}`}
              onClick={() => { setDairy(opt.value); setStep(2); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: "0.875rem 1.1rem",
                borderRadius: "0.875rem",
                border: `1.5px solid ${dairy === opt.value ? "var(--yogi-violet)" : "var(--border-soft)"}`,
                background: dairy === opt.value ? "var(--yogi-violet-pale)" : "var(--surface-1)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{opt.emoji}</span>
              <p style={{ margin: 0, fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>{opt.label}</p>
            </button>
          ))}
          <button
            id="dairy-step-back"
            onClick={() => setStep(0)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 2: Flavor mood */}
      {step === 2 && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.25rem" }}>
            {flavorOptions.map((opt) => (
              <button
                key={opt.value}
                id={`flavor-opt-${opt.value}`}
                onClick={() => setFlavor(opt.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 0.9rem",
                  borderRadius: "9999px",
                  border: `1.5px solid ${flavor === opt.value ? "var(--yogi-violet)" : "var(--border-soft)"}`,
                  background: flavor === opt.value ? "var(--yogi-violet-pale)" : "var(--surface-1)",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: flavor === opt.value ? "var(--yogi-violet)" : "var(--text-secondary)",
                  transition: "all 0.18s ease",
                }}
              >
                <span>{opt.emoji}</span> {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button
              id="flavor-step-back"
              onClick={() => setStep(1)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}
            >
              ← Back
            </button>
            <button
              id="check-in-submit"
              disabled={!flavor}
              onClick={handleSubmit}
              className="yogi-btn-primary"
              style={{ opacity: flavor ? 1 : 0.45, cursor: flavor ? "pointer" : "not-allowed" }}
            >
              Show my recipes →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
