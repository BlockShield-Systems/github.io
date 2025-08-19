/**
 * Gallery Images Configuration
 * 
 * INSTRUCTIONS FOR ADDING IMAGES FROM AI DRIVE:
 * 1. Upload your images to the AI Drive folder: "/Meine Dateien/Website AI-Generated Images/"
 * 2. For each image, add an entry in the appropriate category below
 * 3. Use the full path from AI Drive or a relative path if images are copied to the website
 * 
 * Example entry:
 * {
 *     src: '/path/to/your/image.jpg',
 *     title: 'Image Title',
 *     description: 'Brief description of the image'
 * }
 */

// This configuration will be loaded by gallery.js
const AI_GALLERY_IMAGES = {
    'world-environments': [
        // Example entries - replace with your actual images
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/world-env-1.jpg',
            title: 'Mystical Floating Islands',
            description: 'A surreal landscape featuring floating islands in a twilight sky'
        },
        {
            src: '/Meine Dateien/Website AI-Generated Images/world-env-2.jpg',
            title: 'Crystal Caverns',
            description: 'Underground crystal formations glowing with ethereal light'
        }
        */
    ],
    
    'fantasy-settings': [
        // Add your fantasy setting images here
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/fantasy-1.jpg',
            title: 'Enchanted Forest',
            description: 'A magical forest with glowing mushrooms and fairy lights'
        }
        */
    ],
    
    'scifi-settings': [
        // Add your sci-fi setting images here
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/scifi-1.jpg',
            title: 'Neon Metropolis',
            description: 'Futuristic cityscape with flying vehicles and holographic displays'
        }
        */
    ],
    
    'characters-models': [
        // Add your character and model images here
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/character-1.jpg',
            title: 'Cyberpunk Warrior',
            description: 'A battle-ready warrior with advanced cybernetic enhancements'
        }
        */
    ],
    
    'horror-settings': [
        // Add your horror setting images here
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/horror-1.jpg',
            title: 'Abandoned Asylum',
            description: 'Dark corridors of an abandoned psychiatric hospital'
        }
        */
    ],
    
    'nsfw-horror': [
        // Add your NSFW horror images here (18+ content)
        // These will be hidden by default and require age verification
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/nsfw-horror-1.jpg',
            title: 'Grotesque Entity',
            description: 'Extreme horror content - viewer discretion advised'
        }
        */
    ],
    
    'nsfw-erotic': [
        // Add your NSFW soft erotic content here (18+ content)
        // These will be hidden by default and require age verification
        /*
        {
            src: '/Meine Dateien/Website AI-Generated Images/nsfw-erotic-1.jpg',
            title: 'Artistic Expression',
            description: 'Soft artistic content - mature audiences only'
        }
        */
    ]
};

// Helper function to get image count for a category
function getImageCount(category) {
    return AI_GALLERY_IMAGES[category] ? AI_GALLERY_IMAGES[category].length : 0;
}

// Helper function to get total image count
function getTotalImageCount() {
    let total = 0;
    for (let category in AI_GALLERY_IMAGES) {
        total += AI_GALLERY_IMAGES[category].length;
    }
    return total;
}

// Export for use in gallery.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AI_GALLERY_IMAGES;
}