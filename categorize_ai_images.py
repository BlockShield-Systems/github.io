#!/usr/bin/env python3
"""
AI Gallery Image Categorizer and Title Generator
Analyzes AI-generated images and creates a structured catalog
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
import os

# Category definitions with keywords for classification
CATEGORIES = {
    'world-environments': {
        'keywords': ['landscape', 'environment', 'world', 'terrain', 'nature', 'mountain', 'forest', 
                    'desert', 'ocean', 'sky', 'clouds', 'planet', 'vista', 'panorama', 'scenery',
                    'wilderness', 'canyon', 'valley', 'river', 'lake', 'waterfall', 'island'],
        'title_prefix': ['Mystical', 'Ethereal', 'Majestic', 'Serene', 'Dramatic', 'Enchanted']
    },
    'fantasy-settings': {
        'keywords': ['fantasy', 'magic', 'wizard', 'dragon', 'elf', 'fairy', 'enchanted', 'mystical',
                    'spell', 'castle', 'kingdom', 'realm', 'mythical', 'legendary', 'sorcerer',
                    'unicorn', 'phoenix', 'crystal', 'magical', 'potion', 'quest', 'dungeon'],
        'title_prefix': ['Enchanted', 'Magical', 'Mystical', 'Legendary', 'Arcane', 'Ethereal']
    },
    'scifi-settings': {
        'keywords': ['sci-fi', 'scifi', 'space', 'futuristic', 'cyberpunk', 'robot', 'android',
                    'spaceship', 'alien', 'galaxy', 'tech', 'neon', 'cyber', 'digital', 'virtual',
                    'hologram', 'laser', 'plasma', 'quantum', 'mech', 'starship', 'dystopian'],
        'title_prefix': ['Futuristic', 'Cybernetic', 'Neon', 'Digital', 'Quantum', 'Galactic']
    },
    'characters-models': {
        'keywords': ['character', 'portrait', 'person', 'model', 'face', 'warrior', 'hero',
                    'woman', 'man', 'girl', 'boy', 'knight', 'soldier', 'fighter', 'human',
                    'avatar', 'figure', 'pose', 'costume', 'armor', 'outfit', 'fashion'],
        'title_prefix': ['Fierce', 'Noble', 'Mysterious', 'Elegant', 'Powerful', 'Graceful']
    },
    'horror-settings': {
        'keywords': ['horror', 'dark', 'scary', 'creepy', 'monster', 'demon', 'ghost', 'zombie',
                    'undead', 'nightmare', 'terror', 'fear', 'haunted', 'evil', 'sinister',
                    'macabre', 'gothic', 'doom', 'death', 'shadow', 'blood', 'skull'],
        'title_prefix': ['Sinister', 'Haunting', 'Nightmarish', 'Terrifying', 'Macabre', 'Gothic']
    },
    'nsfw-horror': {
        'keywords': ['extreme', 'grotesque', 'gore', 'disturbing', 'graphic', 'violent',
                    'mutation', 'torture', 'brutal', 'visceral', 'shock', 'intense'],
        'title_prefix': ['Extreme', 'Grotesque', 'Visceral', 'Disturbing', 'Intense', 'Graphic']
    },
    'nsfw-erotic': {
        'keywords': ['sensual', 'erotic', 'intimate', 'nude', 'artistic nude', 'beauty',
                    'passion', 'desire', 'seductive', 'romantic', 'soft', 'curves'],
        'title_prefix': ['Sensual', 'Intimate', 'Artistic', 'Elegant', 'Passionate', 'Graceful']
    }
}

def analyze_filename(filename: str) -> Tuple[str, List[str]]:
    """
    Analyze filename to extract potential keywords and generate base title
    """
    # Clean filename
    name = Path(filename).stem
    # Replace underscores and hyphens with spaces
    name = name.replace('_', ' ').replace('-', ' ')
    # Extract potential words
    words = name.lower().split()
    
    # Remove common file indicators
    filtered_words = []
    skip_words = ['img', 'image', 'pic', 'photo', 'file', 'copy', 'final', 'v1', 'v2', 'new']
    for word in words:
        if word not in skip_words and not word.isdigit():
            filtered_words.append(word)
    
    return name, filtered_words

def categorize_image(filename: str, keywords: List[str]) -> str:
    """
    Categorize image based on filename and keywords
    """
    filename_lower = filename.lower()
    all_text = ' '.join(keywords).lower()
    
    # Score each category
    category_scores = {}
    
    for category, config in CATEGORIES.items():
        score = 0
        for keyword in config['keywords']:
            if keyword in filename_lower:
                score += 2  # Higher weight for filename matches
            if keyword in all_text:
                score += 1
        category_scores[category] = score
    
    # Special rules based on filename patterns
    if any(x in filename_lower for x in ['nsfw', '18+', 'adult', 'mature']):
        if any(x in filename_lower for x in ['horror', 'gore', 'dark']):
            return 'nsfw-horror'
        else:
            return 'nsfw-erotic'
    
    # Return category with highest score, default to world-environments
    if max(category_scores.values()) > 0:
        return max(category_scores, key=category_scores.get)
    
    # Default categorization based on common patterns
    if any(x in filename_lower for x in ['portrait', 'face', 'person', 'model']):
        return 'characters-models'
    elif any(x in filename_lower for x in ['landscape', 'scene', 'view']):
        return 'world-environments'
    
    return 'world-environments'  # Default category

def generate_title(filename: str, category: str, index: int) -> str:
    """
    Generate an appropriate English title for the image
    """
    base_name, words = analyze_filename(filename)
    
    # Get category-specific prefix
    prefixes = CATEGORIES[category]['title_prefix']
    prefix = prefixes[index % len(prefixes)]
    
    # Generate contextual suffix based on category
    if category == 'world-environments':
        suffixes = ['Landscape', 'Vista', 'Realm', 'Paradise', 'Wilderness', 'Haven']
    elif category == 'fantasy-settings':
        suffixes = ['Kingdom', 'Realm', 'Sanctuary', 'Domain', 'World', 'Land']
    elif category == 'scifi-settings':
        suffixes = ['Station', 'Colony', 'Nexus', 'Sector', 'Complex', 'City']
    elif category == 'characters-models':
        suffixes = ['Warrior', 'Guardian', 'Champion', 'Wanderer', 'Sentinel', 'Hero']
    elif category == 'horror-settings':
        suffixes = ['Nightmare', 'Abyss', 'Domain', 'Realm', 'Void', 'Sanctum']
    elif category == 'nsfw-horror':
        suffixes = ['Vision', 'Scene', 'Revelation', 'Manifestation', 'Entity', 'Form']
    else:  # nsfw-erotic
        suffixes = ['Expression', 'Study', 'Portrait', 'Form', 'Composition', 'Artwork']
    
    suffix = suffixes[index % len(suffixes)]
    
    # Try to extract meaningful words from filename
    if words and len(words) > 0:
        # Capitalize first letter of each word
        meaningful = ' '.join([w.capitalize() for w in words[:2]])
        if len(meaningful) > 3:
            return f"{prefix} {meaningful}"
    
    return f"{prefix} {suffix}"

def generate_description(category: str, title: str, index: int) -> str:
    """
    Generate a description for the image based on its category
    """
    descriptions = {
        'world-environments': [
            "A breathtaking landscape showcasing the beauty of AI-generated worlds",
            "An immersive environment created through advanced AI techniques",
            "A stunning vista demonstrating the power of artificial intelligence",
            "A serene natural scene born from digital imagination",
            "An otherworldly landscape pushing the boundaries of AI art"
        ],
        'fantasy-settings': [
            "A magical realm where imagination meets artificial intelligence",
            "An enchanted scene from a world beyond reality",
            "A mystical environment crafted by AI algorithms",
            "A fantastical creation blending magic and technology",
            "An ethereal landscape from an AI-imagined fantasy world"
        ],
        'scifi-settings': [
            "A futuristic vision of tomorrow created by AI",
            "A cyberpunk dreamscape generated through neural networks",
            "A glimpse into a possible future through AI's lens",
            "A technological marvel born from artificial intelligence",
            "A sci-fi environment pushing the limits of imagination"
        ],
        'characters-models': [
            "A detailed character portrait showcasing AI's artistic capabilities",
            "An AI-generated figure with intricate details and personality",
            "A digital being brought to life through artificial intelligence",
            "A character study demonstrating AI's understanding of form",
            "A unique persona created entirely by AI algorithms"
        ],
        'horror-settings': [
            "A chilling scene designed to evoke atmospheric dread",
            "A dark creation exploring the shadowy side of AI art",
            "An unsettling environment born from digital nightmares",
            "A horror-inspired scene showcasing AI's versatility",
            "A gothic atmosphere created through artificial intelligence"
        ],
        'nsfw-horror': [
            "An intense and visceral creation for mature audiences",
            "An extreme artistic exploration of dark themes",
            "A powerful and disturbing vision for horror enthusiasts",
            "A grotesque masterpiece pushing artistic boundaries",
            "An uncompromising work of dark digital art"
        ],
        'nsfw-erotic': [
            "An artistic exploration of form and beauty",
            "A sensual composition celebrating human aesthetics",
            "An intimate artistic study for mature audiences",
            "A sophisticated exploration of artistic expression",
            "An elegant portrayal of beauty and form"
        ]
    }
    
    desc_list = descriptions.get(category, descriptions['world-environments'])
    return desc_list[index % len(desc_list)]

def process_image_list(image_files: List[str]) -> Dict:
    """
    Process a list of image files and generate metadata
    """
    catalog = {
        'total_images': 0,
        'categories': {},
        'images': []
    }
    
    # Initialize category counters
    for category in CATEGORIES.keys():
        catalog['categories'][category] = []
    
    # Process each image
    for idx, image_file in enumerate(image_files):
        # Analyze and categorize
        _, keywords = analyze_filename(image_file)
        category = categorize_image(image_file, keywords)
        
        # Generate metadata
        title = generate_title(image_file, category, idx)
        description = generate_description(category, title, idx)
        
        # Create image entry
        image_entry = {
            'original_filename': image_file,
            'src': f'/Meine Dateien/Website AI-Generated Images/{image_file}',
            'title': title,
            'description': description,
            'category': category,
            'index': idx
        }
        
        # Add to catalog
        catalog['images'].append(image_entry)
        catalog['categories'][category].append(image_entry)
    
    catalog['total_images'] = len(image_files)
    
    # Generate summary
    print("\n" + "="*60)
    print("AI GALLERY IMAGE CATEGORIZATION COMPLETE")
    print("="*60)
    print(f"\nTotal Images Processed: {catalog['total_images']}")
    print("\nCategory Distribution:")
    print("-"*40)
    
    for category, images in catalog['categories'].items():
        count = len(images)
        percentage = (count / catalog['total_images'] * 100) if catalog['total_images'] > 0 else 0
        category_name = category.replace('-', ' ').title()
        print(f"{category_name:30} {count:4} images ({percentage:5.1f}%)")
    
    return catalog

def save_catalog(catalog: Dict, output_file: str = 'image_catalog.json'):
    """
    Save the catalog to a JSON file
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
    print(f"\nCatalog saved to: {output_file}")

