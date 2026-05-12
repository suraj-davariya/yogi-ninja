"use client";

import { useState, useEffect, useCallback } from "react";
import Typewriter from "./Typewriter";

interface FreezingBatch {
  id: string;
  recipeName: string;
  flavor: string;
  startedAt: number;
  durationMs: number;
}

const FREEZE_DURATION_MS = 24 * 60 * 60 * 1000;

function formatTimeRemaining(ms: number) {
  if (ms <= 0) return { hours: "00", minutes: "00", seconds: "00" };
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

export default function VirtualFreezer() {
  const [batches, setBatches] = useState<FreezingBatch[]>([]);
  const [now, setNow] = useState(Date.now());
  const [showForm, setShowForm] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [flavor, setFlavor] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const addBatch = useCallback(() => {
    if (!recipeName.trim()) return;
    setBatches((prev) => [
      ...prev,
      {
        id: `batch-${Date.now()}`,
        recipeName: recipeName.trim(),
        flavor: flavor.trim() || "Signature Scoop",
        startedAt: Date.now(),
        durationMs: FREEZE_DURATION_MS,
      },
    ]);
    setRecipeName("");
    setFlavor("");
    setShowForm(false);
  }, [recipeName, flavor]);

  const removeBatch = useCallback((id: string) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <section id="virtual-freezer" style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <h2 className="display-font" style={{ fontSize: "2.5rem", color: "var(--color-text-primary)", margin: "0 0 0.5rem" }}>
            The Vault
          </h2>
          <p style={{ margin: 0, fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
            Patience is the secret to perfect texture. <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>24 hours</span> of silent focus.
          </p>
        </div>
        <button id="freezer-add-btn" onClick={() => setShowForm(!showForm)} className="yogi-btn-primary">
          + Lock in a Pint
        </button>
      </div>

      {showForm && (
        <div id="freezer-add-form" className="yogi-card animate-fade-slide" style={{ padding: "2rem", marginBottom: "2.5rem", border: "1px solid var(--color-primary-soft)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h3 className="display-font" style={{ fontSize: "1.25rem", color: "var(--color-primary)", margin: 0 }}>New Batch Entry</h3>
            <input
              id="freezer-recipe-name"
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Recipe Name (e.g. Velvet Vanilla)"
              style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text-primary)", fontSize: "1rem", outline: "none", transition: "all var(--duration-fast)" }}
            />
            <input
              id="freezer-flavor"
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              placeholder="Craft Notes (optional)"
              style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "var(--radius-md)", border: "1.5px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-text-primary)", fontSize: "1rem", outline: "none" }}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button id="freezer-form-submit" onClick={addBatch} className="yogi-btn-primary" style={{ flex: 1 }}>Begin Freezing</button>
              <button id="freezer-form-cancel" onClick={() => setShowForm(false)} className="yogi-btn-ghost" style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {batches.map((batch) => {
          const remaining = batch.startedAt + batch.durationMs - now;
          const isDone = remaining <= 0;
          const progress = Math.min(100, ((now - batch.startedAt) / batch.durationMs) * 100);
          const time = formatTimeRemaining(remaining);

          return (
            <div 
              key={batch.id} 
              id={`freezer-batch-${batch.id}`} 
              className={`yogi-card animate-fade-slide ${isDone ? 'animate-done-pulse' : ''}`} 
              style={{ 
                padding: "2rem", 
                border: isDone ? "1.5px solid var(--color-success)" : "1px solid var(--color-border)",
                background: isDone ? "var(--color-accent-soft)" : "var(--color-surface)",
                boxShadow: isDone ? "var(--shadow-freezer-done)" : "var(--shadow-card)"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: 800, 
                      letterSpacing: "0.1em", 
                      textTransform: "uppercase", 
                      color: isDone ? "var(--color-text-inverse)" : "var(--color-primary)", 
                      background: isDone ? "var(--color-success)" : "var(--color-primary-soft)", 
                      padding: "0.4rem 1.25rem", 
                      borderRadius: "var(--radius-pill)",
                      boxShadow: isDone ? "var(--shadow-freezer-done)" : "none"
                    }}>
                      {isDone ? "Perfection Achieved" : "The Silent Chill"}
                    </span>
                    {isDone && <span style={{ fontSize: "1.25rem" }}>✨</span>}
                  </div>
                  
                  <h4 className="display-font" style={{ margin: "0 0 0.25rem", color: "var(--color-text-primary)", fontSize: "1.75rem" }}>{batch.recipeName}</h4>
                  <p style={{ margin: "0 0 1.5rem", fontSize: "0.9rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>{batch.flavor}</p>
                  
                  {!isDone ? (
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", margin: "1.5rem 0" }}>
                      {[
                        { val: time.hours, label: "hr" },
                        { val: time.minutes, label: "min" },
                        { val: time.seconds, label: "sec" }
                      ].map((unit, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                          <div className="mono-font" style={{ 
                            fontSize: "2rem", 
                            color: "var(--color-primary)", 
                            letterSpacing: "-0.05em",
                            fontVariantNumeric: "tabular-nums"
                          }}>
                            {unit.val}
                          </div>
                          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase" }}>{unit.label}</div>
                          {i < 2 && <span style={{ color: "var(--color-border-strong)", fontWeight: 400, fontSize: "1.5rem", marginLeft: "0.5rem" }}>/</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ margin: "1.5rem 0", color: "var(--color-accent-deep)", fontWeight: 700, fontSize: "1.1rem", minHeight: "1.8rem" }}>
                      <Typewriter 
                        variant="precision"
                        lines="► PINT LOCKED. READY TO SPIN."
                        className="mono-font"
                        style={{ color: "var(--color-success)", letterSpacing: "0.05em" }}
                      />
                    </div>
                  )}

                  <div style={{ height: "8px", background: "var(--color-border)", borderRadius: "var(--radius-pill)", overflow: "hidden", marginTop: "1rem", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)" }}>
                    <div style={{ 
                      height: "100%", 
                      width: `${progress}%`, 
                      background: isDone ? "var(--gradient-freezer-done)" : "var(--gradient-freezer-counting)", 
                      borderRadius: "var(--radius-pill)", 
                      transition: "width 1s linear"
                    }} />
                  </div>
                </div>
                
                <button 
                  id={`freezer-remove-${batch.id}`} 
                  onClick={() => removeBatch(batch.id)} 
                  className="yogi-btn-ghost"
                  style={{ 
                    padding: "0", 
                    width: "2.5rem", 
                    height: "2.5rem", 
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    border: "1px solid var(--color-border-strong)",
                    fontSize: "0.9rem"
                  }}
                  title="Remove from Vault"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
        
        {batches.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "4rem 2rem", 
            border: "2px dashed var(--color-border)", 
            borderRadius: "var(--radius-xl)", 
            color: "var(--color-text-muted)" 
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>❄️</div>
            <p className="display-font" style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>The Vault is Empty</p>
            <p style={{ fontSize: "0.9rem", margin: 0 }}>Start your artisan journey by locking in a new pint.</p>
          </div>
        )}
      </div>
    </section>
  );
}
