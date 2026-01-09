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
const turnText = document.querySelector(".turn-text");

const nameOne = document.getElementById("input-1");
const nameTwo = document.getElementById("input-2");

const divPlayer = document.querySelector(".div-player");

function Player(name) {
    this.name = name;
}


let currentPlayer = "X";
let playerX = "";
let playerO = "";

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

function initGame() {
    const cells = document.querySelectorAll(".cell") //da la lista de celdas
    const turnText = document.querySelector(".turn-text")
    turnText.textContent = "Turn: " + randomPlayer;
    /*cells.forEach(cell => {
        const index = cell.dataset.index
        console.log("cell: ", index)
        cell.textContent = index
    })*/

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent !== "") return;

            cell.textContent = currentPlayer;

            // CAMBIO DE TURNO CORRECTO
            if (currentPlayer === "X") {
                currentPlayer = "O";
                randomPlayer = (randomPlayer === nameOne.value)
                    ? nameTwo.value
                    : nameOne.value;
            } else {
                currentPlayer = "X";
                randomPlayer = (randomPlayer === nameOne.value)
                    ? nameTwo.value
                    : nameOne.value;
            }

            turnText.textContent = "Turn: " + randomPlayer;
            logicGame();
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

const winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

function logicGame() {
    const cells = document.querySelectorAll(".cell");

    for (let i = 0; i < winCondition.length; i++) {
        const a = winCondition[i][0];
        const b = winCondition[i][1];
        const c = winCondition[i][2];

        if (cells[a].textContent !== "" && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            showWinner(cells[a].textContent);

            return;
        }
    }

}


function showWinner(symbol) {
    const winnerName = symbol === "X" ? nameOne.value || "Player 1" : nameTwo.value || "Player 2";
    const overlay = document.createElement("div");
    overlay.classList.add("winner-overlay");
    overlay.innerHTML = `
        <div class="winner-box">
            <h2>🎉 Winner 🎉</h2>
            <span>${winnerName}</span>
            <br><br>
            <button class="btn-restart">Play Again</button>
        </div>
    `;

    overlay.querySelector("button").addEventListener("click", () => {
        overlay.remove();
        restartGame();
    });

    document.body.appendChild(overlay);
}
