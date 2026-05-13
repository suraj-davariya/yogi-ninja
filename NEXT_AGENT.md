# 🤖 NEXT_AGENT.md — Read This First. Then Code. Do Not Loop.

> **Purpose:** This file is the single source of truth for any AI agent working on this project.
> It embeds all the essential context from the `agents/` docs so you do not need to read them separately.
> The `agents/` docs are the authoritative originals. This file is the actionable distillation.
> **If you need to go deeper on any topic, the original source is linked in each section.**

---

## ⚡ TL;DR — What To Do Right Now

Check `system_state_checklist.md` first to find the current phase, then do exactly the next pending sub-task.

**Current state as of last update (2026-05-12T20:34:00-04:00):**

| Phase | Status |
|-------|--------|
| Phase 1: Repository Setup | ✅ Complete |
| Phase 2: UI Component Generation | ✅ Complete |
| Phase 3: Data Ingestion Batch 1 (hand-crafted) | ✅ Complete (12 recipes) |
| Phase 4a: Synthesis Engine v1 | ⚠️ Complete but BROKEN (see below) |
| Phase 4b: Fix Synthesis Quality + Expand | ⏳ **Next up** |
| Phase 5: GitHub Action Automation | 🔒 Blocked on Phase 4b |

> Always read `system_state_checklist.md` to confirm — another agent may have updated it since this was written.

---

## 🚨 CRITICAL: Phase 4a Synthesis Engine Has Quality Bugs

The current `scripts/ingest_local_recipes.py` was a proof-of-concept. It successfully ingested 4 recipes from `external/ice-creamery/` but produced **unacceptable output** that is currently live in `recipes.json`. These bugs MUST be fixed before expanding to more recipes.

### Bug 1: Raw Markdown/HTML in ingredient names
The parser is not stripping the markdown link syntax from ingredient names. Example of what is in `recipes.json` right now:

```json
"item": "[Soy milk 1.6% (sugar-free) \\[Berief\\]](/ice-creamery/info/ingredients/#soy-milk){target=\"_blank\"}<sup>↗</sup>"
```

**Expected:** `"Soy milk (sugar-free)"` — clean, human-readable text only.

### Bug 2: Measurements still in grams
Many amounts were not converted. Example: `"amount": "300ml"`, `"amount": "225g"`, `"amount": "15g"`.

**Expected:** All amounts in cups, tbsp, tsp, or descriptive volume (e.g., "2 medium", "1 cup").

### Bug 3: Industrial/lab ingredients not filtered
Items like "Glycerin (E422)", "Salty Stability [Inulin / GMS / CMC / Guar / XG / Salt]", "Glycerol Monostearate (E471)", "Carboxymethyl Cellulose (CMC / E466)" are chemical stabilizers from the source repo's advanced formulations. Our user is a pregnant woman who should see only pantry-friendly, recognizable ingredients.

**Rule:** If the average home cook would not recognize it, it does not belong in a Yogi Ninja recipe.

### Bug 4: All 4 synthesized recipes have identical instructions
The `brand_voice_instructions()` function returns the same 6 static steps regardless of the recipe. Each recipe should have instructions tailored to its specific ingredients and process.

### Bug 5: Incorrect nausea/dairy flags
All 4 synthesized recipes are marked `dairyFree: true` even though some contain cottage cheese or cream cheese.

---

## 🚫 Anti-Loop Rules — Do NOT Do These Things

These are the failure patterns that waste time and produce nothing:

| ❌ WRONG | ✅ RIGHT |
|----------|----------|
| Run `npm install` for more than 2 attempts | Skip it. Write code files instead. The dev server handles compilation. |
| Explain what you're about to do for 3+ paragraphs | Write the code first. Comment after if needed. |
| Re-read all files before acting | Read `system_state_checklist.md`, find the next task, do it. |
| Try to scrape the internet mid-session | Use only the local `external/ice-creamery/` repo or write recipes directly as JSON. |
| Run `npm run build` or `npm run lint` | Don't. The dev server shows errors live. |
| Re-build any Phase 2 component | They are all complete. Do not touch them. |
| Create parallel interfaces or duplicate schemas | The `Recipe` interface in `RecipeCard.tsx` is the only one. |
| Skip updating `system_state_checklist.md` and `progress_checklist.md` | You MUST update both after every completed sub-task. This is non-negotiable. |
| Leave raw markdown/HTML in ingredient names | All text must be clean, human-readable, no links or HTML. |
| Use gram or ml measurements | Convert to cups, tbsp, tsp, or descriptive amounts (e.g., "2 medium bananas"). |

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
- Industrial stabilizers (Glycerin, CMC, GMS, Xanthan gum, Guar gum, Inulin, Waxy Maize Starch)
- Artificial sweeteners (Erythritol, Xylitol, Stevia, Sucralose, Allulose)
- Protein powders (Whey, Casein, Soy Protein Isolate)

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

