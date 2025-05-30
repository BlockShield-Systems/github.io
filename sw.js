// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-v1.2.0';
const STATIC_CACHE = 'portfolio-static-v1.2.0';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1.2.0';

// Files to cache for offline functionality
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    
    // CSS Files
    '/assets/css/main.css',
    '/assets/css/responsive.css',
    '/assets/css/demo.css',
    '/assets/css/project-detail.css',
    
    // JavaScript Files
    '/assets/js/main.js',
    '/assets/js/navigation.js',
    '/assets/js/animations.js',
    
    // Project Pages
    '/projects/trading-simulator.html',
    '/projects/learning-platform.html',
    '/projects/code-formatter.html',
    '/projects/system-architecture.html',
    '/projects/automation-tools.html',
    
    // Demo Pages
    '/demos/interactive-demo/index.html',
    '/demos/interactive-demo/demo.js',
    '/demos/tool-preview/index.html',
    '/demos/tool-preview/preview.js',
    
    // External Dependencies (CDN)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Dynamic content that should be cached when accessed
const DYNAMIC_ASSETS = [
    '/assets/images/',
    '/assets/icons/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Take control of all clients
            self.clients.claim()
        ])
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const request = event.request;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip cross-origin requests that aren't from trusted CDNs
    if (!request.url.startsWith(self.location.origin) && 
        !isTrustedCDN(request.url)) {
        return;
    }
    
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // Return cached version if available
            if (cachedResponse) {
                // Update cache in background for CDN resources
                if (isCDNResource(request.url)) {
                    updateCacheInBackground(request);
                }
                return cachedResponse;
            }
            
            // Fetch from network
            return fetch(request).then((networkResponse) => {
                // Don't cache if response is not ok
                if (!networkResponse || networkResponse.status !== 200 || 
                    networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                
                // Cache the response
                const responseToCache = networkResponse.clone();
                
                // Determine which cache to use
                const cacheToUse = shouldCacheStatically(request.url) ? 
                    STATIC_CACHE : DYNAMIC_CACHE;
                
                caches.open(cacheToUse).then((cache) => {
                    cache.put(request, responseToCache);
                });
                
                return networkResponse;
            }).catch((error) => {
                console.log('Service Worker: Fetch failed', error);
                
                // Return fallback for navigation requests
                if (request.destination === 'document') {
                    return caches.match('/index.html');
                }
                
                // Return fallback for images
                if (request.destination === 'image') {
                    return createFallbackImage();
                }
                
                throw error;
            });
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    
    const options = {
        body: data.body,
        icon: '/assets/images/icons/icon-192x192.png',
        badge: '/assets/images/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        },
        actions: [
            {
                action: 'view',
                title: 'View',
                icon: '/assets/images/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/icons/icon-72x72.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view') {
        const url = event.notification.data.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});

// Helper Functions
function isTrustedCDN(url) {
    const trustedCDNs = [
        'cdnjs.cloudflare.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ];
    
    return trustedCDNs.some(cdn => url.includes(cdn));
}

function isCDNResource(url) {
    return !url.startsWith(self.location.origin);
}

function shouldCacheStatically(url) {
    return STATIC_ASSETS.some(asset => url.includes(asset)) ||
           url.includes('.css') || 
           url.includes('.js') ||
           url.includes('fonts.googleapis.com') ||
           url.includes('cdnjs.cloudflare.com');
}

function updateCacheInBackground(request) {
    fetch(request).then((response) => {
        if (response && response.status === 200) {
            caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, response);
            });
        }
    }).catch((error) => {
        console.log('Background update failed:', error);
    });
}

function createFallbackImage() {
    // Create a simple SVG placeholder
    const svg = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" 
                  fill="#999" text-anchor="middle" dy=".3em">Image Unavailable</text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    });
}

async function syncContactForm() {
    try {
        // Get pending contact form submissions from IndexedDB
        const pendingSubmissions = await getPendingSubmissions();
        
        for (const submission of pendingSubmissions) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submission.data)
                });
                
                if (response.ok) {
                    await removePendingSubmission(submission.id);
                    console.log('Contact form synced successfully');
                }
            } catch (error) {
                console.log('Failed to sync contact form:', error);
            }
        }
    } catch (error) {
        console.log('Background sync failed:', error);
    }
}

// IndexedDB helpers for offline form submissions
async function getPendingSubmissions() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PortfolioApp', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['pendingSubmissions'], 'readonly');
            const store = transaction.objectStore('pendingSubmissions');
            const getAllRequest = store.getAll();
            
            getAllRequest.onsuccess = () => resolve(getAllRequest.result);
            getAllRequest.onerror = () => reject(getAllRequest.error);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('pendingSubmissions')) {
                db.createObjectStore('pendingSubmissions', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

async function removePendingSubmission(id) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('PortfolioApp', 1);
        
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['pendingSubmissions'], 'readwrite');
            const store = transaction.objectStore('pendingSubmissions');
            const deleteRequest = store.delete(id);
            
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
        };
    });
}

// Performance monitoring
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME,
            caches: [STATIC_CACHE, DYNAMIC_CACHE]
        });
    }
});

console.log('Service Worker: Loaded successfully');
