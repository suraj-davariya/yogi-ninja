# Skill: Gitmoji Commit Policy
# Executed: 2026-05-12T20:30:00Z
# Agent: ANTIGRAVITY

## Purpose
To ensure all project contributions are documented with clarity, personality, and standardized visual anchors using Gitmojis. This policy must be followed by all AI agents and human developers.

## The Gitmoji Standard
Every commit message MUST start with at least one Gitmoji that represents the primary change. Use multiple Gitmojis in the body for granular details.

### Common Tokens:
- ✨ `:sparkles:` — New feature
- 🎨 `:art:` — Design/Style/Theme changes
- 🍱 `:bento:` — Component refinements or assets
- 🚀 `:rocket:` — Deployment/CI/CD changes
- ⚙️ `:gear:` — Configuration/Settings
- 🚑 `:ambulance:` — Hotfix
- 🏥 `:hospital:` — Health/Medical safety updates
- 🍦 `:ice_cream:` — Recipe or food-specific logic
- 📝 `:memo:` — Documentation
- 🐛 `:bug:` — Bug fix

## AI Agent Pre-Commit Checklist
Before executing `git commit`, the agent MUST verify:
1. [ ] Does the subject line start with a Gitmoji?
2. [ ] Are complex changes broken down into a bulleted list with specific Gitmojis?
3. [ ] Is the message technical but professional?
4. [ ] Does it follow the "Japandi Zen" tone (precise, clean, respectful)?

## Examples
**Correct:**
`✨ feat: add texture rescue wizard`
`🪄 Implemented logic for crumbly vs icy fixes.`
`🎨 Applied stone-washed card styling.`

**Incorrect:**
`added wizard and css`
