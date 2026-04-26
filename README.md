# Pas-Trans Web Service 2026

![Astro](https://img.shields.io/badge/Astro-0C1120?style=for-the-badge&logo=astro&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![SEO](https://img.shields.io/badge/SEO-Optimized-success?style=for-the-badge)

##  O projekcie
**Pas-Trans Web Service** to nowoczesna witryna internetowa zrealizowana dla firmy transportowej Pas-Trans Marcin Pastuch, działającej w Gryfowie Śląskim i na terenie całego Dolnego Śląska. 

Serwis został zaprojektowany jako kompleksowa wizytówka firmy, oferująca informacje o flocie, aktualnych rozkładach jazdy oraz możliwościach kontaktu dla klientów indywidualnych i biznesowych. Jako twórca postawiłem na maksymalną wydajność (SSG), doskonałe wskaźniki Core Web Vitals oraz pełną automatyzację procesu wdrażania (CI/CD).

 **Live demo:** [autokarypastrans.pl](https://autokarypastrans.pl)

---

##  Tech Stack i Integracje

* **Framework / SSG:** [Astro](https://astro.build/) - generowanie szybkich stron statycznych (Static Site Generation), optymalizacja ładowania i architektura komponent]owa.
* **Technologie bazowe:** HTML5 (semantyczny), CSS3 (Zmienne CSS, Flexbox/Grid, animacje), JavaScript (ES6+ Vanilla JS).
* **CI/CD:** GitHub Actions (automatyczny deploy FTP).
* **Narzędzia zewnętrzne:** * Google Tag Manager (ID: G-PV4Y1JJETK) i Google Analytics.
  * Elfsight (dynamiczne wyświetlanie opinii Google).
  * Fontello (dedykowany plik `config.json` z ikonami m.in. telefonu, mapy, Facebooka).
* **Typografia:** Lato oraz Josefin Sans (Google Fonts).

---

##  Kluczowe funkcjonalności oraz implementacje

Projekt udowadnia moją zdolność łączenia celów biznesowych z nowoczesnymi rozwiązaniami inżynieryjnymi:

1. **Architektura Komponentowa i SSG (Astro):** Strona główna (zawierająca sekcje: Hero, Opinie, Oferta, Galeria, O nas oraz Kontakt) została podzielona na komponenty. Dodatkowo zaimplementowałem dedykowane, generowane statycznie landing page'e dla poszczególnych miast (np. `Boleslawiec.astro`, `Zgorzelec.astro`), co maksymalizuje widoczność w lokalnych wynikach wyszukiwania.
2. **Autorskie rozwiązania UI/UX (Vanilla JS):**
   * **Interaktywny Slider:** Stworzony od zera mechanizm prezentacji floty z obsługą płynnych animacji przejść i nawigacją kropkową.
   * **Floating Phone (Pełna responsywność):** Inteligentny przycisk połączenia telefonicznego. Na urządzeniach mobilnych działa jako szybkie wywołanie numeru, a na komputerach desktopowych płynnie przewija (smooth scroll) do sekcji kontaktowej.
3. **Dynamiczne ładowanie treści (Fetch API):**
   Sekcja "Aktualności" wykorzystuje asynchroniczne pobieranie danych (Fetch API) z zewnętrznych plików HTML, co pozwala na dynamiczne odświeżanie treści bez przeładowywania całej witryny.
4. **Zaawansowane SEO (Metatagi i Schema.org):**
   Wykorzystałem metatagi Open Graph oraz dane strukturalne JSON-LD typu `BusReservationService`, co bezpośrednio ułatwia wyszukiwarkom poprawne klasyfikowanie lokalnych usług transportowych firmy. Zajmuję się również indeksowaniem stron w `Google Search Console` oraz optymalizacją strony dla robotów Google.
5. **Automatyzacja CI/CD:**
   Konfiguracja przepływu pracy w GitHub Actions (`deploy.yml`). Każdy kod włączony do gałęzi `main` jest automatycznie budowany i bezpiecznie wysyłany na serwer produkcyjny.
5. **Opracowanie systemu zarządzania Cookies:**
   Po wejściu na stronę użytkownik proszony jest o wyrażenie zgody na cookies oraz politykę prywatności. Komponent (`CookieBanner.astro` oraz skrypt `/public/js/script.js`). Pliki Śledzące ruch w witrynie oraz widget opinii Google od Elfsight uruchamiają się jedynie pod warunkiem zakceptowania zgód. Użytkownik równie łatwo ma możliwość wycofania zgody na cookies, co automatycznie usuwa pliki śledzące zapisane w przeglądarce.
5. **Dług Projektowy:**
   Projekt Serwisu internetowego w miare tworzenia i poznawania frameworku astro dąży do zminimalizowania długu projektowego który zdecydowanie istniał przed rozpoczęciem refaktoryzacji do astro. W miarę upływu czasu projekt dzieli się na coraz więcej spójnych komponentów identycznych dla każdej z poodston, co ułatwia rozbudowywanie serwisu o nowe treśći.
5. **Administracja serwerem WWW,Poczty,FTP:**
   Tworząc serwis interneowy, poza implementacją funkcjonalnośći w kodzie i rozwojem serwisu, zarządzam wspomnianą już wcześniej domeną [autokarypastrans.pl](https://autokarypastrans.pl). Poznałem narzędzia obsługi poczty, przekierowania maili oraz automatyzacji ich wysyłania przez lokalnie napisane programy w python w oparciu o rejestry placówek oświatowych w Polsce w formacie CSV, Obsługa i automatyzacja aktualizowania witryny przez serwer FTP - wspomniana już wcześniej, generowanie certyfikatów SSL, konfiguracja pliku `.htaccess`, Konfiguracja i aktualizacja plików sitemap.

---

##  Informacje o flocie i usługach klienta

Konstrukcja serwisu została dostosowana do prezentacji szerokiego zakresu usług transportowych firmy Pas-Trans:
* **Wynajem autokarów:** Prezentacja pojazdów marki Scania oraz luksusowych busów Mercedes (do 26 osób).
* **Przewozy szkolne i pracownicze:** Dedykowana sekcja z systemem pobierania rozkładów jazdy (PDF) dla obsługiwanych linii, m.in. na trasach *Zgorzelec – Lubań – Gryfów Śląski* oraz *Miłoszów – Leśna – Lubań*.
* **Wypożyczalnia busów:** Moduł informacyjny o wynajmie nowoczesnych pojazdów 9-osobowych (kategoria B).

---

##  Architektura Projektu

Choć kod źródłowy opiera się o nowoczesne środowisko Astro, utrzymuje logiczny i przyjazny podział plików:

```text
├── public/                # Zasoby statyczne (pliki PDF z rozkładami, ikony Fontello config.json)
│   └── js/scripts.js      # Logika frontendowa (menu mobilne, slider, Fetch API dla newsów)
├── src/
│   ├── assets/            # Zoptymalizowane zdjęcia floty (.webp/.jpg)
│   ├── components/        # Modułowe komponenty interfejsu (.astro)
│   ├── pages/             # Struktura routingu (index.astro, strony miast dla SEO)
│   └── styles/style.css   # Arkusz stylów (zmienne globalne CSS, Flexbox/Grid, animacje)
├── astro.config.mjs       # Konfiguracja Astro (m.in. integracja sitemap)
└── deploy.yml             # Skrypt wdrożeniowy GitHub Actions
**Informacje prawne**

* Wszystkie treści zamieszczone w serwisie, w tym zdjęcia floty i znaki graficzne, podlegają ochronie prawnej i należą do właściciela firmy Pas-Trans. Szczegółowe zasady korzystania z usług określa dołączony regulamin w formacie PDF.

**Copyright 2026 Pas-Trans Marcin Pastuch. Projekt i realizacja: Seweryn Pastuch/elfikop**
