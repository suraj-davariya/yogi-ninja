"use client";

import { useState } from "react";
import MedicalDisclaimer from "./MedicalDisclaimer";

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

export default function RecipeCard({ recipe }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showRespinWizard, setShowRespinWizard] = useState(false);
  const [inFreezer, setInFreezer] = useState(false);

  return (
    <article
      id={`recipe-card-${recipe.id}`}
      className="yogi-card animate-fade-slide"
      style={{ overflow: "hidden" }}
      aria-label={`Recipe: ${recipe.name}`}
    >
      {/* Card header */}
      <div style={{ padding: "1.25rem 1.25rem 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1rem" }}>
              {recipe.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="yogi-tag">{tag}</span>
              ))}
              {recipe.nauseaFriendly && (
                <span className="yogi-tag" style={{ background: "var(--brand-safe)", color: "#fff", border: "none" }}>Zen Safe</span>
              )}
            </div>
            <h3
              className="display-font"
              style={{ fontSize: "1.75rem", color: "var(--text-primary)", margin: "0 0 0.5rem", lineHeight: 1.2 }}
            >
              <span aria-hidden="true" style={{ marginRight: "0.75rem", fontStyle: "normal", fontSize: "1.5rem" }}>{recipe.emoji}</span>
              {recipe.name}
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.02em" }}>
              BASE: <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{recipe.base.toUpperCase()}</span>
            </p>
          </div>
          {recipe.calories && (
            <div style={{ textAlign: "center", flexShrink: 0, borderLeft: "1px solid var(--stone-200)", paddingLeft: "1.5rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--brand-primary)", lineHeight: 1 }}>{recipe.calories}</div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 800, marginTop: "0.25rem" }}>Calories</div>
            </div>
          )}
        </div>

        {/* Specs row */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "0.875rem 0", borderTop: "1px solid var(--border-soft)", marginTop: "0.75rem" }}>
          {[
            { icon: "📐", label: "Volume", value: recipe.pintVolume },
            { icon: "⏱️", label: "Freeze", value: recipe.freezeTime },
            { icon: "⚙️", label: "Spin", value: recipe.spinSetting },
          ].map((spec) => (
            <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span aria-hidden="true">{spec.icon}</span>
              <div>
                <div style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>{spec.label}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>{spec.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable body */}
      {expanded && (
        <div id={`recipe-body-${recipe.id}`} className="animate-fade-slide" style={{ padding: "0 1.25rem 1.25rem" }}>
          {/* Ingredients */}
          <div style={{ marginBottom: "1rem" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", margin: "0 0 0.6rem" }}>Ingredients</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", padding: "0.3rem 0", borderBottom: "1px solid var(--border-soft)" }}>
                  <span style={{ color: "var(--text-primary)" }}>{ing.item}</span>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div style={{ marginBottom: "1rem" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", margin: "0 0 0.6rem" }}>Instructions</h4>
            <ol style={{ margin: 0, padding: "0 0 0 1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {recipe.instructions.map((step, i) => (
                <li key={i} style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Texture Rescue Wizard */}
          <div style={{ marginBottom: "1rem" }}>
            <button
              id={`respin-btn-${recipe.id}`}
              onClick={() => setShowRespinWizard(!showRespinWizard)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: showRespinWizard ? "var(--yogi-rose)" : "var(--surface-2)",
                color: showRespinWizard ? "#fff" : "var(--text-secondary)",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.6rem 1rem",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                width: "100%",
                justifyContent: "center",
              }}
            >
              🪄 {showRespinWizard ? "Close" : "Fix My Texture"}
            </button>
            {showRespinWizard && (
              <div className="animate-fade-slide" style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {recipe.respinFix.map((fix, i) => (
                  <div key={i} style={{ background: "var(--surface-1)", borderRadius: "0.75rem", padding: "0.75rem", border: "1px solid var(--border-soft)" }}>
                    <p style={{ margin: "0 0 0.25rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--yogi-rose)" }}>Problem: {fix.problem}</p>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)" }}>Fix: {fix.fix}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <MedicalDisclaimer variant="inline" />
        </div>
      )}

      {/* Card footer actions */}
      <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          id={`recipe-expand-${recipe.id}`}
          onClick={() => setExpanded(!expanded)}
          className="yogi-btn-ghost"
          style={{ fontSize: "0.9rem", flex: 1 }}
        >
          {expanded ? "Close" : "Full Recipe"}
        </button>
        <button
          id={`recipe-freeze-${recipe.id}`}
          onClick={() => setInFreezer(!inFreezer)}
          className="yogi-btn-primary"
          style={{
            fontSize: "0.9rem",
            background: inFreezer ? "var(--brand-safe)" : undefined,
            flex: 1.5,
          }}
        >
          {inFreezer ? "✓ Prepared" : "Prep Batch"}
        </button>
      </div>
    </article>
  );
}
