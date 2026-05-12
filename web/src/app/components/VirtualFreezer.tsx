"use client";

import { useState, useEffect, useCallback } from "react";

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
        flavor: flavor.trim() || "Custom blend",
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1.25rem" }}>
        <div>
          <h2 className="display-font" style={{ fontSize: "2rem", color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
            The Silent Freezer
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 500 }}>
            Patience is the secret to perfect texture. 24 hours remaining.
          </p>
        </div>
        <button id="freezer-add-btn" onClick={() => setShowForm(!showForm)} className="yogi-btn-primary">
          + Add Pint
        </button>
      </div>

      {showForm && (
        <div id="freezer-add-form" className="yogi-card animate-zen-entry" style={{ padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              id="freezer-recipe-name"
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Recipe Name"
              style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1.5px solid var(--stone-200)", background: "var(--stone-50)", color: "var(--text-primary)", fontSize: "1rem", outline: "none", transition: "border-color 0.3s" }}
            />
            <input
              id="freezer-flavor"
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              placeholder="Notes (optional)"
              style={{ width: "100%", padding: "1rem 1.25rem", borderRadius: "1rem", border: "1.5px solid var(--stone-200)", background: "var(--stone-50)", color: "var(--text-primary)", fontSize: "1rem", outline: "none" }}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button id="freezer-form-submit" onClick={addBatch} className="yogi-btn-primary">Begin Freezing</button>
              <button id="freezer-form-cancel" onClick={() => setShowForm(false)} className="yogi-btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {batches.map((batch) => {
          const remaining = batch.startedAt + batch.durationMs - now;
          const isDone = remaining <= 0;
          const progress = Math.min(100, ((now - batch.startedAt) / batch.durationMs) * 100);
          const time = formatTimeRemaining(remaining);

          return (
            <div key={batch.id} id={`freezer-batch-${batch.id}`} className="yogi-card animate-zen-entry" style={{ padding: "1.5rem 2rem", border: isDone ? "1px solid var(--brand-safe)" : "1px solid var(--border-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: isDone ? "var(--brand-safe)" : "var(--brand-primary)", background: isDone ? "rgba(5, 150, 105, 0.1)" : "var(--stone-100)", padding: "0.35rem 0.875rem", borderRadius: "9999px" }}>
                      {isDone ? "Ready to Spin" : "Freezing"}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, color: "var(--text-primary)", fontSize: "1.25rem", letterSpacing: "-0.02em" }}>{batch.recipeName}</p>
                  
                  {!isDone && (
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", margin: "1rem 0" }}>
                      {[time.hours, time.minutes, time.seconds].map((unit, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ 
                            background: "var(--stone-100)", 
                            borderRadius: "0.75rem", 
                            padding: "0.5rem 0.75rem", 
                            fontFamily: "monospace", 
                            fontWeight: 700, 
                            fontSize: "1.25rem", 
                            color: "var(--brand-primary)", 
                            minWidth: "3rem", 
                            textAlign: "center"
                          }}>
                            {unit}
                          </div>
                          {i < 2 && <span style={{ color: "var(--stone-300)", fontWeight: 700, fontSize: "1.25rem" }}>:</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ height: "4px", background: "var(--stone-200)", borderRadius: "9999px", overflow: "hidden", marginTop: isDone ? "1rem" : "0" }}>
                    <div style={{ 
                      height: "100%", 
                      width: `${progress}%`, 
                      background: isDone ? "var(--brand-safe)" : "var(--brand-primary)", 
                      borderRadius: "9999px", 
                      transition: "width 1s linear"
                    }} />
                  </div>
                </div>
                <button 
                  id={`freezer-remove-${batch.id}`} 
                  onClick={() => removeBatch(batch.id)} 
                  className="yogi-btn-ghost"
                  style={{ padding: "0.5rem", width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
