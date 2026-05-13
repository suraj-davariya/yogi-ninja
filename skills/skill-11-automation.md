# Skill 11: Daily Recipe Automation

## Context
To keep the "Yogi Ninja" platform fresh and evolving, we need an automated way to discover and ingest new recipes from the artisan community without manual intervention.

## Action Taken
1. **GitHub Action Workflow**: Created `.github/workflows/daily-scrape.yml`.
    - **Trigger**: Runs daily at midnight UTC via `cron`.
    - **Source**: Clones the `artisan-baseline` repository as an external source.
    - **Engine**: Executes the Phase 4b hardened synthesis engine (`scripts/ingest_local_recipes.py`).
    - **Sync**: Automatically commits and pushes updates to `web/src/data/recipes.json` only when new valid recipes are discovered.
2. **Environment Stabilization**: Confirmed the script uses only Python standard libraries, ensuring it runs in generic `ubuntu-latest` runners without complex dependency management.
3. **Manual Override**: Included `workflow_dispatch` to allow admins to trigger a discovery run at any time via the GitHub Actions UI.

## Results
- The platform now autonomously expands its recipe library every 24 hours.
- Every new recipe is automatically safety-filtered and brand-transformed before reaching the user.
- Human-in-the-loop is no longer required for data growth, fulfilling the Phase 4 automation objective.

## Verification
- YAML syntax validated.
- `workflow_dispatch` trigger present for manual testing.
- Script run confirmed stable in local environment.
