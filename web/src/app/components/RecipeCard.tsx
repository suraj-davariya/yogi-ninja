"use client";

import { useState } from "react";
import MedicalDisclaimer from "./MedicalDisclaimer";
import Typewriter from "./Typewriter";

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  base: string;
  tags: string[];
  nauseaFriendly: boolean;
  dairyFree: boolean;
  pintVolume: string;
  freezeTime: string;
  spinSetting: string;
  ingredients: { item: string; amount: string }[];
  instructions: string[];
  respinFix: { problem: string; fix: string }[];
  calories?: number;
}

interface Props {
  recipe: Recipe;
}

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7L12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>
);

const FreezeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
  </svg>
);

const SpinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 10 10" />
    <path d="M12 12l5 5" />
  </svg>
);

export default function RecipeCard({ recipe }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showRespinWizard, setShowRespinWizard] = useState(false);
  const [inFreezer, setInFreezer] = useState(false);

  return (
    <article
      id={`recipe-card-${recipe.id}`}
      className="yogi-card animate-fade-slide"
      style={{ 
        display: "flex", 
        flexDirection: "column",
        transition: "all var(--duration-medium) cubic-bezier(0.2, 1, 0.2, 1)"
      }}
      aria-label={`Recipe: ${recipe.name}`}
    >
      {/* Card header */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.25rem" }}>
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="yogi-tag">{tag}</span>
          ))}
          {recipe.nauseaFriendly && (
            <span className="yogi-tag" style={{ background: "var(--color-accent-soft)", color: "var(--color-accent-deep)", borderColor: "var(--color-accent)" }}>🧘 Zen Safe</span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              className="display-font"
              style={{ fontSize: "1.875rem", color: "var(--color-text-primary)", margin: "0 0 0.5rem", lineHeight: 1.1 }}
            >
              <span aria-hidden="true" style={{ marginRight: "0.75rem", fontStyle: "normal", fontSize: "1.6rem" }}>{recipe.emoji}</span>
              {recipe.name}
            </h3>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Craft Base: <span style={{ color: "var(--color-primary)", fontWeight: 800 }}>{recipe.base}</span>
            </p>
          </div>
          {recipe.calories && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div className="mono-font" style={{ fontSize: "1.25rem", color: "var(--color-text-primary)", lineHeight: 1 }}>{recipe.calories}</div>
              <div style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>kcal</div>
            </div>
          )}
        </div>

        {/* Engineering Specs Row */}
        <div style={{ 
          display: "flex", 
          gap: "1.5rem", 
          marginTop: "1.5rem", 
          padding: "1rem 0", 
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)"
        }}>
          {[
            { icon: <VolumeIcon />, label: "Volume", value: recipe.pintVolume },
            { icon: <FreezeIcon />, label: "Freeze", value: recipe.freezeTime },
            { icon: <SpinIcon />, label: "Spin", value: recipe.spinSetting, variant: "whisper" as const },
          ].map((spec) => (
            <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ color: "var(--color-primary)", flexShrink: 0 }}>{spec.icon}</div>
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", lineHeight: 1 }}>{spec.label}</div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>
                  {spec.variant === "whisper" ? (
                    <Typewriter variant="whisper" lines={spec.value} startDelay={1000} />
                  ) : (
                    spec.value
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Body */}
      <div 
        style={{ 
          maxHeight: expanded ? "1000px" : "0", 
          overflow: "hidden", 
          transition: "max-height var(--duration-slow) cubic-bezier(0.4, 0, 0.2, 1)",
          padding: expanded ? "0 1.5rem 1.5rem" : "0 1.5rem"
        }}
      >
        {/* Ingredients */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-primary)", margin: "0 0 0.75rem" }}>Harvest List</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {recipe.ingredients.map((ing, i) => (
              <li key={i} style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: "0.9rem", 
                padding: "0.5rem 0", 
                borderBottom: "1px solid var(--color-border)" 
              }}>
                <span style={{ color: "var(--color-text-primary)" }}>{ing.item}</span>
                <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>{ing.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-primary)", margin: "0 0 0.75rem" }}>The Process</h4>
          <ol style={{ margin: 0, padding: "0 0 0 1.25rem", color: "var(--color-text-secondary)" }}>
            {recipe.instructions.map((step, i) => (
              <li key={i} style={{ fontSize: "0.9rem", marginBottom: "0.5rem", lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Texture Rescue Wizard */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            id={`respin-btn-${recipe.id}`}
            onClick={() => setShowRespinWizard(!showRespinWizard)}
            className="yogi-btn-ghost"
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderColor: showRespinWizard ? "var(--color-error)" : "var(--color-primary)",
              color: showRespinWizard ? "var(--color-error)" : "var(--color-primary)",
              background: showRespinWizard ? "rgba(220, 38, 38, 0.05)" : "transparent",
            }}
          >
            <span>{showRespinWizard ? "✕" : "🪄"}</span>
            <span>{showRespinWizard ? "Dismiss Wizard" : "The Texture Rescue Wizard"}</span>
          </button>
          {showRespinWizard && (
            <div className="animate-fade-slide" style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ 
                background: "var(--color-background)", 
                borderRadius: "var(--radius-md)", 
                padding: "1rem", 
                border: "1px solid var(--color-border-strong)",
                borderLeft: "4px solid var(--color-primary)",
                minHeight: "4rem"
              }}>
                <Typewriter 
                  variant="precision"
                  lines={[
                    { text: "DIAGNOSING TEXTURE FAILURE...", pauseAfter: 600 },
                    { text: "RESPIN PROTOCOL READY.", pauseAfter: 0 }
                  ]}
                  className="mono-font"
                  style={{ fontSize: "0.75rem", color: "var(--color-primary)", letterSpacing: "0.05em", fontWeight: 700 }}
                />
              </div>
              {recipe.respinFix.map((fix, i) => (
                <div key={i} className="animate-fade-slide" style={{ 
                  background: "var(--color-background)", 
                  borderRadius: "var(--radius-md)", 
                  padding: "1rem", 
                  border: "1px solid var(--color-border-strong)",
                  borderLeft: "4px solid var(--color-error)",
                  animationDelay: "2s" // Delay until typewriter finish
                }}>
                  <p style={{ margin: "0 0 0.4rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--color-error)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Problem: {fix.problem}</p>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{fix.fix}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <MedicalDisclaimer variant="inline" />
      </div>

      {/* Card Actions */}
      <div style={{ 
        padding: "1.5rem", 
        borderTop: "1px solid var(--color-border)", 
        display: "flex", 
        gap: "1rem", 
        marginTop: "auto",
        background: "var(--color-background)"
      }}>
        <button
          id={`recipe-expand-${recipe.id}`}
          onClick={() => setExpanded(!expanded)}
          className="yogi-btn-ghost"
          style={{ flex: 1, padding: "0.75rem 1rem" }}
        >
          {expanded ? "Collapse" : "Full Guide"}
        </button>
        <button
          id={`recipe-freeze-${recipe.id}`}
          onClick={() => setInFreezer(!inFreezer)}
          className="yogi-btn-primary"
          style={{
            flex: 1.5,
            padding: "0.75rem 1rem",
            background: inFreezer ? "var(--color-success)" : "var(--gradient-cta)",
            boxShadow: inFreezer ? "var(--shadow-freezer-done)" : "var(--shadow-cta)",
          }}
        >
          {inFreezer ? "✓ Locked in Chill" : "Lock in the Chill"}
        </button>
      </div>
    </article>
  );
}
