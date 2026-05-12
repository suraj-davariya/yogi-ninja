# 🥤 Contributing to Yogi Ninja

Thank you for your interest in contributing to Yogi Ninja! This project is a pregnancy-safe Ninja Creami recipe companion built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

Please read this guide carefully before opening a PR or filing an issue.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Project Structure](#project-structure)
- [Getting Started Locally](#getting-started-locally)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Safety & Medical Rules](#safety--medical-rules)
- [AI Agent Contributions](#ai-agent-contributions)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## 🤝 Code of Conduct

This project is focused on the health and wellbeing of pregnant users. All contributors are expected to:

- Be respectful and inclusive in all interactions
- Prioritize user safety above feature velocity
- Flag any content that could pose a health risk immediately
- Never introduce ingredients that are contraindicated during pregnancy

---

## 🗂️ Project Structure

```
yogi-ninja/
├── agents/                  # AI agent prompts and orchestration docs
├── skills/                  # Skill files that define what each agent builds
├── web/                     # Next.js application (all frontend code lives here)
│   ├── src/app/
│   │   ├── components/      # All React components (TSX only)
│   │   │   ├── NauseaCheckIn.tsx
│   │   │   ├── VirtualFreezer.tsx
│   │   │   ├── RecipeCard.tsx
│   │   │   ├── TagSearch.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MedicalDisclaimer.tsx
│   │   ├── globals.css      # Design system tokens and utility classes
│   │   ├── layout.tsx       # Root layout (navigation + disclaimer wrappers)
│   │   └── page.tsx         # Homepage — wires all components together
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── system_state_checklist.md  # Live agent handoff state — update after every task
├── progress_checklist.md      # Component-level build progress tracker
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 20.x or higher |
| npm | 9.x or higher |
| Git | Any recent version |

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/yogi-ninja.git
cd yogi-ninja

# 2. Install web app dependencies
cd web
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Useful Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server (requires build first) |
| `npm run lint` | Run ESLint across all source files |

---

## 🔄 Development Workflow

1. **Branch from `main`** — always create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **One concern per PR** — keep changes focused. Do not mix UI changes with data pipeline changes.

3. **Update state files** — after completing any task, update:
   - `system_state_checklist.md` — mark your sub-task complete
   - `progress_checklist.md` — update component progress

4. **TypeScript required** — all new files in `web/src/` must be `.tsx` or `.ts`. No `.js` or `.jsx` files.

5. **No parallel component directories** — all components live exclusively in `web/src/app/components/`. Do not create `web/src/components/`.

---

## 🧩 Component Guidelines

### File Conventions

- **Location:** `web/src/app/components/ComponentName.tsx`
- **Naming:** PascalCase for component files and exports
- **Client Components:** Add `"use client";` at the top if using React hooks or browser APIs
- **Types:** Define all prop interfaces at the top of the file

### Design System

All styling must use the CSS custom properties defined in `globals.css`. Do **not** introduce inline hex colors or ad-hoc values.

```tsx
// ✅ Correct — uses design tokens
style={{ color: "var(--text-primary)", background: "var(--surface-1)" }}

// ❌ Wrong — hardcoded values break the theme
style={{ color: "#333", background: "#f5f5f5" }}
```

Key design tokens:

| Token | Usage |
|-------|-------|
| `--yogi-violet` | Primary brand color |
| `--yogi-teal` | Accent / gradient end |
| `--background` | Page background |
| `--surface-1` | Card / panel surface |
| `--text-primary` | Body text |
| `--text-secondary` | Subtitle / metadata text |
| `--text-muted` | Placeholder / disabled text |
| `--border-soft` | Subtle borders |

### Recipe Data Schema

The canonical `Recipe` interface is defined in `RecipeCard.tsx`. **Do not** create a parallel interface elsewhere.

```ts
interface Recipe {
  id: string;
  name: string;
  base: string;
  tags: string[];
  nauseaLevel: "severe" | "moderate" | "mild" | "none";
  dairyFree: boolean;
  ingredients: string[];
  instructions: string[];
  spinSetting: string;
  freezeTime: number; // hours
  textureRescue: string;
}
```

---

## 🛡️ Safety & Medical Rules

These rules are **non-negotiable**. Every recipe and all AI-generated content must comply.

### Prohibited Ingredients

- ❌ Raw or undercooked eggs
- ❌ Alcohol (in any form)
- ❌ Artificial preservatives
- ❌ Artificial colors
- ❌ Artificial flavors
- ❌ High-mercury fish or seafood
- ❌ Unpasteurized dairy

### Approved Bases

- ✅ Pasteurized cow's milk
- ✅ Plant milks (oat, almond, coconut)
- ✅ Pasteurized yogurt
- ✅ Bananas
- ✅ Mild fruits (berries, mango, peach)
- ✅ Oats

### Sweeteners

- ✅ Honey (minimal)
- ✅ Maple syrup (minimal)
- ✅ Dates

### Disclaimer Requirement

Every recipe card **must** include the text:
> "Always confirm unusual ingredients with your healthcare provider."

The `MedicalDisclaimer` component handles this. Do not remove or suppress it.

---

## 🤖 AI Agent Contributions

This project uses a multi-agent AI pipeline. If you are contributing as an AI agent:

1. **Read first:** `agents/Yogi_Ninja_Master_Orchestrator.md` → `agents/Master System Prompt.md`
2. **Check state:** Read `system_state_checklist.md` to find the next pending phase
3. **Execute one phase only** — do not attempt multiple phases in a single session
4. **Mark in-progress immediately:** Update the checklist sub-task to `[In Progress]` before starting
5. **Update on completion:** Mark sub-task `[x]` and update `progress_checklist.md`
6. **Stop and wait** for the next trigger after completing your phase

### Phase Ownership

| Phase | Status | Owner |
|-------|--------|-------|
| Phase 1: Repository Setup | ✅ Complete | — |
| Phase 2: UI Component Generation | ✅ Complete | — |
| Phase 3: Data Ingestion Batch 1 | ⏳ Pending | Next agent |
| Phase 4: Data Ingestion Batch 2 | ⏳ Pending | Next agent |

---

## 📬 Submitting a Pull Request

1. Ensure `npm run lint` passes with no errors
2. Ensure `npm run build` completes successfully
3. Confirm no prohibited ingredients appear anywhere in your changes
4. Update `system_state_checklist.md` and `progress_checklist.md` if applicable
5. Open a PR against `main` with:
   - A clear title describing the change
   - A description of **what** changed and **why**
   - Screenshots or a screen recording for any UI changes

### PR Title Format

```
feat: add grocery export component
fix: correct freezer timer reset on unmount
docs: update contributing guide
chore: upgrade Next.js to 16.3
```

---

## 🐛 Reporting Bugs

Open a GitHub Issue and include:

- Steps to reproduce the bug
- Expected vs actual behaviour
- Browser and OS version
- Any console errors (screenshot or paste)
- Whether the bug involves a recipe safety concern (flag this immediately)

---

## 💡 Feature Requests

Open a GitHub Issue tagged `enhancement` and describe:

- The problem you are solving
- How your feature improves the experience for pregnant users
- Any safety implications to consider
- Rough implementation approach (optional)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

> 🥤 Yogi Ninja — Made with love for expecting mothers. Always consult your healthcare provider.
