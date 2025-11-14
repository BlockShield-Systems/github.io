#!/usr/bin/env python3
"""
Fix specific mismatches identified from screenshots
"""

import json

def fix_specific_mismatches():
    # Load current data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    corrections = []
    
    # Based on screenshot analysis, these specific corrections are needed:
    specific_corrections = {
        # Fantasy images that are actually Sci-Fi (industrial/mechanical)
        'industrial': 'scifi',
        'factory': 'scifi',
        'production': 'scifi',
        'mechanical': 'scifi',
        'cyberpunk': 'scifi',
        'futuristic city': 'scifi',
        
        # Sci-Fi images that are actually Horror (organic/biological horror)
        'organic horror': 'nsfw_horror',
        'flesh': 'nsfw_horror',
        'biological': 'horror',
        'tentacle': 'nsfw_horror',
        'teeth': 'horror',
        'mouth': 'horror',
        
        # Characters that should be in NSFW
        'lingerie': 'nsfw_erotic',
        'sensual': 'nsfw_erotic',
        'erotic': 'nsfw_erotic',
        
        # Environmental/landscape images
        'landscape': 'environments',
        'vista': 'environments',
        'panorama': 'environments'
    }
    
    for img in images:
        title_en = img['title'].get('en', '').lower()
        title_de = img['title'].get('de', '').lower()
        desc = img.get('description', '').lower()
        keywords = ' '.join(img.get('keywords', [])).lower()
        current_cat = img['category']
        
        all_text = f"{title_en} {title_de} {desc} {keywords}"
        
        # Check for specific mismatches
        new_category = None
        
        # Priority checks based on visual analysis from screenshots
        
        # 1. Check for industrial/factory in fantasy
        if current_cat == 'fantasy':
            if 'industrial' in all_text or 'factory' in all_text or 'production' in all_text:
                new_category = 'scifi'
            elif 'cyberpunk' in all_text or 'neon' in all_text:
                new_category = 'scifi'
                
        # 2. Check for organic horror in sci-fi
        elif current_cat == 'scifi':
            if any(word in all_text for word in ['organic', 'flesh', 'biological', 'tentacle', 'mouth full of teeth']):
                if 'horror' in all_text or 'grotesque' in all_text:
                    new_category = 'nsfw_horror' if 'disturbing' in all_text else 'horror'
            elif 'magical' in all_text or 'mystical' in all_text or 'enchanted' in all_text:
                new_category = 'fantasy'
                
        # 3. Check for portraits/characters in wrong categories
        elif current_cat in ['fantasy', 'scifi']:
            if 'portrait' in all_text or 'character' in title_en or 'model' in all_text:
                if any(word in all_text for word in ['sensual', 'erotic', 'intimate']):
                    new_category = 'nsfw_erotic'
                else:
                    new_category = 'characters'
        
        # 4. Check for horror elements not in horror categories
        if current_cat not in ['horror', 'nsfw_horror']:
            if any(word in all_text for word in ['skull', 'death', 'corpse', 'nightmare', 'terrifying']):
                new_category = 'horror'
            elif any(word in all_text for word in ['flesh', 'grotesque', 'visceral', 'body horror']):
                new_category = 'nsfw_horror'
        
        if new_category and new_category != current_cat:
            corrections.append({
                'id': img['id'],
                'title': title_en or 'Unknown',
                'old_category': current_cat,
                'new_category': new_category
            })
            img['category'] = new_category
    
    # Manual corrections based on visual inspection of screenshots
    manual_corrections = [
        # Add specific image IDs that need correction based on screenshots
        # Format: {'id': 'imgXXX', 'new_category': 'correct_category'}
    ]
    
    for correction in manual_corrections:
        for img in images:
            if img['id'] == correction['id']:
                old_cat = img['category']
                img['category'] = correction['new_category']
                corrections.append({
                    'id': img['id'],
                    'title': img['title'].get('en', 'Unknown'),
                    'old_category': old_cat,
                    'new_category': correction['new_category']
                })
    
    # Update category counts
    category_counts = {}
    for img in images:
        cat = img['category']
        category_counts[cat] = category_counts.get(cat, 0) + 1
    
    # Update counts in JSON
    for cat_key, cat_data in gallery['categories'].items():
        cat_data['count'] = category_counts.get(cat_key, 0)
    
    # Save updated data
    with open('assets/data/ai-gallery-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Print report
    print("CATEGORY CORRECTIONS REPORT")
    print("="*60)
    print(f"Total corrections made: {len(corrections)}")
    print()
    
    if corrections:
        print("Corrections:")
        print("-"*40)
        for c in corrections:
            print(f"  {c['id']}: {c['title'][:30]}")
            print(f"    {c['old_category']} → {c['new_category']}")
        print()
    
    print("Final Category Counts:")
    print("-"*40)
    for cat, count in sorted(category_counts.items()):
        print(f"  {cat}: {count}")
    
    return len(corrections)

if __name__ == "__main__":
    corrections = fix_specific_mismatches()
    print(f"\n✅ Completed with {corrections} corrections")