"use client";

import { useState, useMemo } from "react";
import recipesData from "../../data/recipes.json";
import RecipeCard from "./RecipeCard";
import Typewriter from "./Typewriter";

interface Recipe {
  id: string;
  name: string;
  description: string;
  nausea: string[];
  dairy: string;
  tags: string[];
  image?: string;
  spinSetting: string;
}

interface Props {
  nauseaFilter: string | null;
  dairyFilter: string | null;
}

export default function TagSearch({ nauseaFilter, dairyFilter }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // recipesData is the direct array from recipes.json
  const recipes = Array.isArray(recipesData) ? recipesData : [];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach((r: any) => r?.tags?.forEach((t: string) => tags.add(t)));
    return Array.from(tags).sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r: any) => {
      const matchNausea = !nauseaFilter || r.nausea?.includes(nauseaFilter);
      const matchDairy = !dairyFilter || r.dairy === dairyFilter || r.dairy === "both";
      const matchTag = !selectedTag || r.tags?.includes(selectedTag);
      return matchNausea && matchDairy && matchTag;
    });
  }, [recipes, nauseaFilter, dairyFilter, selectedTag]);

  return (
    <section id="recipe-discovery">
      <div style={{ marginBottom: "3rem" }}>
        <h3 className="display-font" style={{ fontSize: "1.75rem", marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
          Refine the Craft
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <button
            onClick={() => setSelectedTag(null)}
            className={`yogi-tag ${!selectedTag ? 'active' : ''}`}
            style={{ cursor: "pointer", border: "none" }}
          >
            All Recipes
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`yogi-tag ${selectedTag === tag ? 'active' : ''}`}
              style={{ cursor: "pointer", border: "none" }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(22rem, 1fr))",
          gap: "2.5rem",
        }}
      >
        {filteredRecipes.map((recipe: any) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div 
          className="yogi-card"
          style={{ 
            textAlign: "center", 
            padding: "6rem 2rem", 
            background: "var(--color-surface-glass)",
            border: "1.5px dashed var(--color-border)"
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🧪</div>
          <div style={{ minHeight: "4rem" }}>
            <Typewriter 
              variant="cascade"
              lines={[
                "No flavor found.",
                "Try a different mood.",
                "Or invent your own."
              ]}
              className="display-font"
              style={{ fontSize: "1.5rem", color: "var(--color-text-secondary)" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
