#!/usr/bin/env python3
"""
Analyze and fix category mismatches in the gallery
"""

import json
import re

def analyze_and_fix_categories():
    # Load current data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    corrections = []
    
    # Define keywords that strongly indicate categories
    category_keywords = {
        'fantasy': ['magic', 'mystical', 'enchanted', 'fairy', 'dragon', 'wizard', 'castle', 'medieval', 'ethereal', 'crystal', 'spell', 'forest', 'winter wonderland'],
        'scifi': ['futuristic', 'cyber', 'space', 'robot', 'tech', 'neon', 'sci-fi', 'spacecraft', 'alien', 'digital', 'holographic', 'mechanical', 'industrial'],
        'horror': ['dark', 'creepy', 'terrifying', 'nightmare', 'monster', 'skull', 'death', 'scary', 'grotesque', 'sinister', 'haunted', 'evil', 'blood'],
        'nsfw_horror': ['flesh', 'grotesque', 'body horror', 'mutation', 'disturbing', 'tentacle', 'gore', 'anatomical', 'visceral', 'organic horror'],
        'characters': ['portrait', 'character', 'person', 'model', 'figure', 'human', 'face', 'girl', 'woman', 'man'],
        'environments': ['landscape', 'environment', 'world', 'terrain', 'scenery', 'vista', 'panorama'],
        'nsfw_erotic': ['erotic', 'sensual', 'intimate', 'seductive', 'lingerie', 'nude', 'adult']
    }
    
    # Check each image
    for img in images:
        title = (img['title'].get('en', '') + ' ' + img['title'].get('de', '')).lower()
        desc = img.get('description', '').lower()
        keywords = ' '.join(img.get('keywords', [])).lower()
        current_cat = img['category']
        
        all_text = f"{title} {desc} {keywords}"
        
        # Special checks for common mismatches
        suggested_cat = None
        
        # Check for industrial/factory scenes in fantasy
        if current_cat == 'fantasy' and any(word in all_text for word in ['industrial', 'factory', 'production', 'machinery', 'mechanical']):
            suggested_cat = 'scifi'
            
        # Check for organic horror in sci-fi
        if current_cat == 'scifi' and any(word in all_text for word in ['organic', 'flesh', 'tentacle', 'mouth', 'teeth', 'biological']):
            if any(word in all_text for word in ['horror', 'grotesque', 'disturbing']):
                suggested_cat = 'nsfw_horror' if 'disturbing' in all_text or 'grotesque' in all_text else 'horror'
        
        # Check for magical/fantasy elements in sci-fi
        if current_cat == 'scifi' and any(word in all_text for word in ['magical', 'mystical', 'enchanted', 'spell', 'wizard']):
            suggested_cat = 'fantasy'
            
        # Check for character portraits in wrong categories
        if any(word in all_text for word in ['portrait', 'model', 'character design']) and current_cat not in ['characters', 'nsfw_erotic']:
            if 'nude' in all_text or 'erotic' in all_text or 'sensual' in all_text:
                suggested_cat = 'nsfw_erotic'
            else:
                suggested_cat = 'characters'
        
        if suggested_cat and suggested_cat != current_cat:
            corrections.append({
                'id': img['id'],
                'title': img['title'].get('en', 'Unknown'),
                'current': current_cat,
                'suggested': suggested_cat,
                'reason': all_text[:100]
            })
            img['category'] = suggested_cat
    
    # Print corrections
    if corrections:
        print("CORRECTIONS MADE:")
        print("="*60)
        for c in corrections:
            print(f"ID: {c['id']}")
            print(f"Title: {c['title']}")
            print(f"Changed from: {c['current']} → {c['suggested']}")
            print(f"Reason: {c['reason']}...")
            print("-"*40)
    
    # Update category counts
    category_counts = {}
    for img in images:
        cat = img['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    # Update counts in JSON
    for cat_key, cat_data in gallery['categories'].items():
        cat_data['count'] = category_counts.get(cat_key, 0)
    
    print("\nUPDATED CATEGORY COUNTS:")
    print("="*60)
    for cat, count in sorted(category_counts.items()):
        print(f"{cat}: {count}")
    
    # Save updated data
    with open('assets/data/ai-gallery-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return len(corrections)

if __name__ == "__main__":
    num_corrections = analyze_and_fix_categories()
    print(f"\n✅ Total corrections: {num_corrections}")