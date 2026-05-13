import json
import os
import re
from pathlib import Path

# --- Configuration & Safety ---
PROHIBITED = [
    "raw egg", "alcohol", "wine", "rum", "beer", "vodka", "bourbon", "whiskey", "brandy",
    "artificial color", "artificial flavor", "preservative", "food coloring", "dye",
    "erythritol", "xylitol", "stevia", "sucralose", "allulose", "sweex",
    "glycerin", "e422", "cmc", "e466", "gms", "e471", "xanthan", "guar", "inulin", "starch", "waxy maize",
    "salty stability", "stability", "protein"
]

APPROVED_SWEETENERS = ["Artisan Honey", "Pure Maple Syrup"]

# --- Transformation Logic ---

def clean_text(text):
    """Strips markdown links, HTML, brand names, and enforces 'No Hyphens' rule."""
    if not text: return ""
    
    # 1. Strip markdown links with potential nested brackets: [text [brand]](link) -> text [brand]
    text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
    
    # 2. Strip brand names in square brackets and backslashes
    text = re.sub(r'\\\[[^\]]+\]', '', text) # Handle \[Brand\]
    text = re.sub(r'\[[^\]]+\]', '', text)   # Handle [Brand]
    text = text.replace('\\', '')            # Remove any remaining backslashes
    
    # 3. Strip HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # 4. Strip specific suffix patterns like {target="_blank"} or Unicode icons
    text = re.sub(r'\{[^\}]+\}', '', text)
    text = re.sub(r'[↗ℹ️😋🍌🍦🐮🍑🍨🍵🥥❓➕\u2248\u2139\ufe0f\u2197\u2754\u2755]', '', text)
    
    # 5. Clean up extra punctuation left over from stripped text
    text = re.sub(r'\(\s*\)', '', text)  # empty parens
    text = re.sub(r'\(\s+', '(', text)   # leading space in parens
    text = re.sub(r'\s+\)', ')', text)   # trailing space in parens
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Enforce 'No Hyphens' rule in sentences (replace with commas/periods)
    text = re.sub(r' \- ', ', ', text)
    text = re.sub(r' — ', ', ', text)
    
    return text

def convert_measurement(amount, item_lower):
    """Converts grams/ml to descriptive volume (cups, tbsp, tsp)."""
    if not amount: return amount
    
    match = re.search(r'(\d+(?:\.\d+)?)', amount)
    if not match: return amount
    
    val = float(match.group(1))
    
    # Heuristic conversions
    if "ml" in amount:
        if val >= 200: return f"{round(val/240, 2)} cups"
        if val >= 15: return f"{round(val/15, 1)} tbsp"
        return f"{round(val/5, 1)} tsp"
    
    if "g" in amount:
        if "banana" in item_lower: return f"{round(val/120, 1)} medium"
        if "milk" in item_lower or "yogurt" in item_lower: return f"{round(val/245, 1)} cups"
        if "fruit" in item_lower or "strawberry" in item_lower or "mango" in item_lower: return f"{round(val/150, 1)} cups"
        if val >= 100: return f"{round(val/200, 1)} cups"
        if val >= 10: return f"{round(val/15, 1)} tbsp"
        return f"{round(val/5, 1)} tsp"
        
    return amount

def synthesize_ingredients(raw_ingredients):
    """Sanitizes ingredients for safety and brand compliance."""
    safe_ingredients = []
    has_sweetener = False
    
    for ing in raw_ingredients:
        raw_item = ing["item"]
        item_clean = clean_text(raw_item)
        item_lower = item_clean.lower()
        
        # Skip alcohol and industrial stabilizers
        if any(term in item_lower for term in PROHIBITED):
            continue
            
        # Skip protein powders and flavor drops
        if any(term in item_lower for term in ["protein", "flavor drops", "designer flavor"]):
            continue
            
        # Replace prohibited sweeteners with Artisan Honey if needed
        # (Though usually we want to skip them and add honey once)
        if any(term in item_lower for term in ["sweex", "erythritol", "xylitol"]):
            if not has_sweetener:
                safe_ingredients.append({"item": "Artisan Honey", "amount": "2 tbsp"})
                has_sweetener = True
            continue
            
        amount_converted = convert_measurement(ing["amount"], item_lower)
        
        # Skip empty items (e.g. just a link that got stripped)
        if not item_clean: continue
            
        safe_ingredients.append({"item": item_clean, "amount": amount_converted})
    
    # Ensure at least one approved sweetener
    if not has_sweetener:
        safe_ingredients.append({"item": "Pure Maple Syrup", "amount": "1 tbsp"})
        
    return safe_ingredients

def generate_instructions(recipe_name, item_list):
    """Generates recipe-specific instructions in brand voice."""
    base_instructions = [
        f"Gently combine your {item_list[0].lower()} and other base elements in a high-speed blender.",
        "Pulse until the mixture achieves a silken, unified consistency.",
        "Pour the resulting alchemy into your Ninja Creami pint, ensuring you stay below the maximum threshold.",
        "Secure the vessel and cold-condition in the sub-zero chamber for exactly 24 hours.",
        "Once frozen, process on the appropriate setting to unveil the artisan texture.",
        "If further refinement is desired, a single Respin cycle will perfect the silkiness."
    ]
    return base_instructions

