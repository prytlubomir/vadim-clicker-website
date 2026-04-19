const DEBUG = false;

const langMap = {
    en: "index.html",
    uk: "index.ua_uk.html",
};


let currentLang = document.getElementsByTagName("html")[0].getAttribute("lang");
let preferredLang = localStorage.getItem("lang");


function changeLang(lang) {
    if (Object.hasOwn(langMap, lang) && currentLang != lang) {
        window.location.replace(langMap[lang]);
    }
}

function switchToPreferredLang() {
    if (preferredLang != null) {
        if (Object.hasOwn(langMap, preferredLang)) {
            changeLang(preferredLang);
            return true;
        } else if (!DEBUG) {
            localStorage.removeItem('lang');
        }
    }
}

function autoRedirect() {
    if (switchToPreferredLang()) {
        return;
    }
    if (navigator.language.includes("en")) {
        changeLang("en");
    } else if (navigator.language.includes("uk"))
        changeLang("uk");
}


autoRedirect()
// added this comment because without it liveserver adds \ instead, and it breaks the script
