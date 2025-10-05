/*
Modern Portfolio JavaScript 2025
Vanilla JS for smooth interactions and animations
*/

// ============================================
// GLOBAL VARIABLES
// ============================================

let activeSection = 'home';
let isMenuOpen = false;
let isScrolling = false;

// ============================================
// DOM CONTENT LOADED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ============================================
// INITIALIZE PORTFOLIO
// ============================================

function initializePortfolio() {
    setupNavigation();
    setupScrollAnimations();
    setupSkillBars();
    setupContactForm();
    setupMobileMenu();
    setupSmoothScroll();
    setupScrollToTop();
    setupIntersectionObserver();
    
    console.log('🚀 Portfolio initialized successfully!');
}

// ============================================
// NAVIGATION SYSTEM
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            scrollToSection(targetSection);
            updateActiveNavLink(targetSection);
            
            // Close mobile menu if open
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // Setup scroll spy
    window.addEventListener('scroll', throttle(() => {
        if (!isScrolling) {
            updateActiveSection();
            updateNavbarBackground();
        }
    }, 100));
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            if (activeSection !== sectionId) {
                activeSection = sectionId;
                updateActiveNavLink(sectionId);
            }
        }
    });
}

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeId) {
            link.classList.add('active');
        }
    });
}

function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    const scrollY = window.pageYOffset;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
    }
}

// ============================================
// SMOOTH SCROLL FUNCTIONALITY
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        isScrolling = true;
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

function setupSmoothScroll() {
    // Handle all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                toggleMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        isMenuOpen = !isMenuOpen;
        
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create intersection observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                // Unobserve after animation
                skillObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

function setupIntersectionObserver() {
    // Add scroll animation class to elements
    const elementsToAnimate = [
        '.hero-content',
        '.about-content',
        '.skill-card',
        '.project-card',
        '.contact-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('scroll-animate');
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validate form
    if (validateForm(data)) {
        // Show loading state
        showFormLoading(true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormLoading(false);
            showFormSuccess();
            e.target.reset();
        }, 2000);
        
        console.log('Form submitted:', data);
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Por favor ingresa un nombre válido');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Nombre muy corto');
            } else {
                clearFieldError('name');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError('email', 'Email inválido');
            } else {
                clearFieldError('email');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Mensaje muy corto');
            } else {
                clearFieldError('message');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = '#ef4444';
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

function clearFieldError(fieldName) {
    const field = typeof fieldName === 'string' ? 
        document.getElementById(fieldName) : fieldName.target;
    const formGroup = field.closest('.form-group');
    
    // Remove error styling
    field.style.borderColor = '';
    
    // Remove error message
    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormLoading(isLoading) {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        submitBtn.style.opacity = '0.7';
    } else {
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar Mensaje';
        btnIcon.className = 'fas fa-paper-plane';
        submitBtn.style.opacity = '1';
    }
}

function showFormSuccess() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #43e97b, #38f9d7);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-check-circle"></i>
            <span>¡Mensaje enviado! Te contactaré pronto.</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// ============================================
// SCROLL TO TOP
// ============================================

function setupScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
        scrollTopBtn.style.boxShadow = 'var(--shadow-glow), var(--shadow-xl)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollTopBtn.style.boxShadow = 'var(--shadow-lg)';
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

function measurePerformance() {
    // Measure page load performance
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`📊 Page load time: ${pageLoadTime}ms`);
    });
    
    // Log JavaScript errors
    window.addEventListener('error', (e) => {
        console.error('❌ JavaScript Error:', e.error);
    });
}

// Initialize performance monitoring
measurePerformance();

// ============================================
// KEYBOARD NAVIGATION
// ============================================

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Arrow keys for section navigation
        if (e.altKey) {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const currentIndex = sections.indexOf(activeSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                scrollToSection(sections[currentIndex + 1]);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                scrollToSection(sections[currentIndex - 1]);
            }
        }
    });
}

// Initialize keyboard navigation
setupKeyboardNavigation();

// ============================================
// LAZY LOADING IMAGES
// ============================================

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// DARK MODE TOGGLE (OPTIONAL)
// ============================================

function setupDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(e) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Initial check
    updateTheme(prefersDark);
    
    // Listen for changes
    prefersDark.addListener(updateTheme);
}

// Initialize optional features
setupDarkMode();

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================

// Make functions available globally for HTML onclick events
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;

// ============================================
// CSS ANIMATIONS KEYFRAMES
// ============================================

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .scroll-top-btn:hover {
        animation: bounce 0.6s infinite alternate;
    }
    
    @keyframes bounce {
        from { transform: translateY(-3px) scale(1.05); }
        to { transform: translateY(-8px) scale(1.08); }
    }
`;

document.head.appendChild(style);

console.log('✨ Portfolio JavaScript loaded successfully!');