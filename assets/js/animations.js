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
        // Fade in animation observer with improved timing and easing
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, 'fadeInUp');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });
        
        // Slide in animation observer with staggered timing
        const slideInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, 'slideInLeft');
                    slideInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -60px 0px'
        });
        
        // Apply observers to elements with improved initial states
        document.querySelectorAll('.expertise-card, .project-card, .contact-method').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transitionDelay = `${index * 0.1}s`;
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
        
        // Improved throttling for smoother parallax
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3D(0, ${yPos}px, 0)`;
            });
        }, 10)); // Higher frequency updates for smoother effect
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
                
                // Add blinking cursor with improved styling
                const cursor = document.createElement('span');
                cursor.className = 'typewriter-cursor';
                cursor.innerHTML = '|';
                element.appendChild(cursor);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    if (cursor.parentNode) {
                        cursor.style.opacity = '0';
                        setTimeout(() => cursor.parentNode.removeChild(cursor), 500);
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
        
        // Enhanced particle system with interactive behavior
        const particles = [];
        const particleCount = 60; // Increased for richer visuals
        let mouseX = 0, mouseY = 0;
        
        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = header.offsetWidth * dpr;
            canvas.height = header.offsetHeight * dpr;
            ctx.scale(dpr, dpr);
        }
        
        function createParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.5 ? 'rgba(255,255,255,' : 'rgba(251,191,36,'
                });
            }
        }
        
        function updateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Add slight mouse interaction
                const distX = mouseX - particle.x;
                const distY = mouseY - particle.y;
                const dist = Math.sqrt(distX * distX + distY * distY);
                
                if (dist < 100) {
                    const force = 0.1;
                    particle.dx += distX * force / dist;
                    particle.dy += distY * force / dist;
                }
                
                // Apply velocity with bounds checking
                particle.x += particle.dx;
                particle.y += particle.dy;
                
                // Dampen velocity for stability
                particle.dx *= 0.99;
                particle.dy *= 0.99;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle with glowing effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `${particle.color}${particle.opacity})`;
                ctx.fill();
                
                // Add subtle glow
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `${particle.color}${particle.opacity * 0.2})`;
                ctx.fill();
            });
            
            // Draw connections with improved color gradient
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        
                        // Gradient connections
                        const opacity = 0.15 * (1 - distance / 120);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(updateParticles);
        }
        
        // Track mouse movement for particle interaction
        header.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        // Handle touch events for mobile
        header.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouseX = e.touches[0].clientX - rect.left;
                mouseY = e.touches[0].clientY - rect.top;
                e.preventDefault();
            }
        });
        
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
                    
                    // Update skill name with percentage display
                    const skillBarContainer = progressBar.closest('.skill-bar');
                    if (skillBarContainer) {
                        const skillName = skillBarContainer.querySelector('.skill-name');
                        if (skillName) {
                            skillName.setAttribute('data-percentage', percentage);
                        }
                    }
                    
                    // Delay animation for staggered effect
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
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
        // Smooth reveal animations on scroll with improved timing
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        if (revealElements.length === 0) {
            // Add class to elements that should be revealed
            document.querySelectorAll('.about-text p, .highlight-box, .tech-tags, .feature-list, .project-tech, .project-details h3').forEach((el, index) => {
                el.classList.add('reveal-on-scroll');
                el.style.transitionDelay = `${index * 0.1}s`;
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
            rootMargin: '0px 0px -80px 0px'
        });
        
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            revealObserver.observe(el);
        });
        
        this.observers.push(revealObserver);
    }
    
    initHoverEffects() {
        // Enhanced hover effects with ripple and magnetic effects
        document.querySelectorAll('.btn, .nav-link, .project-card, .expertise-card').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.addRippleEffect(e);
            });
        });
        
        // Magnetic effect for buttons with improved physics
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // More natural, dampened movement
                const strength = 0.15;
                button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                // Smooth return to original position
                button.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                button.style.transform = 'translate(0, 0)';
                setTimeout(() => button.style.transition = '', 500);
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
        
        // Clean up ripple after animation completes
        setTimeout(() => {
            if (circle.parentElement) {
                circle.remove();
            }
        }, 600);
    }
    
    animateElement(element, animationType) {
        element.style.animation = `${animationType} 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards`;
        element.style.opacity = '1';
    }
    
    // Custom scroll-triggered animations with improved timing
    initCustomScrollAnimations() {
        const scrollTriggers = [
            {
                selector: '.section-title',
                animation: 'slideInFromLeft',
                offset: 100,
                threshold: 0.3
            },
            {
                selector: '.expertise-card',
                animation: 'popIn',
                offset: 50,
                stagger: 100,
                threshold: 0.2
            },
            {
                selector: '.project-card',
                animation: 'slideInUp',
                offset: 80,
                stagger: 150,
                threshold: 0.1
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
                    threshold: trigger.threshold || 0.1,
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

// CSS animations styles with improved visual effects
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
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        40% {
            opacity: 1;
            transform: scale(1.05);
        }
        60% {
            transform: scale(0.98);
        }
        100% {
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
        transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), 
                    transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
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
        animation: ripple-animation 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: none;
        z-index: 0;
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
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: 1;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: -1;
    }
    
    .btn:hover::before {
        left: 100%;
    }
    
    /* Smooth scrolling enhancement */
    html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
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