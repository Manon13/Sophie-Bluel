//import { generateProject} from "assets/js/portfolio.js";

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
document.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});


//Generation des projets dans la div .modalWorks
// generateProject(".modalWorks");


//Fonction pour créer une icone poubelle sur chaque projet
async function trashIconeCreation() {
    const generateProjectOnModal = await generateProject(".modalWorks");
    const figure = document.querySelectorAll(".modalWorks > .project");

    figure.forEach(project => {
        const trashIcone = document.createElement("i");
        const buttonTrashIcone = document.createElement("button");
        buttonTrashIcone.classList.add("buttonTrashIcone");
        trashIcone.classList.add("fa-solid", "fa-trash-can", "trashIcone");
        project.appendChild(buttonTrashIcone);
        buttonTrashIcone.appendChild(trashIcone);
    });
    return generateProjectOnModal;
};

trashIconeCreation();