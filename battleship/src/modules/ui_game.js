import { Gameboard } from "../factories/gameboard";

const player1Board = new Gameboard();
const player2Board = new Gameboard();

player1Board.placeFleet();
player2Board.placeFleet();

let currentPlayer = 1; //player 1 starts
let status = 0; //0 = not started, 1 = ongoing, 2 = game over

let setupMode = false;
let shipIndex = 0;
const fleet = [5, 4, 3, 3, 2];
let orientation = "horizontal";

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

    const randommizeButton = document.createElement("button");
    randommizeButton.textContent = "Randomize";
    randommizeButton.classList.add("randomize-button");

    const placeShipsButton = document.createElement("button");
    placeShipsButton.textContent = "Place Ships";
    placeShipsButton.classList.add("place-ships-button");

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");

    const newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.classList.add("new-game-button");
    resetGame(newGameButton);

    boards.append(createBoard(player1, player1Board, 1), createBoard(player2, player2Board, 2));

    if (status === 0) {
        startButton.style.display = "block";
        boards.style.opacity = "0.5";
    } else {
        startButton.style.display = "none";
        boards.style.opacity = "1";
    }

    gameContainer.append(title, turnIndicator, boards, randommizeButton, placeShipsButton, startButton, newGameButton);


    app.appendChild(gameContainer);
    updateTurnIndicator(player1);

    const cells = gameContainer.querySelectorAll(".cell");
    startGame(startButton, cells);
    switchTurn();

    randomizeBoards(randommizeButton);
    placeShipsManually(placeShipsButton);
}

function createBoard(playerName, gameBoard, playerNumber) {
    const board = document.createElement("div");
    board.classList.add("board");
    board.dataset.player = playerNumber;

    const label = document.createElement("h3");
    label.textContent = playerName;

    const grid = document.createElement("div");
    grid.classList.add("grid");


    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.pointerEvents = "none";

        if (gameBoard.board[i]) {
            cell.classList.add("ship");
        }

        cell.addEventListener("click", () => {
            if (setupMode && playerNumber === 1) {
                handlePlacementClick(i);
            } else {
                handleAttack(cell, i, gameBoard, playerNumber);
            }
        }); grid.appendChild(cell);
    }

    board.append(label, grid);
    return board;
}


function updateTurnIndicator(playerName) {
    const turnIndicator = document.querySelector(".game-container p");
    const data = getPlayers();
    turnIndicator.textContent = `${playerName}'s turn`;

    if (playerName === data.player1) {
        turnIndicator.style.color = "blue";

    } else {
        turnIndicator.style.color = "green";
    }
}

function enableBoards() {
    const boards = document.querySelector(".boards");
    boards.style.pointerEvents = "auto";
    boards.style.opacity = "1";
}

function startGame(button, cells) {
    button.addEventListener("click", () => {
        status = 1;
        cells.forEach(cell => {
            cell.classList.remove("ship", "hit", "miss");
        });

        button.style.display = "none";
        enableBoards();
        switchTurn();
    });
}

function resetGame(button) {
    button.addEventListener("click", () => {
        localStorage.removeItem("battleship_players");
        location.reload();
    });
}

function switchTurn() {
    if (status !== 1) return;
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    const boards = document.querySelectorAll(".board");

    boards.forEach(board => {
        const owner = Number(board.dataset.player);
        const cells = board.querySelectorAll(".cell");

        cells.forEach(cell => {
            // only enemy cells are clickable
            cell.style.pointerEvents =
                owner !== currentPlayer ? "auto" : "none";
        });
    });

    updateTurnIndicator(
        currentPlayer === 1
            ? getPlayers().player1
            : getPlayers().player2
    );
}

function handleAttack(cell, index, gameBoard, boardOwner) {
    if (currentPlayer === boardOwner) return;

    if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
        return;
    }

    const result = gameBoard.receiveAttack(index);

    cell.classList.remove("ship");

    cell.classList.add(
        result === "hit" || result === "sunk" ? "hit" : "miss"
    );

    if (result === "hit" || result === "sunk") {
        if (currentPlayer === 1) {
            return updateTurnIndicator(getPlayers().player1);
        } else {
            return updateTurnIndicator(getPlayers().player2);
        }
    }

    cell.style.pointerEvents = "none";

    if (result === "sunk") {
        console.log("Ship sunk!");
    }

    switchTurn();
}

function getPlayers() {
    return JSON.parse(localStorage.getItem("battleship_players"));
}

function randomizeBoards(button) {
    button.addEventListener("click", () => {
        location.reload();
    });
}

function placeShipsManually(button) {
    button.addEventListener("click", () => {
        enterPlacementMode();
        button.style.display = "none";
    });
}

function enterPlacementMode() {
    setupMode = true;
    status = 0;
    shipIndex = 0;

    showOnlyPlayerBoard(1);
    enablePlacementClicks();
}
function enablePlacementClicks() {
    const board = document.querySelector('.board[data-player="1"]');
    board.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "auto";
    });
}
function showOnlyPlayerBoard(playerNumber) {
    document.querySelectorAll(".board").forEach(board => {
        board.style.display =
            Number(board.dataset.player) === playerNumber ? "block" : "none";
    });
}

function handlePlacementClick(startIndex) {
    if (!setupMode) return;

    const length = fleet[shipIndex];

    const placed = player1Board.placeShipManual(
        length,
        startIndex,
        orientation
    );

    if (!placed) return;

    shipIndex++;
    redrawPlayerBoard();

    if (shipIndex === fleet.length) {
        setupMode = false;
        alert("All ships placed! Press Start Game");
        showBothBoards();
    }
}

function redrawPlayerBoard() {
    const board = document.querySelector('.board[data-player="1"]');
    const cells = board.querySelectorAll(".cell");

    cells.forEach((cell, i) => {
        cell.classList.toggle("ship", !!player1Board.board[i]);
    });
}

function showBothBoards() {
    document.querySelectorAll(".board").forEach(board => {
        board.style.display = "block";
        board.querySelectorAll(".cell").forEach(cell => {
            cell.style.pointerEvents = "none";
        });
    });
}
//clear localStorage
// localStorage.removeItem("battleship_players");
// location.reload();