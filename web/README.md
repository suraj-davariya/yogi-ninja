# 🥤 Yogi Ninja — Web App

This is the Next.js 16 frontend for the Yogi Ninja pregnancy-safe Ninja Creami recipe companion.

> For the full project overview, see the [root README](../README.md).

---

## Getting Started

```bash
# From the /web directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Build the production bundle |
| `npm run start` | Serve the production build (requires build first) |
| `npm run lint` | Run ESLint |

---

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 16.2.6 |
| React | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |

---

## Source Layout

```
src/app/
├── components/
│   ├── NauseaCheckIn.tsx      # 3-step daily check-in wizard
│   ├── VirtualFreezer.tsx     # 24h countdown timers with progress bars
│   ├── RecipeCard.tsx         # Collapsible card + Texture Rescue Wizard
│   ├── TagSearch.tsx          # Live search + multi-tag filter grid
│   ├── Navigation.tsx         # Sticky header + mobile menu
│   └── MedicalDisclaimer.tsx  # Banner / inline / card variants
├── globals.css                # Design system tokens, utilities, animations
├── layout.tsx                 # Root layout (navigation + disclaimer wrappers)
└── page.tsx                   # Homepage — wires all components together
```

---

## Design Tokens

All styles use CSS custom properties defined in `globals.css`. Key tokens:

| Token | Usage |
|-------|-------|
| `--yogi-violet` | Primary brand color |
| `--yogi-teal` | Accent / gradient end |
| `--background` | Page background |
| `--surface-1` | Card / panel surface |
| `--text-primary` | Body text |
| `--border-soft` | Subtle borders |

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for component guidelines, design system rules, and safety requirements.
