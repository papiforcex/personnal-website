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
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

var lang = getCookie("language") != null ? getCookie("language") : "en";

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
function updateLang() {
    fetch('./assets/datas/langs.json')
        .then((result) => {
            if (result.ok) {
                result.json().then((page) => {
                    for (const button of document.getElementsByTagName("button")) {
                        button.value == "fr" ? button.innerHTML = page.landing.buttons.french[lang] : button.innerHTML = page.landing.buttons.english[lang];
                    }
                    document.getElementsByTagName("h3")[0].innerHTML = page.landing.subtitle[lang].slice(0, 31);
                    document.getElementsByTagName("p")[0].innerHTML = page.landing.languages[lang];
                    updateCopy(page.landing.copyrights.footer[lang], page.landing.copyrights.background[lang]);
                });
                setCookie("language", lang, 3);
            } else {
                alert("Une erreur est survenu lors du chargement des informations linguistiques, merci de recharger la page et de réessayer.")
            }
        });
}

$(document).ready(() => {
    document.addEventListener("click", (event) => {
        const element = event.composedPath()[0]["type"] == "button" && event.composedPath()[0]["name"] == "lang" ? event.composedPath()[0] : null;
        if (element != null) {
            if (lang == element["value"]) {
                window.open(`./${lang}/`, "_self");
            } else {
                lang = element["value"];
                updateLang();
            }
        }
    });
});
