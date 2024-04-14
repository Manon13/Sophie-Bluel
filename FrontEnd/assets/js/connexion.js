function connexion() {
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
                    throw new Error("L'email ou le mot de passe est incorrecte. Veuillez réessayer.");
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
                showLoginErrors(error.message);
            });
    });
}
connexion();

function isEmptyLoginFields() {
    const form = document.querySelector('.formConnexion');

    const emailInput = document.querySelector('#email');
    const valueEmail = emailInput.value;
    const PasswordInput = document.querySelector('#password');
    const valuePassword = PasswordInput.value;

    if (valueEmail === '' || valuePassword === '') {
        const spanEmptyFields = document.createElement("span");
        spanEmptyFields.classList.add("error");
        spanEmptyFields.innerText = "Veuillez remplir tous les champs";
        form.appendChild(spanEmptyFields);

        return false;
    }
    return true;
};

function showLoginErrors(error) {
    const form = document.querySelector('.formConnexion');
    const spanError = document.createElement("span");
    spanError.classList.add("error");
    spanError.innerText = "L'email ou le mot de passe saisie est incorrecte. Veuillez réessayer.";
    form.appendChild(spanError);
    return error;
};

function removeErrorMessages() {
    const form = document.querySelector('.formConnexion');
    const errorsSpan = form.querySelectorAll('.error');
    errorsSpan.forEach(spanError => {
        spanError.remove();
    });
}


function validateEmail(email) {
    const form = document.querySelector('.formConnexion');
    const emailRegExp = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
    if (!emailRegExp.test(email)) {
        const spanEmailIncorrect = document.createElement("span");
        spanEmailIncorrect.classList.add("error");
        spanEmailIncorrect.innerText = "Veuillez saisir une adresse email valide";
        form.appendChild(spanEmailIncorrect);
        return false;
    }
    return true;
};
