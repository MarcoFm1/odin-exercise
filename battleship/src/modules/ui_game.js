import { Gameboard } from "../factories/gameboard";

const player1Board = new Gameboard();
const player2Board = new Gameboard();

player1Board.placeFleet();
player2Board.placeFleet();


export function renderGameScreen(player1, player2) {
    //if player names dont exist, try to get them from localStorage
    if (!player1 || !player2) {
        const savedPlayers = localStorage.getItem("battleship_players");

        if (!savedPlayers) {
            return;
        }

        //transform the string back to an object
        const data = JSON.parse(savedPlayers);
        player1 = data.player1;
        player2 = data.player2;
    }

    const app = document.getElementById("div-app");

    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");

    const title = document.createElement("h2");
    title.textContent = `${player1} vs ${player2}`;

    const turnIndicator = document.createElement("p");
    turnIndicator.textContent = `${player1}'s turn`;

    const boards = document.createElement("div");
    boards.classList.add("boards");

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");

    const newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.classList.add("new-game-button");
    resetGame(newGameButton);

    boards.append(createBoard(player1, player1Board), createBoard(player2, player2Board));

    gameContainer.append(title, turnIndicator, boards, startButton, newGameButton);
    app.appendChild(gameContainer);
    updateTurnIndicator(player1);

    const cells = gameContainer.querySelectorAll(".cell");
    startGame(startButton, cells);

}

function createBoard(playerName, gameBoard) {
    const board = document.createElement("div");
    board.classList.add("board");

    const label = document.createElement("h3");
    label.textContent = playerName;

    const grid = document.createElement("div");
    grid.classList.add("grid");

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // testing show ships on the board
        if (gameBoard.board[i]) {
            cell.classList.add("ship");
        }

        cell.addEventListener("click", () => {
            const result = gameBoard.receiveAttack(i);

            cell.classList.remove("ship");

            if (result === "hit" || result === "sunk") {
                cell.classList.add("hit");
            } else {
                cell.classList.add("miss");
            }

            cell.style.pointerEvents = "none";
        });
        grid.appendChild(cell);
    }

    board.append(label, grid);
    return board;
}


function updateTurnIndicator(playerName) {
    const turnIndicator = document.querySelector(".game-container p");
    const data = JSON.parse(localStorage.getItem("battleship_players"));

    turnIndicator.textContent = `${playerName}'s turn`;

    if (playerName === data.player1) {
        turnIndicator.style.color = "blue";
    } else {
        turnIndicator.style.color = "green";
    }
}

function startGame(button, cells) {
    button.addEventListener("click", () => {
        cells.forEach(cell => {
            cell.classList.remove("ship", "hit", "miss");

            cell.style.pointerEvents = "auto";
        });

        button.style.display = "none";
    });
}


function resetGame(button){
    button.addEventListener("click", () => {
        localStorage.removeItem("battleship_players");
        location.reload();
    });
}

//clear localStorage
// localStorage.removeItem("battleship_players");
// location.reload();