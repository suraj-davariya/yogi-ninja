# Yogi Ninja: Master Project Orchestrator

> ⚡ **NEW AGENT? Read `NEXT_AGENT.md` in the project root FIRST.** It tells you exactly what to do next in plain language. Do not read anything else until you have read that file.

## 1. Project Overview and Foundation
**Goal:** Build an autonomous, elegant, Next.js web application for expecting mothers to safely track and create Ninja Creami Deluxe recipes.
**Target Demographic:** First trimester pregnant woman, due December 1 2026. Prioritizes nausea management, calm flavors, and easy digestion.
* **Read First:** `Project-Understanding-and-Scope.md` (Defines the core rules, safety limits, and design philosophy).

## 2. The AI Operating System
The system is managed by a team of specialized AI agents. They must follow a strict checkpoint architecture to manage token limits and ensure zero context loss. 
* **Who Does the Work:** Read `Agent-Architecture-and-Application-Des.md` (Defines the Executive Orchestrator, Formulation Scientist, UI Designer, and QA Reviewer).
* **What Skills They Need:** Read `AI-Agent-Skill-Matrix.md` (Details required technical capabilities like advanced data engineering and prenatal food safety knowledge).
* **How They Operate Safely:** Read `State-Management-and-Token-Limit-Safeg.md` (Explains the micro batch execution loop and the local checklist file).

## 3. Data Ingestion and Recipe Sourcing
The application must dynamically scrape, filter, and normalize new recipes from the internet while adhering to strict dietary constraints.
* **How It Sources Data:** Read `AI-Autonomous-Execution-Pipeline.md` (Outlines the four phase pipeline: Scraping, Filtration, Generation, and Batch Tracking).
* **Where It Gets Data:** Read `Jumpstarter-Git-Repositories-and-Scra.md` (Provides the GitHub links for the `ice-creamery` baseline data and `recipe-scrapers` tools).

## 4. User Interface and Application Features
The web application must be a functional utility, not just a static database. It requires custom dashboards and interactive trackers.
* **What to Build:** Read `Application-User-Experience-and-Advanc.md` (Details the Daily Nausea Check In, the 24 Hour Virtual Freezer Tracker, and the Texture Rescue Wizard).

## 5. Execution Directives (AI Prompts)
These files contain the exact prompts used to boot up the system within an AI IDE like Cursor or Windsurf. 
* **The Brain of the System:** Read `Master-System-Prompt.md` (The foundational ruleset for the entire AI application lifecycle).
* **The Coding Prompt:** Read `AI-IDE-Execution-Prompt.md` (The explicit instructions to give your coding assistant to begin generating Next.js and React components).

## Workflow Execution Order
When starting a new session, follow this precise sequence:
1. Initialize the Next.js repository using the Node `.gitignore` template.
2. Read the `Master-System-Prompt.md` to set the core safety and operational context.
3. Review `State-Management-and-Token-Limit-Safeg.md` and create `system_state_checklist.md`.
4. Use `AI-IDE-Execution-Prompt.md` to generate the foundational UI components.
5. Launch the scraping agents using `Jumpstarter-Git-Repositories-and-Scra.md`. 
6. Process the scraped data through the Formulation Quality Assurance agent to strip out any raw eggs, alcohol, preservatives, artificial colors, or artificial flavors.

## Medical Disclaimer Protocol
Every feature, recipe card, and AI output must silently enforce this rule: Always remind the user to confirm unusual ingredients with her healthcare provider.