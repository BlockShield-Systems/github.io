/**
 * Language Switcher for AI-TechArt
 * Uses Google Translate for automatic translation
 */

// Initialize Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'de,en,fr,it',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
    }, 'google_translate_element');
}

// Custom language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create language switcher HTML if not exists
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && !document.querySelector('.language-switcher')) {
        const langSwitcher = document.createElement('li');
        langSwitcher.className = 'language-switcher';
        langSwitcher.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" aria-label="Sprache wählen">
                    <i class="fas fa-globe"></i>
                    <span class="current-lang">DE</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="language-menu">
                    <button class="lang-option" data-lang="de" data-google-lang="de">
                        <span class="flag">🇩🇪</span> Deutsch
                    </button>
                    <button class="lang-option" data-lang="en" data-google-lang="en">
                        <span class="flag">🇬🇧</span> English
                    </button>
                    <button class="lang-option" data-lang="fr" data-google-lang="fr">
                        <span class="flag">🇫🇷</span> Français
                    </button>
                    <button class="lang-option" data-lang="it" data-google-lang="it">
                        <span class="flag">🇮🇹</span> Italiano
                    </button>
                </div>
            </div>
        `;
        navLinks.appendChild(langSwitcher);
    }

    // Language switcher toggle
    const langBtn = document.querySelector('.language-btn');
    const langMenu = document.querySelector('.language-menu');

    if (langBtn && langMenu) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function() {
            langMenu.classList.remove('active');
        });

        // Language selection
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                const googleLang = this.getAttribute('data-google-lang');

                // Update current language display
                const currentLangDisplay = document.querySelector('.current-lang');
                if (currentLangDisplay) {
                    currentLangDisplay.textContent = lang.toUpperCase();
                }

                // Trigger Google Translate
                changeGoogleLanguage(googleLang);

                // Store preference
                localStorage.setItem('preferredLanguage', lang);

                // Close menu
                langMenu.classList.remove('active');
            });
        });
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'de') {
        // Wait for Google Translate to load
        setTimeout(function() {
            changeGoogleLanguage(savedLang);
            const currentLangDisplay = document.querySelector('.current-lang');
            if (currentLangDisplay) {
                currentLangDisplay.textContent = savedLang.toUpperCase();
            }
        }, 1000);
    }
});

// Function to change Google Translate language
function changeGoogleLanguage(lang) {
    // Wait for Google Translate to be available
    let attempts = 0;
    const maxAttempts = 20;

    const tryTranslate = setInterval(function() {
        attempts++;

        // Try to find Google Translate select element
        const selectElement = document.querySelector('.goog-te-combo');

        if (selectElement) {
            // Set the language
            selectElement.value = lang;

            // Trigger change event
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);

            clearInterval(tryTranslate);
        } else if (attempts >= maxAttempts) {
            console.warn('Google Translate not loaded yet');
            clearInterval(tryTranslate);
        }
    }, 100);
}

// Hide default Google Translate toolbar
function hideGoogleTranslateToolbar() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide Google Translate toolbar */
        .goog-te-banner-frame {
            display: none !important;
        }

        body {
            top: 0 !important;
        }

        /* Hide default Google Translate widget */
        #google_translate_element {
            display: none !important;
        }

        /* Fix Google Translate affecting layout */
        .skiptranslate {
            display: none !important;
        }

        body.translated-ltr {
            margin-top: 0 !important;
        }
    `;
    document.head.appendChild(style);
}

// Run after page load
window.addEventListener('load', hideGoogleTranslateToolbar);
