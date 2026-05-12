# Skill 07: Elite Typewriter Effect System
# Version: 1.0
# Author: Suuraj
# Created: 2026-05-12
# Depends on: skill-06-brand-identity.md (color tokens), skill-01-design-system.md (globals.css)

***

## Purpose

This skill adds a production-grade, multi-variant typewriter animation system to the Yogi Ninja application. The typewriter is not a simple character-by-character delay. It is a fully engineered React component (`Typewriter.tsx`) that supports six distinct behavioral variants, each mapped to a specific brand context, complete with brand-tinted cursors, variable-speed human jitter, glitch self-correction, cascade stacking, and oracle cycling.

***

## Files Created / Modified

| File | Action |
|---|---|
| `web/src/app/components/Typewriter.tsx` | NEW — full component implementation |
| `web/src/app/globals.css` | MODIFIED — append typewriter CSS block |
| `web/src/app/page.tsx` | MODIFIED — HeroHeadline, HeroSubtext, LoadingMessage |
| `web/src/app/components/Navigation.tsx` | MODIFIED — NavTagline (oracle variant) |
| `web/src/app/components/VirtualFreezer.tsx` | MODIFIED — FreezerReadyMessage (precision variant) |
| `web/src/app/components/RecipeCard.tsx` | MODIFIED — TextureRescueHeader, SpinSettingLabel |
| `web/src/app/components/TagSearch.tsx` | MODIFIED — EmptyStateMessage (cascade variant) |

***

## The Six Typewriter Variants

| Variant | Brand Meaning | Speed | Cursor | Where Used |
|---|---|---|---|---|
| `precision` | Terminal intelligence, engineered mastery | 35ms/char | Amber block ▋ | Freezer ready message, Texture Rescue header, loading state |
| `manifesto` | Luxury hero headline, serif weight | 55ms/char | Gold line │ | Hero `<h1>` heading |
| `whisper` | Human warmth, variable natural speed | 25ms/char (jittered) | Muted dot · | Hero subtext, recipe card spin label |
| `cascade` | Sequential reveal, stacked lines | 40ms/char | Amber block ▋ | Empty state message |
| `glitch` | Occasional self-correcting corruption | 38ms/char | Error red ▋ | Batch loading state, Phase 4 processing feedback |
| `oracle` | Cycles phrases, delete and retype | 45ms/char | Amber block ▋ | Navigation tagline, hero flavor cycling |

***

## Architecture Decisions

### Why six variants instead of one configurable component?

Each variant communicates a distinct brand personality signal. `precision` reinforces the Ninja brand (expert, terminal-like, no-nonsense). `manifesto` reinforces the Yogi brand (expansive, serif, considered). Using one generic component with speed props would produce a consistent but meaningless effect. Variants make the motion intentional.

### Why variable speed on `whisper`?

The `whisper` variant simulates human typing rhythm. Characters after a space or punctuation have slightly longer pauses (natural cognitive loading). This is achieved via `jitteredDelay()`, which adds up to ±40% random jitter on the base speed. The result feels like a person, not a machine, which is exactly right for secondary brand copy.

### Why glitch self-corrects instead of just skipping?

A raw skip (wrong char appears and stays) reads as a bug. A glitch that corrects itself in 80ms reads as intelligence, as if the system caught its own error. This reinforces the "Technical Mastery" brand pillar from `skill-06-brand-identity.md`.

### Why oracle mode deletes at a different speed than it types?

Deletion at 28ms (faster than typing at 45ms) mimics the natural difference between reading speed and writing speed. It also prevents the delete phase from feeling labored or slow, which would break the "Decisive Elegance" brand pillar.

***

## Placement Map