def map_to_ninja_schema(raw_recipe):
    """Final mapping to the canonical Recipe schema with improved logic."""
    
    clean_name = raw_recipe["name"].replace(" (Deluxe)", "")
    
    # Branding transform
    brand_names = {
        "Banana Ice Cream": "Velvet Banana Silk",
        "Mango Kulfi": "Golden Mango Alchemy",
        "Strawberry Ice Cream": "Artisan Strawberry Glow",
        "Coconut FroYo": "Zen Coconut Frost",
        "Peaches & Cream": "Golden Peach Dream",
        "Just Fruit": "Summer Fruit Glow",
        "Matcha Coconut": "Zen Matcha Mist",
        "Blueberry Buttermilk": "Blueberry Tang Shimmer"
    }
    final_name = brand_names.get(clean_name, f"Artisan {clean_name}")
    
    safe_ingredients = synthesize_ingredients(raw_recipe["ingredients"])
    
    # Determine flags correctly
    dairy_terms = ["whole milk", "2% milk", "skim milk", "cheese", "cream", "greek yogurt", "buttermilk", "butter", "whey", "casein"]
    is_dairy_free = not any(term in str(safe_ingredients).lower() for term in dairy_terms)
        
    is_nausea_friendly = any(term in final_name.lower() or term in str(safe_ingredients).lower() for term in ["banana", "oat", "mild", "ginger", "pear"])

    return {
        "id": re.sub(r'[^a-z0-9]+', '-', final_name.lower()).strip('-'),
        "name": final_name,
        "emoji": "🌿" if "Coconut" in final_name else "🍓" if "Strawberry" in final_name else "🍌" if "Banana" in final_name else "🍦",
        "base": raw_recipe["base"],
        "tags": ["Artisan", "Safety-Filtered"] + (["Nausea-safe"] if is_nausea_friendly else []),
        "nauseaFriendly": is_nausea_friendly,
        "dairyFree": is_dairy_free,
        "pintVolume": "16 oz (full pint)",
        "freezeTime": "24 hours",
        "spinSetting": "Lite Ice Cream",
        "ingredients": safe_ingredients,
        "instructions": generate_instructions(final_name, [ing["item"] for ing in safe_ingredients[:2]]),
        "respinFix": [
            {"problem": "Crystalline or dry", "fix": "Add 1 tbsp of plant milk and execute a Respin protocol."},
            {"problem": "Too firm", "fix": "Allow the pint to sit at room temperature for 3 minutes before the final spin."}
        ]
    }

def parse_markdown_recipe(file_path):
    """Improved markdown parser for the artisan baseline format."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    if not title_match: return None
    name = title_match.group(1).strip()

    # Look for the INGREDIENTS section
    ing_section = re.search(r'# INGREDIENTS(.+?)(?=# DIRECTIONS|# NUTRITIONAL|# INFO|$)', content, re.DOTALL)
    ingredients = []
    if ing_section:
        # Match lines like "- _225g_ Bananas" or "- _100ml_ Water"
        lines = ing_section.group(1).strip().split('\n')
        for line in lines:
            line = line.strip()
            # Handle the specific markdown format in the source library
            match = re.search(r'[*-] _([^%_]+)_ ([^•\n]+)', line)
            if match:
                ingredients.append({"amount": match.group(1).strip(), "item": match.group(2).strip()})

    return {
        "name": name,
        "base": "Plant milk" if "vegan" in content.lower() or "soy" in content.lower() or "oat" in content.lower() else "Pasteurized milk",
        "ingredients": ingredients
    }

def main():
    base_path = Path("external/artisan-baseline/recipes")
    output_path = Path("web/src/data/recipes.json")
    
    # Targeted flavor profiles for Phase 4b
    targets = [
        "Banana Ice Cream (Deluxe)",
        "Mango Kulfi (Deluxe)",
        "Strawberry Ice Cream (Deluxe)",
        "Coconut FroYo (Deluxe)",
        "Peaches & Cream (Deluxe)",
        "Just Fruit (Deluxe)",
        "Matcha Coconut (Deluxe)",
        "Blueberry Buttermilk (Deluxe)",
        "Apple Strudel (Deluxe)",
        "Creamy Watermelon (Deluxe)"
    ]
    
    new_recipes = []
    for target in targets:
        readme = base_path / target / "README.md"
        if readme.exists():
            raw = parse_markdown_recipe(readme)
            if raw and raw["ingredients"]:
                ninja_recipe = map_to_ninja_schema(raw)
                new_recipes.append(ninja_recipe)
                print(f"Synthesized: {ninja_recipe['name']}")
        else:
            print(f"Skipping {target}: README not found")

    # Read existing recipes (should be 12 now)
    try:
        with open(output_path, 'r') as f:
            all_recipes = json.load(f)
    except:
        all_recipes = []

    # Ensure no duplicates and append
    existing_ids = {r['id'] for r in all_recipes}
    added_count = 0
    for r in new_recipes:
        if r['id'] not in existing_ids:
            all_recipes.append(r)
            added_count += 1

    with open(output_path, 'w') as f:
        json.dump(all_recipes, f, indent=2)
    
    print(f"Synthesis complete. Added {added_count} new high-quality recipes.")

if __name__ == "__main__":
    main()
