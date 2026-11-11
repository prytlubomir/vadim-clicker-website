const DEBUG = false;

const langMap = {
    en: "/",
    uk: "/pages/index.ua_uk.html",
};


let currentLang = document.getElementsByTagName("html")[0].getAttribute("lang");
let preferredLang = localStorage.getItem("lang");


function changeLang(lang) {
    if (Object.hasOwn(langMap, lang) && currentLang != lang) {
        window.location.replace(langMap[lang]);
    }
}

function switchToPreferredLang() {
    if (DEBUG) {
        console.log('debug mode on');
        localStorage.removeItem('lang');
    }
    if (preferredLang != null) {
        if (Object.hasOwn(langMap, preferredLang)) {
            changeLang(preferredLang);
            return true;
        }
    }
}

function compareLangCodes(lang1, lang2) {
    return lang1.includes(lang2) || lang2.includes(lang1);
}

function autoPickLang() {
    const supportedLanguages = Object.keys(langMap);

    navigator.languages.every(browserLang => {
        if (compareLangCodes(browserLang, currentLang)) {
            return false;
        }
        supportedLanguages.forEach(localization => {
            if (compareLangCodes(browserLang, localization)) {
                changeLang(localization);
            }
        });
    });
}

function autoRedirect() {
    if (switchToPreferredLang()) {
        return;
    }
    autoPickLang();
}


autoRedirect()
// added this comment because without it liveserver adds \ instead, and it breaks the script
