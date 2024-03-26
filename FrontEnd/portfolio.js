//Fonction pour récupérer les projets depuis l'API
async function recoverProjects() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    console.log(works);
    return works;
}


async function generateProject() {
    const works = await recoverProjects();
    for (let i = 0; i < works.length; i++) {
        const project = works[i];

        //Récupération de l'élément DOM qui contiendra la gallery des projets
        const divGallery = document.querySelector("#gallery");

        //Création d'une balise dédié à un projet
        const figureProjet = document.createElement("figure");

        //Ajout de la classe "projet" à la balise figure
        figureProjet.classList.add("project");
        figureProjet.dataset.categoryName = project.category.name;

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
}
generateProject();


async function generateCategory() {
    const response = await fetch('http://localhost:5678/api/categories');
    const category = await response.json();
    const categorySet = new Set(category.map(category => category.name));
    console.log(category);
    return categorySet;
}
generateCategory();


async function filterCategory() {

    const categorySet = await generateCategory();

    const divFilter = document.createElement("div");
    divFilter.classList.add("divFilters");
    const divGallery = document.querySelector(".gallery");
    const sectionPortfolio = document.querySelector("#portfolio");
    sectionPortfolio.insertBefore(divFilter, divGallery);

    const allButton = document.createElement("button");
    allButton.innerText = "Tous";
    allButton.classList.add("buttonFilter");
    divFilter.appendChild(allButton);

    categorySet.forEach(categoryName => {
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
                if (button.innerText === "Tous") {
                    project.style.display = "block";
                } else if (project.dataset.categoryName !== button.innerText) {
                    project.style.display = "none";
                } else {
                    project.style.display = "block";
                }
            });
        });
    });
}

filterCategory();
