const gridContainer = document.getElementById("grid-container")
const btnRandom = document.getElementById("btn-random");
const btnEraser = document.getElementById("eraser-btn");
const btnMode = document.getElementById("btn-click");
const modeTxt = document.getElementById("mode-txt")

const rowscols = 16;
let clickMode = false;

function createGrid(rowscols) {
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateRows = `repeat(${rowscols}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${rowscols}, 1fr)`;

    for (let i = 0; i < rowscols; i++) {
        for (let j = 0; j < rowscols; j++) {
            let div1 = document.createElement("div");
            div1.style.border = "1px solid rgb(218, 218, 218)";
            gridContainer.appendChild(div1);
        }
    }
}

gridContainer.addEventListener("mouseover", handleHover);

createGrid(rowscols);

function modifyGrid() {
    console.log("i modified grid")
    newrowscols = prompt("Grid: ");

    gridContainer.innerHTML = "";

    createGrid(newrowscols);
}

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;
let eraseMode = false;


function modeClick() {

    btnRandom.style.background = "white";
    btnMode.style.background = "yellow";
    btnEraser.style.background = "white";

    console.log("mode click")

    clickMode = !clickMode;

    if (clickMode) {
        eraseMode = false;

        btnEraser.style.display = "block";

        btnMode.innerHTML = "MODE HOVER";
        modeTxt.innerHTML = "Mode : CLICK"

        gridContainer.removeEventListener("mouseover", handleHover);
        gridContainer.addEventListener("click", handleHover);

        gridContainer.addEventListener("mousemove", function (e) {
            if (mouseDown && clickMode) {
                handleHover(e, "black");
            };
        });

    } else {
        eraseMode = false;

        btnEraser.style.display = "none";
        btnMode.innerHTML = "MODE CLICK";
        modeTxt.innerHTML = "Mode : HOVER";
        gridContainer.removeEventListener("click", handleHover);
        gridContainer.addEventListener("mouseover", handleHover);
    }
}

function eraser() {
    btnRandom.style.background = "white";
    btnMode.style.background = "white";
    btnEraser.style.background = "yellow";

    modeTxt.innerHTML = "Mode : ERASER"

    if (!clickMode) return;
    eraseMode = true;
}


function handleHover(e) {
    if (e.target === gridContainer) return;
    if (eraseMode) {
        e.target.style.background = "white";
        return;
    }
    if (randomMode) {
        let current = window.getComputedStyle(e.target).backgroundColor;
        //if not colored
        if (current === "rgba(0, 0, 0, 0)" || current === "rgb(255, 255, 255)") {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            e.target.style.background = `rgb(${r}, ${g}, ${b})`;
            return;
        }
        //if colored
        let parts = current.replace("rgb(", "").replace(")", "").split(",");
        let r = Math.max(0, parseInt(parts[0]) - 10);
        let g = Math.max(0, parseInt(parts[1]) - 10);
        let b = Math.max(0, parseInt(parts[2]) - 10);

        e.target.style.background = `rgb(${r}, ${g}, ${b})`;
        return;
    }
    else {
        e.target.style.background = "black";
    }
}

function reset() {
    console.log("reset")
    gridContainer.innerHTML = "";
    createGrid(rowscols);
}

let randomMode = false;

function modeRandom() {
    console.log("mode random")
    btnRandom.style.background = "yellow";
    btnMode.style.background = "white";
    btnEraser.style.background = "white";

    randomMode = !randomMode;

    if (randomMode) {
        btnRandom.innerHTML = "MODE BLACK";
        modeTxt.innerHTML = "Mode : RANDOM";

        gridContainer.removeEventListener("click", handleHover);
        gridContainer.addEventListener("mouseover", handleHover);

    } else {
        btnRandom.innerHTML = "MODE RANDOM";
        modeTxt.innerHTML = "Mode : BLACK";

        gridContainer.removeEventListener("click", handleHover);
        gridContainer.addEventListener("mouseover", handleHover);
    }
}
