/**
 * PAS-TRANS - Scripts 2026
 * Kompleksowa obsługa strony: Menu, Slider, FAQ, Telefon, News, Cookies
 */

// --- 1. OBSŁUGA MENU MOBILNEGO ---
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });

        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navLinks.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);

            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            }
        });
    }
}

// --- 2. SEKCJA SLIDERA ---
let slideIndex = 0;

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer');

    if (slides.length === 0) return;

    if (dotsContainer) {
        dotsContainer.innerHTML = ''; 
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    showSlide(0);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;

    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

window.changeSlide = function(n) {
    showSlide(slideIndex + n);
};

// --- 3. SEKCJA FAQ (HARMONIJKA) ---
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
}

// --- 4. INTELIGENTNY PRZYCISK TELEFONU (PC: Scroll / Mobile: Call) ---
function initFloatingPhone() {
    const phoneBtn = document.querySelector('.floating-phone-btn');
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                const targetSection = document.querySelector('#kontakt');
                
                if (targetSection) {
                    e.preventDefault(); 
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    }
}

// --- 5. SEKCJA AKTUALNOŚCI ---
function loadNews() {
    const newsContainer = document.getElementById('miejsce-na-posty');
    if (!newsContainer) return;

    fetch('./aktualnosci/post.html')
        .then(response => {
            if (!response.ok) throw new Error('Status: ' + response.status);
            return response.text();
        })
        .then(data => {
            newsContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Błąd newsów:', error);
            newsContainer.innerHTML = '<p style="text-align:center;">Nie udało się załadować aktualności.</p>';
        });
}

// --- 6. OBSŁUGA PLIKÓW COOKIES I SKRYPTÓW ŚLEDZĄCYCH ---

/**
 * Funkcja wycofująca zgodę (Reset)
 */
function resetCookieConsent(e) {
    if (e) e.preventDefault();
    
    // 1. Czyszczenie localStorage (to już działa)
    localStorage.removeItem('pasTransCookieConsent');
    
    // 2. Rozszerzone czyszczenie ciasteczek
    const cookies = document.cookie.split(";");
    const domain = window.location.hostname;
    const mainDomain = domain.substring(domain.lastIndexOf(".", domain.lastIndexOf(".") - 1));

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        // Lista typowych nazw ciasteczek śledzących
        if (name.includes("_ga") || name.includes("_gid")|| name.includes("_ga_PV4Y1JJETK") || name.includes("_gat") || name.includes("elfsight")) {
            // Próba usunięcia dla bieżącej domeny
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            // Próba usunięcia dla domeny głównej (z kropką)
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + domain;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + mainDomain;
        }
    }
    
    // 3. Przeładowanie strony
    location.reload();
}

function activateTrackingScripts() {
    const scripts = document.querySelectorAll('script.opt-in');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        
        newScript.type = 'text/javascript';
        newScript.innerHTML = oldScript.innerHTML;
        
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const resetLink = document.querySelector('.cookie-reset-link'); // Link w footerze

    if (resetLink) {
        resetLink.addEventListener('click', resetCookieConsent);
    }

    if (!banner || !acceptBtn || !rejectBtn) return;

    const cookieConsent = localStorage.getItem('pasTransCookieConsent');

    if (cookieConsent === 'accepted') {
        activateTrackingScripts();
    } 
    else if (!cookieConsent) {
        banner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('pasTransCookieConsent', 'accepted');
        banner.style.display = 'none';
        activateTrackingScripts();
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('pasTransCookieConsent', 'rejected');
        banner.style.display = 'none';
    });
}

// --- 7. INICJALIZACJA WSZYSTKIEGO PO ZAŁADOWANIU DOM ---
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSlider();
    initFAQ();
    initFloatingPhone();
    loadNews();
    initCookieBanner();
});