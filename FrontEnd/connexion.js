function connexion() {
    const formConnexion = document.querySelector('.formConnexion');
    formConnexion.addEventListener("submit", function (event) {
        event.preventDefault();

        //Récupération des données du formulaire
        const connexion = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };

        const spanError = document.createElement("span");
        spanError.classList.add("error");
        spanError.innerText = "L'email ou le mot de passe est incorrecte. Veuillez réessayer.";
        formConnexion.appendChild(spanError);

        console.log(JSON.stringify(connexion));

        // Appel de la fonction fetch avec toutes les informations nécessaires
        // Création de la charge utile au format JSON
        /**fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(connexion)
        });*/

        // Appel de la fonction fetch avec toutes les informations nécessaires
        // Création de la charge utile au format JSON
        console.log(JSON.stringify(connexion));
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
                    throw new Error("Le serveur a rencontré un problème : " + response.status);
                }
                return response.json();
            })

            .then(data => {
                console.log(data);
                // Redirection vers la page d'accueil
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
connexion()


const form = document.querySelector('.formConnexion');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const baliseEmail = document.querySelector('#email');
    const valeurEmail = baliseEmail.value;
    const balisePassword = document.querySelector('#password');
    const valeurPassword = balisePassword.value;
    
    if (valeurEmail === '' || valeurPassword === '') {
        alert('Veuillez remplir tous les champs');
        return;
    }

});

//TEST
// function deconnexion() {
//     const btnDeconnexion = document.querySelector('.btnDeconnexion');
//     btnDeconnexion.addEventListener("click", function (event) {
//         event.preventDefault();
//         localStorage.removeItem("token");
//         document.location.href = "./login.html";
//     });
// }

// deconnexion();

// function updateMenu() {
//     const token = localStorage.getItem("token");
//     const loginTab = document.querySelector('.loginTab');
//     const logoutTab = document.querySelector('.logoutTab');

//     if (token) {
//         loginTab.style.display = "none";
//         logoutTab.style.display = "block";
//     } else {
//         loginTab.style.display = "block";
//         logoutTab.style.display = "none";
//     }
// }

// updateMenu();

