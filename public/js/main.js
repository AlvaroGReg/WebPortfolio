var myDocument = document;
var i18n = window.i18n;
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

var renderWebProjects = function (data) {
    var container = document.getElementById('web-projects-container');
    if (!container) {
        return;
    }

    data = i18n.localizeData(data);

    container.innerHTML = data.items.map(function (item, index) {
        return "<article class=\"article" + (index + 1) + "\">\n" +
            "<div class=\"visiblediv\">\n" +
            "<img src=\"" + item.image + "\" alt=\"" + item.alt + "\">\n" +
            "</div>\n" +
            "<div class=\"invisiblediv\">\n" +
            "<p>" + item.description + "</p>\n" +
            "<a href=\"" + item.url + "\" target=\"_blank\">" + item.linkText + " &gt;</a>\n" +
            "</div>\n" +
            "</article>";
    }).join('');

    var sectionTitle = container.closest('section').querySelector('.sectiontitle');
    if (sectionTitle) {
        sectionTitle.textContent = data.sectionTitle;
    }
};

var renderOtherProjects = function (data) {
    var container = document.getElementById('other-projects-container');
    if (!container) {
        return;
    }

    data = i18n.localizeData(data);

    container.innerHTML = data.items.map(function (item) {
        return "<article>\n" +
            "<div class=\"visiblediv\">\n" +
            "<img src=\"" + item.image + "\" alt=\"" + item.alt + "\">\n" +
            "</div>\n" +
            "<div class=\"invisiblediv\">\n" +
            "<p>" + item.description + "</p>\n" +
            "<a href=\"" + item.url + "\" target=\"_blank\">" + item.linkText + " &gt;</a>\n" +
            "</div>\n" +
            "</article>";
    }).join('');

    var sectionTitle = container.closest('section').querySelector('.sectiontitle');
    if (sectionTitle) {
        sectionTitle.textContent = data.sectionTitle;
    }
};

var renderSkills = function (data) {
    var container = document.getElementById('skills-container');
    if (!container) {
        return;
    }

    data = i18n.localizeData(data);

    container.innerHTML = data.items.map(function (item) {
        return "<div class=\"skillsitem\">\n" +
            "<img src=\"" + item.icon + "\" alt=\"" + item.alt + "\">\n" +
            "<p>" + item.name + "</p>\n" +
            "</div>";
    }).join('');

    var sectionTitle = container.closest('section').querySelector('.sectiontitle');
    if (sectionTitle) {
        sectionTitle.textContent = data.sectionTitle;
    }
};

var renderContact = function (data) {
    var container = document.getElementById('contact-container');
    if (!container) {
        return;
    }

    data = i18n.localizeData(data);

    container.innerHTML = data.items.map(function (item) {
        return "<a href=\"" + item.url + "\" target=\"_blank\">\n" +
            "<div class=\"socialmediaitem\">\n" +
            "<img src=\"" + item.icon + "\" alt=\"" + item.alt + "\">\n" +
            "<p>" + item.name + "</p>\n" +
            "</div>\n" +
            "</a>";
    }).join('');

    var sectionTitle = container.closest('section').querySelector('.sectiontitle');
    if (sectionTitle) {
        sectionTitle.textContent = data.sectionTitle;
    }
};

var localizedDataSources = {};
var loadJsonData = function (url, renderFunction) {
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Unable to load ' + url);
            }
            return response.json();
        })
        .then(function (data) {
            localizedDataSources[url] = {
                data: data,
                renderFunction: renderFunction
            };
            renderFunction(data);
        })
        .catch(function (error) {
            console.error(error);
        });
};

var renderLocalizedData = function () {
    Object.keys(localizedDataSources).forEach(function (url) {
        var source = localizedDataSources[url];
        source.renderFunction(source.data);
    });
};
myDocument.addEventListener('languagechange', renderLocalizedData);
loadJsonData('data/web-projects.json', renderWebProjects);
loadJsonData('data/other-projects.json', renderOtherProjects);
loadJsonData('data/skills.json', renderSkills);
loadJsonData('data/contact.json', renderContact);

// SCROLL FIXES IN SECTIONS//
var scrolling = 0;
var scrollFlag = 1;
var sectionPositions = {
    home: 0,
    about: -100,
    web: -200,
    other: -300,
    skills: -400,
    contact: -500
};
var sectionIdByPosition = {
    0: 'home',
    '-100': 'about',
    '-200': 'web',
    '-300': 'other',
    '-400': 'skills',
    '-500': 'contact'
};
var isMobileViewport = function () {
    return window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
var getSectionIdFromPosition = function (position) {
    var normalizedPosition = String(position);
    return sectionIdByPosition[normalizedPosition] || 'home';
};
var updateActiveState = function (sectionId) {
    var menu = myDocument.querySelectorAll("header nav ul a");
    var dots = myDocument.querySelectorAll("main .margindots .dot");
    menu.forEach(function (element) {
        element.classList.remove('active');
    });
    dots.forEach(function (element) {
        element.classList.remove('marked');
    });

    var menuTarget = document.getElementById("section" + sectionId);
    var dotTarget = document.getElementById("dot" + sectionId);

    if (menuTarget) {
        menuTarget.classList.add('active');
    }
    if (dotTarget) {
        dotTarget.classList.add('marked');
    }
};
var changeActive = function (position) {
    var sectionId = getSectionIdFromPosition(position);
    updateActiveState(sectionId);
};
var scrollToSection = function (sectionId) {
    var targetSection = document.getElementById(sectionId);
    if (!targetSection) {
        return;
    }

    if (isMobileViewport()) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateActiveState(sectionId);
        return;
    }

    var targetPosition = sectionPositions[sectionId];
    if (targetPosition === undefined) {
        return;
    }

    wrapperScroll(targetPosition);
};
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
    var parsedPosition = parseInt(sectionPosition, 10);
    if (isMobileViewport()) {
        var mobileSectionId = getSectionIdFromPosition(parsedPosition);
        scrollToSection(mobileSectionId);
        return;
    }

    scrolling = parsedPosition;
    var wrapper = myDocument.getElementById("wrapper");
    if (wrapper) {
        wrapper.style.transform = 'translateY(' + parsedPosition + 'vh)';
    }
    changeActive(parsedPosition);
}
window.addEventListener('wheel', function (event) {
    if (isMobileViewport()) {
        return;
    }

    if (scrollFlag === 1) {
        setTimeout(function () {
            scrollEvent(event);
            scrollFlag = 1;
        }, 500);
        scrollFlag = 0;
    }
}, { passive: true });
window.addEventListener('resize', function () {
    if (isMobileViewport()) {
        return;
    }
    wrapperScroll(scrolling);
});
var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var sectionId = entry.target.id;
            updateActiveState(sectionId);
        }
    });
}, { threshold: 0.4 });
document.querySelectorAll('main section').forEach(function (section) {
    sectionObserver.observe(section);
});
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
