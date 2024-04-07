function connexion() {
    const form = document.querySelector('.formConnexion');
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        checkEmptyFields();

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
                if (!response.ok) {
                    showLoginError();
                    throw new Error("Le serveur a rencontré un problème : " + response.status);
                }
                return response.json();
            })

            .then(data => {
                // Stockage du token dans le localStorage
                localStorage.setItem("token", data.token);
                if (data.error) {
                    document.location.href = "./login.html";
                } else {
                    localStorage.setItem("token", data.token);
                    document.location.href = "./index.html"
                }
            })

            .catch(error => {
                console.error(error);
            });
    });
}
connexion();


function checkEmptyFields() {
const form = document.querySelector('.formConnexion');

    const baliseEmail = document.querySelector('#email');
    const valeurEmail = baliseEmail.value;
    const balisePassword = document.querySelector('#password');
    const valeurPassword = balisePassword.value;
    
    if (valeurEmail === '' || valeurPassword === '') {
        const spanChampsVide = document.createElement("span");
        spanChampsVide.classList.add("error");
        spanChampsVide.innerText = "Veuillez remplir tous les champs";
        form.appendChild(spanChampsVide);
        return;
    }
};


function showLoginError (){
    const form = document.querySelector('.formConnexion');
    const spanError = document.createElement("span");
    spanError.classList.add("error");
    spanError.innerText = "L'email ou le mot de passe est incorrecte. Veuillez réessayer.";
    form.appendChild(spanError);
};
