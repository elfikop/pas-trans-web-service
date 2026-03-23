/**
 * PAS-TRANS - Scripts 2026
 * Kompleksowa obsługa strony: Menu, Slider, FAQ, Telefon, News
 */

// --- 1. OBSŁUGA MENU MOBILNEGO ---
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Otwieranie/Zamykanie po kliknięciu w hamburger
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        // Zamknij menu po kliknięciu w konkretny link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });

        // Zamknij menu po kliknięciu gdziekolwiek poza nim
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

    // Tworzenie kropek (dots)
    if (dotsContainer) {
        dotsContainer.innerHTML = ''; 
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    // Pierwsze uruchomienie
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

// Funkcja globalna dla przycisków HTML (onclick="changeSlide")
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
                // Opcjonalnie: zamknij inne otwarte elementy przed otwarciem nowego
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) otherItem.classList.remove('active');
                // });
                
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
            // Jeśli szerokość ekranu jest większa niż 768px (Desktop)
            if (window.innerWidth > 768) {
                const targetSection = document.querySelector('#kontakt');
                
                if (targetSection) {
                    e.preventDefault(); // Blokuje próbę dzwonienia przez system na PC
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            }
            // Na mobile (<= 768px) skrypt nie przerywa działania - przeglądarka normalnie dzwoni
        });
    }
}

// --- 5. SEKCJA AKTUALNOŚCI (Dynamiczne ładowanie) ---
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

// --- 6. INICJALIZACJA WSZYSTKIEGO PO ZAŁADOWANIU DOM ---
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSlider();
    initFAQ(); // Obsługa nowej sekcji pytań i odpowiedzi
    initFloatingPhone();
    loadNews();
});