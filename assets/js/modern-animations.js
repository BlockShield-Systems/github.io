/**
 * 🎭 MODERN ANIMATIONS & INTERACTIONS
 * AI-TechArt B2B Website - Premium Edition
 * ==========================================
 * Features:
 * - Smooth scroll animations
 * - Parallax effects
 * - Intersection Observer animations
 * - Mouse tracking effects
 * - Number counters
 * - Typing effects
 * - Dynamic backgrounds
 * - Micro-interactions
 */

'use strict';

// ============================================
// 🎯 INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffects();
    initMouseTracking();
    initNumberCounters();
    initTypingEffect();
    initNavbarScroll();
    initCardHoverEffects();
    initParticleBackground();
    initLazyLoading();
});

// ============================================
// 📜 SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// ✨ SCROLL ANIMATIONS (Intersection Observer)
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    // Stagger animations for groups
    const staggerGroups = document.querySelectorAll('[data-stagger]');
    staggerGroups.forEach(group => {
        const children = group.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            child.classList.add('reveal');
            observer.observe(child);
        });
    });
}

// ============================================
// 🌊 PARALLAX EFFECTS
// ============================================

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// ============================================
// 🖱️ MOUSE TRACKING EFFECTS
// ============================================

function initMouseTracking() {
    const trackingElements = document.querySelectorAll('[data-mouse-track]');

    trackingElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ============================================
// 🔢 NUMBER COUNTERS
// ============================================

function initNumberCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const animateCounter = (element) => {
        const target = parseInt(element.dataset.counter);
        const duration = parseInt(element.dataset.duration) || 2000;
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    };

    // Observe counters and trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                animateCounter(entry.target);
                entry.target.dataset.counted = 'true';
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// ⌨️ TYPING EFFECT
// ============================================

function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.dataset.typing;
        const speed = parseInt(element.dataset.typingSpeed) || 100;
        const delay = parseInt(element.dataset.typingDelay) || 0;

        element.textContent = '';

        setTimeout(() => {
            let index = 0;
            const type = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                }
            };
            type();
        }, delay);
    });
}

// ============================================
// 🧭 NAVBAR SCROLL EFFECTS
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.nav-modern, .sticky-nav');

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// 🎴 CARD HOVER EFFECTS (3D Tilt)
// ============================================

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card-3d, [data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ============================================
// ✨ PARTICLE BACKGROUND
// ============================================

function initParticleBackground() {
    const particleContainers = document.querySelectorAll('[data-particles]');

    particleContainers.forEach(container => {
        const particleCount = parseInt(container.dataset.particles) || 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            container.appendChild(particle);
        }
    });
}

// ============================================
// 🖼️ LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 🎨 DYNAMIC GRADIENT BACKGROUND
// ============================================

class GradientBackground {
    constructor(element) {
        this.element = element;
        this.colors = [
            '#667eea',
            '#764ba2',
            '#f093fb',
            '#4facfe',
            '#00f2fe'
        ];
        this.currentColorIndex = 0;
        this.init();
    }

    init() {
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
            const nextIndex = (this.currentColorIndex + 1) % this.colors.length;

            this.element.style.background = `linear-gradient(135deg, ${this.colors[this.currentColorIndex]} 0%, ${this.colors[nextIndex]} 100%)`;
        }, 5000);
    }
}

// Initialize gradient backgrounds
document.querySelectorAll('[data-gradient-bg]').forEach(el => {
    new GradientBackground(el);
});

// ============================================
// 🎯 CURSOR TRAIL EFFECT
// ============================================

class CursorTrail {
    constructor() {
        this.coords = [];
        this.circles = [];
        this.colors = [
            'rgba(102, 126, 234, 0.5)',
            'rgba(118, 75, 162, 0.5)',
            'rgba(240, 147, 251, 0.5)'
        ];

        this.init();
    }

    init() {
        // Create circles
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-trail';
            circle.style.cssText = `
                position: fixed;
                width: ${20 - i}px;
                height: ${20 - i}px;
                border-radius: 50%;
                background: ${this.colors[i % this.colors.length]};
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease-out;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(circle);
            this.circles.push(circle);
        }

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.coords.push({ x: e.clientX, y: e.clientY });
            if (this.coords.length > this.circles.length) {
                this.coords.shift();
            }
        });

        // Animate circles
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.circles.forEach((circle, index) => {
            if (this.coords[index]) {
                circle.style.left = `${this.coords[index].x}px`;
                circle.style.top = `${this.coords[index].y}px`;
                circle.style.opacity = (this.circles.length - index) / this.circles.length;
            }
        });
    }
}

// Initialize cursor trail (optional - can be enabled with data attribute)
if (document.querySelector('[data-cursor-trail]')) {
    new CursorTrail();
}

// ============================================
// 📊 SCROLL PROGRESS BAR
// ============================================

function initScrollProgress() {
    const progressBar = document.querySelector('[data-scroll-progress]');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

initScrollProgress();

// ============================================
// 🎪 BUTTON RIPPLE EFFECT
// ============================================

function initRippleEffect() {
    document.querySelectorAll('.btn-modern, button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

initRippleEffect();

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// 🌙 THEME TOGGLE (Optional)
// ============================================

function initThemeToggle() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    toggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

initThemeToggle();

// ============================================
// 🎯 UTILS
// ============================================

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle utility
function throttle(func, limit) {
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

// Export for use in other scripts
window.ModernAnimations = {
    initSmoothScroll,
    initScrollAnimations,
    initParallaxEffects,
    initMouseTracking,
    initNumberCounters,
    initTypingEffect,
    debounce,
    throttle
};

console.log('🎨 Modern Animations initialized successfully!');
