var myDocument = document;
/*menu*/
var navMenu = myDocument.getElementById('navM');
var navToggle = myDocument.getElementById('navtoggle');
var navClose = myDocument.getElementById('navclose');
if (navToggle) {
    navToggle.addEventListener('click', function () {
        navMenu.classList.add('show-menu');
    });
}
if (navClose) {
    navClose.addEventListener('click', function () {
        navMenu.classList.remove('show-menu');
    });
}
//THEMES
var themeChange = myDocument.getElementById('light-mode');
// function to toggle between light and dark theme
var toggleTheme = function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    }
    else {
        setTheme('theme-dark');
    }
};
// function to set a given theme/color-scheme
var setTheme = function (themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
};
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    }
    else {
        setTheme('theme-light');
    }
})();
themeChange.addEventListener('click', toggleTheme);
// SCROLL FIXES IN SECTIONS//
var scrolling = 0;
var scrollFlag = 1;
window.addEventListener("wheel", function (event) {
    if (scrollFlag === 1) {
        setTimeout(function () {
            scrollEvent(event);
            scrollFlag = 1;
        }, 500);
        scrollFlag = 0;
    }
});
var scrollEvent = function (event) {
    if (event.deltaY < 0 && scrolling < 0) {
        scrolling += 100;
    }
    else if (event.deltaY > 0 && scrolling > -500) {
        scrolling -= 100;
    }
    wrapperScroll(scrolling);
};
function wrapperScroll(sectionPosition) {
    scrolling = sectionPosition;
    myDocument.getElementById("wrapper").style.transform = 'translateY(' + sectionPosition + 'vh)';
    changeActive(sectionPosition);
}
//SCROLL ACTIVES NAVBAR
var changeActive = function (position) {
    var menu = myDocument.querySelectorAll("header nav ul a");
    var dots = myDocument.querySelectorAll("main div span");
    menu.forEach(function (element) {
        element.classList.remove('active');
    });
    dots.forEach(function (element) {
        element.classList.remove('marked');
    });
    switch (position) {
        case 0:
            document.getElementById("sectionhome").classList.add('active');
            document.getElementById("dothome").classList.add('marked');
            break;
        case -100:
            document.getElementById("sectionabout").classList.add('active');
            document.getElementById("dotabout").classList.add('marked');
            break;
        case -200:
            document.getElementById("sectionweb").classList.add('active');
            document.getElementById("dotweb").classList.add('marked');
            break;
        case -300:
            document.getElementById("sectionother").classList.add('active');
            document.getElementById("dotother").classList.add('marked');
            break;
        case -400:
            document.getElementById("sectionskills").classList.add('active');
            document.getElementById("dotskills").classList.add('marked');
            break;
        case -500:
            document.getElementById("sectioncontact").classList.add('active');
            document.getElementById("dotcontact").classList.add('marked');
            break;
    }
};
//ANIMATION ON SCROLL
// Make buttons visible
var buttonsList = myDocument.querySelectorAll('.button');
buttonsList.forEach(function (element) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visibleanimation');
            }
        });
    });
    observer.observe(element);
});
//Section titles
var titlesList = myDocument.querySelectorAll('.sectiontitle');
titlesList.forEach(function (elemento) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animation3s');
                entrada.target.classList.add('opacity1');
            }
        });
    });
    observer.observe(elemento);
});
