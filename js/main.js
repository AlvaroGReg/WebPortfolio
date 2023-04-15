/*menu*/
const navMenu = document.getElementById('navM'),
    navToggle = document.getElementById('navtoggle'),
    navClose = document.getElementById('navclose');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

//THEMES

const themeChange = document.getElementById('light-mode')

themeChange.addEventListener('click', toggleTheme)

// function to set a given theme/color-scheme

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();

// SCROLL FIXES IN SECTIONS//

let scrolling = 0;
let scrollFlag = 1;

window.addEventListener("wheel", function (event) {
    if (scrollFlag === 1) {
        setTimeout(() => {
            scrollEvent(event)
            scrollFlag = 1;
        }, 500)
        scrollFlag = 0;
    }
});

function scrollEvent(event) {

    if (event.deltaY < 0 && scrolling < 0) {
        scrolling = parseInt(scrolling) + 100;
    } else if (event.deltaY > 0 && scrolling > -500) {
        scrolling -= 100;
    }
    wrapperScroll(scrolling);
}

function wrapperScroll(sectionPosition) {
 
    scrolling = sectionPosition;
    document.getElementById(
        "wrapper"
    ).style.transform = 'translateY(' + sectionPosition + 'vh)';

    changeActive(sectionPosition);
}

//SCROLL ACTIVES NAVBAR


function changeActive(position) {

    let menu = document.querySelectorAll("header nav ul a");
    let dots = document.querySelectorAll("main div span");

    menu.forEach(element => {
        element.classList.remove('active');
    });

    dots.forEach(element => {
        element.classList.remove('marked');
    });

    switch (parseInt(position)) {

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
}

//ANIMATION ON SCROLL

// Make buttons visible
Array.from(document.querySelectorAll('.button')).forEach(element => {

    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('visibleanimation');
            }
        })
    })
    observer.observe(element);
});

//Section titles

Array.from(document.querySelectorAll('.sectiontitle')).forEach(element => {

    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.animation  = "write 3s";
                entry.target.style.opacity  = "1";
            }
        })
    })
    observer.observe(element);
});