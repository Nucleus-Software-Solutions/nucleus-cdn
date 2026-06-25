/* ===== Nucleus — Apps pages: shared translations + behaviour ===== */

var translations = {
    bs: {
        // Hub
        'hub-badge': 'Portfolio',
        'hub-title-lead': 'Naše',
        'hub-title-grad': 'aplikacije',
        'hub-subtitle': 'Mobilne aplikacije koje razvija Nucleus — dostupne na App Store i Google Play.',
        'card-more': 'Detaljnije',
        // Navigation / footer
        'nav-back': 'Sve aplikacije',
        'footer-home': 'Početna',
        'footer-rights': '© 2026 Nucleus Software Solutions. Sva prava zadržana.',
        'rights-reserved': 'Sva prava zadržana.',
        // Store buttons
        'store-android-sub': 'Dostupno na',
        'store-ios-sub': 'Preuzmite na',
        'store-web-sub': 'Posjetite',
        // eStanar
        'estanar-cat': 'Nekretnine • Najam • Zajednica',
        'estanar-tagline': 'Nekretnine, stanovanje i zajednica — sve na jednom mjestu.',
        'estanar-desc': 'eStanar je sve-u-jednom platforma za nekretnine i upravljanje najmom u Bosni i Hercegovini. Pronađite oglas, vodite dnevnik stanovanja, upravljajte zgradom i komunicirajte sa stanarima — sve iz jedne aplikacije.',
        // Origin
        'origin-cat': 'Skener porijekla proizvoda',
        'origin-tagline': 'Otkrijte zemlju porijekla proizvoda u par sekundi.',
        'origin-desc': 'Origin ima skener barkodova koji omogućava skeniranje barkodova proizvoda i trenutni uvid u zemlju porijekla proizvoda. Time se podstiče transparentnost pri kupovini i pomaže vam da donosite informisanije odluke.',
        // Kur'an
        'quran-title': 'Kur\'an sa prijevodom',
        'quran-cat': 'Kur\'an • Prijevod • Offline',
        'quran-tagline': 'Kur\'an s prijevodom, audio recitacijom i offline pristupom.',
        'quran-desc': 'Kur\'an s prijevodom na bosanski jezik — za čitanje i slušanje, jednostavno i pregledno.'
    },
    en: {
        // Hub
        'hub-badge': 'Portfolio',
        'hub-title-lead': 'Our',
        'hub-title-grad': 'apps',
        'hub-subtitle': 'Mobile apps built by Nucleus — available on the App Store and Google Play.',
        'card-more': 'Learn more',
        // Navigation / footer
        'nav-back': 'All apps',
        'footer-home': 'Home',
        'footer-rights': '© 2026 Nucleus Software Solutions. All rights reserved.',
        'rights-reserved': 'All rights reserved.',
        // Store buttons
        'store-android-sub': 'Get it on',
        'store-ios-sub': 'Download on',
        'store-web-sub': 'Visit',
        // eStanar
        'estanar-cat': 'Real Estate • Rentals • Community',
        'estanar-tagline': 'Real estate, housing and community — all in one place.',
        'estanar-desc': 'eStanar is an all-in-one platform for real estate and rental management in Bosnia and Herzegovina. Find a listing, keep a housing journal, manage your building, and communicate with tenants — all from a single app.',
        // Origin
        'origin-cat': 'Product origin scanner',
        'origin-tagline': 'Discover a product\'s country of origin in seconds.',
        'origin-desc': 'Origin features a barcode scanner that allows users to scan product barcodes and instantly access information about the origin country of the product. This feature promotes transparency in your shopping choices, allowing you to make more informed decisions.',
        // Quran
        'quran-title': 'Quran with Translation',
        'quran-cat': 'Quran • Translation • Offline',
        'quran-tagline': 'The Quran with translation, audio recitation and offline access.',
        'quran-desc': 'The Quran with a Bosnian translation — for reading and listening, simple and clear.'
    }
};

(function () {
    function applyLanguage(lang) {
        if (!translations[lang]) return;

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        var data = translations[lang];
        Object.keys(data).forEach(function (key) {
            document.querySelectorAll('[data-key="' + key + '"]').forEach(function (el) {
                el.textContent = data[key];
            });
        });

        document.documentElement.lang = lang;
        try { localStorage.setItem('nucleus-lang', lang); } catch (e) {}
    }

    // Expose for inline onclick handlers
    window.switchLanguage = applyLanguage;

    document.addEventListener('DOMContentLoaded', function () {
        var saved = 'bs';
        try { saved = localStorage.getItem('nucleus-lang') || 'bs'; } catch (e) {}
        applyLanguage(saved);

        var reveals = document.querySelectorAll('.reveal');
        function reveal() {
            var h = window.innerHeight;
            reveals.forEach(function (el) {
                if (el.getBoundingClientRect().top < h - 80) el.classList.add('active');
            });
        }
        reveal();
        window.addEventListener('scroll', reveal);
    });
})();
