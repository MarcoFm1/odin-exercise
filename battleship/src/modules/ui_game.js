import { Gameboard } from "../factories/gameboard";

const player1Board = new Gameboard();
const player2Board = new Gameboard();

let placingPlayer = 1;
let currentPlayer = 1; //player 1 starts
let status = 0; //0 = not started, 1 = ongoing, 2 = game over

let setupMode = false;
let shipIndex = 0;
const fleet = [5, 4, 3, 3, 2];
let orientation = "horizontal";

document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "r") {
        orientation =
            orientation === "horizontal" ? "vertical" : "horizontal";
    }
    updatePlacementText();
});

const placementText = document.createElement("p");
placementText.classList.add("placement-text");

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

    const controls = document.createElement("div");
    controls.classList.add("controls");

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

    const sunkText = document.createElement("p");
    sunkText.classList.add("sunk-text");


    boards.append(createBoard(player1, player1Board, 1), createBoard(player2, player2Board, 2));

    gameContainer.appendChild(placementText);

    if (status === 0) {
        startButton.style.display = "block";
        boards.style.opacity = "0.5";
    } else {
        startButton.style.display = "none";
        boards.style.opacity = "1";
    }


    controls.append(randommizeButton, placeShipsButton, startButton, newGameButton);

    gameContainer.append(title, turnIndicator, sunkText, placementText, boards, controls);


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
            if (setupMode && playerNumber === placingPlayer) {
                handlePlacementClick(i);
            } else {
                handleAttack(cell, i, gameBoard, playerNumber);
            }
        });


        grid.appendChild(cell);
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
        if (!checkIfThereAreShipsInFleet()) {
            alert("No ships in the fleet");
            return;
        }

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

    if (
        cell.classList.contains("hit") ||
        cell.classList.contains("miss") ||
        cell.classList.contains("sunk")
    ) return;

    const ship = gameBoard.board[index];
    const result = gameBoard.receiveAttack(index);

    cell.classList.remove("ship");

    if (result === "miss") {
        cell.classList.add("miss");
        cell.style.pointerEvents = "none";
        switchTurn();
        return;
    }

    if (result === "hit") {
        cell.classList.add("hit");
        return;
    }

    if (result === "sunk") {
        paintSunkShip(gameBoard, ship);
        showSunkText(ship.length);
        switchTurn();
    }
}

function paintSunkShip(gameBoard, ship) {
    const boardEl = document.querySelector(
        `.board[data-player="${gameBoard === player1Board ? 1 : 2}"]`
    );

    const cells = boardEl.querySelectorAll(".cell");

    gameBoard.board.forEach((cellShip, index) => {
        if (cellShip === ship) {
            cells[index].classList.remove("hit");
            cells[index].classList.add("sunk");
        }
    });
}

function showSunkText(length) {
    const text = document.querySelector(".sunk-text");
    const players = getPlayers();

    const attacker =
        currentPlayer === 1 ? players.player1 : players.player2;

    text.textContent = `${attacker} sunk a ship`;

    setTimeout(() => {
        text.textContent = "";
    }, 10000);
}


function getPlayers() {
    return JSON.parse(localStorage.getItem("battleship_players"));
}

function randomizeBoards(button) {
    button.addEventListener("click", () => {
        setupMode = false;
        shipIndex = 0;
        placingPlayer = 1;
        status = 0;
        currentPlayer = 1;

        clearBoard(player1Board);
        clearBoard(player2Board);

        player1Board.placeFleet();
        player2Board.placeFleet();

        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("ship", "hit", "miss");
            cell.style.pointerEvents = "none";
        });

        showBothBoards();

        const startButton = document.querySelector(".start-button");
        const randommizeButton = document.querySelector(".randomize-button");
        const placeShipsButton = document.querySelector(".place-ships-button");
        startButton.style.display = "block";
        randommizeButton.style.display = "none";
        placeShipsButton.style.display = "none";

        document.querySelector(".boards").style.opacity = "0.5";

        updatePlacementText();
        startButton.click();
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
    placingPlayer = 1;

    clearBoard(player1Board);
    clearBoard(player2Board);

    showOnlyPlayerBoard(1);
    enablePlacementClicks(1);
    redrawPlayerBoard(1);
    updatePlacementText();
}

function enablePlacementClicks(playerNumber) {
    const board = document.querySelector(`.board[data-player="${playerNumber}"]`);
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
    const startbutton = document.querySelector(".start-button");

    if (!setupMode) return;

    const board =
        placingPlayer === 1 ? player1Board : player2Board;

    const placed = board.placeShipManual(
        fleet[shipIndex],
        startIndex,
        orientation
    );

    if (!placed) return;

    shipIndex++;
    redrawPlayerBoard(placingPlayer);
    updatePlacementText();

    //if player 1 finished 
    if (shipIndex === fleet.length) {
        if (placingPlayer === 1) {
            // pass to plauer 2
            placingPlayer = 2;
            shipIndex = 0;

            showOnlyPlayerBoard(2);
            enablePlacementClicks(2);
            redrawPlayerBoard(2);
            updatePlacementText();
            if (placingPlayer === 2) {
            }
        }

        else {
            setupMode = false;
            status = 1;
            showBothBoards();
            switchTurn();
        }
    }
}
function redrawPlayerBoard(playerNumber) {
    const boardEl = document.querySelector(`.board[data-player="${playerNumber}"]`);
    const cells = boardEl.querySelectorAll(".cell");

    const board =
        playerNumber === 1 ? player1Board : player2Board;

    cells.forEach((cell, i) => {
        cell.classList.toggle("ship", !!board.board[i]);
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

function clearBoard(gameBoard) {
    gameBoard.board.fill(null);
    gameBoard.ships = [];
}

function updatePlacementText() {
    const text = document.querySelector(".placement-text");
    if (!text) return;
    if (!setupMode) {
        text.textContent = "";
        return;
    }

    text.textContent = `Player ${placingPlayer}: place ship of size ${fleet[shipIndex]} - orientation: ${orientation.toUpperCase()} (press R to rotate)`;
}


function checkIfThereAreShipsInFleet() {
    if (player1Board.ships.length === 0 || player2Board.ships.length === 0) {
        return false;
    }
    return true;
}
//clear localStorage
// localStorage.removeItem("battleship_players");
// location.reload();

