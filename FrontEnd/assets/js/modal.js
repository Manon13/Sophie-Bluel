//Fonction pour ouvrir la modale
function openModal() {
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
}
openModal();

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

//Fonction pour supprimer un projet avec son ID
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

//Fonction pour changer l'apparence du bouton d'ajout de photo
function changeButtonTxt() {
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

//Fonction pour afficher la seconde page de la modale
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

//Fonction pour retourner à la première page de la modale
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

//Fonction pour ajouter la photo importé dans la div photo
function addPhotoToDivPhoto() {
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
}
addPhotoToDivPhoto();

//Fonction pour vérifier le type et la taille du fichier
function checkFiles() {
    const photoInput = document.querySelector("input[name='image']");
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(photoInput.files[0].type)) {
        showErrorforPhotoFile("Veuillez sélectionner une image au format JPEG ou PNG.");
        photoInput.value = "";
        return false;
    }

    if (photoInput.files[0].size > 4 * 1024 * 1024) {
        showErrorforPhotoFile("Veuillez sélectionner une image de moins de 4 Mo.");
        photoInput.value = "";
        return false;
    }

    showErrorforPhotoFile("&nbsp;");
    return true;
}

//Fonction pour gérer les erreurs de l'input Photo
function showErrorforPhotoFile(error) {
    const errorMsg = document.querySelector(".errorMessagePhoto");
    errorMsg.innerHTML = error;
};

//Fonction pour ajouter la photo importé dans la galerie du site (DOM)
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
}

//Fonction pour importé dynamiquement la photo importé dans la modale 1
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

//Générer les catégories de photos pour le formulaire
async function getCategory() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
}

//Fonction pour générer les catégories dans le formulaire
async function generateCategoriesInForm() {
    const categories = await getCategory();
    const select = document.querySelector(".selectForm");

    //Création du champs vide
    const optionEmpty = document.createElement("option");
    optionEmpty.value = "";
    optionEmpty.textContent = "";
    select.appendChild(optionEmpty);

    //Création des options pour chaque catégorie
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
                    console.log("Photo ajoutée avec succès");
                    clearFormFields();
                })

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

    //Fonction pour vérifier que les champs ne sont pas vides
    function checkInputs() {
        const photoValue = photoInput.value.trim();
        const titleValue = titleInput.value.trim();
        const categorieValue = categorieSelect.value.trim();

        console.log(photoValue);
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

