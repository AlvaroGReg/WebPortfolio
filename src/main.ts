const myDocument = document as Document;

/*menu*/
const navMenu: HTMLElement = myDocument.getElementById('navM')!;
const navToggle: HTMLElement = myDocument.getElementById('navtoggle')!;
const navClose: HTMLElement = myDocument.getElementById('navclose')!;

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

const themeChange: HTMLElement | null = myDocument.getElementById('light-mode');

// function to toggle between light and dark theme

const toggleTheme = (): void => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// function to set a given theme/color-scheme

const setTheme = (themeName: string) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();

themeChange!.addEventListener('click', toggleTheme);

// SCROLL FIXES IN SECTIONS//

let scrolling: number = 0;
let scrollFlag: number = 1;

window.addEventListener("wheel", function (event: WheelEvent) {
    if (scrollFlag === 1) {
        setTimeout(() => {
            scrollEvent(event)
            scrollFlag = 1;
        }, 500)
        scrollFlag = 0;
    }
});

const scrollEvent = (event: WheelEvent) => {

    if (event.deltaY < 0 && scrolling < 0) {
        scrolling += 100;
    } else if (event.deltaY > 0 && scrolling > -500) {
        scrolling -= 100;
    }
    wrapperScroll(scrolling);
}

function wrapperScroll(sectionPosition: number) {

    scrolling = sectionPosition;

    myDocument.getElementById(
        "wrapper"
    )!.style.transform = 'translateY(' + sectionPosition + 'vh)';

    changeActive(sectionPosition);
}

//SCROLL ACTIVES NAVBAR

const changeActive = (position: number) => {

    let menu: NodeListOf<Element> = myDocument.querySelectorAll("header nav ul a");
    let dots: NodeListOf<Element> = myDocument.querySelectorAll("main div span");

    menu.forEach(element => {
        element.classList.remove('active');
    });

    dots.forEach(element => {
        element.classList.remove('marked');
    });

    switch (position) {

        case 0:
            document.getElementById("sectionhome")!.classList.add('active');
            document.getElementById("dothome")!.classList.add('marked');
            break;
        case -100:
            document.getElementById("sectionabout")!.classList.add('active');
            document.getElementById("dotabout")!.classList.add('marked');
            break;
        case -200:
            document.getElementById("sectionweb")!.classList.add('active');
            document.getElementById("dotweb")!.classList.add('marked');
            break;
        case -300:
            document.getElementById("sectionother")!.classList.add('active');
            document.getElementById("dotother")!.classList.add('marked');
            break;
        case -400:
            document.getElementById("sectionskills")!.classList.add('active');
            document.getElementById("dotskills")!.classList.add('marked');
            break;
        case -500:
            document.getElementById("sectioncontact")!.classList.add('active');
            document.getElementById("dotcontact")!.classList.add('marked');
            break;
    }
}

//ANIMATION ON SCROLL

// Make buttons visible

let buttonsList: NodeListOf<HTMLElement> = myDocument.querySelectorAll('.button');

buttonsList.forEach(element => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visibleanimation');
            }
        })
    })
    observer.observe(element);
});

//Section titles

let titlesList: NodeListOf<HTMLElement> = myDocument.querySelectorAll('.sectiontitle')

titlesList.forEach((elemento) => {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entrada => {
            if (entrada.isIntersecting) {

                entrada.target.classList.add('animation3s');
                entrada.target.classList.add('opacity1');
            }
        })
    })
    observer.observe(elemento);
});