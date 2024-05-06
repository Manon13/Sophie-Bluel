import { submitLoginForm } from './connexion.js';
import {checkUserLogin, logout, editionModeHeader, editWorksBtn} from './index.js';
import {generateProject, generateCategories, filterWorkCategories} from './portfolio.js';
import {checkFiles, generateCategoriesInForm,clearFormFields, enableSubmitButton} from './utils.js';
import {openModal, trashIconCreation, changeButtonTxt, addPhotoToModal, returnWorksModal, addPhotoToDivPhoto, submitForm} from './modal.js';


//Fonction importé de connexion.js
submitLoginForm();


//Fonction importé de index.js
checkUserLogin();
logout();
editionModeHeader();
editWorksBtn();


//Fonction importé de portfolio.js
generateProject("#gallery");
generateCategories();
filterWorkCategories();


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
clearFormFields();
enableSubmitButton();

