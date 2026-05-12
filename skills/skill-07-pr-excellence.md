# Skill: Pull Request Excellence
# Executed: 2026-05-12T20:37:00Z
# Agent: ANTIGRAVITY

## Purpose
To ensure every Pull Request (PR) in the Yogi Ninja ecosystem is a masterpiece of technical documentation, architectural clarity, and product vision. We do not just "merge code"; we release experiences.

## The Gold Standard PR Structure
Every PR description MUST include the following sections:

### 1. 🎯 The Vision
A single, powerful paragraph describing the "Why". What gap in the user's life does this change fill? Use brand-aligned language (Japandi Zen, Mindful, Precise).

### 2. 🧱 Architectural Impact
A bulleted list of technical changes. Group them by layer:
- **Core Architecture** (Next.js, TS config, etc.)
- **Design System** (CSS variables, animations)
- **Component Layer** (React logic, state management)
- **Data Layer** (JSON schemas, ingestion)

### 3. 🧘 UX & Aesthetics
Explicitly state how this PR affects the "Japandi Zen" feel. Mention typography, whitespace, and sensory load.

### 4. 🏥 Safety & Compliance
Identify any impacts on the "Medical First" philosophy. Ensure disclaimers are intact and recipes are validated.

### 5. 🚀 CI/CD & Deployment
List any changes to workflows, environment variables, or build processes.

### 6. 🧪 Verification Plan
Provide the exact steps (terminal commands, UI walkthroughs) to verify the changes.

## AI Agent Requirement
Before suggesting a PR, the agent MUST verify that all checklists in `system_state_checklist.md` (if they exist) are updated and that the PR title follows the [Gitmoji Commit Policy](file:///Volumes/home/Code/Workspace/yogi-ninja/skills/skill-06-commit-policy.md).
