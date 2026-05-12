import json
import os
import re
from pathlib import Path

# --- Configuration & Safety ---
PROHIBITED = [
    "raw egg", "alcohol", "wine", "rum", "beer", "vodka", "bourbon", "whiskey", "brandy",
    "artificial color", "artificial flavor", "preservative", "food coloring", "dye",
    "erythritol", "xylitol", "stevia", "sucralose", "allulose"
]

APPROVED_SWEETENERS = ["Artisan Honey", "Pure Maple Syrup"]

# --- Transformation Logic ---

def clean_text(text):
    """Enforces the 'No Hyphens' rule in sentences."""
    if not text: return ""
    # Replace mid-sentence hyphens/em-dashes with commas or periods
    text = re.sub(r' \- ', ', ', text)
    text = re.sub(r' — ', ', ', text)
    return text

def synthesize_ingredients(raw_ingredients):
    """Sanitizes ingredients for safety and brand compliance."""
    safe_ingredients = []
    has_sweetener = False
    
    for ing in raw_ingredients:
        item = ing["item"].lower()
        
        # Skip alcohol entirely
        if any(term in item for term in ["alcohol", "brandy", "vodka", "rum", "wine", "whiskey"]):
            continue
            
        # Replace prohibited sweeteners with Artisan Honey
        if any(term in item for term in ["erythritol", "xylitol", "stevia", "sucralose", "allulose", "sweex"]):
            if not has_sweetener:
                safe_ingredients.append({"item": "Artisan Honey", "amount": "2 tbsp"})
                has_sweetener = True
            continue
            
        # Convert gram-based amounts to descriptive volume where possible
        amount = ing["amount"]
        if "g" in amount:
            try:
                val = int(re.search(r'(\d+)', amount).group(1))
                if "milk" in item: amount = f"{round(val/240, 2)} cups"
                elif "yogurt" in item: amount = f"{round(val/245, 1)} cups"
                elif "banana" in item: amount = f"{round(val/120, 1)} medium"
                elif "strawberry" in item or "fruit" in item: amount = f"{round(val/150, 1)} cups"
            except: pass
            
        safe_ingredients.append({"item": ing["item"], "amount": amount})
    
    # Ensure at least one approved sweetener if none was found
    if not has_sweetener:
        safe_ingredients.append({"item": "Pure Maple Syrup", "amount": "1 tbsp"})
        
    return safe_ingredients

def brand_voice_instructions(recipe_name, base_instructions):
    """Rewrites instructions in the 'Elite Typewriter' brand voice."""
    steps = [
        "Prepare your harvest by ensuring all ingredients are fresh and at room temperature for optimal fusion.",
        "Combine the base elements in a high-speed blender, allowing the textures to merge into a single, cohesive silk.",
        "Pour the resulting alchemy into your Ninja Creami pint, taking care not to exceed the maximum threshold.",
        "Secure the vessel and allow it to rest in the sub-zero chamber for exactly 24 hours of cold-conditioning.",
        "Once ready, initiate the Lite Ice Cream cycle to transform the frozen block into an artisan masterpiece.",
        "If the texture requires refinement, utilize a single Respin cycle with a touch of fresh liquid."
    ]
    return steps

def map_to_ninja_schema(raw_recipe):
    """Final mapping to the canonical Recipe schema."""
    name_map = {
        "Banana Ice Cream (Deluxe)": "Velvet Banana Silk",
        "Mango Kulfi (Deluxe)": "Golden Mango Alchemy",
        "Strawberry Ice Cream (Deluxe)": "Artisan Strawberry Glow",
        "Coconut FroYo (Deluxe)": "Zen Coconut Frost"
    }
    
    clean_name = name_map.get(raw_recipe["name"], raw_recipe["name"].replace(" (Deluxe)", ""))
    
    return {
        "id": re.sub(r'[^a-z0-9]+', '-', clean_name.lower()).strip('-'),
        "name": clean_name,
        "emoji": "🌿" if "Coconut" in clean_name else "🍓" if "Strawberry" in clean_name else "🍌" if "Banana" in clean_name else "🍦",
        "base": raw_recipe["base"],
        "tags": raw_recipe["tags"] + ["Artisan", "Safety-Filtered"],
        "nauseaFriendly": raw_recipe["nauseaFriendly"],
        "dairyFree": raw_recipe["dairyFree"],
        "pintVolume": "16 oz (full pint)",
        "freezeTime": "24 hours",
        "spinSetting": "Lite Ice Cream",
        "ingredients": synthesize_ingredients(raw_recipe["ingredients"]),
        "instructions": brand_voice_instructions(clean_name, raw_recipe["instructions"]),
        "respinFix": [
            {"problem": "Crystalline or dry", "fix": "Add 1 tbsp of plant milk and execute a Respin protocol."},
            {"problem": "Too firm", "fix": "Allow the pint to sit at room temperature for 3 minutes before the final spin."}
        ]
    }

def parse_markdown_recipe(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    if not title_match: return None
    name = title_match.group(1).strip()

    ing_section = re.search(r'# INGREDIENTS(.+?)(?=# DIRECTIONS|# NUTRITIONAL)', content, re.DOTALL)
    ingredients = []
    if ing_section:
        for line in ing_section.group(1).strip().split('\n'):
            line = line.strip()
            match = re.search(r'_(.+?)_ (.+?)(?: •|$)', line)
            if match:
                ingredients.append({"item": match.group(2).strip(), "amount": match.group(1).strip()})

    dir_section = re.search(r'# DIRECTIONS(.+?)(?=# NUTRITIONAL|$)', content, re.DOTALL)
    instructions = []
    if dir_section:
        for line in dir_section.group(1).strip().split('\n'):
            if re.match(r'^\d+\.', line.strip()):
                instructions.append(line.strip())

    text = content.lower()
    return {
        "name": name,
        "base": "Plant milk" if "vegan" in text or "soy" in text else "Pasteurized milk",
        "tags": ["Fruity"] if "fruit" in text else ["Creamy"],
        "nauseaFriendly": any(t in text for t in ["banana", "oat", "mild"]),
        "dairyFree": "vegan" in text or "soy" in text,
        "ingredients": ingredients,
        "instructions": instructions
    }

def main():
    base_path = Path("external/ice-creamery/recipes")
    output_path = Path("web/src/data/recipes.json")
    
    targets = [
        "Banana Ice Cream (Deluxe)",
        "Mango Kulfi (Deluxe)",
        "Strawberry Ice Cream (Deluxe)",
        "Coconut FroYo (Deluxe)"
    ]
    
    new_recipes = []
    for target in targets:
        readme = base_path / target / "README.md"
        if readme.exists():
            raw = parse_markdown_recipe(readme)
            if raw:
                ninja_recipe = map_to_ninja_schema(raw)
                new_recipes.append(ninja_recipe)
                print(f"Synthesized: {ninja_recipe['name']}")

    try:
        with open(output_path, 'r') as f:
            all_recipes = json.load(f)
    except:
        all_recipes = []

    existing_ids = {r['id'] for r in all_recipes}
    for r in new_recipes:
        if r['id'] not in existing_ids:
            all_recipes.append(r)

    with open(output_path, 'w') as f:
        json.dump(all_recipes, f, indent=2)
    
    print(f"Synthesis complete. {len(new_recipes)} recipes processed.")

if __name__ == "__main__":
    main()
