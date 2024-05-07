/** Fonction pour récupérer les projets depuis l'API **/
async function recoverWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
};

/**
 * Fonction qui génère des éléments de projet et les rajoute à la racine spécifié
 * @param {string} rootSelector - Le sélecteur pour l'élément racine où les projets seront ajoutés.
 * @returns {Promise<Array>} - Une promesse qui se résout à un tableau d'objets de projet.
 **/
export async function generateProject(rootSelector) {
    const works = await recoverWorks();

    for (let i = 0; i < works.length; i++) {
        const project = works[i];

        //Récupération de l'élément DOM qui contiendra la gallery des projets
        const divGallery = document.querySelector(rootSelector);    //rootSelector = "#gallery"

        //Création d'une balise dédié à un projet
        const figureProjet = document.createElement("figure");

        //Ajout de la classe "projet" à la balise figure
        figureProjet.classList.add("project");
        figureProjet.dataset.categoryName = project.category.name;

        //Ajout de l'identifiant du projet à la balise figure
        figureProjet.dataset.projectId = project.id;

        //Création d'une balise img pour l'image du projet
        const imgProjet = document.createElement("img");
        imgProjet.src = project.imageUrl;
        imgProjet.alt = project.title;

        //Création d'une balise figcaption pour le titre du projet
        const figcaptionProjet = document.createElement("figcaption");
        figcaptionProjet.innerText = project.title;

        //On rattache la balise figure à la div de gallery
        divGallery.appendChild(figureProjet);
        //On rattache les enfants de la figure
        figureProjet.appendChild(imgProjet);
        figureProjet.appendChild(figcaptionProjet);
    }
    return works;
};

/** Récupère les catégories depuis l'API et retourne un ensemble de catégories uniques. **/
export async function generateCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Vérifier qu'une catégorie soit unique avec la méthode has() de l'objet Set
    const categoriesSet = new Set(categories.map(category => category.name));
    return categoriesSet;
};

/** Fonction qui filtre les catégories de travail et affiche les boutons de filtre correspondants. **/
export async function filterWorkCategories() {
    const categoriesSet = await generateCategories();

    const divFilter = document.createElement("div");
    divFilter.classList.add("divFilters");
    const divGallery = document.querySelector(".gallery");
    const sectionPortfolio = document.querySelector("#portfolio");
    sectionPortfolio.insertBefore(divFilter, divGallery);

    // Création du boutton "Tous"
    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("buttonFilter");
    divFilter.appendChild(allButton);

    categoriesSet.forEach(categoryName => {
        const buttonFilter = document.createElement("button");
        buttonFilter.classList.add("buttonFilter");
        buttonFilter.innerText = categoryName;
        divFilter.appendChild(buttonFilter);
    });

    //Test de la fonctionnalité de filtre 
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const projects = document.querySelectorAll(".project");
            projects.forEach(project => {
                if (button.innerText === "Tous" || categoriesSet.has(button.innerText) === false){
                    project.style.display = "block";
                } else if (project.dataset.categoryName !== button.innerText) {
                    project.style.display = "none";
                } else {
                    project.style.display = "block";
                }
            });
        });
    });
};



