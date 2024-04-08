function checkUserLogin() {
    const token = localStorage.getItem("token");
    if (token) {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    }
}
checkUserLogin();


function logout() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("token");
        document.location.href = "./login.html";
    });
}
logout();


function editionModeHeader() {   
    const token = localStorage.getItem("token");
    if (token) {

        const header = document.querySelector("header");
        const body = document.querySelector("body");

        const banner = document.createElement("div");
        banner.classList.add("banner");

        const iconeEdition = document.createElement("i");
        iconeEdition.classList.add("fa-regular", "fa-pen-to-square", "iconeEdition");

        const spanEdition = document.createElement("span");
        spanEdition.innerText = "Mode édition";
        spanEdition.classList.add("spanEdition");

        // spanEdition.appendChild(iconeEdition);
        spanEdition.insertBefore(iconeEdition, spanEdition.firstChild);
        banner.appendChild(spanEdition);
        body.insertBefore(banner, header);
    }
};
editionModeHeader();

function editWorksBtn() {
    const token = localStorage.getItem("token");
    if (token) {

        const titleWorks = document.querySelector(".titleWorks");

        const divModify = document.createElement("div");
        divModify.classList.add("divModify");

        const iconeModify = document.createElement("i");
        iconeModify.classList.add("fa-regular", "fa-pen-to-square", "iconeModify");

        const buttonModify = document.createElement("button");
        buttonModify.innerText = "modifier";
        buttonModify.classList.add("modifyBtn");

        buttonModify.insertBefore(iconeModify, buttonModify.firstChild);
        divModify.appendChild(buttonModify);
        titleWorks.appendChild(buttonModify);
    }
}
editWorksBtn();



