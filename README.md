# 🥤 Yogi Ninja

> **Autonomous Ninja Creami Deluxe recipe companion for first-trimester expecting mothers.**

Yogi Ninja is a **Next.js 16** web application that safely curates, filters, and tracks Ninja Creami Deluxe recipes for vegetarian women in early pregnancy. The app adapts to daily nausea levels, enforces strict prenatal food safety, manages a virtual freezer timer, and provides instant texture rescue guidance.

![License](https://img.shields.io/badge/license-MIT-purple)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-teal)

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🤢 **Daily Nausea Check-In** | 3-step progressive wizard on launch (nausea level, dairy tolerance, flavor preference) — dynamically reorders the recipe grid to match how you feel today |
| 🧊 **Virtual Freezer Tracker** | 24-hour countdown timer per pint batch with live progress bars and gentle notifications when a pint is ready to spin |
| 🪄 **Texture Rescue Wizard** | One-tap "Fix My Texture" button on every recipe card revealing exact respin instructions for crumbly or powdery results |
| 🛒 **One-Click Grocery Export** | Aggregates all selected weekly batch ingredients into a safety-filtered checklist of approved items |
| 🔍 **Search and Tagging Engine** | Live search with multi-tag recipe discovery by flavor, base type, nausea compatibility, and dairy tolerance |
| 🔬 **Ingredient Safety Filter** | Automatically blocks raw eggs, alcohol, preservatives, artificial colors, and artificial flavors from every recipe |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Required Version |
|------|-----------------|
| Node.js | **20.x or higher** |
| npm | 9.x or higher |

### Run the Web App Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-org/yogi-ninja.git
cd yogi-ninja

# 2. Install dependencies
cd web
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

Run these from the `web/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Build the production bundle |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## 🏗️ Project Structure

```
yogi-ninja/
├── agents/                          # AI agent system prompts and orchestration docs
│   ├── Yogi_Ninja_Master_Orchestrator.md   # Top-level index — start here
│   ├── Master System Prompt.md             # Core ruleset for the entire AI lifecycle
│   ├── Agent Architecture and Application Des.md
│   ├── AI Agent Skill Matrix.md
│   ├── AI Autonomous Execution Pipeline.md
│   ├── AI IDE Execution Prompt.md          # Boot-up prompt for Cursor / Windsurf
│   ├── Application User Experience and Advanc.md
│   ├── Jumpstarter-Git Repositories and Scra.md
│   ├── Project Understanding and Scope.md
│   └── State Management and Token Limit Safeg.md
├── skills/                          # Skill files that define what each agent builds
│   ├── skill-01-design-system.md
│   ├── skill-02-navigation-disclaimer.md
│   ├── skill-03-core-components.md
│   └── skill-04-page-composition.md
├── web/                             # Next.js 16 application (React 19, Tailwind CSS 4, TypeScript)
│   ├── src/app/
│   │   ├── components/              # All React components (TSX)
│   │   │   ├── NauseaCheckIn.tsx    # 3-step daily check-in wizard
│   │   │   ├── VirtualFreezer.tsx   # 24h countdown timer per pint
│   │   │   ├── RecipeCard.tsx       # Collapsible card + Texture Rescue
│   │   │   ├── TagSearch.tsx        # Live search + multi-tag filter grid
│   │   │   ├── Navigation.tsx       # Sticky header, mobile menu
│   │   │   └── MedicalDisclaimer.tsx # Banner / inline / card variants
│   │   ├── globals.css              # Design system tokens, utilities, animations
│   │   ├── layout.tsx               # Root layout (navigation + disclaimer)
│   │   └── page.tsx                 # Homepage — wires all components together
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── system_state_checklist.md        # Live agent handoff state file
├── progress_checklist.md            # Component-level build progress
├── CONTRIBUTING.md                  # Contribution guide
├── .gitignore
└── LICENSE
```

---

## 🤖 AI Agent Team

The system is managed by four specialized agents that operate in coordinated micro-batches to prevent token limit failures. Each agent picks up work by reading `system_state_checklist.md`.

| Agent | Role |
|---|---|
| **Executive Orchestrator** | Manages overall workflow, tracks batch progress, enforces quality gates before surfacing results |
| **Formulation Scientist** | Crafts pregnancy-safe recipes using approved bases with minimal natural sweeteners |
| **UI and UX Designer** | Owns the frontend experience, tagging layout, and visual batch progress display |
| **QA Reviewer** | Validates every recipe against first-trimester safety guidelines, blocks unauthorized ingredients |

### Agent Execution Order (New Session)

Follow this order when starting a new agent session to ensure zero context loss:

1. Read `agents/Yogi_Ninja_Master_Orchestrator.md` — full project scope
2. Read `agents/Master System Prompt.md` — core safety and operational ruleset
3. Read `system_state_checklist.md` — find the next pending phase
4. Execute **one phase at a time** — never attempt multiple phases in a single session
5. Update `system_state_checklist.md` and `progress_checklist.md` after every completed task
6. Stop and wait for the next trigger

---

## 🔄 Autonomous Execution Pipeline

```
Scrape (artisan-baseline + recipe-scrapers)
    ↓
Filtration (remove unsafe ingredients, scale to pint measurements, tag metadata)
    ↓
Application State Generation (render React components, update search index)
    ↓
Batch Progress Tracking (update system_state_checklist.md, report % complete)
```

**Data Sources:**
- External artisan baseline — tested Ninja Creami formulations for technical reference.
- [`hhursev/recipe-scrapers`](https://github.com/hhursev/recipe-scrapers) — Python scraping engine for new recipe discovery

---

## 📋 Current Build Status

| Phase | Status |
|---|---|
| Phase 1: Repository Setup | ✅ Complete |
| Phase 2: UI Component Generation | ✅ Complete |
| Phase 3: Data Ingestion Batch 1 | ⏳ Pending |
| Phase 4: Data Ingestion Batch 2 | ⏳ Pending |

**Phase 2 — Completed Components:**
- [x] Daily Nausea Check-In Component (`NauseaCheckIn.tsx`)
- [x] Virtual Freezer Component (`VirtualFreezer.tsx`)
- [x] Recipe Card Component (`RecipeCard.tsx`)
- [x] Medical Disclaimer Component (`MedicalDisclaimer.tsx`)
- [x] Navigation Component (`Navigation.tsx`)
- [x] Tag Search Component (`TagSearch.tsx`)
- [x] Design System (`globals.css`)
- [x] Root Layout (`layout.tsx`)
- [x] Homepage composition (`page.tsx`)

**Phase 3 — Next Up:**
- [ ] Scrape artisan baseline recipe markdown files
- [ ] Run safety filter and write approved recipes to `web/src/data/recipes.json`
- [ ] Wire `TagSearch.tsx` to import from `recipes.json`

---

## 🛡️ Safety Constraints

All recipes and AI outputs must comply with the following hard rules. **No exceptions.**

- **❌ Prohibited:** Raw eggs, alcohol, preservatives, artificial colors, artificial flavors
- **✅ Approved bases:** Pasteurized milk, plant milks (oat, almond, coconut), pasteurized yogurt, bananas, mild fruits, oats
- **✅ Sweeteners:** Minimal amounts of natural sweeteners only (honey, maple syrup, dates)
- Every output must include a reminder to confirm unusual ingredients with a healthcare provider
- Every recipe must specify exact pint measurements, freezing time (24 hours), spin settings, and respin fix instructions

---

## 🎨 Design Philosophy

The interface is **calm, classy, and playful** without being overwhelming. Navigation is frictionless to accommodate users experiencing fatigue or nausea. The design adapts dynamically to the user's daily check-in answers, presenting gentle oat-milk options on bad days and richer options when they feel well.

**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · Geist Font

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:
- Development setup and workflow
- Component and design system standards
- Safety and medical compliance rules
- AI agent contribution protocols
- How to submit a Pull Request

---

## ⚕️ Medical Disclaimer

> Yogi Ninja is a recipe utility tool, not a medical application. Always confirm unusual or unfamiliar ingredients with your healthcare provider before consuming during pregnancy.

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
