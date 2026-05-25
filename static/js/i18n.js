document.addEventListener('DOMContentLoaded', () => {
    let translations = {};
    const langSelector = document.getElementById('lang-selector');

    fetch('/static/js/i18n.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            const savedLang = localStorage.getItem('lang') || 'en';
            applyLanguage(savedLang);
            if (langSelector) langSelector.value = savedLang;
        });

    function applyLanguage(lang) {
        // Find elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // If it's an option in a select, update it
                if (el.tagName === 'OPTION') {
                    el.innerText = translations[lang][key];
                } else {
                    // For other elements, check if we need to replace inner text 
                    // without destroying children like icons
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                            node.textContent = translations[lang][key];
                        }
                    });
                }
            }
        });
        localStorage.setItem('lang', lang);
    }

    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });
    }
});
