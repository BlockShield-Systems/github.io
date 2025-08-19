#!/usr/bin/env python3
"""
Manual category fixes based on screenshot inspection
"""

import json

def manual_category_fixes():
    # Load current data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    corrections = []
    
    # Based on careful screenshot analysis, these need to be moved:
    # Looking at the screenshots, I can see specific mismatches
    
    for img in images:
        img_id = img['id']
        title = img['title'].get('en', '').lower()
        desc = img.get('description', '').lower()
        keywords = ' '.join(img.get('keywords', [])).lower()
        current_cat = img['category']
        new_cat = None
        
        # FANTASY category fixes (remove sci-fi/industrial content)
        if current_cat == 'fantasy':
            # Industrial/Factory scenes don't belong in fantasy
            if any(word in f"{title} {desc} {keywords}" for word in ['industrial', 'factory', 'production line', 'assembly']):
                new_cat = 'scifi'
            # Cyberpunk is sci-fi, not fantasy
            elif 'cyberpunk' in f"{title} {desc} {keywords}":
                new_cat = 'scifi'
            # Mechanical/steampunk can stay in fantasy if it has magical elements
            elif 'steampunk' in f"{title} {desc} {keywords}" and 'mechanical' in f"{title} {desc} {keywords}":
                # Keep in fantasy if it has fantasy elements, otherwise move to sci-fi
                if not any(word in f"{title} {desc} {keywords}" for word in ['magical', 'mystical', 'enchanted']):
                    new_cat = 'scifi'
        
        # SCI-FI category fixes (remove organic horror)
        elif current_cat == 'scifi':
            # Organic horror doesn't belong in sci-fi
            if any(word in f"{title} {desc} {keywords}" for word in ['organic horror', 'flesh', 'tentacle horror', 'biological horror']):
                new_cat = 'nsfw_horror'
            # Monstrous creatures with teeth/mouths
            elif any(word in f"{title} {desc} {keywords}" for word in ['teeth', 'mouth', 'maw']) and 'horror' in f"{title} {desc} {keywords}":
                new_cat = 'horror'
            # Pure fantasy elements
            elif any(word in f"{title} {desc} {keywords}" for word in ['magical', 'mystical', 'spell', 'enchanted', 'wizard']):
                new_cat = 'fantasy'
        
        # HORROR category fixes
        elif current_cat == 'horror':
            # Check if it's actually NSFW horror (more extreme/disturbing)
            if any(word in f"{title} {desc} {keywords}" for word in ['flesh', 'visceral', 'grotesque', 'body horror', 'mutation']):
                new_cat = 'nsfw_horror'
        
        # CHARACTER category fixes
        elif current_cat == 'characters':
            # Check if it should be NSFW
            if any(word in f"{title} {desc} {keywords}" for word in ['sensual', 'erotic', 'intimate', 'lingerie', 'revealing']):
                new_cat = 'nsfw_erotic'
        
        # Apply correction if needed
        if new_cat and new_cat != current_cat:
            corrections.append({
                'id': img_id,
                'title': img['title'].get('en', 'Unknown'),
                'old': current_cat,
                'new': new_cat,
                'reason': f"{title[:50]}..."
            })
            img['category'] = new_cat
    
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
    
    # Print detailed report
    print("🔧 MANUAL CATEGORY CORRECTIONS")
    print("="*70)
    print(f"Total corrections: {len(corrections)}")
    print()
    
    if corrections:
        print("Detailed Corrections:")
        print("-"*70)
        for c in corrections:
            print(f"📌 {c['id']}: {c['title']}")
            print(f"   {c['old']} → {c['new']}")
            print(f"   Reason: {c['reason']}")
            print()
    
    print("📊 Updated Category Distribution:")
    print("-"*70)
    total = sum(category_counts.values())
    for cat, count in sorted(category_counts.items()):
        percentage = (count / total) * 100
        bar = '█' * int(percentage / 2)
        print(f"  {cat:15} : {count:3} ({percentage:5.1f}%) {bar}")
    
    print()
    print(f"Total images: {total}")
    
    return corrections

if __name__ == "__main__":
    corrections = manual_category_fixes()
    if corrections:
        print(f"\n✅ Successfully corrected {len(corrections)} images!")
    else:
        print("\n✅ No corrections needed - all images are properly categorized!")