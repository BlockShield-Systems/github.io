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
        // Mobile menu events
        if (this.burger) {
            this.burger.addEventListener('click', (e) => this.toggleMobileMenu(e));
        }
        
        // Navigation link events
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll events with throttling
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16)); // ~60fps
        
        // Resize events
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.nav.classList.contains('nav-active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavItem(entry.target.id);
                }
            });
        }, options);
        
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    initializeBreadcrumbs() {
        // Create breadcrumb navigation for project pages
        const isProjectPage = window.location.pathname.includes('/projects/');
        
        if (isProjectPage) {
            this.createBreadcrumbs();
        }
    }
    
    setupKeyboardNavigation() {
        // Tab navigation enhancement
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
        
        // Animate nav links
        this.navLinks.forEach((link, index) => {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        
        // Focus first nav item for accessibility
        setTimeout(() => {
            this.navLinks[0]?.focus();
        }, 100);
        
        // Add ARIA attributes
        this.burger.setAttribute('aria-expanded', 'true');
        this.nav.setAttribute('aria-hidden', 'false');
    }
    
    closeMobileMenu() {
        this.nav.classList.remove('nav-active');
        this.burger.classList.remove('toggle');
        this.body.style.overflow = '';
        
        // Remove animations
        this.navLinks.forEach(link => {
            link.style.animation = '';
        });
        
        // Update ARIA attributes
        this.burger.setAttribute('aria-expanded', 'false');
        this.nav.setAttribute('aria-hidden', 'true');
    }
    
    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        
        // Handle external links
        if (href && !href.startsWith('#') && !href.startsWith('/')) {
            return; // Let browser handle external links
        }
        
        // Handle anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
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
        const threshold = 100;
        
        if (scrollY > threshold) {
            this.navbar.classList.add('scrolled');
            this.navbar.style.background = 'rgba(26, 54, 93, 0.95)';
            this.navbar.style.backdropFilter = 'blur(10px)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            this.navbar.classList.remove('scrolled');
            this.navbar.style.background = 'transparent';
            this.navbar.style.backdropFilter = 'none';
            this.navbar.style.boxShadow = 'none';
        }
    }
    
    updateScrollProgress() {
        // Create or update scroll progress bar
        let progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, var(--secondary-color), var(--accent-color));
                z-index: 9999;
                transition: width 0.1s ease;
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
        
        // Add active class to current section's nav item
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
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
        const isInsideNav = this.nav.contains(e.target);
        const isBurger = this.burger.contains(e.target);
        const isNavActive = this.nav.classList.contains('nav-active');
        
        if (!isInsideNav && !isBurger && isNavActive) {
            this.closeMobileMenu();
        }
    }
    
    handleTabNavigation(e) {
        // Enhance tab navigation for accessibility
        const focusableElements = this.nav.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (this.nav.classList.contains('nav-active')) {
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
    }
    
    handleArrowNavigation(e) {
        if (!this.nav.classList.contains('nav-active')) return;
        
        const currentIndex = Array.from(this.navLinks).indexOf(document.activeElement);
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
                background: rgba(255, 255, 255, 0.1);
                padding: 0.75rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .breadcrumb-list {
                display: flex;
                align-items: center;
                list-style: none;
                margin: 0;
                padding: 0;
                flex-wrap: wrap;
            }
            
            .breadcrumb-item a {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
            }
            
            .breadcrumb-item a:hover {
                color: var(--accent-color);
            }
            
            .breadcrumb-item span[aria-current="page"] {
                color: white;
                font-weight: 600;
            }
            
            .breadcrumb-separator {
                color: rgba(255, 255, 255, 0.5);
                margin: 0 0.75rem;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .breadcrumbs {
                    padding: 0.5rem 0;
                }
                
                .breadcrumb-separator {
                    margin: 0 0.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
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
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioNavigation = new PortfolioNavigation();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioNavigation;
}
