# 🤖 NEXT_AGENT.md — Read This First. Then Code. Do Not Loop.

> **Purpose:** This file is the single source of truth for any AI agent working on this project.
> It embeds all the essential context from the `agents/` docs so you do not need to read them separately.
> The `agents/` docs are the authoritative originals. This file is the actionable distillation.
> **If you need to go deeper on any topic, the original source is linked in each section.**

---

## ⚡ TL;DR — What To Do Right Now

Check `system_state_checklist.md` first to find the current phase, then do exactly the next pending sub-task.

**Current state as of last update:**

| Phase | Status |
|-------|--------|
| Phase 1: Repository Setup | ✅ Complete |
| Phase 2: UI Component Generation | ✅ Complete |
| Phase 3: Data Ingestion Batch 1 | ✅ Complete |
| Phase 4: Automated Pipeline (scraping) | ⏳ **Next up** |

> Always read `system_state_checklist.md` to confirm — another agent may have updated it since this was written.

---

## 🚫 Anti-Loop Rules — Do NOT Do These Things

These are the failure patterns that waste time and produce nothing:

| ❌ WRONG | ✅ RIGHT |
|----------|----------|
| Run `npm install` for more than 2 attempts | Skip it. Write code files instead. The dev server handles compilation. |
| Explain what you're about to do for 3+ paragraphs | Write the code first. Comment after if needed. |
| Re-read all files before acting | Read `system_state_checklist.md`, find the next task, do it. |
| Try to scrape the internet mid-session | Write data files directly as JSON instead. |
| Run `npm run build` or `npm run lint` | Don't. The dev server shows errors live. |
| Re-build any Phase 2 component | They are all complete. Do not touch them. |
| Create parallel interfaces or duplicate schemas | The `Recipe` interface in `RecipeCard.tsx` is the only one. |

---

## 🧠 Project Context (Distilled from `agents/` docs)

> **Source files:** `agents/Project Understanding and Scope.md`, `agents/Master System Prompt.md`, `agents/Agent Architecture and Application Des.md`

### Who This App Is For
- A **vegetarian woman in her first trimester of pregnancy**, due December 1, 2026
- She needs **nausea-accommodating recipes** — calm flavors, easy digestion, small portions
- On **bad nausea days**: show only gentle oat milk and banana-based recipes
- On **better days**: richer pasteurized milk and mild fruit options are fine
- The UI must be **frictionless** — she may be experiencing fatigue or nausea while using it

### What the App Does
A Next.js 16 web app that:
1. Asks a 3-question daily check-in (nausea level, dairy tolerance, flavor mood)
2. Dynamically filters and reorders the recipe grid based on her answers
3. Tracks Ninja Creami pints with a 24-hour virtual freezer countdown
4. Provides a one-tap Texture Rescue Wizard on every recipe card
5. Exports a safety-filtered grocery list

### The Four AI Agents
> **Source:** `agents/Agent Architecture and Application Des.md`

| Agent | Role |
|-------|------|
| **Executive Orchestrator** | Manages workflow, tracks batch progress, enforces quality gates |
| **Formulation Scientist** | Writes the actual recipes using approved bases and natural sweeteners |
| **UI and UX Designer** | Owns frontend experience, tagging layout, visual progress display |
| **QA Reviewer** | Validates every recipe against pregnancy safety guidelines, blocks unsafe ingredients |

As an AI agent working in this codebase, you are acting as **all four simultaneously** unless told otherwise.

---

## 🛡️ Ingredient Safety Rules — NON-NEGOTIABLE

> **Source:** `agents/Master System Prompt.md`, `agents/Project Understanding and Scope.md`

Every recipe, every output, every piece of generated data must pass **all** of these rules. No exceptions.

### ❌ PROHIBITED — These must never appear in any recipe
- Raw eggs (cooked eggs are also not appropriate — avoid eggs entirely)
- Alcohol (no wine, rum, beer, or vanilla extract with alcohol content)
- Preservatives of any kind
- Artificial colors
- Artificial flavors

### ✅ APPROVED BASES — Use only these
- Pasteurized whole milk or 2% milk
- Plant milks: oat milk, almond milk, coconut milk (unsweetened)
- Pasteurized Greek yogurt or plain yogurt (regular or coconut-based)
- Ripe bananas
- Mild fresh or frozen fruits (strawberries, mango, peaches, blueberries, pears, raspberries, watermelon, apple)
- Rolled oats or quick-cook oats (small amounts)

