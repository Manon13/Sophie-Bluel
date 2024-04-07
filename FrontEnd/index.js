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

        const divEdition = document.createElement("div");
        divEdition.classList.add("divEdition");

        const iconeEdition = document.createElement("i");
        iconeEdition.classList.add("fa-regular", "fa-pen-to-square", "iconeEdition");

        const spanEdition = document.createElement("span");
        spanEdition.innerText = "Mode édition";
        spanEdition.classList.add("spanEdition");

        // spanEdition.appendChild(iconeEdition);
        spanEdition.insertBefore(iconeEdition, spanEdition.firstChild);
        divEdition.appendChild(spanEdition);
        body.insertBefore(divEdition, header);
    }
};
editionModeHeader();

function editWorksBtn() {
    const token = localStorage.getItem("token");
    if (token) {

        const portfolio = document.getElementById("portfolio");
        const divFilters = document.querySelector(".divFilter");

        const divModify = document.createElement("div");
        divModify.classList.add("divModify");

        const iconeModify = document.createElement("i");
        iconeModify.classList.add("fa-regular", "fa-pen-to-square", "iconeModify");

        const spanModify = document.createElement("span");
        spanModify.innerText = "modifier";
        spanModify.classList.add("spanModify");

        spanModify.insertBefore(iconeModify, spanModify.firstChild);
        divModify.appendChild(spanModify);
        portfolio.insertBefore(divModify, divFilters)
    }
}

editWorksBtn();