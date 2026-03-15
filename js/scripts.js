// --- SEKCJA SLIDERA ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');

// Tworzenie kropek dynamicznie (tylko jeśli istnieje kontener na kropki)
if (dotsContainer) {
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => showSlide(i);
        dotsContainer.appendChild(dot);
    });
}

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (slides.length === 0) return; // Zabezpieczenie przed brakiem slajdów

    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

// --- SEKCJA AKTUALNOŚCI ---
function loadNews() {
    const newsContainer = document.getElementById('miejsce-na-posty'); // Musi być zgodne z index.html
    if (!newsContainer) return; 

    // Pobieranie treści z pliku zewnętrznego
    fetch('./aktualnosci/post.html') 
        .then(response => {
            if (!response.ok) throw new Error('Status: ' + response.status);
            return response.text();
        })
        .then(data => {
            newsContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Błąd ładowania aktualności:', error);
            newsContainer.innerHTML = '<p>Błąd ładowania treści: ' + error.message + '</p>';
        });
}

// --- OBSŁUGA MENU MOBILNEGO ---
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Otwieranie/Zamykanie menu po kliknięciu w hamburgera
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Zamknięcie menu po kliknięciu w dowolny link (ważne przy nawigacji do kotwic #)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }
}

// --- INICJALIZACJA WSZYSTKIEGO PO ZAŁADOWANIU STRONY ---
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);      // Uruchom slider
    loadNews();        // Załaduj aktualności
    initMobileMenu();  // Inicjalizuj menu dla telefonów
});