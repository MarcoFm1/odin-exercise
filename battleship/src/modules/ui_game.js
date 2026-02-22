import { Gameboard } from "../factories/gameboard";

const player1Board = new Gameboard();
const player2Board = new Gameboard();

player1Board.placeShip(5, [0, 1, 2, 3, 4]);
player2Board.placeShip(4, [22, 23, 24, 25]);


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

    boards.append(createBoard(player1, player1Board), createBoard(player2, player2Board));

    gameContainer.append(title, turnIndicator, boards);
    app.appendChild(gameContainer);
    updateTurnIndicator(player1);
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
        grid.appendChild(cell);

        cell.addEventListener("click", () => {
            const result = gameBoard.receiveAttack(i);

            if (result === "hit" || result === "sunk") {
                cell.style.backgroundColor = "red";
                cell.style.pointerEvents = "none";

                if (result === "sunk") {
                    console.log("ship sunk");
                }
            }
            else if (result === "miss") {
                cell.style.backgroundColor = "grey";
                cell.style.pointerEvents = "none";
            }
        })
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

//clear localStorage
// localStorage.removeItem("battleship_players");
// location.reload();