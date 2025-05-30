// Portfolio Animations and Visual Effects

class PortfolioAnimations {
    constructor() {
        this.isInitialized = false;
        this.observers = [];
        this.animationQueue = [];
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.setupIntersectionObservers();
        this.initParallaxEffects();
        this.initTypewriterEffect();
        this.initParticleBackground();
        this.initSkillAnimations();
        this.initScrollAnimations();
        this.initHoverEffects();
        
        this.isInitialized = true;
        console.log('Portfolio animations initialized');
    }
    
    setupIntersectionObservers() {
        // Fade in animation observer
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, 'fadeInUp');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Slide in animation observer
        const slideInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, 'slideInLeft');
                    slideInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });
        
        // Apply observers to elements
        document.querySelectorAll('.expertise-card, .project-card, .contact-method').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            fadeInObserver.observe(el);
        });
        
        document.querySelectorAll('.section-title').forEach(el => {
            slideInObserver.observe(el);
        });
        
        this.observers.push(fadeInObserver, slideInObserver);
    }
    
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }
    
    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter') || element.textContent;
            const speed = parseInt(element.getAttribute('data-typewriter-speed')) || 100;
            
            this.typeWriterAnimation(element, text, speed);
        });
    }
    
    typeWriterAnimation(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.className = 'typewriter-cursor';
                cursor.innerHTML = '|';
                element.appendChild(cursor);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    if (cursor.parentNode) {
                        cursor.parentNode.removeChild(cursor);
                    }
                }, 3000);
            }
        }, speed);
    }
    
    initParticleBackground() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        
        header.style.position = 'relative';
        header.appendChild(canvas);
        
        const particles = [];
        const particleCount = 50;
        
        function resizeCanvas() {
            canvas.width = header.offsetWidth;
            canvas.height = header.offsetHeight;
        }
        
        function createParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        function updateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.dx;
                particle.y += particle.dy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(updateParticles);
        }
        
        resizeCanvas();
        createParticles();
        updateParticles();
        
        window.addEventListener('resize', resizeCanvas);
    }
    
    initSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        if (skillBars.length === 0) return;
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute('data-percentage');
                    
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                        
                        // Add number animation
                        this.animateNumber(progressBar, 0, parseInt(percentage), 1500);
                    }, 200);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
        
        this.observers.push(skillObserver);
    }
    
    initScrollAnimations() {
        // Smooth reveal animations on scroll
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        if (revealElements.length === 0) {
            // Add class to elements that should be revealed
            document.querySelectorAll('.about-text p, .highlight-box, .tech-tags, .feature-list').forEach(el => {
                el.classList.add('reveal-on-scroll');
            });
        }
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            revealObserver.observe(el);
        });
        
        this.observers.push(revealObserver);
    }
    
    initHoverEffects() {
        // Enhanced hover effects for interactive elements
        document.querySelectorAll('.btn, .nav-link, .project-card, .expertise-card').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.addRippleEffect(e);
            });
        });
        
        // Magnetic effect for buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    addRippleEffect(e) {
        const element = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        element.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    animateElement(element, animationType) {
        element.style.animation = `${animationType} 0.8s ease forwards`;
        element.style.opacity = '1';
    }
    
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            // Create a small indicator element if it doesn't exist
            let indicator = element.querySelector('.percentage-indicator');
            if (!indicator) {
                indicator = document.createElement('span');
                indicator.className = 'percentage-indicator';
                indicator.style.cssText = `
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.8rem;
                    color: white;
                    font-weight: 600;
                `;
                element.style.position = 'relative';
                element.appendChild(indicator);
            }
            
            indicator.textContent = Math.round(current) + '%';
        }, 16);
    }
    
    // Custom scroll-triggered animations
    initCustomScrollAnimations() {
        const scrollTriggers = [
            {
                selector: '.section-title',
                animation: 'slideInFromLeft',
                offset: 100
            },
            {
                selector: '.expertise-card',
                animation: 'popIn',
                offset: 50,
                stagger: 100
            },
            {
                selector: '.project-card',
                animation: 'slideInUp',
                offset: 80,
                stagger: 150
            }
        ];
        
        scrollTriggers.forEach(trigger => {
            const elements = document.querySelectorAll(trigger.selector);
            
            elements.forEach((element, index) => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                this.animateElement(entry.target, trigger.animation);
                            }, trigger.stagger ? trigger.stagger * index : 0);
                            
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: `0px 0px -${trigger.offset}px 0px`
                });
                
                observer.observe(element);
                this.observers.push(observer);
            });
        });
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
    
    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.animationQueue = [];
        this.isInitialized = false;
    }
}

// CSS animations styles
const animationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes popIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .typewriter-cursor {
        animation: blink 1s infinite;
        font-weight: 100;
        color: var(--accent-color);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Enhanced button hover effects */
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn:hover::before {
        left: 100%;
    }
    
    /* Smooth scrolling enhancement */
    html {
        scroll-behavior: smooth;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .reveal-on-scroll {
            opacity: 1;
            transform: none;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioAnimations = new PortfolioAnimations();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioAnimations;
}