def generate_gallery_config(catalog: Dict, output_file: str = 'gallery_config.js'):
    """
    Generate JavaScript configuration file for the gallery
    """
    js_content = """/**
 * Auto-generated Gallery Configuration
 * Generated from AI Drive images
 */

const AI_GALLERY_IMAGES = {
"""
    
    for category, images in catalog['categories'].items():
        js_content += f"  '{category}': [\n"
        for img in images[:50]:  # Limit to first 50 per category for performance
            js_content += f"""    {{
      src: '{img['src']}',
      title: '{img['title']}',
      description: '{img['description']}'
    }},\n"""
        js_content += "  ],\n"
    
    js_content += "};\n"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Gallery configuration saved to: {output_file}")

# Sample image list based on the screenshot
# In production, this would be populated from the actual AI Drive
SAMPLE_IMAGES = [
    "abstract_pattern_001.jpg",
    "alien_landscape_42.jpg",
    "character_portrait_warrior.jpg",
    "cyberpunk_city_neon.jpg",
    "dark_forest_horror.jpg",
    "dragon_fantasy_scene.jpg",
    "ethereal_beauty_model.jpg",
    "futuristic_space_station.jpg",
    "gothic_castle_night.jpg",
    "haunted_mansion_001.jpg",
    "magical_crystal_cave.jpg",
    "mystical_forest_glow.jpg",
    "neon_streets_rain.jpg",
    "portrait_elegant_woman.jpg",
    "robot_android_future.jpg",
    "scary_monster_dark.jpg",
    "serene_mountain_lake.jpg",
    "space_nebula_colors.jpg",
    "warrior_armor_fantasy.jpg",
    "zombie_apocalypse_scene.jpg"
]

if __name__ == "__main__":
    print("Starting AI Gallery Image Categorization...")
    print("This script will analyze and categorize your AI-generated images.")
    
    # Process images
    catalog = process_image_list(SAMPLE_IMAGES)
    
    # Save outputs
    save_catalog(catalog, '/home/user/webapp/image_catalog.json')
    generate_gallery_config(catalog, '/home/user/webapp/assets/js/gallery_images_generated.js')
    
    print("\n" + "="*60)
    print("Processing complete!")
    print("Next steps:")
    print("1. Review the generated catalog in 'image_catalog.json'")
    print("2. Update the gallery configuration with 'gallery_images_generated.js'")
    print("3. Upload your actual images to the appropriate hosting service")
    print("="*60)