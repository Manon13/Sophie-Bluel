//Fonction pour récupérer les projets depuis l'API
async function recoverProjects(){
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

        //Création d'une balise img pour l'image du projet
        const imgProjet = document.createElement("img");
        imgProjet.src = project.imageUrl;
        imgProjet.alt = project.title;

        //Création d'une balise figcaption pour le titre du projet
        const figcaptionProjet = document.createElement("figcaption");
        figcaptionProjet.innerText = projet.title;

        //On rattache la balise figure à la div de gallery
        divGallery.appendChild(figureProjet);
        //On rattache les enfants de la figure
        figureProjet.appendChild(imgProjet);
        figureProjet.appendChild(figcaptionProjet);
    }
}

generateProject();