### ✅ APPROVED FLAVOR ADDITIONS — Small amounts
- Pure vanilla extract (alcohol-free)
- Ground cinnamon
- Fresh ginger (grated, tiny amounts)
- Fresh mint leaves
- Fresh lemon or lime juice
- Sea salt (pinch)
- Matcha powder (food-grade, in moderation)
- Cocoa powder (unsweetened, in moderation)

### Medical disclaimer rule
Every feature, recipe card, and AI output must remind the user to confirm unusual ingredients with her healthcare provider. The `MedicalDisclaimer` component already handles this in the UI — do not remove it.

---

## 📐 Recipe Formulation Standards

> **Source:** `agents/Master System Prompt.md`, `agents/AI IDE Execution Prompt.md`

Every recipe must include **all** of these fields:

| Field | Rule |
|-------|------|
| `id` | kebab-case, e.g. `"strawberry-oat-sorbet"` |
| `name` | Clean, branded name. No "(Deluxe)" suffix. |
| `emoji` | Single relevant emoji |
| `base` | One of: `"Oat milk"`, `"Pasteurized milk"`, `"Coconut milk"`, `"Pasteurized yogurt"`, `"Banana"` |
| `tags` | Pick from: `"Fruity"`, `"Creamy"`, `"Minty"`, `"Mild"`, `"Oat milk"`, `"Banana"`, `"Dairy-free"`, `"Nausea-safe"`, `"Sorbet"`, `"Lite Ice Cream"` |
| `nauseaFriendly` | `true` only for oat milk, coconut milk, mild fruit, banana bases |
| `dairyFree` | `true` only if zero dairy ingredients (no milk, yogurt, cream cheese, cottage cheese) |
| `pintVolume` | Always `"16 oz (full pint)"` |
| `freezeTime` | Always `"24 hours"` |
| `spinSetting` | One of: `"Sorbet"`, `"Lite Ice Cream"`, `"Ice Cream"` |
| `calories` | Optional integer |
| `ingredients` | Array of `{ item: string, amount: string }`. Item must be **clean human-readable text** (no markdown, no HTML, no brand links). Amount must be in **cups, tbsp, tsp, or descriptive** (e.g., "2 medium"). |
| `instructions` | Array of strings. Each step must be specific to THIS recipe's ingredients. No generic boilerplate. |
| `respinFix` | At least 2 entries: one for crumbly/powdery, one for icy/too firm |

### Quality Standard: Compare Against the "Gold Standard"
The first 12 recipes in `recipes.json` (IDs: `strawberry-oat-sorbet` through `coconut-mango-lime-cream`) are the quality benchmark. Every new recipe must match that level of clarity, simplicity, and specificity. If your output looks different from those, it is wrong.

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
│   ├── Yogi_Ninja_Brand.md                 ← Brand identity and design system spec
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
├── docs/                              ← Brand guide, PR descriptions
│   ├── Yogi_Ninja_Brand_Guide.md
│   └── PR2_DESCRIPTION.md
│
├── skills/                            ← Execution logs from completed work
│   ├── skill-01 through skill-09
│   └── (next agent writes skill-10-xxx.md)
│
├── scripts/
│   └── ingest_local_recipes.py        ← Synthesis engine (NEEDS FIXING, see Phase 4b)
│
├── external/                          ← GITIGNORED. Local clone of jhermann/ice-creamery
│   └── ice-creamery/recipes/          ← ~130 recipe folders, each with README.md
│
├── web/src/app/
│   ├── components/
│   │   ├── NauseaCheckIn.tsx    ✅ DONE
│   │   ├── VirtualFreezer.tsx   ✅ DONE
│   │   ├── RecipeCard.tsx       ✅ DONE — contains the canonical Recipe interface
│   │   ├── TagSearch.tsx        ✅ DONE
│   │   ├── Navigation.tsx       ✅ DONE
│   │   ├── MedicalDisclaimer.tsx ✅ DONE
│   │   └── Typewriter.tsx       ✅ DONE
│   ├── globals.css              ✅ DONE — design tokens, Artisan Gold theme
│   ├── layout.tsx               ✅ DONE
│   └── page.tsx                 ✅ DONE
│
├── web/src/data/
│   └── recipes.json             ← 12 hand-crafted (good) + 4 synthesized (BROKEN, needs fix)
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
2. Mark that task as `[/]` (in progress) immediately (signal to other agents)
3. Execute exactly one task
4. Write output to disk
5. Mark the task `[x]` in both `system_state_checklist.md` and `progress_checklist.md`
6. Write a skill file in `skills/skill-XX-description.md`
7. **Commit with a Gitmoji** (see `skills/skill-06-commit-policy.md`)
8. Stop and wait for the next trigger

If the token limit is reached, the next agent reads `system_state_checklist.md` and picks up exactly where you stopped.

---

## 🏁 Phase 4b — What To Build Next

### Goal: Fix the Synthesis Engine and produce high-quality recipes

