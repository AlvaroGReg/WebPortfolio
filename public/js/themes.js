(function () {
    var systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    var applyTheme = function (themeName) {
        document.documentElement.classList.remove('theme-dark', 'theme-light');
        document.documentElement.classList.add(themeName);
    };

    var getPreferredTheme = function () {
        return localStorage.getItem('theme') || (systemColorScheme.matches ? 'theme-dark' : 'theme-light');
    };

    var setTheme = function (themeName) {
        localStorage.setItem('theme', themeName);
        applyTheme(themeName);
    };

    var toggleTheme = function () {
        setTheme(document.documentElement.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark');
    };

    // Apply the theme before styles are rendered to prevent a flash of the wrong theme.
    applyTheme(getPreferredTheme());

    var handleSystemThemeChange = function (event) {
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'theme-dark' : 'theme-light');
        }
    };

    if (systemColorScheme.addEventListener) {
        systemColorScheme.addEventListener('change', handleSystemThemeChange);
    }
    else if (systemColorScheme.addListener) {
        systemColorScheme.addListener(handleSystemThemeChange);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var themeChange = document.getElementById('light-mode');
        if (themeChange) {
            themeChange.addEventListener('click', toggleTheme);
        }
    });
})();
