import { recoverWorks, generateProject} from "assets/js/portfolio.js"

const dialog = document.querySelector("dialog");
const openModalBtn = document.querySelector("dialog + button");
const closeModalBtn = document.querySelector(".closeModalBtn");

//Ouverture de la modale
openModalBtn.addEventListener("click", function () {
    dialog.showModal();
});

//Fermeture de la modale avec le bouton close
closeModalBtn.addEventListener("click", function () {
    dialog.close();
});

//Fermeture de la modale en cliquant en dehors de la modale
//A REPARER ! La modale se ferme quand je clique juste hors du .dialogContent et non hors de la modale entière
dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

generateProject();