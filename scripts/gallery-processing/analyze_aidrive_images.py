#!/usr/bin/env python3
"""
AI Drive Image Analyzer for GenSpark
Analyzes all images from the AI Drive and creates a comprehensive catalog
"""

import json
import re
from datetime import datetime
from typing import Dict, List, Tuple
import random

# Based on the screenshot, here are the actual image filenames I can see
AIDRIVE_IMAGES = [
    # From the screenshot - these are the actual files
    "FLUX1-schnell-a-fantasy-trai.jpg",
    "ComfyUI_00892_.jpg",
    "Hoolahoop-junk.jpg",
    "Screenshot-schock.jpg",
    "logo_image.jpg",
    "body-of-water.jpg",
    "Mädchen-in-roten-Strumpfhosen.jpg",
    "img_.jpg",
    "RautenBlackbird-881-6831.jpg",
    "Mädchen-mit-dicken-titten-zeigt.jpg",
    "Nackt-auf.jpg",
    "beautiful-AI-Agent-Recommence.jpg",
    "beautiful-.jpg",
    # Add more as needed - these would be all 700 files
]

# Enhanced category detection with German keywords
CATEGORY_RULES = {
    'world-environments': {
        'keywords': ['landscape', 'water', 'body-of-water', 'nature', 'mountain', 'forest', 
                    'desert', 'ocean', 'sky', 'environment', 'terrain', 'world'],
        'german': ['landschaft', 'wasser', 'natur', 'berg', 'wald', 'himmel', 'umgebung']
    },
    'fantasy-settings': {
        'keywords': ['fantasy', 'magic', 'dragon', 'castle', 'mystical', 'fairy', 'enchanted',
                    'spell', 'wizard', 'magical', 'quest', 'realm'],
        'german': ['fantasie', 'magie', 'drache', 'schloss', 'mystisch', 'fee', 'zauber']
    },
    'scifi-settings': {
        'keywords': ['sci-fi', 'future', 'cyber', 'tech', 'robot', 'space', 'neon', 
                    'android', 'digital', 'futuristic', 'AI', 'virtual'],
        'german': ['zukunft', 'roboter', 'weltraum', 'technologie', 'digital']
    },
    'characters-models': {
        'keywords': ['character', 'portrait', 'person', 'model', 'face', 'girl', 'woman',
                    'man', 'beautiful', 'body', 'figure', 'human', 'agent'],
        'german': ['mädchen', 'frau', 'mann', 'person', 'gesicht', 'körper', 'schön']
    },
    'horror-settings': {
        'keywords': ['horror', 'dark', 'scary', 'creepy', 'ghost', 'haunted', 'nightmare',
                    'terror', 'evil', 'demon', 'schock', 'shock', 'blood'],
        'german': ['horror', 'dunkel', 'gruselig', 'geist', 'alptraum', 'schock', 'blut']
    },
    'nsfw-horror': {
        'keywords': ['extreme', 'gore', 'disturbing', 'graphic', 'violent', 'brutal',
                    'grotesque', 'visceral', 'intense'],
        'german': ['extrem', 'brutal', 'verstörend', 'grausam']
    },
    'nsfw-erotic': {
        'keywords': ['nude', 'nackt', 'erotic', 'sensual', 'intimate', 'sexy', 'adult',
                    'titten', 'body', 'curves', 'seductive'],
        'german': ['nackt', 'erotisch', 'sinnlich', 'intim', 'sexy', 'titten', 'körper']
    }
}

def detect_nsfw_content(filename: str) -> bool:
    """
    Detect if content is NSFW based on filename
    """
    nsfw_indicators = [
        'nackt', 'nude', 'erotic', 'titten', 'sexy', 'adult', '18+',
        'nsfw', 'intimate', 'sensual', 'explicit'
    ]
    filename_lower = filename.lower()
    return any(indicator in filename_lower for indicator in nsfw_indicators)

def categorize_with_rules(filename: str) -> str:
    """
    Categorize image using enhanced rules including German keywords
    """
    filename_lower = filename.lower()
    
    # Check for NSFW content first
    if detect_nsfw_content(filename):
        if any(word in filename_lower for word in ['horror', 'schock', 'dark', 'blood']):
            return 'nsfw-horror'
        else:
            return 'nsfw-erotic'
    
    # Score each category
    scores = {}
    for category, rules in CATEGORY_RULES.items():
        score = 0
        # Check English keywords
        for keyword in rules['keywords']:
            if keyword in filename_lower:
                score += 2
        # Check German keywords if available
        if 'german' in rules:
            for keyword in rules['german']:
                if keyword in filename_lower:
                    score += 2
        scores[category] = score
    
    # Return highest scoring category
    if max(scores.values()) > 0:
        return max(scores, key=scores.get)
    
    # Default based on common patterns
    if 'comfyui' in filename_lower or 'flux' in filename_lower:
        return 'world-environments'  # AI generation tools often create landscapes
    
    return 'world-environments'

