// Advanced Navigation Features for Portfolio

class PortfolioNavigation {
    constructor() {
        this.currentSection = '';
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.sections = [];
        this.navItems = [];
        
        this.init();
    }
    
    init() {
        this.cacheDOMElements();
        this.bindEvents();
        this.setupIntersectionObserver();
        this.initializeBreadcrumbs();
        this.setupKeyboardNavigation();
        this.updateNavbarBackground();
        
        console.log('Advanced navigation initialized');
    }
    
    cacheDOMElements() {
        this.burger = document.querySelector('.burger');
        this.nav = document.querySelector('.nav-links');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        this.sections = document.querySelectorAll('section[id]');
        this.navItems = Array.from(this.navLinks);
        this.body = document.body;
        this.header = document.querySelector('.header');
    }
    
    bindEvents() {
        // Mobile menu events with improved animation
        if (this.burger) {
            this.burger.addEventListener('click', (e) => this.toggleMobileMenu(e));
        }
        
        // Navigation link events with enhanced scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll events with optimized throttling
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 10)); // More frequent updates for smoother effects
        
        // Resize events with improved debouncing
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 200));
        
        // Close mobile menu on outside click with better detection
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Escape key to close mobile menu with animation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.nav.classList.contains('nav-active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupIntersectionObserver() {
        // Improved intersection observer for more accurate section detection
        const options = {
            root: null,
            rootMargin: '-15% 0px -75% 0px',
            threshold: [0.1, 0.5]
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    this.updateActiveNavItem(entry.target.id);
                }
            });
        }, options);
        
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    initializeBreadcrumbs() {
        // Create breadcrumb navigation for project pages with improved styling
        const isProjectPage = window.location.pathname.includes('/projects/');
        
        if (isProjectPage) {
            this.createBreadcrumbs();
        }
    }
    
    setupKeyboardNavigation() {
        // Tab navigation enhancement for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
            
            // Arrow key navigation for mobile menu
            if (this.nav.classList.contains('nav-active')) {
                this.handleArrowNavigation(e);
            }
        });
    }
    
    toggleMobileMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = this.nav.classList.contains('nav-active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.nav.classList.add('nav-active');
        this.burger.classList.add('toggle');
        this.body.style.overflow = 'hidden';
        
        // Animate nav links with staggered delay
        this.navLinks.forEach((link, index) => {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        });
        
        // Focus first nav item for accessibility
        setTimeout(() => {
            this.navLinks[0]?.focus();
        }, 100);
        
        // Add ARIA attributes for accessibility
        this.burger.setAttribute('aria-expanded', 'true');
        this.nav.setAttribute('aria-hidden', 'false');
        
        // Add overlay
        this.addMenuOverlay();
    }
    
    closeMobileMenu() {
        this.nav.classList.remove('nav-active');
        this.burger.classList.remove('toggle');
        this.body.style.overflow = '';
        
        // Remove animations with transition
        this.navLinks.forEach(link => {
            link.style.animation = '';
            link.style.opacity = '';
            link.style.transform = '';
        });
        
        // Update ARIA attributes
        this.burger.setAttribute('aria-expanded', 'false');
        this.nav.setAttribute('aria-hidden', 'true');
        
        // Remove overlay
        this.removeMenuOverlay();
    }
    
    addMenuOverlay() {
        // Add overlay for better visual indication of modal state
        if (!document.querySelector('.menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 998;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(overlay);
            
            // Force reflow and animate
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            // Add click event to close menu
            overlay.addEventListener('click', () => this.closeMobileMenu());
        }
    }
    
    removeMenuOverlay() {
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }
    
    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        
        // Handle external links
        if (href && !href.startsWith('#') && !href.startsWith('/')) {
            return; // Let browser handle external links
        }
        
        // Handle anchor links with improved scrolling
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                // Enhanced scrolling with easing
                this.scrollToSection(target);
                this.closeMobileMenu();
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        }
    }
    
    scrollToSection(target) {
        if (!target) return;
        
        this.isScrolling = true;
        
        const headerOffset = this.getHeaderOffset();
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        
        // Smooth scroll with improved easing
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }
    
    getHeaderOffset() {
        if (!this.navbar) return 80;
        
        const navbarHeight = this.navbar.offsetHeight;
        return navbarHeight + 20; // Add some padding
    }
    
    handleScroll() {
        if (this.isScrolling) return;
        
        this.updateNavbarBackground();
        this.updateScrollProgress();
    }
    
    updateNavbarBackground() {
        if (!this.navbar) return;
        
        const scrollY = window.scrollY;
        const threshold = 50; // Lower threshold for faster response
        
        if (scrollY > threshold) {
            this.navbar.classList.add('scrolled');
            this.navbar.style.background = 'rgba(26, 54, 93, 0.95)';
            this.navbar.style.backdropFilter = 'blur(10px)';
            this.navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            this.navbar.classList.remove('scrolled');
            this.navbar.style.background = 'transparent';
            this.navbar.style.backdropFilter = 'none';
            this.navbar.style.boxShadow = 'none';
        }
    }
    
    updateScrollProgress() {
        // Create or update scroll progress bar with improved visual design
        let progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 4px;
                background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
                z-index: 9999;
                transition: width 0.1s ease;
                box-shadow: 0 1px 5px rgba(251, 191, 36, 0.3);
            `;
            document.body.appendChild(progressBar);
        }
        
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    }
    
    updateActiveNavItem(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        
        // Remove active class from all nav items
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section's nav item with highlight animation
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Add subtle highlight animation
            activeLink.style.animation = 'navItemHighlight 0.5s ease';
            setTimeout(() => {
                activeLink.style.animation = '';
            }, 500);
        }
    }
    
    handleResize() {
        // Close mobile menu on larger screens
        if (window.innerWidth > 768 && this.nav.classList.contains('nav-active')) {
            this.closeMobileMenu();
        }
        
        // Recalculate positions if needed
        this.setupIntersectionObserver();
    }
    
    handleOutsideClick(e) {
        const isInsideNav = this.nav?.contains(e.target);
        const isBurger = this.burger?.contains(e.target);
        const isNavActive = this.nav?.classList.contains('nav-active');
        const isOverlay = e.target.classList.contains('menu-overlay');
        
        if ((!isInsideNav && !isBurger && isNavActive) || isOverlay) {
            this.closeMobileMenu();
        }
    }
    
    handleTabNavigation(e) {
        // Enhance tab navigation for accessibility
        if (!this.nav?.classList.contains('nav-active')) return;
        
        const focusableElements = this.nav.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    handleArrowNavigation(e) {
        if (!this.nav?.classList.contains('nav-active')) return;
        
        const currentIndex = Array.from(this.navLinks).indexOf(document.activeElement);
        if (currentIndex === -1) return;
        
        let nextIndex;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % this.navLinks.length;
                this.navLinks[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = currentIndex <= 0 ? this.navLinks.length - 1 : currentIndex - 1;
                this.navLinks[nextIndex].focus();
                break;
        }
    }
    
    createBreadcrumbs() {
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumbs';
        breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');
        
        const pathParts = window.location.pathname.split('/').filter(part => part);
        const breadcrumbItems = ['Home'];
        
        if (pathParts.includes('projects')) {
            breadcrumbItems.push('Projects');
            
            // Get current project name from page title or URL
            const projectName = document.title.split(' | ')[0] || 'Current Project';
            breadcrumbItems.push(projectName);
        }
        
        const breadcrumbHTML = breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const href = index === 0 ? '/' : (index === 1 ? '/#projects' : '#');
            
            return `
                <span class="breadcrumb-item">
                    ${isLast ? 
                        `<span aria-current="page">${item}</span>` : 
                        `<a href="${href}">${item}</a>`
                    }
                </span>
            `;
        }).join('<span class="breadcrumb-separator">→</span>');
        
        breadcrumbContainer.innerHTML = `<ol class="breadcrumb-list">${breadcrumbHTML}</ol>`;
        
        // Insert breadcrumbs after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar && navbar.parentNode) {
            navbar.parentNode.insertBefore(breadcrumbContainer, navbar.nextSibling);
        }
        
        // Add styles
        this.addBreadcrumbStyles();
    }
    
    addBreadcrumbStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .breadcrumbs {
                background: rgba(255, 255, 255, 0.08);
                padding: 0.8rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .breadcrumb-list {
                display: flex;
                align-items: center;
                list-style: none;
                margin: 0;
                padding: 0;
                flex-wrap: wrap;
                max-width: var(--max-width);
                margin: 0 auto;
                padding: 0 var(--content-padding);
            }
            
            .breadcrumb-item a {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                font-weight: 500;
                transition: all 0.3s ease;
                padding: 0.3rem 0;
                position: relative;
            }
            
            .breadcrumb-item a::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--accent-color);
                transition: width 0.3s ease;
            }
            
            .breadcrumb-item a:hover {
                color: var(--accent-color);
                text-decoration: none;
            }
            
            .breadcrumb-item a:hover::after {
                width: 100%;
            }
            
            .breadcrumb-item span[aria-current="page"] {
                color: white;
                font-weight: 600;
            }
            
            .breadcrumb-separator {
                color: rgba(255, 255, 255, 0.5);
                margin: 0 0.8rem;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .breadcrumbs {
                    padding: 0.6rem 0;
                }
                
                .breadcrumb-separator {
                    margin: 0 0.5rem;
                }
                
                .breadcrumb-item a,
                .breadcrumb-item span[aria-current="page"] {
                    font-size: 0.9rem;
                }
            }
            
            @keyframes navItemHighlight {
                0% { background: rgba(251, 191, 36, 0.2); }
                100% { background: transparent; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Public API
    scrollTo(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            this.scrollToSection(target);
        }
    }
    
    getCurrentSection() {
        return this.currentSection;
    }
    
    destroy() {
        // Clean up event listeners and observers
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('click', this.handleOutsideClick);
        document.removeEventListener('keydown', this.handleTabNavigation);
        
        // Remove scroll progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.remove();
        }
    }
    
    // Utility functions with improved performance
    throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
    
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioNavigation = new PortfolioNavigation();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioNavigation;
}