### ✅ APPROVED SWEETENERS — Minimal amounts only
- Honey (1 to 2 tbsp max per pint)
- Maple syrup (1 to 2 tbsp max per pint)
- Medjool dates (2 to 4 dates max per pint)

### Medical disclaimer rule
Every feature, recipe card, and AI output must remind the user to confirm unusual ingredients with her healthcare provider. The `MedicalDisclaimer` component already handles this in the UI — do not remove it.

---

## 📐 Recipe Formulation Standards

> **Source:** `agents/Master System Prompt.md`, `agents/AI IDE Execution Prompt.md`

Every recipe must include **all** of these fields:

| Field | Rule |
|-------|------|
| `pintVolume` | Always `"16 oz (full pint)"` |
| `freezeTime` | Always `"24 hours"` |
| `spinSetting` | One of: `"Sorbet"`, `"Lite Ice Cream"`, `"Ice Cream"` |
| `ingredients` | Exact amounts in cups, tbsp, tsp — never "a handful" |
| `instructions` | Step-by-step, numbered, written for a first-time user |
| `respinFix` | At least 2 entries: one for crumbly/powdery, one for icy/too firm |

**Nausea flag rules:**
- `nauseaFriendly: true` — oat milk, coconut milk, mild fruit bases; small and simple
- `nauseaFriendly: false` — heavy dairy, peanut butter, very rich bases; safe but not gentle

### ⚠️ Formatting rule (from `agents/Master System Prompt.md`)
**Never use hyphens or em dashes to join phrases in text content.**
Use commas, periods, or parentheses instead.
- ❌ Wrong: `"Blend until smooth — then pour"`
- ✅ Right: `"Blend until smooth, then pour"`
- ✅ Hyphens are fine in identifiers and URLs: `"strawberry-oat-sorbet"`, `"kebab-case"`

---

## 🗺️ Project File Map

> **Source:** `agents/AI IDE Execution Prompt.md`, current workspace

```
yogi-ninja/
├── agents/                            ← Original spec docs (read for deep context)
│   ├── Yogi_Ninja_Master_Orchestrator.md   ← Top-level index
│   ├── Master System Prompt.md             ← Core safety + operational rules
│   ├── Agent Architecture and Application Des.md
│   ├── AI Agent Skill Matrix.md
│   ├── AI Autonomous Execution Pipeline.md
│   ├── AI IDE Execution Prompt.md
│   ├── Application User Experience and Advanc.md
│   ├── Jumpstarter-Git Repositories and Scra.md
│   ├── Project Understanding and Scope.md
│   └── State Management and Token Limit Safeg.md
│
├── skills/                            ← Execution logs from completed work
│   ├── skill-01-design-system.md
│   ├── skill-02-navigation-disclaimer.md
│   ├── skill-03-core-components.md
│   ├── skill-04-page-composition.md
│   └── skill-05-data-ingestion.md
│
├── web/src/app/
│   ├── components/
│   │   ├── NauseaCheckIn.tsx    ✅ DONE — 3-step daily check-in wizard
│   │   ├── VirtualFreezer.tsx   ✅ DONE — 24h countdown per pint
│   │   ├── RecipeCard.tsx       ✅ DONE — recipe card + Texture Rescue Wizard
│   │   ├── TagSearch.tsx        ✅ DONE — live search + multi-tag filter
│   │   ├── Navigation.tsx       ✅ DONE — sticky header, mobile menu
│   │   └── MedicalDisclaimer.tsx ✅ DONE — 3-variant disclaimer
│   ├── globals.css              ✅ DONE — design tokens, utilities, animations
│   ├── layout.tsx               ✅ DONE — root layout
│   └── page.tsx                 ✅ DONE — homepage, wires all components
│
├── web/src/data/
│   └── recipes.json             ✅ DONE — 12 safety-filtered recipes
│
├── system_state_checklist.md    ← READ THIS to find your task
├── progress_checklist.md        ← UPDATE this after each sub-task
└── NEXT_AGENT.md                ← This file
```

---

## 📋 Recipe Data Schema

The `Recipe` interface lives in `web/src/app/components/RecipeCard.tsx`. **Do not create a new one.**

