/**
 * AI Gallery JavaScript
 * Handles gallery functionality, image protection, and lightbox
 */

// Gallery configuration
const galleryConfig = {
    images: typeof AI_GALLERY_IMAGES !== 'undefined' ? AI_GALLERY_IMAGES : {
        'world-environments': [],
        'fantasy-settings': [],
        'scifi-settings': [],
        'characters-models': [],
        'horror-settings': [],
        'nsfw-horror': [],
        'nsfw-erotic': []
    },
    ageConfirmed: false,
    currentLightboxIndex: 0,
    currentCategory: null
};

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupImageProtection();
    setupCategoryToggles();
    setupLightbox();
    checkAgeConfirmation();
});

/**
 * Initialize the gallery
 */
function initializeGallery() {
    console.log('Gallery initialized');
    
    // Update image counts for each category
    Object.keys(galleryConfig.images).forEach(category => {
        updateCategoryCount(category);
    });
}

/**
 * Setup image protection mechanisms
 */
function setupImageProtection() {
    // Disable right-click on all gallery items
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.gallery-item')) {
            e.preventDefault();
            showProtectionNotice();
            return false;
        }
    });
    
    // Disable dragging of images
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Additional protection for mobile
        img.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
    });
    
    // Disable text selection on gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.userSelect = 'none';
        item.style.webkitUserSelect = 'none';
        item.style.mozUserSelect = 'none';
        item.style.msUserSelect = 'none';
    });
    
    // Prevent save image keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Prevent Ctrl+S, Ctrl+A in gallery
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'a')) {
            if (document.querySelector('.gallery-item:hover')) {
                e.preventDefault();
                showProtectionNotice();
                return false;
            }
        }
    });
    
    // Add watermark overlay dynamically (optional)
    addWatermarks();
}

/**
 * Add watermarks to images
 */
function addWatermarks() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const watermark = document.createElement('div');
        watermark.className = 'image-watermark';
        watermark.style.cssText = `
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: rgba(255,255,255,0.3);
            font-size: 12px;
            pointer-events: none;
            user-select: none;
            z-index: 10;
        `;
        watermark.textContent = '© AI-TechArt';
        item.querySelector('.image-container').appendChild(watermark);
    });
}

/**
 * Show protection notice
 */
function showProtectionNotice() {
    const notice = document.createElement('div');
    notice.className = 'protection-popup';
    notice.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255,0,0,0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: bold;
        animation: fadeInOut 2s ease;
    `;
    notice.textContent = 'This image is protected and cannot be downloaded';
    document.body.appendChild(notice);
    
    setTimeout(() => {
        notice.remove();
    }, 2000);
}

/**
 * Setup category toggle functionality
 */
function setupCategoryToggles() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.closest('.category-section');
            const grid = section.querySelector('.gallery-grid');
            const isNSFW = section.classList.contains('nsfw-category');
            
            // Check age confirmation for NSFW content
            if (isNSFW && !galleryConfig.ageConfirmed) {
                showAgeConfirmation(() => {
                    toggleGrid(grid);
                });
            } else {
                toggleGrid(grid);
            }
        });
    });
}

/**
 * Toggle grid visibility
 */
function toggleGrid(grid) {
    if (grid.style.display === 'none' || !grid.style.display) {
        grid.style.display = 'grid';
        loadCategoryImages(grid.id);
    } else {
        grid.style.display = 'none';
    }
}

/**
 * Check and handle age confirmation
 */
function checkAgeConfirmation() {
    const ageConfirmed = localStorage.getItem('ageConfirmed');
    if (ageConfirmed === 'true') {
        galleryConfig.ageConfirmed = true;
    }
}

/**
 * Show age confirmation dialog
 */
function showAgeConfirmation(callback) {
    const modal = document.createElement('div');
    modal.className = 'age-confirmation-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: #1a1a2e; padding: 3rem; border-radius: 15px; max-width: 500px; text-align: center; color: white;">
            <h2 style="color: #ff0000; margin-bottom: 1.5rem;">
                <i class="fas fa-exclamation-triangle"></i> Age Verification Required
            </h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6;">
                This section contains mature content that may not be suitable for all audiences. 
                By proceeding, you confirm that you are at least 18 years of age and legally permitted 
                to view such content in your jurisdiction.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="confirmAge(true)" style="
                    background: #ff0000;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                ">I am 18 or older</button>
                <button onclick="confirmAge(false)" style="
                    background: #666;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    window.confirmAge = function(confirmed) {
        if (confirmed) {
            galleryConfig.ageConfirmed = true;
            localStorage.setItem('ageConfirmed', 'true');
            if (callback) callback();
        }
        modal.remove();
    };
}

/**
 * Load images for a specific category
 */
function loadCategoryImages(gridId) {
    const category = gridId.replace('-grid', '');
    const images = galleryConfig.images[category] || [];
    const grid = document.getElementById(gridId);
    
    if (images.length === 0) {
        // Show placeholder if no images
        console.log(`No images configured for category: ${category}`);
        return;
    }
    
    // Clear existing placeholders
    grid.innerHTML = '';
    
    // Add images to grid
    images.forEach((image, index) => {
        const item = createGalleryItem(image, category, index);
        grid.appendChild(item);
    });
    
    // Update count
    updateCategoryCount(category);
}

/**
 * Create a gallery item element
 */
function createGalleryItem(image, category, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item protected';
    item.dataset.category = category;
    item.dataset.index = index;
    
    item.innerHTML = `
        <div class="image-container">
            <img src="${image.src}" alt="${image.title}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIiAvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='">
        </div>
        <div class="image-overlay">
            <div class="image-info">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
            </div>
        </div>
        <div class="protection-notice">Protected Image</div>
    `;
    
    // Add click handler for lightbox
    item.addEventListener('click', function() {
        openLightbox(category, index);
    });
    
    return item;
}

/**
 * Update category image count
 */
function updateCategoryCount(category) {
    const count = galleryConfig.images[category]?.length || 0;
    const section = document.querySelector(`[data-category="${category}"]`);
    if (section) {
        const countElement = section.querySelector('.category-count');
        if (countElement) {
            countElement.textContent = `${count} Images`;
        }
    }
}

/**
 * Setup lightbox functionality
 */
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

/**
 * Open lightbox with specific image
 */
function openLightbox(category, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const images = galleryConfig.images[category];
    
    if (!images || !images[index]) return;
    
    galleryConfig.currentCategory = category;
    galleryConfig.currentLightboxIndex = index;
    
    lightboxImage.src = images[index].src;
    lightboxImage.alt = images[index].title;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

/**
 * Navigate lightbox images
 */
window.navigateLightbox = function(direction) {
    const images = galleryConfig.images[galleryConfig.currentCategory];
    if (!images) return;
    
    galleryConfig.currentLightboxIndex += direction;
    
    // Wrap around
    if (galleryConfig.currentLightboxIndex < 0) {
        galleryConfig.currentLightboxIndex = images.length - 1;
    } else if (galleryConfig.currentLightboxIndex >= images.length) {
        galleryConfig.currentLightboxIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightbox-image');
    const currentImage = images[galleryConfig.currentLightboxIndex];
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.title;
};

/**
 * Add custom CSS animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('AI Gallery Protection System Active');