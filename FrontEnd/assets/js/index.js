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

        const iconebanner = document.createElement("i");
        iconebanner.classList.add("fa-regular", "fa-pen-to-square", "iconeBanner");

        const spanBanner = document.createElement("span");
        spanBanner.innerText = "Mode édition";
        spanBanner.classList.add("spanBanner");

        spanBanner.insertBefore(iconebanner, spanBanner.firstChild);
        banner.appendChild(spanBanner);
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
        buttonModify.classList.add("openModalBtn");

        buttonModify.insertBefore(iconeModify, buttonModify.firstChild);
        divModify.appendChild(buttonModify);
        titleWorks.appendChild(buttonModify);
    }
}
editWorksBtn();



