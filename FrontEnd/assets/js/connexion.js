function submitLoginForm() {
    const form = document.querySelector('.formConnexion');
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
};
submitLoginForm();

function loginRequest(form) {

    //Récupération des données du formulaire
    const connexion = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };

    console.log(JSON.stringify(connexion));
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

function showErrors(error) {
    const spanError = document.createElement("span");
    const divError = document.getElementById("divError");
    spanError.classList.add("error");
    spanError.innerText = error;
    divError.appendChild(spanError);
};

function removeErrorMessages() {
    const divError = document.getElementById("divError");
    divError.innerHTML = "";
};


function validateEmail(email) {
    const emailRegExp = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
    if (!emailRegExp.test(email)) {
        showErrors("Veuillez saisir une adresse email valide");
        return false;
    }
    return true;
};
