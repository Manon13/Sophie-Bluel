function functionConnexion(){
    const formConnexion = document.querySelector('.formConnexion');
    formConnexion.addEventListener("submit", function(event){
        event.preventDefault();

        //Récupération des données du formulaire
        const connexion = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        };

        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(connexion);

        // Appel de la fonction fetch avec toutes les informations nécessaires

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: chargeUtile
        });
    });
}


