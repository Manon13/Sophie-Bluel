/** Soumet le formulaire de connexion lorsqu'il est envoyé. **/
export function submitLoginForm() {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector('.formConnexion');
        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                removeErrorMessages();
                const emailInput = document.querySelector('#email');
                if (!validateEmail(emailInput.value)) {
                    return null;
                }
                if (!isEmptyLoginFields()) {
                    return null;
                }
                loginRequest(event.target);
            });
        }
    });
};

/**
 * Effectue une demande de connexion au serveur avec les informations du formulaire de connexion.
 * Stocke le token d'authentification dans le stockage local si la demande réussit et redirige vers la page d'acceuil.
 * Affiche les messages d'erreur en cas de problème lors de la connexion.
 * @param {HTMLFormElement} form - Le formulaire de connexion HTML.
**/
function loginRequest(form) {
    //Récupération des données du formulaire
    const connexion = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };

    // Appel de la fonction fetch avec toutes les informations nécessaires
    // Création de la charge utile au format JSON
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(connexion)
    })
        .then(response => {
            if (401 === response.status) {
                throw new Error("L'email ou le mot de passe est incorrect. Veuillez réessayer.");
            } else if (500 === response.status) {
                throw new Error("Le serveur a rencontré un problème : " + response.status);
            }

            return response.json();
        })
        .then(data => {
            // Stockage du token dans le localStorage
            localStorage.setItem("token", data.token);
            if (!data.token) {
                throw new Error("Le serveur a rencontré un problème : " + response.status);
            } else {
                localStorage.setItem("token", data.token);
                document.location.href = "./index.html"
            }
        })
        .catch(error => {
            showErrors(error.message);
        });
};

/**
 * Vérifie si les champs du formulaire de connexion sont vides.
 * @returns {boolean} Renvoie vrai si les champs ne sont pas vides, sinon faux
**/
function isEmptyLoginFields() {
    const emailInput = document.querySelector('#email');
    const valueEmail = emailInput.value;
    const PasswordInput = document.querySelector('#password');
    const valuePassword = PasswordInput.value;
    const divError = document.getElementById("divError");

    if (valueEmail === '' || valuePassword === '') {
        const spanEmptyFields = document.createElement("span");
        spanEmptyFields.classList.add("error");
        showErrors("Veuillez remplir tous les champs");
        divError.appendChild(spanEmptyFields);
        return false;
    }
    return true;
};

/**
 * Affiche un message d'erreur sur la page.
 * @param {string} error - Le message d'erreur à afficher.
 **/
function showErrors(error) {
    const spanError = document.createElement("span");
    const divError = document.getElementById("divError");
    spanError.classList.add("error");
    spanError.innerText = error;
    divError.appendChild(spanError);
};

/** Supprime tous les messages d'erreur affichés dans la divError. **/
function removeErrorMessages() {
    const divError = document.getElementById("divError");
    divError.innerHTML = "";
};

/**
 * Valide une adresse e-mail
 * @param {string} email - L'adresse e-mail à vérifier
 * @returns {boolean} Renvoie vrai si l'adresse mail est valaide, sinon false.
**/
function validateEmail(email) {
    const emailRegExp = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
    if (!emailRegExp.test(email)) {
        showErrors("Veuillez saisir une adresse email valide");
        return false;
    }
    return true;
};