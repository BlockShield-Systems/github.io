/**
 * Security Headers Configuration
 * This file defines Content Security Policy and other security headers
 */

// Content Security Policy configuration
const CSP_POLICY = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"], // unsafe-inline needed for onclick handlers
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'connect-src': ["'self'", "https://page.gensparksite.com"],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': []
};

// Convert CSP object to string
function generateCSP() {
    return Object.entries(CSP_POLICY)
        .map(([key, values]) => {
            if (values.length === 0) return key;
            return `${key} ${values.join(' ')}`;
        })
        .join('; ');
}

// Add security headers via meta tags (for GitHub Pages)
function addSecurityHeaders() {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = generateCSP();
    
    const head = document.getElementsByTagName('head')[0];
    // Insert as first meta tag after charset
    const charset = document.querySelector('meta[charset]');
    if (charset && charset.nextSibling) {
        head.insertBefore(cspMeta, charset.nextSibling);
    } else {
        head.appendChild(cspMeta);
    }
    
    // Add other security headers
    const referrerMeta = document.createElement('meta');
    referrerMeta.name = 'referrer';
    referrerMeta.content = 'strict-origin-when-cross-origin';
    head.appendChild(referrerMeta);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSecurityHeaders);
} else {
    addSecurityHeaders();
}