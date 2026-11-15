const langMenuToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementsByClassName('lang-menu')[0];
const langOptions = Array.from(
    document.getElementsByClassName('lang-option')
);


let langMenuOpen = false;
function toggleLangMenu(e) {
    if (!langMenuOpen)
        langMenu.classList.add('active');
    else
        langMenu.classList.remove('active');
    langMenuOpen = !langMenuOpen;
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