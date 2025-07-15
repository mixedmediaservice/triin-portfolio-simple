// shared-nav.js - Single source of truth for navigation
function createNavigation(currentPage = '') {
    return `
    <nav class="nav">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="${currentPage === 'home' ? '#home' : '../index.html'}">TRIIN RUUMET</a>
            </div>
            <ul class="nav-menu">
                <li><a href="${currentPage === 'home' ? '#films' : '../index.html#films'}">FILMS</a></li>
                <li><a href="${currentPage === 'home' ? '#commercial' : '../index.html#commercial'}">COMMERCIAL</a></li>
                <li><a href="${currentPage === 'home' ? '#about' : '../index.html#about'}">ABOUT</a></li>
                <li><a href="${currentPage === 'home' ? '#contact' : '../index.html#contact'}">CONTACT</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>`;
}

function createLanguageSwitcher() {
    return `
    <div class="language-switcher">
        <button class="lang-btn active" onclick="switchLanguage('en')">EN</button>
        <button class="lang-btn" onclick="switchLanguage('ee')">EE</button>
    </div>`;
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    // Insert navigation
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        const isHomePage = document.body.classList.contains('home-page');
        navPlaceholder.innerHTML = createNavigation(isHomePage ? 'home' : 'project');
    }

    // Insert language switcher for project pages
    const langPlaceholder = document.getElementById('lang-placeholder');
    if (langPlaceholder) {
        langPlaceholder.innerHTML = createLanguageSwitcher();
    }

    // Initialize navigation functionality
    initNavigation();
});

function initNavigation() {
    // Mobile menu toggle
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

    // Smooth scrolling for home page
    if (document.body.classList.contains('home-page')) {
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

// Language switching for project pages
function switchLanguage(lang) {
    const body = document.body;
    const buttons = document.querySelectorAll('.lang-btn');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    const activeBtn = document.querySelector(`[onclick="switchLanguage('${lang}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Switch language
    if (lang === 'ee') {
        body.classList.add('lang-ee');
    } else {
        body.classList.remove('lang-ee');
    }
}