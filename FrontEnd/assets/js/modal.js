// import { showErrors } from "./connexion.js";

const dialog = document.querySelector("dialog");
const openModalBtn = document.querySelector("dialog + button");
const closeModalBtn = document.querySelector(".closeModalBtn");

const titleAddPhoto = document.querySelector(".titleAddPhoto");
titleAddPhoto.style.display = "none";

const form = document.querySelector("form");
form.style.display = "none";

const arrowLeftBtn = document.querySelector(".arrowLeftBtn");
arrowLeftBtn.style.visibility = "hidden";

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
};

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
};


async function changeButtonTxt() {
    const fileInput = document.querySelector(".fileInput");
    fileInput.style.display = "none";
    const customButton = document.createElement("button");
    customButton.textContent = "+ Ajouter photo";
    customButton.classList.add("customButton");

    fileInput.parentNode.insertBefore(customButton, fileInput);

    customButton.addEventListener("click", function () {
        event.preventDefault();
        fileInput.click();
    });
}
changeButtonTxt();


async function addPhotoToModal() {
    const buttonAddPhoto = document.querySelector(".addPhotoBtn");
    buttonAddPhoto.addEventListener("click", function () {

        const titleGalleryPhoto = document.querySelector(".titleGalleryPhoto");
        titleGalleryPhoto.style.display = "none";

        const titleAddPhoto = document.querySelector(".titleAddPhoto");
        titleAddPhoto.style.display = "block";

        const modalWorks = document.querySelector(".modalWorks");
        modalWorks.style.display = "none";

        const form = document.querySelector("form");
        form.style.display = "block";

        const arrowLeftBtn = document.querySelector(".arrowLeftBtn");
        arrowLeftBtn.style.visibility = "visible";

        buttonAddPhoto.style.display = "none";

    });
}
addPhotoToModal();

async function returnWorksModal() {
    const arrowLeftBtn = document.querySelector(".arrowLeftBtn");
    arrowLeftBtn.addEventListener("click", function () {

        //On cache les elements de la modale 2
        const titleAddPhoto = document.querySelector(".titleAddPhoto");
        titleAddPhoto.style.display = "none";
        const form = document.querySelector("form");
        form.style.display = "none";
        const arrowLeftBtn = document.querySelector(".arrowLeftBtn");
        arrowLeftBtn.style.visibility = "hidden";

        //On réaffiche les elements de la modale 1
        const titleGalleryPhoto = document.querySelector(".titleGalleryPhoto");
        titleGalleryPhoto.style.display = "block";
        const modalWorks = document.querySelector(".modalWorks");
        modalWorks.style.display = "flex";
        const buttonAddPhoto = document.querySelector(".addPhotoBtn");
        buttonAddPhoto.style.display = "block";
    });
}
returnWorksModal();

// function handle_fileinput() {
//     const fileInput = document.querySelector(".fileInput");
//     file = fileInput.files[0];

// }


function addPhotoToDivPhoto() {
    const fileInput = document.querySelector(".fileInput");
    const divPhoto = document.querySelector(".divPhoto");

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const thumbnail = document.createElement("img");
                thumbnail.alt = file.name;
                thumbnail.src = event.target.result;
                thumbnail.classList.add("thumbnail", "fileInput");

                divPhoto.innerHTML = "";
                divPhoto.appendChild(thumbnail);
            };

            // Lire le fichier sélectionné en tant que données URL
            reader.readAsDataURL(file);
        }
    });
}
addPhotoToDivPhoto();


function submitForm() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData();

        console.log(document.querySelector(".thumbnail").src);
        console.log(document.querySelector("#title").value);
        console.log(document.querySelector("#categorie").value);

        formData.append("image", ".thumbnail".src);
        formData.append("title", document.querySelector("#title").value);
        formData.append("category", document.querySelector("#categorie").value);

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
            },
            body: formData

        });

        if (response.ok) {
            console.log("Photo ajoutée avec succès");
            dialog.close();
        } else {
            console.error("Erreur lors de l'ajout de la photo");
        }
    });
};
submitForm();


//Fonction pour vérifier le type et la taille du fichier
// function checkFiles() {
//     //Vérification du type de fichier
//     const fileInput = document.querySelector(".fileInput");
//     const allowedTypes = ["image/jpeg", "image/png"];
//     const errorSpan = document.querySelector(".errorSpan");
//     if (!allowedTypes.includes(fileInput.files[0].type)) {
//         errorSpan.textContent = "Veuillez sélectionner une image au format JPEG ou PNG.";
//         fileInput.value = "";
//     } else {
//         errorSpan.textContent = "";
//     }
//     //Vérification de la taille du fichier
//     const maxSize = 4 * 1024 * 1024; // 4 Mo
//     if (fileInput.files[0].size > maxSize) {
//         errorSpan.textContent = "Veuillez sélectionner une image de moins de 4 Mo.";
//         fileInput.value = "";
//     } else {
//         errorSpan.textContent = "";
//     }
//     return true;
// }


//Fonction pour activer le bouton de validation du formulaire
async function enableSubmitButton() {
    const photoInput = document.querySelector("input[name='photo']");
    const titleInput = document.querySelector("input[name='title']");
    const categorieSelect = document.querySelector("select[name='categorie']");

    const submitButton = document.querySelector(".validateBtn");
    const errorMessage = document.createElement("span");
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    errorMessage.style.display = "none";

    const divValidate = document.querySelector(".divValidate");
    divValidate.appendChild(errorMessage);

    function checkInputs() {
        const photoValue = photoInput.value.trim();
        const titleValue = titleInput.value.trim();
        const categorieValue = categorieSelect.value.trim();

        if (photoValue !== '' && titleValue !== '' && categorieValue !== '') {
            submitButton.disabled = false;
            errorMessage.style.display = "none";
        } else {
            submitButton.disabled = true;
        }
    }

    submitButton.addEventListener("click", function () {
        checkInputs();
        if (submitButton.disabled) {
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    });

    photoInput.addEventListener("input", checkInputs);
    titleInput.addEventListener("input", checkInputs);
    categorieSelect.addEventListener("input", checkInputs);
}

enableSubmitButton();

