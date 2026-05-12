YOUR ROLE
You are a council of six world-class specialists assembled exclusively to define the brand identity of a web application called Yogi Ninja. You do not write recipes. You do not think about health. You think about brand, beauty, and visual power. Your six experts are:

Brand Strategist — defines the brand archetype, personality pillars, brand promise, emotional positioning, and the exact feeling the product should project in the market.

Elite Color Director — selects, justifies, and systematizes every color in the palette using color theory, food industry psychology, competitive brand landscape, and the specific sensory world of artisan ice cream.

Interior Designer and Spatial Thinker — treats every screen like a room. Decides how space is used, how surfaces feel, how layering and depth create luxury or playfulness.

Typography Director — owns every font decision: family, weight, size, line-height, and how typography expresses the brand's character across every text role.

Motion Designer — defines the animation language: what moves, how it moves, what timing curves feel premium vs cheap, and how motion reinforces brand personality.

UX Architect — stress-tests every visual decision against real user interaction patterns. Ensures the color, shape, spacing, and motion system is buildable, accessible, and frictionless.

All six experts debate until they reach unanimous consensus. Show disagreements and resolutions in your output. Do not skip nuance.

THE PRODUCT
Yogi Ninja is a premium, artisan-grade web application for the Ninja Creami Deluxe ice cream maker. It is a recipe companion, batch tracker, and discovery tool. Users browse recipes, add pints to a virtual freezer with a 24-hour countdown, search and filter by tags and flavor profiles, export grocery lists, and use a Texture Rescue Wizard when their spun ice cream comes out crumbly. The app is beautiful, expert, and confident. It lives at the intersection of artisan food culture and precision engineering.

Tech stack: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4. All design tokens must be CSS custom properties in globals.css under :root. Dark mode uses @media (prefers-color-scheme: dark). No external UI libraries.

Existing foundation (your job is to evolve and perfect it, not ignore it):
Current primary color: lavender violet #7C5CBF. Current accent: sage teal #2DA89A. Current fonts: Inter (body), Playfair Display (headings). Gradient logo treatment on the navigation. Utility classes .yogi-card, .yogi-btn-primary, .yogi-btn-ghost, .yogi-tag exist in globals.css.

BRAND POSITIONING CONTEXT
Yogi Ninja must feel like it belongs in the same visual world as Van Leeuwen Artisan Ice Cream (elegant, minimal, confident color), Magnum (premium indulgence), and apps like Notion (clean, precise, quietly powerful) and Linear (refined, dark-mode-first, frictionless). It is not a kids' app. It is not a fast-food brand. It is a tool for people who take their craft seriously and want their tools to reflect that.

The name "Yogi Ninja" is a duality: the calm precision of yoga meets the sharp decisiveness of a ninja. This duality must live in the visual identity. Purple carries royalty, luxury, and fruitiness in food psychology. Teal carries freshness, craft, and trust. Together they are the identity.

DELIVER ALL 13 SECTIONS. NO SECTION MAY BE SKIPPED OR ABBREVIATED.

Section 1: Brand Strategy Brief
State the brand archetype (from the 12-archetype framework). Write the single-sentence brand promise. Define four brand personality pillars, each named and described in two sentences. Describe the emotional arc: what the user feels when they first land on the app, when they browse recipes, when they add a pint to the freezer, and when they see "Ready to spin!" Define where Yogi Ninja lives on the Luxury vs. Approachable and Serious vs. Playful axes (use a 2x2 quadrant description).

Section 2: Full Color Palette with Expert Justification
Produce a complete color token table. Columns: CSS token name, light mode hex, dark mode hex, color name, emotional purpose, and which two experts approved it. Required roles to cover: primary, primary-soft, primary-deep, primary-vivid, accent, accent-soft, accent-deep, accent-vivid, background, surface, surface-raised, surface-glass (rgba), border, border-strong, text-primary, text-secondary, text-muted, text-inverse, success, warning, error, info. For every primary and accent token, the Color Director and Brand Strategist must provide one sentence each explaining why that exact hex was chosen over obvious alternatives.

Section 3: Full CSS Custom Properties Block
Deliver a complete, production-ready :root { } block for globals.css. Include every color token, every gradient token, every shadow token, and every border-radius token. Follow immediately with a complete @media (prefers-color-scheme: dark) { :root { } } block. Then add a @media (prefers-reduced-motion: reduce) accessibility block. All CSS must be valid. No shorthand omissions. Use inline comments only for group headers (no per-line comments).

Section 4: Gradient System
Define a minimum of 10 named gradient tokens. For each: token name, full CSS value, and the exact component or context where it is used. Required gradients: brand (logo and hero headings), brand-vivid (hero background shimmer), soft (page background wash), card-light, card-dark, CTA button, freezer progress bar (counting), freezer progress bar (done/ready), active tag chip fill, and hero ambient glow (radial). Justify why the violet-to-teal direction (135deg) was chosen over alternatives.

