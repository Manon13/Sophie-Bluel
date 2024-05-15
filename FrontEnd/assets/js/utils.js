/**
 * Fonction pour vérifier le type et la taille du fichier
 * @param {file} file - Le fichier sélectionné.
 * @returns {boolean} - Retourne true si le fichier est valide, sinon false.
**/
export function checkFiles(file) {
    const photoInput = document.querySelector("input[name='image']");
    const allowedTypes = ["image/jpeg", "image/png"];

    if (photoInput.files[0] && !allowedTypes.includes(photoInput.files[0].type)) {
        showErrorforPhotoFile("Veuillez sélectionner une image au format JPEG ou PNG.");
        photoInput.value = "";
        return false;
    }

    if (photoInput.files[0] && photoInput.files[0].size > 4 * 1024 * 1024) {
        showErrorforPhotoFile("Veuillez sélectionner une image de moins de 4 Mo.");
        photoInput.value = "";
        return false;
    }

    showErrorforPhotoFile("&nbsp;");
    return true;
};

/**
 * Fonction pour gérer les erreurs de l'input Photo
 * @param {string} error - Le message d'erreur à afficher
**/
function showErrorforPhotoFile(error) {
    const errorMsg = document.querySelector(".errorMessagePhoto");
    errorMsg.innerHTML = error;
};

/** Générer les catégories de photos pour le formulaire **/
async function getCategory() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories;
};

/** Fonction pour générer les catégories dans le formulaire. **/
export async function generateCategoriesInForm() {
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
};

/** Fonction qui vérifie les champs du formulaire **/
export function clearFormFields() {
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
    if (imgPreviewContainer) {
        imgPreviewContainer.remove();
    }

    const divPhoto = document.querySelector(".divPhoto");
    if (divPhoto) {
        divPhoto.style.display = "flex";
    }
};

/** Fonction pour activer le bouton de validation du formulaire & le message d'erreur **/
export function enableSubmitButton() {
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

    //Fonction pour vérifier que les champs du formulaire pour ajouter une photo ne sont pas vides.
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

    if (photoInput && titleInput && categorieSelect) {
        photoInput.addEventListener("input", checkInputs);
        titleInput.addEventListener("input", checkInputs);
        categorieSelect.addEventListener("input", checkInputs);
    }

    submitButton.addEventListener("click", function () {
        if (submitButton.classList.contains("disabled")) {
            errorMessage.style.visibility = "visible";
        } else {
            errorMessage.style.visibility = "hidden";
        }
    });
};
