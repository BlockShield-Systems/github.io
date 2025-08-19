#!/usr/bin/env python3
"""
Final corrections based on screenshot evidence
"""

import json

def apply_screenshot_fixes():
    # Load current data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    # Specific fixes based on screenshot analysis
    corrections = []
    
    # These are the specific corrections needed based on the screenshots:
    specific_fixes = {
        # Image that clearly don't belong based on screenshots:
        
        # In Fantasy but should be Sci-Fi (industrial/tech content)
        'img005': {'to': 'scifi', 'reason': 'Cosmic tech/sci-fi theme, not fantasy'},
        
        # In Sci-Fi but should be Horror/NSFW Horror (organic horror)
        'img050': {'to': 'nsfw_horror', 'reason': 'Organic/biological horror content'},
        
        # Keep Dual World Portal as it shows contrast between worlds (can be either)
        # But based on screenshot it's more fantasy themed
        'img064': {'to': 'fantasy', 'reason': 'Portal between magical worlds'},
    }
    
    # Apply specific fixes
    for img in images:
        if img['id'] in specific_fixes:
            old_cat = img['category']
            new_cat = specific_fixes[img['id']]['to']
            
            if old_cat != new_cat:
                img['category'] = new_cat
                corrections.append({
                    'id': img['id'],
                    'title': img['title'].get('en', 'Unknown'),
                    'from': old_cat,
                    'to': new_cat,
                    'reason': specific_fixes[img['id']]['reason']
                })
    
    # Additional content-based corrections
    for img in images:
        title = img['title'].get('en', '').lower()
        desc = img.get('description', '').lower()
        keywords = ' '.join(img.get('keywords', [])).lower()
        all_text = f"{title} {desc} {keywords}"
        current = img['category']
        
        # Skip if already fixed
        if img['id'] in specific_fixes:
            continue
        
        new_cat = None
        reason = ""
        
        # Strong indicators for wrong categorization
        if current == 'fantasy':
            if 'industrial' in all_text and 'production' in all_text:
                new_cat = 'scifi'
                reason = 'Industrial/production theme'
            elif 'cyberpunk' in all_text:
                new_cat = 'scifi'
                reason = 'Cyberpunk is sci-fi'
        
        elif current == 'scifi':
            if 'organic horror' in all_text or ('flesh' in all_text and 'horror' in all_text):
                new_cat = 'nsfw_horror'
                reason = 'Organic/flesh horror content'
            elif 'tentacle' in all_text and 'horror' in all_text:
                new_cat = 'nsfw_horror'
                reason = 'Tentacle horror content'
        
        if new_cat and new_cat != current:
            img['category'] = new_cat
            corrections.append({
                'id': img['id'],
                'title': img['title'].get('en', 'Unknown'),
                'from': current,
                'to': new_cat,
                'reason': reason
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
    print("🎯 SCREENSHOT-BASED CORRECTIONS")
    print("="*80)
    
    if corrections:
        print("\nCorrected Images:")
        print("-"*80)
        for c in corrections:
            print(f"✓ {c['id']}: {c['title']}")
            print(f"  {c['from']} → {c['to']}")
            print(f"  Reason: {c['reason']}")
            print()
    else:
        print("\nNo corrections needed!")
    
    print("\n📊 FINAL DISTRIBUTION:")
    print("-"*80)
    total = sum(category_counts.values())
    
    categories_order = ['fantasy', 'scifi', 'characters', 'horror', 'nsfw_horror', 'nsfw_erotic', 'environments']
    
    for cat in categories_order:
        count = category_counts.get(cat, 0)
        percentage = (count / total * 100) if total > 0 else 0
        
        # Icons for categories
        icons = {
            'fantasy': '🏰',
            'scifi': '🚀',
            'characters': '👤',
            'horror': '👻',
            'nsfw_horror': '⚠️',
            'nsfw_erotic': '🔞',
            'environments': '🌍'
        }
        
        bar = '█' * int(percentage / 2)
        print(f"{icons.get(cat, '📁')} {cat:15} : {count:3} images ({percentage:5.1f}%) {bar}")
    
    print(f"\n📈 Total: {total} images")
    print(f"🔧 Corrections made: {len(corrections)}")
    
    return corrections

if __name__ == "__main__":
    corrections = apply_screenshot_fixes()
    if corrections:
        print("\n✅ All corrections applied successfully!")
    else:
        print("\n✅ Gallery is already properly organized!")