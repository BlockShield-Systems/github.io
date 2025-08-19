#!/usr/bin/env python3
"""
Ensure all NSFW images have mature flag
"""

import json

def fix_missing_mature_flags():
    # Load current data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    fixed = []
    
    # Check each image
    for img in images:
        # If it's in an NSFW category but doesn't have mature flag
        if 'nsfw' in img['category'] and not img.get('mature'):
            img['mature'] = True
            fixed.append({
                'id': img['id'],
                'title': img['title'].get('en', 'Unknown'),
                'category': img['category']
            })
    
    # Save updated data
    with open('assets/data/ai-gallery-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    if fixed:
        print("🔧 Fixed missing mature flags:")
        print("="*40)
        for item in fixed:
            print(f"✓ {item['id']}: {item['title']} [{item['category']}]")
        print(f"\nTotal fixed: {len(fixed)}")
    else:
        print("✅ All NSFW images already have mature flags!")
    
    return len(fixed)

if __name__ == "__main__":
    fix_missing_mature_flags()