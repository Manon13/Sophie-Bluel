async function genererProjets() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

    console.log(works);
    for (let i = 0; i < works.length; i++) {

        const projet = works[i];
        //Récupération de l'élément DOM qui contiendra la gallery des projets
        const divGallery = document.querySelector("#gallery");
        //Création d'une balise dédié à un projet
        const figureProjet = document.createElement("figure");
        //Ajout de la classe "projet" à la balise figure
        figureProjet.classList.add("projet");

        //Création d'une balise img pour l'image du projet
        const imgProjet = document.createElement("img");
        imgProjet.src = projet.imageUrl;
        imgProjet.alt = projet.title;

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

genererProjets();