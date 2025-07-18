// shared-navigation.js - Single source of truth for all navigation
class SharedNavigation {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.languageManager = null;
        this.init();
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('/projects/') || path.includes('projects/')) {
            return 'project';
        }
        return 'home';
    }

    createNavigationHTML() {
        const isHomePage = this.currentPage === 'home';
        const baseURL = isHomePage ? '' : '../';
        
        return `
        <nav class="nav">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="${isHomePage ? '#home' : '../index.html'}">TRIIN RUUMET</a>
                </div>
                <div class="nav-center">
                    <ul class="nav-menu">
                        <li><a href="${isHomePage ? '#films' : '../index.html#films'}"><span class="content-en">FILMS</span><span class="content-ee">FILMID</span></a></li>
                        <li><a href="${isHomePage ? '#commercial' : '../index.html#commercial'}"><span class="content-en">COMMERCIAL</span><span class="content-ee">REKLAAM</span></a></li>
                        <li><a href="${isHomePage ? '#about' : '../index.html#about'}"><span class="content-en">ABOUT</span><span class="content-ee">BIO</span></a></li>
                        <li><a href="${isHomePage ? '#contact' : '../index.html#contact'}"><span class="content-en">CONTACT</span><span class="content-ee">KONTAKT</span></a></li>
                        <!-- Mobile-only items -->
                        <li class="mobile-only" style="margin-top: 2rem; padding: 1rem 0;">
                            <div style="display: flex; justify-content: center; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
                                <a href="https://www.instagram.com/triin_ruumet/" target="_blank" rel="noopener noreferrer" class="mobile-instagram">
                                    <img src="${baseURL}images/instagram-t.png" alt="Instagram" class="mobile-instagram-icon">
                                </a>
                                <div class="mobile-lang-switcher">
                                    <button class="mobile-lang-btn active" onclick="sharedNav.switchLanguage('en')">EN</button>
                                    <button class="mobile-lang-btn" onclick="sharedNav.switchLanguage('ee')">EE</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="nav-right">
                    <a href="https://www.instagram.com/triin_ruumet/" target="_blank" rel="noopener noreferrer" class="nav-instagram">
                        <img src="${baseURL}images/instagram-t.png" alt="Instagram" class="instagram-icon">
                    </a>
                    <div class="nav-lang-switcher">
                        <button class="nav-lang-btn active" onclick="sharedNav.switchLanguage('en')">EN</button>
                        <button class="nav-lang-btn" onclick="sharedNav.switchLanguage('ee')">EE</button>
                    </div>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>`;
    }

    init() {
        // Insert navigation HTML
        document.body.insertAdjacentHTML('afterbegin', this.createNavigationHTML());
        
        // Initialize language system
        this.initializeLanguageSystem();
        
        // Initialize navigation functionality
        this.initializeNavigation();
    }

    initializeLanguageSystem() {
        // Simplified language system - start with English immediately
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.applyLanguage(this.currentLang);
        this.updateLanguageButtons();
        
        // Async geo-detection for first-time visitors
        if (!localStorage.getItem('preferred-language')) {
            this.detectUserLocation().then(detectedLang => {
                if (detectedLang !== this.currentLang) {
                    this.currentLang = detectedLang;
                    this.applyLanguage(this.currentLang);
                    this.updateLanguageButtons();
                }
            }).catch(() => {
                console.log('Geo-detection failed, staying with English');
            });
        }
    }

    async detectUserLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data.country_code === 'EE' ? 'ee' : 'en';
        } catch (error) {
            return 'en';
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        this.applyLanguage(lang);
        this.updateLanguageButtons();
    }

    applyLanguage(lang) {
        const body = document.body;
        if (lang === 'ee') {
            body.classList.add('lang-ee');
        } else {
            body.classList.remove('lang-ee');
        }
        this.updatePlaceholders(lang);
    }

    updateLanguageButtons() {
        const buttons = document.querySelectorAll('.nav-lang-btn, .mobile-lang-btn');
        const switchers = document.querySelectorAll('.nav-lang-switcher, .mobile-lang-switcher');
        
        // Remove active class from all buttons
        buttons.forEach(btn => {
            btn.classList.remove('active');
            const onclick = btn.getAttribute('onclick');
            if (onclick && onclick.includes(`'${this.currentLang}'`)) {
                btn.classList.add('active');
            }
        });

        // Update switcher container classes for sliding animation
        switchers.forEach(switcher => {
            if (this.currentLang === 'ee') {
                switcher.classList.add('ee-active');
            } else {
                switcher.classList.remove('ee-active');
            }
        });
        
        console.log('Language buttons updated for:', this.currentLang);
    }

    updatePlaceholders(lang) {
        const inputs = document.querySelectorAll('[data-placeholder-en][data-placeholder-ee]');
        inputs.forEach(input => {
            const enPlaceholder = input.getAttribute('data-placeholder-en');
            const eePlaceholder = input.getAttribute('data-placeholder-ee');
            input.placeholder = lang === 'ee' ? eePlaceholder : enPlaceholder;
        });
    }

    initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Navigation scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for home page only
        if (this.currentPage === 'home') {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }
}

// Initialize shared navigation when DOM is ready
let sharedNav;
document.addEventListener('DOMContentLoaded', function() {
    sharedNav = new SharedNavigation();
});

// Global function for onclick handlers
function switchLanguage(lang) {
    if (sharedNav) {
        sharedNav.switchLanguage(lang);
    }
}