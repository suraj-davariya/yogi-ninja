"use client";

import { useState, useMemo } from "react";
import RecipeCard, { Recipe } from "./RecipeCard";
import recipesData from "@/data/recipes.json";

const ALL_TAGS = ["Fruity", "Creamy", "Minty", "Mild", "Oat milk", "Banana", "Dairy-free", "Nausea-safe", "Sorbet", "Lite Ice Cream"];

const ALL_RECIPES: Recipe[] = recipesData as Recipe[];

interface Props {
  nauseaFilter?: "severe" | "moderate" | "mild" | "none" | null;
  dairyFilter?: "yes" | "plant-only" | "no" | null;
}

export default function TagSearch({ nauseaFilter, dairyFilter }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredRecipes = useMemo(() => {
    return ALL_RECIPES.filter((recipe) => {
      const matchesSearch =
        !searchQuery ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.base.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => recipe.tags.includes(tag) || (tag === "Nausea-safe" && recipe.nauseaFriendly) || (tag === "Dairy-free" && recipe.dairyFree));

      const matchesNausea =
        !nauseaFilter ||
        nauseaFilter === "none" ||
        nauseaFilter === "mild" ||
        recipe.nauseaFriendly;

      const matchesDairy =
        !dairyFilter ||
        dairyFilter === "yes" ||
        (dairyFilter === "plant-only" && recipe.dairyFree) ||
        (dairyFilter === "no" && recipe.dairyFree);

      return matchesSearch && matchesTags && matchesNausea && matchesDairy;
    });
  }, [searchQuery, activeTags, nauseaFilter, dairyFilter]);

  return (
    <section id="tag-search" style={{ width: "100%" }}>
      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
        <input
          id="recipe-search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes, bases, or tags..."
          aria-label="Search recipes"
          style={{
            width: "100%",
            padding: "0.75rem 1rem 0.75rem 2.75rem",
            borderRadius: "9999px",
            border: "1.5px solid var(--border-soft)",
            background: "var(--surface-card)",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            outline: "none",
            boxShadow: "var(--shadow-sm)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--yogi-violet)";
            e.target.style.boxShadow = "0 0 0 3px rgba(124,92,191,0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border-soft)";
            e.target.style.boxShadow = "var(--shadow-sm)";
          }}
        />
      </div>

      {/* Tag filter pills */}
      <div id="tag-filter-row" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.5rem" }}>
        {ALL_TAGS.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              id={`tag-filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => toggleTag(tag)}
              aria-pressed={isActive}
              style={{
                padding: "0.3rem 0.8rem",
                borderRadius: "9999px",
                border: `1.5px solid ${isActive ? "var(--yogi-violet)" : "var(--border-soft)"}`,
                background: isActive ? "var(--yogi-violet-pale)" : "var(--surface-card)",
                color: isActive ? "var(--yogi-violet)" : "var(--text-muted)",
                fontSize: "0.78rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
            >
              {tag}
            </button>
          );
        })}
        {activeTags.length > 0 && (
          <button
            id="tag-filter-clear"
            onClick={() => setActiveTags([])}
            style={{ padding: "0.3rem 0.8rem", borderRadius: "9999px", border: "1.5px solid var(--border-soft)", background: "none", color: "var(--text-muted)", fontSize: "0.78rem", cursor: "pointer" }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem", margin: "0 0 1rem" }}>
        {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""} found
        {activeTags.length > 0 && ` for "${activeTags.join(", ")}"`}
      </p>

      {/* Recipe grid */}
      {filteredRecipes.length > 0 ? (
        <div id="recipe-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1rem" }}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div id="recipe-empty" style={{ textAlign: "center", padding: "3rem 1.5rem", border: "2px dashed var(--border-soft)", borderRadius: "1.25rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔍</div>
          <p style={{ margin: 0, fontWeight: 500 }}>No recipes match your filters.</p>
          <p style={{ margin: "0.3rem 0 0", fontSize: "0.85rem" }}>Try removing a tag or clearing your search.</p>
        </div>
      )}
    </section>
  );
}
