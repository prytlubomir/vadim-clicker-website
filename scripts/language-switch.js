/**
 * This script powers the UI element for switching user's language preference
 */

const langMenuToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementsByClassName('lang-menu')[0];
const langOptions = Array.from(
    document.getElementsByClassName('lang-option')
);


function positionMenu() {
    let threshold = window.innerHeight / 2;
    if (window.scrollY < threshold)
        langMenu.classList.add('top');
    else
        langMenu.classList.remove('top');
}

function toggleLangMenu(e) {
    positionMenu();
    langMenu.classList.toggle('active');
}

function switchLanguage(e) {
    let langISO = e.target.getAttribute('value');
    let langShort = e.target.innerText;
    langMenuToggle.innerText = langShort;
    toggleLangMenu(e);
    preferredLang = langISO;
    localStorage.setItem('lang', preferredLang);
    switchToPreferredLang();
}


langMenuToggle.onclick = toggleLangMenu;
langOptions.forEach((option) => {
    option.onclick = switchLanguage;
});

let toggleText = document.querySelector(
    '#lang .lang-option[value="' + currentLang + '"]'
).innerText;
langMenuToggle.innerText = toggleText;
//