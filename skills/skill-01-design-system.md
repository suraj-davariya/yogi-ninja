# Skill: Design System Architecture
# Executed: 2026-05-12T03:31:00Z
# Agent: ANTIGRAVITY

## What Was Done
Built the complete Yogi Ninja design token system in `web/src/app/globals.css`.

## Design Decisions
- **Palette**: Calm lavender (#7c5cbf) as primary, sage teal (#2da89a) as accent. Avoids harsh primary colors that could feel overwhelming to a nauseous first-trimester user.
- **Typography**: Inter (body) + Playfair Display (headings). Loaded via Google Fonts import for elegance without a heavy icon library.
- **Dark mode**: Full dark palette defined via CSS custom properties under `prefers-color-scheme: dark`.
- **Utility classes**: `.yogi-card`, `.yogi-btn-primary`, `.yogi-btn-ghost`, `.yogi-tag` defined globally so all components share consistent styling without prop drilling.
- **Animations**: `fadeSlideUp` for page transitions, `pulseGlow` for freezer timer alert states, `spinnerRing` for batch loaders.
- **Tailwind CSS v4**: Uses `@import "tailwindcss"` syntax and `@theme inline` block (not legacy `@tailwind base/components/utilities` directives).

## Files Modified
- `web/src/app/globals.css` (overwritten — was minimal boilerplate)

## Reuse Notes
Import these classes in any new component. Do NOT add ad-hoc Tailwind utility variants for colors — use the CSS custom properties for brand consistency.
