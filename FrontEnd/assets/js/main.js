import { submitLoginForm } from './connexion.js';
import { checkUserLogin, logout, editionModeHeader, editWorksBtn } from './index.js';
import { generateProject, filterWorkCategories } from './portfolio.js';
import { checkFiles, generateCategoriesInForm, enableSubmitButton } from './utils.js';
import { openModal, trashIconCreation, changeButtonTxt, addPhotoToModal, returnWorksModal, addPhotoToDivPhoto, submitForm } from './modal.js';


//Fonction importé de connexion.js
submitLoginForm();


//Fonction importé de portfolio.js
if (window.location.pathname !== '/login.html') {
    generateProject("#gallery");
    filterWorkCategories();
}


if (localStorage.getItem("token")) {

    //Fonction importé de index.js
    checkUserLogin();
    logout();
    editionModeHeader();
    editWorksBtn();

    //Fonction importé de modal.js
    openModal();
    trashIconCreation();
    changeButtonTxt();
    addPhotoToModal();
    returnWorksModal();
    addPhotoToDivPhoto();
    submitForm();

    //Fonction importé de utils.js
    checkFiles();
    generateCategoriesInForm();
    enableSubmitButton();
}
