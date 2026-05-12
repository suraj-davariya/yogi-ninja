import json
import os
import re
from recipe_scrapers import scrape_me

# Configuration
PROHIBITED = [
    "raw egg", "alcohol", "wine", "rum", "beer", "vodka", "bourbon", "whiskey",
    "artificial color", "artificial flavor", "preservative", "food coloring", "dye",
    "unpasteurized"
]

APPROVED_BASES = ["Oat milk", "Almond milk", "Coconut milk", "Pasteurized milk", "Yogurt", "Banana"]

# Path to the recipes data file
RECIPES_PATH = os.path.join(os.getcwd(), "web/src/data/recipes.json")

def is_safe(ingredients):
    """Checks if a recipe is safe based on the prohibited list."""
    text = " ".join(ingredients).lower()
    for term in PROHIBITED:
        if term in text:
            return False, term
    return True, None

def determine_base(ingredients):
    """Best effort to determine the base from ingredients."""
    text = " ".join(ingredients).lower()
    if "oat milk" in text:
        return "Oat milk"
    if "coconut milk" in text:
        return "Coconut milk"
    if "almond milk" in text:
        return "Almond milk"
    if "yogurt" in text:
        return "Yogurt"
    if "banana" in text:
        return "Banana"
    if "milk" in text:
        return "Pasteurized milk"
    return "Custom Base"

def map_to_schema(scraped_data, url):
    """Maps recipe-scrapers output to the Yogi Ninja Recipe schema."""
    ingredients = scraped_data.ingredients()
    
    safe, offending_term = is_safe(ingredients)
    if not safe:
        print(f"Skipping {url}: contains prohibited ingredient '{offending_term}'")
        return None

    # Determine tags
    tags = ["Scraped"]
    text = " ".join(ingredients).lower()
    if any(f in text for f in ["strawberry", "mango", "peach", "berry", "fruit"]):
        tags.append("Fruity")
    if "mint" in text:
        tags.append("Minty")
    if any(m in text for m in ["milk", "cream", "yogurt"]):
        tags.append("Creamy")
    
    nausea_friendly = any(term in text for term in ["oat milk", "banana", "ginger", "mild"])
    dairy_free = not any(term in text for term in ["milk", "cream", "yogurt", "butter"]) or "oat" in text or "coconut" in text
    
    if nausea_friendly:
        tags.append("Nausea-safe")
    if dairy_free:
        tags.append("Dairy-free")

    # Clean up name
    name = scraped_data.title()
    recipe_id = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

    # Format ingredients for our schema
    formatted_ingredients = []
    for ing in ingredients:
        # Simple split logic for amount vs item (can be refined)
        parts = ing.split(' ', 1)
        if len(parts) > 1:
            formatted_ingredients.append({"item": parts[1], "amount": parts[0]})
        else:
            formatted_ingredients.append({"item": ing, "amount": "to taste"})

    return {
        "id": recipe_id,
        "name": name,
        "emoji": "🍦", # Default emoji
        "base": determine_base(ingredients),
        "tags": tags,
        "nauseaFriendly": nausea_friendly,
        "dairyFree": dairy_free,
        "pintVolume": "16 oz (full pint)",
        "freezeTime": "24 hours",
        "spinSetting": "Lite Ice Cream", # Default setting
        "ingredients": formatted_ingredients,
        "instructions": scraped_data.instructions_list(),
        "respinFix": [
            {"problem": "Crumbly or powdery", "fix": "Add 1-2 tbsp of liquid (milk or water) and Respin once."},
            {"problem": "Icy or too firm", "fix": "Ensure freezer was level. Use 'Ice Cream' setting or Respin if still firm."}
        ]
    }

def main():
    # Example URLs to scrape (Replace with real discovery logic later)
    urls = [
        "https://www.allrecipes.com/recipe/233148/homemade-strawberry-ice-cream/",
        "https://www.foodnetwork.com/recipes/food-network-kitchen/vegan-mango-ice-cream-recipe-2105151"
    ]
    
    new_recipes = []
    for url in urls:
        try:
            scraper = scrape_me(url)
            recipe = map_to_schema(scraper, url)
            if recipe:
                new_recipes.append(recipe)
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    if not new_recipes:
        print("No new safe recipes found.")
        return

    # Load existing recipes
    try:
        with open(RECIPES_PATH, 'r') as f:
            existing_recipes = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_recipes = []

    # Filter out duplicates by ID
    existing_ids = {r['id'] for r in existing_recipes}
    added_count = 0
    for r in new_recipes:
        if r['id'] not in existing_ids:
            existing_recipes.append(r)
            added_count += 1

    # Save back to file
    with open(RECIPES_PATH, 'w') as f:
        json.dump(existing_recipes, f, indent=2)

    print(f"Successfully added {added_count} new recipes to {RECIPES_PATH}")

if __name__ == "__main__":
    main()
