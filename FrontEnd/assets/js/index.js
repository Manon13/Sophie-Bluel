/**
 * Vérifie si l'utilisateur est connecté en vérifiant la présence d'un jeton dans le localStorage.
 * Si l'utilisateur est connecté, cela masque le bouton de connexion et affiche le bouton de déconnexion.
**/
export function checkUserLogin() {
    const token = localStorage.getItem("token");
    if (token) {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    }
};

/** Déconnecte l'utilisateur en supprimant le jeton d'authentification du stockage local
 * et redirige vers la page de connexion.
**/
export function logout() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("token");
        document.location.href = "./login.html";
    });
};

/**
 * Active le mode édition dans l'en-tête si l'utilisateur est connecté.
 * Insère une bannière dans le corps de la page pour indiquer le mode édition.
**/
export function editionModeHeader() {
    const token = localStorage.getItem("token");
    if (token) {

        const header = document.querySelector("header");
        const body = document.querySelector("body");


        const banner = document.createElement("div");
        banner.classList.add("banner");

        const iconbanner = document.createElement("i");
        iconbanner.classList.add("fa-regular", "fa-pen-to-square", "iconBanner");

        const spanBanner = document.createElement("span");
        spanBanner.innerText = "Mode édition";
        spanBanner.classList.add("spanBanner");

        spanBanner.insertBefore(iconbanner, spanBanner.firstChild);
        banner.appendChild(spanBanner);
        body.insertBefore(banner, header);
    }
};

/**
* Ajoute un bouton de modification aux travaux s'il y a un utilisateur connecté.
 * Insère le bouton de modification dans le titre des travaux.
**/
export function editWorksBtn() {
    const token = localStorage.getItem("token");
    if (token) {

        const titleWorks = document.querySelector(".titleWorks");

        const divModify = document.createElement("div");
        divModify.classList.add("divModify");

        const iconModify = document.createElement("i");
        iconModify.classList.add("fa-regular", "fa-pen-to-square", "iconModify");

        const buttonModify = document.createElement("button");
        buttonModify.innerText = "modifier";
        buttonModify.classList.add("openModalBtn");

        buttonModify.insertBefore(iconModify, buttonModify.firstChild);
        divModify.appendChild(buttonModify);
        titleWorks.appendChild(buttonModify);
    }
};