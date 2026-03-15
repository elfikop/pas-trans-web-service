/**
 * PAS-TRANS - Scripts
 */

// --- OBSŁUGA MENU MOBILNEGO ---
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Otwieranie/Zamykanie po kliknięciu w hamburger
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Zapobiega propagacji do document.click
            navLinks.classList.toggle('active');
            
            // Opcjonalnie: zmiana animacji hamburgera, jeśli masz klasę .is-active
            menuToggle.classList.toggle('is-active');
        });

        // Zamknij menu po kliknięciu w konkretny link (ważne na mobile)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });

        // Zamknij menu po kliknięciu gdziekolwiek POZA menu i przyciskiem
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

// --- SEKCJA SLIDERA ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');

function initSlider() {
    if (slides.length === 0) return;

    // Tworzenie kropek (dots) jeśli kontener istnieje
    if (dotsContainer) {
        dotsContainer.innerHTML = ''; // Czyścimy na wszelki wypadek
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    // Pokaż pierwszy slajd
    showSlide(0);

    // Opcjonalnie: Automatyczne przewijanie co 5 sekund
    // setInterval(() => changeSlide(1), 5000);
}

function showSlide(n) {
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    // Usuwanie klas active ze wszystkich slajdów i kropek
    slides.forEach(slide => slide.classList.remove('active'));
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
    }

    // Dodawanie klasy active do aktualnego
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

// --- SEKCJA AKTUALNOŚCI ---
function loadNews() {
    const newsContainer = document.getElementById('miejsce-na-posty');
    if (!newsContainer) return;

    fetch('./aktualnosci/post.html')
        .then(response => {
            if (!response.ok) throw new Error('Błąd ładowania pliku: ' + response.status);
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

// --- INICJALIZACJA WSZYSTKICH FUNKCJI ---
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSlider();
    loadNews();
});