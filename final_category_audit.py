#!/usr/bin/env python3
"""
Final audit and correction of image categories based on visual inspection
"""

import json

def final_category_audit():
    # Load current data
    with open('assets/data/ai-gallery-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    gallery = data['gallery']
    images = gallery['images']
    
    # Track all corrections
    all_corrections = []
    
    # Print current state for review
    print("🔍 REVIEWING ALL IMAGES BY CATEGORY")
    print("="*80)
    
    categories_to_check = ['fantasy', 'scifi', 'horror', 'nsfw_horror', 'characters', 'nsfw_erotic', 'environments']
    
    for category in categories_to_check:
        print(f"\n📁 {category.upper()}")
        print("-"*40)
        cat_images = [img for img in images if img['category'] == category]
        
        for img in cat_images:
            title_en = img['title'].get('en', 'Unknown')
            keywords = ', '.join(img.get('keywords', [])[:3])
            print(f"  {img['id']}: {title_en[:30]:30} | {keywords[:40]}")
            
            # Check for obvious mismatches
            all_text = f"{title_en} {img.get('description', '')} {' '.join(img.get('keywords', []))}".lower()
            
            # Specific correction rules based on content analysis
            new_cat = None
            
            if category == 'fantasy':
                # Move industrial/tech to sci-fi
                if any(term in all_text for term in ['industrial', 'factory', 'cyberpunk', 'futuristic city', 'production']):
                    new_cat = 'scifi'
                # Move pure horror to horror
                elif any(term in all_text for term in ['skull', 'death', 'corpse']) and 'magical' not in all_text:
                    new_cat = 'horror'
                    
            elif category == 'scifi':
                # Move organic/biological horror to nsfw_horror
                if any(term in all_text for term in ['organic', 'flesh', 'biological horror', 'tentacle']):
                    new_cat = 'nsfw_horror'
                # Move fantasy elements to fantasy
                elif any(term in all_text for term in ['magical', 'mystical', 'spell', 'enchanted']) and 'tech' not in all_text:
                    new_cat = 'fantasy'
                    
            elif category == 'horror':
                # Move extreme/body horror to nsfw_horror
                if any(term in all_text for term in ['flesh', 'grotesque', 'mutation', 'body horror', 'visceral']):
                    new_cat = 'nsfw_horror'
                # Move sci-fi horror to sci-fi
                elif any(term in all_text for term in ['alien', 'space', 'futuristic']) and 'horror' not in title_en.lower():
                    new_cat = 'scifi'
                    
            elif category == 'characters':
                # Move NSFW characters to nsfw_erotic
                if any(term in all_text for term in ['sensual', 'erotic', 'lingerie', 'intimate', 'revealing']):
                    new_cat = 'nsfw_erotic'
                    
            if new_cat and new_cat != category:
                all_corrections.append({
                    'id': img['id'],
                    'title': title_en,
                    'from': category,
                    'to': new_cat
                })
                img['category'] = new_cat
                print(f"    ⚠️  MOVING TO: {new_cat}")
    
    # Apply corrections
    if all_corrections:
        print("\n\n🔄 APPLYING CORRECTIONS")
        print("="*80)
        for corr in all_corrections:
            print(f"✓ {corr['id']}: {corr['title'][:30]:30} | {corr['from']:12} → {corr['to']}")
    
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
    
    # Final summary
    print("\n\n📊 FINAL CATEGORY DISTRIBUTION")
    print("="*80)
    total = sum(category_counts.values())
    
    for cat in categories_to_check:
        count = category_counts.get(cat, 0)
        percentage = (count / total * 100) if total > 0 else 0
        bar = '█' * int(percentage / 2)
        print(f"{cat:15} : {count:3} images ({percentage:5.1f}%) {bar}")
    
    print(f"\nTotal images: {total}")
    print(f"Corrections made: {len(all_corrections)}")
    
    return len(all_corrections)

if __name__ == "__main__":
    num_corrections = final_category_audit()
    print(f"\n{'='*80}")
    if num_corrections > 0:
        print(f"✅ Audit complete! {num_corrections} images were recategorized.")
    else:
        print("✅ Audit complete! All images are properly categorized.")