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

//================================================
const btnStart = document.querySelector(".btn-start");
const btnRestart = document.querySelector(".btn-restart");
const dashboardCont = document.querySelector(".div-dashboard")

const nameOne = document.getElementById("input-1");
const nameTwo = document.getElementById("input-2");

const divPlayer = document.querySelector(".div-player");

function Player(name) {
    this.name = name;
}


let randomPlayer;

btnStart.addEventListener("click", () => {
    if (!nameOne.value || !nameTwo.value) {
        alert("Put names");
    }
    else {
        let playerOne = new Player(nameOne.value)
        let playerTwo = new Player(nameTwo.value)
        console.log("Created player 1: ", playerOne.name)
        console.log("Created player 2: ", playerTwo.name)

        divPlayer.classList.add("input-hide");
        btnStart.classList.add("input-hide");

        const array = [playerOne.name, playerTwo.name];

        randomPlayer = array[Math.floor(Math.random() * array.length)];
        console.log("Turn: ", randomPlayer)

        renderDashBoard()
    }
});


function renderDashBoard() {
    dashboardCont.innerHTML = `
        <div class="dashboard">
            <h2 class="turn-text">Turn: ${randomPlayer}</h2>
            <div class="board">
                <div class="cell" data-index="0"></div>
                <div class="cell" data-index="1"></div>
                <div class="cell" data-index="2"></div>
                <div class="cell" data-index="3"></div>
                <div class="cell" data-index="4"></div>
                <div class="cell" data-index="5"></div>
                <div class="cell" data-index="6"></div>
                <div class="cell" data-index="7"></div>
                <div class="cell" data-index="8"></div>
            </div>

            <button class="btn-restart" onclick="restartGame()">Restart</button>
        </div>
    `;
    initGame();
}

let currentPlayer = "X";

function initGame() {
    const cells = document.querySelectorAll(".cell") //da la lista de celdas
    const turnText = document.querySelector(".turn-text")
    /*cells.forEach(cell => {
        const index = cell.dataset.index
        console.log("cell: ", index)
        cell.textContent = index
    })*/

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent !== "") return;

            const currentIndex = cell.dataset.index
            console.log("cell clicked: ", currentIndex, " | simbol: ", currentPlayer)

            cell.textContent = currentPlayer;

            if (currentPlayer === "X" ) {
                currentPlayer = "O";
                if(randomPlayer === nameOne.value){
                    randomPlayer = nameTwo.value
                    console.log("Turn name: ", randomPlayer)
                    turnText.textContent = "Turn: "+ randomPlayer;
                }
            }
            else {
                currentPlayer = "X";
                randomPlayer = nameOne.value
                console.log("Turn name: ", randomPlayer)
                turnText.textContent = "Turn: "+ randomPlayer;
            }
        });
    });
}

function restartGame() {
    currentPlayer = "X";
    const cells = document.querySelectorAll(".cell") //da la lista de celdas

    cells.forEach(cell => {
        cell.textContent = "";
    })
}

