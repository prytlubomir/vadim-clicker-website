const langMenuToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementsByClassName('lang-menu')[0];
const langOptions = Array.from(
    document.getElementsByClassName('lang-option')
);


let langMenuOpen = false;
function toggleLangMenu() {
    if (!langMenuOpen)
        langMenu.classList.add('active');
    else
        langMenu.classList.remove('active');
    langMenuOpen = !langMenuOpen;
}

function menuReaction(e) {
    let langShort = e.target.innerText;
    langMenuToggle.innerText = langShort;
    toggleLangMenu();
}

function separateParams(url) {
    const [head, tail] = url.split('?');
    return tail ? tail : '';
}

function savePreference() {
    const urlParams = separateParams(window.location.href);
    console.log("urlparams", urlParams, typeof (urlParams));
    if (urlParams.includes('langselect')) {
        localStorage.setItem('lang', currentLang);
    }
}


savePreference();

// menu interactions
langMenuToggle.onclick = toggleLangMenu;
langOptions.forEach((option) => {
    option.onclick = menuReaction;
});

let toggleText = document.querySelector(
    '#lang .lang-option[value="' + currentLang + '"]'
).innerText;
langMenuToggle.innerText = toggleText;
//