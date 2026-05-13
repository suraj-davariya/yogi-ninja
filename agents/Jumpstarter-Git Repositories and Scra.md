# Jumpstarter: Git Repositories and Scraping Details

## Foundational Data Sources
To immediately bootstrap the application with high quality recipes, the AI will utilize two primary GitHub repositories. These provide both the raw data and the tools necessary for extraction.

### 1. The Recipe Data Source: artisan-baseline
**Repository URL:** https://github.com/artisan-baseline
This repository contains a vast collection of tested and approved Ninja Creami recipes [web:1][web:2]. 
- **What to Scrape:** The repository includes detailed markdown files and CSV exports containing precise ingredients, nutritional facts, and step sequences [web:1].
- **AI Processing Task:** The AI must scrape these recipes and pass them through the safety filter. For example, it must identify and reject recipes containing alcohol [web:3]. It must then reformat the safe recipes to prioritize simple ingredients like oats, bananas, and mild fruits.

### 2. The Scraping Engine: hhursev/recipe-scrapers
**Repository URL:** https://github.com/hhursev/recipe-scrapers
This is a comprehensive Python package designed specifically for extracting recipe data from cooking websites [web:10].
- **How to Use:** The AI Developer agent will integrate this package to pull recipe information from standard HTML structures and Schema markups (including JSON-LD and Microdata) [web:10]. 
- **AI Processing Task:** The AI will use this tool to systematically scrape new recipes from the web. It will extract ingredients, instructions, and preparation times [web:10]. The data will then be fed into the batch processor for pregnancy safety validation and exact pint scaling.

## Integration Strategy
The AI will initialize a daily cron job using the `recipe-scrapers` package to discover new formulations. It will cross reference the discovered data with the baseline standards found in the `artisan-baseline` repository. After filtering out unsafe ingredients, it will automatically update the web application database and render the new UI components.