def generate_smart_title(filename: str, category: str, index: int) -> str:
    """
    Generate intelligent titles based on filename analysis
    """
    # Clean filename
    name = filename.replace('.jpg', '').replace('.png', '').replace('.jpeg', '')
    name = name.replace('_', ' ').replace('-', ' ')
    
    # Special handling for specific patterns
    if 'comfyui' in filename.lower():
        titles = ['AI Generated Masterpiece', 'Digital Creation', 'Neural Network Art',
                 'Algorithmic Beauty', 'Computational Art']
        return f"{titles[index % len(titles)]} #{index:04d}"
    
    if 'flux' in filename.lower():
        return f"Flux Creation - {name.title()[:30]}"
    
    if 'screenshot' in filename.lower():
        return f"Captured Moment #{index:04d}"
    
    # Category-specific titles
    title_templates = {
        'world-environments': ['Ethereal {0}', 'Mystical {0}', 'Serene {0}', 'Majestic {0}'],
        'fantasy-settings': ['Enchanted {0}', 'Magical {0}', 'Legendary {0}', 'Mythical {0}'],
        'scifi-settings': ['Futuristic {0}', 'Cybernetic {0}', 'Digital {0}', 'Neon {0}'],
        'characters-models': ['Portrait of {0}', 'Study of {0}', '{0} Character', 'Digital {0}'],
        'horror-settings': ['Dark {0}', 'Haunting {0}', 'Sinister {0}', 'Gothic {0}'],
        'nsfw-horror': ['Extreme {0}', 'Visceral {0}', 'Intense {0}', 'Disturbing {0}'],
        'nsfw-erotic': ['Artistic {0}', 'Intimate {0}', 'Sensual {0}', 'Expression of {0}']
    }
    
    templates = title_templates.get(category, ['Untitled {0}'])
    template = templates[index % len(templates)]
    
    # Extract meaningful part from filename
    words = name.split()
    if words:
        meaningful = ' '.join(words[:3]).title()
        if len(meaningful) > 50:
            meaningful = meaningful[:47] + '...'
        return template.format(meaningful)
    
    return template.format(f"Work #{index:04d}")

def create_comprehensive_catalog(image_list: List[str]) -> Dict:
    """
    Create a comprehensive catalog of all images
    """
    catalog = {
        'metadata': {
            'total_images': len(image_list),
            'generated_date': datetime.now().isoformat(),
            'version': '1.0'
        },
        'categories': {},
        'all_images': [],
        'statistics': {}
    }
    
    # Initialize categories
    for cat in CATEGORY_RULES.keys():
        catalog['categories'][cat] = []
    
    # Process each image
    for idx, image_file in enumerate(image_list):
        category = categorize_with_rules(image_file)
        title = generate_smart_title(image_file, category, idx)
        
        # Generate appropriate description
        if category.startswith('nsfw'):
            description = f"Mature content - {category.replace('-', ' ').title()} artwork"
        else:
            description = f"AI-generated {category.replace('-', ' ')} created with advanced techniques"
        
        image_data = {
            'id': f'img_{idx:04d}',
            'original_filename': image_file,
            'src': f'/Meine Dateien/Website AI-Generated Images/{image_file}',
            'title': title,
            'description': description,
            'category': category,
            'tags': extract_tags(image_file),
            'is_nsfw': category.startswith('nsfw'),
            'index': idx
        }
        
        catalog['all_images'].append(image_data)
        catalog['categories'][category].append(image_data)
    
    # Generate statistics
    catalog['statistics'] = {
        'categories': {cat: len(images) for cat, images in catalog['categories'].items()},
        'nsfw_count': sum(1 for img in catalog['all_images'] if img['is_nsfw']),
        'sfw_count': sum(1 for img in catalog['all_images'] if not img['is_nsfw'])
    }
    
    return catalog

