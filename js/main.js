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

// SCROLL //

let scrolling = 0;
let scrollFlag = 1;

function scrollEvent(event){
  
  if (event.deltaY < 0 && scrolling !== 0) {
      scrolling = parseInt(scrolling) + 100;
  } else if (event.deltaY > 0 && scrolling > -500) {
      scrolling -= 100;
  }
  wrapperScroll(scrolling);
}

window.addEventListener("wheel", function (event) {
  if(scrollFlag === 1){
    setTimeout(()=>{
      scrollEvent(event)
      scrollFlag = 1;
    },500)
    scrollFlag = 0;
  }
});

function wrapperScroll(sectionPosition){
  
    scrolling = sectionPosition;
    document.getElementById(
        "wrapper"
      ).style.transform = 'translateY(' + sectionPosition + 'vh)';
}