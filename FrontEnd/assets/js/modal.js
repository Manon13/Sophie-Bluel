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
                thumbnail.classList.add("thumbnail");

                divPhoto.style.display = "none";
                const imgPreviewContainer = document.createElement("div");
                imgPreviewContainer.classList.add("divPhoto");
                const form = document.querySelector("#formAddPhoto");

                form.insertBefore(imgPreviewContainer, divPhoto);
                imgPreviewContainer.appendChild(thumbnail);
            };

            // Lire le fichier sélectionné en tant que données URL
            reader.readAsDataURL(file);
        }
    });
}
addPhotoToDivPhoto();

//Fonction pour ajouter une photo à la modale & au DOM
function addPhotoToGallery(photo) {
    const figure = document.createElement("figure");
    figure.classList.add("project");
    figure.dataset.projectId = photo.id;

    const img = document.createElement("img");
    img.src = photo.imageUrl;
    img.alt = photo.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = photo.title;
    figcaption.classList.add("figcaption");

    const gallery = document.querySelector("#gallery");
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
}


function addPhotoToModalGallery(photo) {
    const figure = document.createElement("figure");
    figure.classList.add("project");
    figure.dataset.projectId = photo.id;

    const img = document.createElement("img");
    img.src = photo.imageUrl;
    img.alt = photo.title;

    //Création de l'icone poubelle
    const trashIcon = document.createElement("i");
    const buttonTrashIcon = document.createElement("button");

    // Récupération de l'ID du projet à partir de l'attribut 
    const projectId = photo.id;
    buttonTrashIcon.setAttribute("data-project-id", projectId);

    buttonTrashIcon.classList.add("buttonTrashIcon");
    trashIcon.classList.add("fa-solid", "fa-trash-can", "trashIcon");

    const modalWorks = document.querySelector(".modalWorks");
    modalWorks.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(buttonTrashIcon);
    buttonTrashIcon.appendChild(trashIcon);

    deleteWorks();
}

//Générer les catégories dans le formulaire
async function getCategory() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
}


async function generateCategoriesInForm() {
    const categories = await getCategory();
    const select = document.querySelector(".selectForm");

    //Creation du champs vide
    const optionEmpty = document.createElement("option");
    optionEmpty.value = "";
    optionEmpty.textContent = "";
    select.appendChild(optionEmpty);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}
generateCategoriesInForm();

//Fonction pour soumettre le formulaire
async function submitForm() {
    const form = document.querySelector("#formAddPhoto");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(document.querySelector("#photo").files.item(0));
        console.log(document.querySelector("#title").value);
        console.log(document.querySelector("#category").value);

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: formData

        });

        if (response.ok) {
            const photo = await response.json();
            addPhotoToModalGallery(photo);
            addPhotoToGallery(photo);

            console.log("Photo ajoutée avec succès");
            clearFormFields();

        } else {
            console.error("Erreur lors de l'ajout de la photo");
        }
    });
};
submitForm();

//Fonction qui vérifie les champs du formulaire
function clearFormFields() {
    const photoInput = document.querySelector("input[name='image']");
    const titleInput = document.querySelector("input[name='title']");
    const categorieSelect = document.querySelector("select[name='category']");

    //Réinitialisation des champs du formulaire
    photoInput.value = "";
    titleInput.value = "";
    categorieSelect.value = "";

    //Désactivation du bouton de validation
    const submitButton = document.querySelector(".validateBtn");
    submitButton.classList.add("disabled");

    const imgPreviewContainer = document.querySelector(".divPhoto");
    imgPreviewContainer.remove();

    const divPhoto = document.querySelector(".divPhoto");
    divPhoto.style.display = "flex";
}

//Fonction pour activer le bouton de validation du formulaire & le message d'erreur
function enableSubmitButton() {
    const photoInput = document.querySelector("input[name='image']");
    const titleInput = document.querySelector("input[name='title']");
    const categorieSelect = document.querySelector("select[name='category']");

    const submitButton = document.querySelector(".validateBtn");
    submitButton.classList.add("disabled");
    submitButton.classList.remove("validateBtn");
    const errorMessage = document.createElement("span");
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    errorMessage.classList.add("errorMessage");
    errorMessage.style.visibility = "hidden";

    const divSelect = document.querySelector(".divSelect");
    divSelect.appendChild(errorMessage);

    function checkInputs() {
        const photoValue = photoInput.value.trim();
        const titleValue = titleInput.value.trim();
        const categorieValue = categorieSelect.value.trim();

        if (photoValue !== '' && titleValue !== '' && categorieValue !== '') {
            submitButton.classList.remove("disabled");
            submitButton.classList.add("validateBtn");
        } else {
            submitButton.classList.add("disabled");
            submitButton.classList.remove("validateBtn");
        }
    }

    photoInput.addEventListener("input", checkInputs);
    titleInput.addEventListener("input", checkInputs);
    categorieSelect.addEventListener("input", checkInputs);

    submitButton.addEventListener("click", function () {
        if (submitButton.classList.contains("disabled")) {
            errorMessage.style.visibility = "visible";
        } else {
            errorMessage.style.visibility = "hidden";
        }
    });
}
enableSubmitButton();


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