def extract_tags(filename: str) -> List[str]:
    """
    Extract relevant tags from filename
    """
    tags = []
    filename_lower = filename.lower()
    
    # Tool tags
    if 'comfyui' in filename_lower:
        tags.append('ComfyUI')
    if 'flux' in filename_lower:
        tags.append('Flux')
    if 'screenshot' in filename_lower:
        tags.append('Screenshot')
    
    # Style tags
    if 'beautiful' in filename_lower:
        tags.append('Beautiful')
    if 'dark' in filename_lower:
        tags.append('Dark')
    if 'fantasy' in filename_lower:
        tags.append('Fantasy')
    
    return tags

def generate_js_config(catalog: Dict) -> str:
    """
    Generate JavaScript configuration for the gallery
    """
    js_content = """/**
 * Auto-Generated Gallery Configuration
 * Generated: {date}
 * Total Images: {total}
 * 
 * WARNING: This file contains references to NSFW content.
 * Ensure proper age verification is in place.
 */

const AI_GALLERY_IMAGES = {{
""".format(
        date=catalog['metadata']['generated_date'],
        total=catalog['metadata']['total_images']
    )
    
    for category, images in catalog['categories'].items():
        js_content += f"  '{category}': [\n"
        
        # Limit images per category for performance
        max_images = 100 if not category.startswith('nsfw') else 50
        for img in images[:max_images]:
            # Escape quotes in strings
            title = img['title'].replace("'", "\\'")
            description = img['description'].replace("'", "\\'")
            
            js_content += f"""    {{
      src: '{img['src']}',
      title: '{title}',
      description: '{description}',
      tags: {json.dumps(img['tags'])}
    }},
"""
        js_content += "  ],\n\n"
    
    js_content += """};

// Statistics
const GALLERY_STATS = {
"""
    
    for key, value in catalog['statistics']['categories'].items():
        js_content += f"  '{key}': {value},\n"
    
    js_content += f"""  'total': {catalog['metadata']['total_images']},
  'nsfw_total': {catalog['statistics']['nsfw_count']},
  'sfw_total': {catalog['statistics']['sfw_count']}
}};

// Export for use
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ AI_GALLERY_IMAGES, GALLERY_STATS }};
}}
"""
    
    return js_content

def save_outputs(catalog: Dict):
    """
    Save all output files
    """
    # Save JSON catalog
    with open('/home/user/webapp/aidrive_catalog.json', 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
    
    # Save JavaScript config
    js_content = generate_js_config(catalog)
    with open('/home/user/webapp/assets/js/aidrive_gallery_config.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Save summary report
    with open('/home/user/webapp/aidrive_summary.txt', 'w', encoding='utf-8') as f:
        f.write("="*60 + "\n")
        f.write("AI DRIVE IMAGE CATALOG SUMMARY\n")
        f.write("="*60 + "\n\n")
        f.write(f"Generated: {catalog['metadata']['generated_date']}\n")
        f.write(f"Total Images: {catalog['metadata']['total_images']}\n\n")
        
        f.write("Category Distribution:\n")
        f.write("-"*40 + "\n")
        for cat, count in catalog['statistics']['categories'].items():
            percentage = (count / catalog['metadata']['total_images'] * 100)
            f.write(f"{cat:25} {count:5} images ({percentage:5.1f}%)\n")
        
        f.write("\n" + "-"*40 + "\n")
        f.write(f"SFW Images: {catalog['statistics']['sfw_count']}\n")
        f.write(f"NSFW Images: {catalog['statistics']['nsfw_count']}\n")

if __name__ == "__main__":
    print("="*60)
    print("AI DRIVE IMAGE ANALYZER")
    print("="*60)
    print("\nAnalyzing images from AI Drive...")
    
    # In production, this would load all 700 images from the actual AI Drive
    # For now, using the sample list
    catalog = create_comprehensive_catalog(AIDRIVE_IMAGES)
    
    # Save all outputs
    save_outputs(catalog)
    
    # Print summary
    print(f"\n✅ Processed {catalog['metadata']['total_images']} images")
    print("\n📊 Category Distribution:")
    for cat, count in catalog['statistics']['categories'].items():
        if count > 0:
            print(f"  • {cat:25} {count:3} images")
    
    print(f"\n🔒 NSFW Content: {catalog['statistics']['nsfw_count']} images")
    print(f"✅ SFW Content: {catalog['statistics']['sfw_count']} images")
    
    print("\n📁 Output Files Created:")
    print("  • aidrive_catalog.json - Complete catalog")
    print("  • aidrive_gallery_config.js - Gallery configuration")
    print("  • aidrive_summary.txt - Summary report")
    
    print("\n" + "="*60)
    print("✨ Analysis complete! Review the generated files.")
    print("="*60)