The `external/ice-creamery/` repo contains ~130 Ninja Creami recipes in markdown format. Most use industrial stabilizers, artificial sweeteners, and alcohol that violate our safety rules. The job is to **extract flavor inspiration** from that repo and produce clean, pantry-friendly Yogi Ninja recipes.

### Strategy: "Inspired By" Not "Copied From"

Do NOT try to mechanically parse and convert the source recipes. Most of them are incompatible with our safety rules. Instead:

1. **Read** a source recipe to understand the flavor profile (e.g., "Peaches & Cream" = peach + dairy base)
2. **Write** a brand-new Yogi Ninja recipe from scratch using only approved ingredients
3. **Name** it with a premium brand name (e.g., "Golden Peach Dream")
4. **Write** specific, step-by-step instructions for THAT recipe
5. **Set** correct flags (nausea, dairy-free) based on the actual ingredients you chose

### Sub-tasks for Phase 4b

1. **Fix: Remove the 4 broken synthesized recipes** from `recipes.json` (IDs: `velvet-banana-silk`, `golden-mango-alchemy`, `artisan-strawberry-glow`, `zen-coconut-frost`)
2. **Fix: Rewrite `scripts/ingest_local_recipes.py`** to produce clean output matching the gold-standard quality (or replace it with a simpler approach)
3. **Add: 6 to 10 new "Inspired By" recipes** to `recipes.json`, drawing flavor inspiration from `external/ice-creamery/` but using only approved ingredients
4. **Verify: All recipes in `recipes.json` pass validation** — no HTML/markdown in text, no gram measurements, correct flags
5. **Update: `system_state_checklist.md` and `progress_checklist.md`** after each sub-task

### Candidate flavor profiles from `external/ice-creamery/` worth exploring

| Source Recipe | Flavor Inspiration | Yogi Ninja Approach |
|---|---|---|
| Peaches & Cream | Peach + cream | Peach + coconut yogurt + honey |
| Just Fruit (Strawberry) | Pure fruit sorbet | Strawberry + water + maple syrup |
| Matcha Coconut | Matcha + coconut | Matcha + coconut milk + honey |
| Blueberry Buttermilk | Blueberry + tangy | Blueberry + Greek yogurt + honey |
| Apple Strudel | Apple + cinnamon | Apple + oat milk + cinnamon + dates |
| Creamy Watermelon | Watermelon + cream | Watermelon + coconut milk + lime |
| Lemon Sorbet | Bright citrus | Lemon + water + maple syrup |
| Easy Peely (Orange) | Orange citrus | Orange + oat milk + honey |
| Pineapple Sorbet | Tropical | Pineapple + coconut water + lime |
| Fruity FroYo | Mixed fruit + yogurt | Mixed berries + Greek yogurt + honey |

---

## ✅ Checklist Update Protocol — MANDATORY

**After completing ANY sub-task, you MUST update both files. No exceptions.**

**`system_state_checklist.md`** — mark the sub-task:
```markdown
- [/] Description of task (in progress by [YOUR MODEL NAME])
```
then after completion:
```markdown
- [x] Description of task — completed by [YOUR MODEL NAME] at [TIMESTAMP]
```

**`progress_checklist.md`** — add an entry:
```markdown
- [x] Description of what was completed
```

Then write a skill file at `skills/skill-10-[description].md` (or the next available number).

Then commit with a Gitmoji:
```
✨ feat: description
🐛 fix: description
🧹 chore: description
📄 docs: description
🎨 style: description
```

---

## ❓ FAQ

**Q: Should I read the `agents/` folder docs?**
A: This file already distills everything you need from them. Read the originals only if you need deeper context on a specific rule. The key files are: `Master System Prompt.md` for safety rules, `Application User Experience and Advanc.md` for UX features, `Jumpstarter-Git Repositories and Scra.md` for data sources, `Yogi_Ninja_Brand.md` for visual identity.

**Q: A recipe ingredient seems borderline. Is it safe?**
A: When in doubt, skip it. If it's not on the approved bases list above, it does not belong in a recipe.

**Q: Can I use ingredients from `external/ice-creamery/` directly?**
A: No. Use that repo for **flavor inspiration only**. Write your own recipes from scratch using the approved ingredients list.

**Q: `npm install` is failing.**
A: The dev server is likely already running. Skip npm. Write code files directly.

**Q: TypeScript is showing errors.**
A: Fix errors only in files you create or modify. Do not rewrite existing components.

**Q: Can I change the UI or add new components?**
A: Only after all Phase 4b sub-tasks are done. Do not touch Phase 2 components.

**Q: The task seems too simple.**
A: Do exactly what the checklist says. Simple and done beats complex and broken.

**Q: How do I know if my recipe output is good enough?**
A: Compare it against `strawberry-oat-sorbet` in `recipes.json`. If your output matches that quality and simplicity, it is correct. If it has markdown links, gram measurements, or industrial chemicals, it is wrong.
