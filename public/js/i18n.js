(function (window, document) {
    // Add a new language by adding its texts here and to the JSON data files.
    var translations = {
        es: {
            documentTitle: 'AGReg Portfolio',
            language: { label: 'Seleccionar idioma' },
            nav: {
                home: 'Inicio',
                about: 'Sobre mí',
                web: 'Web',
                other: 'Otros',
                skills: 'Habilidades',
                contact: 'Contacto'
            },
            home: {
                role: 'Programador frontend.',
                projects: 'Proyectos',
                contact: 'Contactar'
            },
            about: {
                title: 'Sobre mí',
                description: 'Soy un programador residente al norte de León, centrado en el frontend, como buen autodidacta tengo gran capacidad de adaptación y me mantengo aprendiendo cosas nuevas.<br><br>Di mis primeros pasos programando en Android con Java y Kotlin. He hecho pequeños backends en Go, NestJs y Spring Boot.<br>Empecé en web por mi cuenta usando React y SCSS, tras eso estuve un año trabajando para Talento Solutions usando principalmente Angular y NestJs; apoyado en Docker, Swagger y Git para el trabajo en equipo.<br><br>Actualmente trabajo en Integramedia Digital haciendo tiendas online en un stack híbrido de Vue y .Net y aplicaciones de uso interno en Brazor. También me he acostumbrado a manejar Azure y SQL desde que estoy aquí.'
            },
            sections: {
                web: 'Proyectos web',
                other: 'Otros proyectos',
                skills: 'Habilidades',
                contact: 'Contacto'
            },
            duckLogo: 'Logo de pato AGREG'
        },
        en: {
            documentTitle: 'AGReg Portfolio',
            language: { label: 'Select language' },
            nav: {
                home: 'Home',
                about: 'About me',
                web: 'Web',
                other: 'Other',
                skills: 'Skills',
                contact: 'Contact'
            },
            home: {
                role: 'Frontend developer.',
                projects: 'Projects',
                contact: 'Get in touch'
            },
            about: {
                title: 'About me',
                description: 'I am a developer based in northern León, focused on frontend development. As a self-taught developer, I adapt quickly and keep learning new things.<br><br>I took my first steps programming Android apps with Java and Kotlin. I have also built small backends with Go, NestJS and Spring Boot.<br>I started in web development on my own using React and SCSS. After that, I spent a year working for Talento Solutions, mainly with Angular and NestJS, supported by Docker, Swagger and Git for teamwork.<br><br>I currently work at Integramedia Digital, building online stores with a hybrid Vue and .NET stack and internal-use applications with Blazor. I have also become used to working with Azure and SQL.'
            },
            sections: {
                web: 'Web projects',
                other: 'Other projects',
                skills: 'Skills',
                contact: 'Contact'
            },
            duckLogo: 'AGREG duck logo'
        }
    };
    var getBrowserLanguage = function () {
        var browserLanguage = (navigator.language || 'es').toLowerCase();
        return browserLanguage.indexOf('en') === 0 ? 'en' : 'es';
    };
    var currentLanguage = getBrowserLanguage();
    var getTranslation = function (key) {
        var value = translations[currentLanguage];
        key.split('.').forEach(function (part) {
            value = value && value[part];
        });
        return value || key;
    };
    var applyStaticTranslations = function () {
        document.documentElement.lang = currentLanguage;
        document.title = getTranslation('documentTitle');
        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            element.textContent = getTranslation(element.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
            element.innerHTML = getTranslation(element.getAttribute('data-i18n-html'));
        });
        document.querySelectorAll('[data-i18n-alt]').forEach(function (element) {
            element.setAttribute('alt', getTranslation(element.getAttribute('data-i18n-alt')));
        });
        var languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = currentLanguage;
            languageSelect.setAttribute('aria-label', getTranslation('language.label'));
        }
    };
    var localizeData = function (value) {
        if (Array.isArray(value)) {
            return value.map(localizeData);
        }
        if (value && typeof value === 'object') {
            if (Object.prototype.hasOwnProperty.call(value, 'es') && Object.prototype.hasOwnProperty.call(value, 'en')) {
                return localizeData(value[currentLanguage] || value.es);
            }
            var localizedObject = {};
            Object.keys(value).forEach(function (key) {
                localizedObject[key] = localizeData(value[key]);
            });
            return localizedObject;
        }
        return value;
    };
    var dispatchLanguageChange = function () {
        var event = document.createEvent('Event');
        event.initEvent('languagechange', true, true);
        document.dispatchEvent(event);
    };
    var setLanguage = function (language) {
        currentLanguage = translations[language] ? language : 'es';
        applyStaticTranslations();
        dispatchLanguageChange();
    };
    var languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function (event) {
            setLanguage(event.target.value);
        });
    }
    window.i18n = {
        localizeData: localizeData,
        getLanguage: function () { return currentLanguage; },
        setLanguage: setLanguage
    };
    applyStaticTranslations();
})(window, document);