```typescript
interface Recipe {
  id: string;           // kebab-case, e.g. "strawberry-oat-sorbet"
  name: string;
  emoji: string;
  base: string;         // e.g. "Oat milk", "Pasteurized milk", "Coconut milk"
  tags: string[];       // pick from: "Fruity", "Creamy", "Minty", "Mild",
                        // "Oat milk", "Banana", "Dairy-free", "Nausea-safe",
                        // "Sorbet", "Lite Ice Cream"
  nauseaFriendly: boolean;
  dairyFree: boolean;
  pintVolume: string;   // always "16 oz (full pint)"
  freezeTime: string;   // always "24 hours"
  spinSetting: string;  // "Sorbet", "Lite Ice Cream", or "Ice Cream"
  calories?: number;
  ingredients: { item: string; amount: string }[];
  instructions: string[];
  respinFix: { problem: string; fix: string }[];
}
```

---

## 🔄 The Execution Pipeline

> **Source:** `agents/AI Autonomous Execution Pipeline.md`, `agents/State Management and Token Limit Safeg.md`

**Always work in micro-batches. Never try to complete everything in one session.**

1. Read `system_state_checklist.md` to find the next pending task
2. Mark that task as `[In Progress]` immediately (signal to other agents)
3. Execute exactly one task
4. Write output to disk
5. Mark the task `[x] Complete` in both `system_state_checklist.md` and `progress_checklist.md`
6. Write a skill file in `skills/skill-XX-description.md`
7. Stop and wait for the next trigger

If the token limit is reached, the next agent reads `system_state_checklist.md` and picks up exactly where you stopped.

---

## 🏁 Phase 4 — What To Build Next

> **Source:** `agents/AI Autonomous Execution Pipeline.md`, `agents/Jumpstarter-Git Repositories and Scra.md`

**Goal:** Automated recipe discovery pipeline using Python scraping.

### Data sources
- **Baseline recipes:** `https://github.com/jhermann/ice-creamery` — tested Ninja Creami recipes in markdown/CSV format
- **Scraping engine:** `https://github.com/hhursev/recipe-scrapers` — Python library for extracting recipe data from websites via JSON-LD and Microdata schema markup

### Sub-tasks for Phase 4
1. Create `scripts/scrape_recipes.py` using `recipe-scrapers`
2. Fetch candidate recipes from approved cooking sites
3. Run each through the safety filter (reject anything with prohibited ingredients)
4. Convert approved recipes to the `Recipe` JSON schema
5. Append to `web/src/data/recipes.json`
6. Set up a GitHub Action or cron job to run daily

### Safety filter logic for the script
```python
PROHIBITED = ["raw egg", "alcohol", "wine", "rum", "beer", "vodka",
              "artificial color", "artificial flavor", "preservative",
              "food coloring", "dye"]

def is_safe(recipe_ingredients: list[str]) -> bool:
    text = " ".join(recipe_ingredients).lower()
    return not any(term in text for term in PROHIBITED)
```

---

## ✅ Checklist Update Protocol

After completing any sub-task, update both files:

**`system_state_checklist.md`** — change the phase line:
```markdown
4. Phase Four: Data Ingestion Batch 2 (In Progress — claimed by [AGENT NAME])
```

**`progress_checklist.md`** — check off the item:
```markdown
- [x] Description of what was completed
```

Then write a skill file at `skills/skill-06-[description].md`.

---

## ❓ FAQ

**Q: Should I read the `agents/` folder docs?**
A: This file already distills everything you need from them. Read the originals only if you need deeper context on a specific rule. The key files are: `Master System Prompt.md` for safety rules, `Application User Experience and Advanc.md` for UX features, `Jumpstarter-Git Repositories and Scra.md` for data sources.

**Q: A recipe ingredient seems borderline. Is it safe?**
A: When in doubt, skip it. If it's not on the approved bases list above, it does not belong in a recipe.

**Q: `npm install` is failing.**
A: The dev server is likely already running. Skip npm. Write code files directly.

**Q: TypeScript is showing errors.**
A: Fix errors only in files you create or modify. Do not rewrite existing components.

**Q: Can I change the UI or add new components?**
A: Only after all Phase 4 sub-tasks are done. Do not touch Phase 2 components.

**Q: The task seems too simple.**
A: Do exactly what the checklist says. Simple and done beats complex and broken.
