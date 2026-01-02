const btnChangeMode = document.querySelector(".btn-modechange");
let darkmode = localStorage.getItem("dark");

function enableDarkMode() {
    document.body.classList.add("dark")
    localStorage.setItem("dark", "active")
    console.log("is active")
}

function disableDarkMode() {
    document.body.classList.remove("dark")
    localStorage.setItem("dark", null)
    console.log("is not active")
}

if (darkmode === "active") {
    enableDarkMode()
}

btnChangeMode.addEventListener("click", () => {
    darkmode = localStorage.getItem("dark")

    if (darkmode !== "active") {
        enableDarkMode()
    }
    else {
        disableDarkMode()
    }
})