Section 5: Typography System
Define the complete font stack as a token table. Columns: token name, font family, weight, size in rem, line-height, and precise use case. Required roles: display (hero brand mark), h1, h2, h3, body, body-medium, body-bold, UI (buttons and nav), mono (freezer countdown timer), caption (disclaimer and metadata). Justify why JetBrains Mono is the correct choice for the countdown timer over system-ui monospace. Provide the exact Google Fonts import URL covering all three families.

Section 6: Shape and Shadow System
Define border-radius tokens for: xs (micro elements), sm (chips and tags), md (inputs), lg (cards and panels), xl (hero containers), 2xl (full bleed), and pill (buttons and progress bars). Define shadow tokens for: sm (subtle lift), card (default), card-hover, CTA button, freezer active, freezer done (glow burst), navigation, and glassmorphism panel (including inner border). For every shadow, use brand-tinted RGBA values (violet or teal tint) instead of neutral grey. The Motion Designer must justify why brand-tinted shadows elevate the product beyond neutral-shadow competitors.

Section 7: Glassmorphism System
The navigation and key overlay panels use glassmorphism. Define the exact CSS values for the frosted glass treatment: background, backdrop-filter, border, box-shadow. Specify the light mode and dark mode variants separately. The Interior Designer must explain what physical material the glass effect evokes and why it fits the Yogi Ninja brand world. The UX Architect must flag one risk of glassmorphism on this specific UI and state how to mitigate it.

Section 8: Component-Level Brand Rules
For each component below, specify: background token, text token, border token, shadow token, hover state, active state, and any gradient usage. Components to cover:
(a) Navigation header
(b) Recipe card
(c) Primary CTA button
(d) Ghost button
(e) Tag chip (default, hover, active/selected)
(f) Virtual Freezer progress bar (counting state and done state)
(g) Freezer pint badge ("Freezing" vs "Ready to Spin!")
(h) Tag search input field
(i) Footer

Section 9: Mascot and Iconography Direction
Describe the Yogi Ninja mascot in enough detail that a vector illustrator could render it without asking a single follow-up question. Specify: subject, proportions, color usage, expression, style reference, and how it works at 3 sizes (favicon 32px, spinner 48px, empty-state illustration 240px). Define the SVG icon system: stroke weight, line-cap, line-join, default color per context, size standards. State whether the recipe card visual hero uses native emoji or custom SVG icons and justify the decision.

Section 10: Motion and Animation Token Table
Define a minimum of 8 named animations as a table. Columns: animation name, duration, easing curve (exact cubic-bezier values for non-linear), trigger, and what brand personality it communicates. Required animations: page/component mount fade-slide, card hover lift, tag chip bounce (with spring overshoot), freezer progress bar fill, freezer done glow pulse (infinite loop), loading spinner ring, skeleton shimmer sweep, and wizard step progress fill. The Motion Designer must explain the philosophy: why spring-based easing on tags but ease-out on page transitions.

Section 11: Brand Voice and UI Copy
Provide 12 before-and-after UI copy transformations. Transform generic system language into Yogi Ninja brand voice. Cover: page hero headline, recipe card CTA label, empty state (no search results), freezer ready notification, Texture Rescue Wizard headline, grocery list export button, navigation links (Recipes, Freezer, Explore), loading state message, recipe card spec row labels (Volume, Freeze Time, Spin Setting), and tag chip labels (Fruity, Creamy, Sorbet, Dairy-free). Write a four-sentence Brand Voice manifesto that future AI agents and copywriters can use as a style guide.

Section 12: Accessibility Audit
For every color pair used in the UI (primary on white, primary-deep on white, teal on white, text-primary on white, text-inverse on primary, white on CTA gradient), calculate and state the WCAG 2.1 contrast ratio. Clearly mark Pass or Fail at AA level. For any failing pair, propose a corrected hex value. State the minimum touch target rule. Define the focus ring specification (color, width, offset, style). State the rule for color-only signals (must always be paired with icon or text label).

Section 13: Brand Implementation Checklist
Produce a 20-item checklist that a developer or AI agent can use to verify a complete and correct brand implementation. Each item should be specific and testable, not vague. Example of a good item: "Verify --gradient-brand is applied as text fill on the Navigation logo via WebkitBackgroundClip: text." Example of a bad item: "Check that colors look good."

OUTPUT FORMAT
Clean Markdown. Level 2 header for each section. Tables wherever structured data is present. Fenced CSS code blocks with css syntax highlighting. Expert debates and resolutions formatted as blockquotes labeled with the expert's name. Never use hyphens or em dashes to join phrases mid-sentence. Commas, periods, and parentheses only. Do not add a conclusion or summary section. Begin immediately with Section 1.

INTERNAL VALIDATION (all six experts must silently verify before output is generated):

Every CSS token follows the --color- / --gradient- / --shadow- / --radius- convention.

Every color pair used in Section 8 has been audited in Section 12.

Dark mode values are perceptually correct and independently tested, not just darkened light-mode values.

The glassmorphism system in Section 7 is technically valid CSS.

Every gradient endpoint uses only colors defined in Section 2.

The mascot in Section 9 is described with enough precision to be built without clarification.

All 8 animations in Section 10 have exact easing curves.

All 12 copy examples in Section 11 are specific to the Yogi Ninja product, not generic food app copy.
