import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    const content = document.getElementById("div-content");


    const loadHome = () => {
        content.innerHTML = `
            <div id="div-welcome">
                <h1>WELCOME</h1>
                <p>欢迎</p>
            </div>
        
        `;
    };

    const loadMenu = () => {
        content.innerHTML = `<div id="div-page">Menu Page</div>`
    }

    const loadAbout = () => {
        content.innerHTML = `<div id="div-page">About Page</div>`
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const page = btn.textContent.trim();
            if (page === "Home") loadHome();
            if (page === "Menu") loadMenu();
            if (page === "About") loadAbout();

        })
    });
    loadHome()
});
