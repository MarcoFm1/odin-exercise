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

    const boards = document.createElement("div");
    boards.classList.add("boards");

    boards.append(
        createBoard(player1),
        createBoard(player2)
    );

    gameContainer.append(title, boards);
    app.appendChild(gameContainer);
}

function createBoard(playerName) {
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
    }

    board.append(label, grid);
    return board;
}