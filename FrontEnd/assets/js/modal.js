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


//Fonction pour créer une icon poubelle sur chaque projet
async function trashIconCreation() {
    const generateProjectOnModal = await generateProject(".modalWorks");
    const figure = document.querySelectorAll(".modalWorks > .project");

    figure.forEach(project => {
        const trashIcon = document.createElement("i");
        const buttonTrashIcon = document.createElement("button");

        // Récupération de l'ID du projet à partir de l'attribut 
        const projectId = project.dataset.projectId;
        buttonTrashIcon.setAttribute("data-project-id", projectId);

        buttonTrashIcon.classList.add("buttonTrashIcon");
        trashIcon.classList.add("fa-solid", "fa-trash-can", "trashIcon");
        project.appendChild(buttonTrashIcon);
        buttonTrashIcon.appendChild(trashIcon);
    });
    deleteWorks();
    return generateProjectOnModal;
};

trashIconCreation();


async function deleteWorksWithId(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        console.log('Projet supprimé avec succès');
    } else {
        console.error('Erreur lors de la suppression du projet');
    }
}

//Fonction pour supprimer un projet de la modale & du DOM
async function deleteWorks() {
    const buttonTrashIcons = document.querySelectorAll(".buttonTrashIcon");
    buttonTrashIcons.forEach(buttonTrashIcon => {
        buttonTrashIcon.addEventListener("click", async function () {
            const projectId = buttonTrashIcon.getAttribute("data-project-id");
            await deleteWorksWithId(projectId);
            buttonTrashIcon.parentElement.remove();
            const elementToRemove = document.querySelector(`#gallery > .project[data-project-id='${projectId}']`);
            if (elementToRemove) {
                elementToRemove.remove();
            }
        });
    });
}

