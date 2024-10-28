document.addEventListener('DOMContentLoaded', function () {
    // Loading screen handler
    const loadingScreen = document.getElementById('loadingScreen');

    function hideLoading() {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500); // El tiempo aquí debe coincidir con la transición en CSS
        } else {
            console.log("Elemento loadingScreen no encontrado.");
        }
    }

    // Verifica el estado del documento
    if (document.readyState === 'complete') {
        console.log("Documento cargado completamente, ocultando loadingScreen.");
        hideLoading();
    } else {
        // Espera a que la ventana se cargue
        window.addEventListener('load', () => {
            setTimeout(hideLoading, 2000);
        });

        // Fallback si algo falla
        setTimeout(hideLoading, 4000);
    }

    document.body.style.display = 'block';

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.toggle('mobile-menu-open');
            navLinks.classList.toggle('show');
        });
    }

    // Language switcher
    const languageToggle = document.getElementById('languageToggle');
    let currentLang = localStorage.getItem('preferred-language') || 'en';

    if (languageToggle) {
        // Set initial language
        document.getElementById('currentLang').textContent = currentLang.toUpperCase();
        updateContent();

        languageToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('preferred-language', currentLang);
            document.getElementById('currentLang').textContent = currentLang.toUpperCase();
            updateContent();
        });
    }

    function updateContent() {
        document.documentElement.lang = currentLang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (document.body.classList.contains('mobile-menu-open')) {
                    document.body.classList.remove('mobile-menu-open');
                    navLinks.classList.remove('show');
                }
            }
        });
    });

    // Skills animation on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width') || '0%';
                    entry.target.style.width = width;
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Update copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect with debouncing
    let lastScroll = 0;
    let scrollTimeout;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down & not at top
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up or at top
                    navbar.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
            });
        });
    }

    // Scroll reveal animation
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Initial reveal check
    reveal();

    // Debounced scroll listener for reveal
    let revealTimeout;
    window.addEventListener('scroll', () => {
        if (revealTimeout) {
            window.cancelAnimationFrame(revealTimeout);
        }
        revealTimeout = window.requestAnimationFrame(reveal);
    });

    // Add reveal class to sections
    document.querySelectorAll('section:not(#home)').forEach(section => {
        section.classList.add('reveal');
    });
});
window.addEventListener('error', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.remove();
    }
});