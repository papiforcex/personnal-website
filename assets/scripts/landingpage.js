var lang = getCookie("language") != null && getCookie("language") != "undefined" ? getCookie("language") : "en";

$(document).ready(() => {
    updateLang(lang);
    document.addEventListener("click", (event) => {
        const element = event.composedPath()[0]["type"] == "button" && event.composedPath()[0]["name"] == "lang" ? event.composedPath()[0] : null;
        if (element != null) {
            if (lang == element["value"]) {
                const background = document.getElementById("wallpaper");
                const panel = document.getElementById("container");

                background.style.animation = "wallLowSaturation linear 1s";
                panel.style.animation = "paneLowSaturation linear 1s";

                setTimeout(() => {
                    background.style.filter = "saturate(0) opacity(0)";
                    panel.style.filter = "saturate(0)";

                    panel.style.animation = "panelHider linear 1s";
                    
                    setTimeout(() => {
                        window.open(`./${lang}/`, "_self");
                    }, .9 * 1000);
                }, .9 * 1000);
            } else {
                updateLang(element["value"]);
            }
        }
    });
});

/**
 * ## Création de cookies
 * Cette fonction permet de créer un cookie.
 * @param {string} name Nom du cookie
 * @param {string} value Valeur du cookie
 * @param {number} expirationDay Durée de vie (en jours)
 */
function setCookie(name, value, expirationDay) {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + (expirationDay * 24 * 60 * 60 * 1000));
    document.cookie = `${name} = ${value}; expires = ${currentDate.toUTCString()}; path = /`;
}

/**
 * ## Récupération de cookie
 * Cette fonction permet de récupérer un cookie par son nom.
 * @param {string} cname Nom du cookie
 * @returns Notre cookie
 */
function getCookie(cname) {
    const name = `${cname}=`;
    const cookies = decodeURIComponent(document.cookie).split(';');

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

/**
 * ## Mise à jour des droits d'auteurs
 * Cette fonction permet de mettre à jour les droits d'auteurs
 * selon la date actuelle et la langue seléctionnée par l'utilisateur.
 * @param {string} websiteAuthor 
 * @param {string} backgroundAuthor 
 */
function updateCopy(websiteAuthor = "All rights reserved", backgroundAuthor = "Background image by") {
    const backgroundArtist = {
        name: "vectorpouch",
        website: "freepik.com",
        url: "https://www.freepik.com/free-vector/girl-with-mother-night-christmas-ice-rink-with-decorated-fir-tree-lights-cartoon-illustration_6929217.htm"
    }

    document.getElementById("copyright").innerHTML = `©2019-${new Date().getFullYear()} Papi Force X. ${websiteAuthor}.`;

    const paragraph = document.getElementById("bg_copyright");
    paragraph.innerHTML = `©${backgroundAuthor} `;

    const link = document.createElement("a");
    link.setAttribute("href", backgroundArtist.url);
    link.setAttribute("target", "_blank");
    link.innerHTML = `${backgroundArtist.name} ${lang == "en" ? "on" : "sur"} ${backgroundArtist.website}`;

    paragraph.appendChild(link);
}

/**
 * ## Mise à jour de la langue
 * Cette fonction permet de mettre à jour les informations
 * affichées sur le site en fonction des choix linguistiques
 * de l'utilisateur.
 */
function updateLang(language) {
    fetch('./assets/datas/langs.json')
        .then((result) => {
            if (result.ok) {
                result.json().then((page) => {
                    for (const button of document.getElementsByTagName("button")) {
                        button.value == "fr" ? button.innerHTML = page.landing.buttons.french[language] : button.innerHTML = page.landing.buttons.english[language];
                    }
                    document.getElementsByTagName("h3")[0].innerHTML = page.landing.subtitle[language].slice(0, 31);
                    document.getElementsByTagName("p")[0].innerHTML = page.landing.languages[language];
                    updateCopy(page.landing.copyrights.footer[language], page.landing.copyrights.background[language]);
                });
                setCookie("language", language, 3);
                lang = language;
            } else {
                alert("Une erreur est survenu lors du chargement des informations linguistiques, merci de recharger la page et de réessayer.")
            }
        });
}