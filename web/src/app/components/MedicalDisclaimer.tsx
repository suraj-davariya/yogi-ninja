"use client";

import { useState } from "react";

interface MedicalDisclaimerProps {
  /** Compact inline variant vs full banner */
  variant?: "banner" | "inline" | "card";
}

export default function MedicalDisclaimer({ variant = "banner" }: MedicalDisclaimerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (variant === "inline") {
    return (
      <p
        id="medical-disclaimer-inline"
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          fontStyle: "italic",
          margin: "0.5rem 0 0",
          lineHeight: 1.5,
        }}
      >
        ⚕️ Always confirm unusual ingredients with your healthcare provider.
      </p>
    );
  }

  if (variant === "card") {
    return (
      <div
        id="medical-disclaimer-card"
        className="yogi-card"
        style={{
          padding: "1.5rem",
          display: "flex",
          gap: "1.25rem",
          alignItems: "flex-start",
          background: "var(--stone-50)",
          border: "1px solid var(--stone-200)",
        }}
      >
        <span style={{ fontSize: "1.5rem", filter: "grayscale(1)" }}>⚕️</span>
        <div>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.6 }}>
            <span style={{ color: "var(--brand-primary)", fontWeight: 700 }}>Healthcare Reminder.</span>{" "}
            Yogi Ninja is a recipe utility, not a medical tool. Before trying any new or
            unfamiliar ingredient during pregnancy, please confirm it is safe with your
            healthcare provider.
          </p>
        </div>
      </div>
    );
  }

  // Default: dismissible banner
  if (dismissed) return null;

  return (
    <div
      id="medical-disclaimer-banner"
      role="alert"
      aria-live="polite"
      style={{
        background: "var(--stone-900)",
        color: "var(--stone-50)",
        padding: "0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
        fontSize: "0.8rem",
        fontWeight: 500,
        letterSpacing: "0.02em"
      }}
    >
      <p style={{ margin: 0 }}>
        ⚕️ <strong>Medical Reminder:</strong> Confirm any unusual ingredients with your
        healthcare provider.
      </p>
      <button
        id="medical-disclaimer-dismiss"
        aria-label="Dismiss medical disclaimer"
        onClick={() => setDismissed(true)}
        style={{
          background: "transparent",
          border: "1px solid var(--stone-600)",
          cursor: "pointer",
          color: "var(--stone-300)",
          fontSize: "0.75rem",
          padding: "0.3rem 0.75rem",
          borderRadius: "9999px",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--stone-400)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--stone-600)")}
      >
        Dismiss
      </button>
    </div>
  );
}
