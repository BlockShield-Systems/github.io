#!/usr/bin/env python3
"""
Fix NSFW blur issue by ensuring all NSFW content has mature: true flag
"""

import json
import sys

def fix_nsfw_mature_flags():
    """Fix missing mature flags for NSFW content"""
    
    # Load the current gallery data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    # Track changes
    changes_made = []
    already_correct = []
    
    # Check each image
    for image in images:
        category = image.get('category', '')
        has_mature = image.get('mature', False)
        
        # Check if it's NSFW content
        if 'nsfw' in category or category in ['nsfw_horror', 'nsfw_erotic']:
            if not has_mature:
                # Add mature flag
                image['mature'] = True
                changes_made.append({
                    'id': image['id'],
                    'title': image['title'].get('en', 'Unknown'),
                    'category': category
                })
                print(f"✅ Fixed: {image['id']} - {image['title'].get('en', 'Unknown')} [{category}] - Added mature: true")
            else:
                already_correct.append({
                    'id': image['id'],
                    'title': image['title'].get('en', 'Unknown'),
                    'category': category
                })
                print(f"✓ Already correct: {image['id']} - {image['title'].get('en', 'Unknown')} [{category}]")
    
    # Save the updated data
    with open('assets/data/ai-gallery-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Total NSFW images found: {len(changes_made) + len(already_correct)}")
    print(f"Fixed (added mature flag): {len(changes_made)}")
    print(f"Already had mature flag: {len(already_correct)}")
    
    if changes_made:
        print("\n🔧 Fixed images:")
        for item in changes_made:
            print(f"  - {item['id']}: {item['title']} ({item['category']})")
    
    print("\n✅ All NSFW content now has proper mature flags!")
    return len(changes_made)

if __name__ == "__main__":
    changes = fix_nsfw_mature_flags()
    sys.exit(0 if changes >= 0 else 1)