```
page.tsx (Hero section)
  └─ <h1>
       └─ Typewriter variant="manifesto" className="typewriter--gradient"
            lines: "Craft your scoop."
  └─ <p>
       └─ Typewriter variant="whisper"
            lines: "Precision engineered. Artisan crafted. Endlessly yours."
            startDelay: 1800ms (fires after heading finishes)
  └─ LoadingMessage (only shown during recipe grid fetch)
       └─ Typewriter variant="glitch"
            lines: "INITIALIZING RECIPE ENGINE..."

Navigation.tsx (below logo)
  └─ Typewriter variant="oracle"
       lines: ["Spin. Craft. Repeat.", "Your Ninja. Your rules.", ...]
       startDelay: 1200ms

VirtualFreezer.tsx (per-pint, triggered when countdown hits 0:00:00)
  └─ Typewriter variant="precision"
       lines: "► PINT LOCKED. READY TO SPIN."
       startDelay: 200ms

RecipeCard.tsx (Texture Rescue Wizard on open)
  └─ Typewriter variant="precision"
       lines: [
         { text: "DIAGNOSING TEXTURE FAILURE...", pauseAfter: 600 },
         { text: "RESPIN PROTOCOL READY.", pauseAfter: 0 }
       ]

TagSearch.tsx (empty state when no recipes match)
  └─ Typewriter variant="cascade"
       lines: [
         "No flavor found.",
         "Try a different mood.",
         "Or invent your own."
       ]
```

***

## CSS Token Dependencies

All typewriter CSS uses only tokens defined in `skill-06-brand-identity.md`:

| CSS Usage | Token |
|---|---|
| Amber cursor color | `--color-primary` |
| Gold cursor color | `--color-primary-vivid` |
| Error cursor color | `--color-error` |
| Muted cursor color | `--color-text-muted` |
| Oracle phrase color | `--color-primary` |
| Manifesto gradient text | `--gradient-brand` |
| Precision font | `--font-family-mono` (JetBrains Mono) |
| Manifesto font | `--font-family-display` (Playfair Display) |
| Whisper font | `--font-family-body` (Inter) |

***

## Accessibility Rules

1. Every `Typewriter` instance must have an `aria-label` set to the full final text, so screen readers announce the complete message immediately without waiting for the animation.
2. `role="text"` and `aria-live="polite"` are set on the wrapper. Do not change to `aria-live="assertive"` — that would interrupt screen reader focus.
3. The cursor element uses `aria-hidden="true"` so it is not announced.
4. Under `@media (prefers-reduced-motion: reduce)`, the cursor blink stops and opacity is static. The typing animation should be suppressed entirely by setting `charSpeed={0}` and rendering the full text immediately. (TODO: add a `respectReducedMotion` prop to the component in a future skill.)

***

## Integration Checklist

- [ ] `Typewriter.tsx` created at `web/src/app/components/Typewriter.tsx`
- [ ] Typewriter CSS block appended to `web/src/app/globals.css` (after existing utility classes)
- [ ] Hero `<h1>` in `page.tsx` wraps text in `Typewriter variant="manifesto" className="typewriter--gradient"`
- [ ] Hero subtext `<p>` uses `Typewriter variant="whisper" startDelay={1800}`
- [ ] Loading state in `page.tsx` uses `Typewriter variant="glitch"`
- [ ] `Navigation.tsx` adds oracle tagline below logo with `startDelay={1200}`
- [ ] `VirtualFreezer.tsx` triggers precision variant when countdown reaches zero
- [ ] `RecipeCard.tsx` Texture Rescue Wizard header uses two-line precision cascade
- [ ] `TagSearch.tsx` empty state uses three-line cascade variant
- [ ] All `Typewriter` instances have `aria-label` set
- [ ] Tested under `prefers-reduced-motion: reduce` in browser DevTools
- [ ] Tested in dark mode (`prefers-color-scheme: dark`)
- [ ] No `Typewriter` instance fires during SSR (all are client components via `"use client"`)

***

## Related Skills

- `skill-01-design-system.md` — globals.css foundation (append typewriter CSS here)
- `skill-02-navigation-disclaimer.md` — Navigation.tsx (add oracle tagline)
- `skill-03-core-components.md` — RecipeCard.tsx, VirtualFreezer.tsx, TagSearch.tsx
- `skill-04-page-composition.md` — page.tsx hero section
- `skill-06-brand-identity.md` — color tokens consumed by typewriter CSS