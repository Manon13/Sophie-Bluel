import { generateProject } from './portfolio.js';
import { clearFormFields, checkFiles } from './utils.js';

/** Fonction pour ouvrir la modale **/
export function openModal() {
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
    document.addEventListener("click", function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
};

/** Fonction pour créer une icone poubelle sur chaque projet **/
export async function trashIconCreation() {
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

/**
 * Fonction pour supprimer un projet avec son ID
 * @param {number} id - L'ID du projet à supprimer
 *@returns {Promise<void>} - Une promesse qui se résout lorsque le projet est supprimé avec succès.
**/
async function deleteWorksWithId(id) {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

/** Fonction pour supprimer un projet de la modale & du DOM **/
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

/** Fonction pour changer l'apparence du bouton d'ajout de photo **/
export function changeButtonTxt() {
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
};

/** Fonction pour afficher la seconde page de la modale **/
export async function addPhotoToModal() {
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
};

/** Fonction pour retourner à la première page de la modale **/
export async function returnWorksModal() {
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
};

/** Fonction pour ajouter la photo importé dans la div photo **/
export function addPhotoToDivPhoto() {
    const fileInput = document.querySelector(".fileInput");
    const divPhoto = document.querySelector(".divPhoto");

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (checkFiles(file)) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const thumbnail = document.createElement("img");
                thumbnail.alt = file.name;
                thumbnail.src = event.target.result;
                thumbnail.classList.add("thumbnail");

                divPhoto.style.display = "none";
                const imgPreviewContainer = document.createElement("div");
                imgPreviewContainer.classList.add("divPhoto", "imgPreviewContainer");

                const form = document.querySelector("#formAddPhoto");

                form.insertBefore(imgPreviewContainer, divPhoto);
                imgPreviewContainer.appendChild(thumbnail);
            };

            // Lire le fichier sélectionné en tant que données URL
            reader.readAsDataURL(file);
        }
    });
};

/**
 * Fonction pour ajouter la photo importé dans la galerie du site (DOM)
 * @param {object} photo - L'objet représentant la photo à ajouter à la galerie.
 * @param {string} categoryText - Le nom de la catégorie pour la photo.
 * @returns {void}
**/
function addPhotoToGallery(photo, categoryText) {
    const figure = document.createElement("figure");
    figure.classList.add("project");
    figure.dataset.categoryName = categoryText;
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
};

/**
 * Fonction pour importé dynamiquement la photo importé dans la modale 1
 * @param {object} photo - L'objet photo contenant les détails de la photo.
 * @returns {void} 
**/
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
};

/** Fonction pour soumettre le formulaire **/
export async function submitForm() {
    const form = document.querySelector("#formAddPhoto");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const category = document.querySelector("#category");
        const categoryText = category.options[category.value].text;

        const formData = new FormData(form);
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
            await response.json()

                .then(photo => {

                    addPhotoToModalGallery(photo);
                    addPhotoToGallery(photo, categoryText);
                    clearFormFields();
                });
        }
    });
};