export function checkUserLogin() {
    const token = localStorage.getItem("token");
    if (token) {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    }
}
// checkUserLogin();


export function logout() {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("token");
        document.location.href = "./login.html";
    });
}
// logout();


export function editionModeHeader() {
    const token = localStorage.getItem("token");
    if (token) {

        const header = document.querySelector("header");
        const body = document.querySelector("body");


        const banner = document.createElement("div");
        banner.classList.add("banner");

        const iconbanner = document.createElement("i");
        iconbanner.classList.add("fa-regular", "fa-pen-to-square", "iconBanner");

        const spanBanner = document.createElement("span");
        spanBanner.innerText = "Mode édition";
        spanBanner.classList.add("spanBanner");

        spanBanner.insertBefore(iconbanner, spanBanner.firstChild);
        banner.appendChild(spanBanner);
        body.insertBefore(banner, header);
    }
};
// editionModeHeader();

export function editWorksBtn() {
    const token = localStorage.getItem("token");
    if (token) {

        const titleWorks = document.querySelector(".titleWorks");

        const divModify = document.createElement("div");
        divModify.classList.add("divModify");

        const iconModify = document.createElement("i");
        iconModify.classList.add("fa-regular", "fa-pen-to-square", "iconModify");

        const buttonModify = document.createElement("button");
        buttonModify.innerText = "modifier";
        buttonModify.classList.add("openModalBtn");

        buttonModify.insertBefore(iconModify, buttonModify.firstChild);
        divModify.appendChild(buttonModify);
        titleWorks.appendChild(buttonModify);
    }
}
// editWorksBtn();



