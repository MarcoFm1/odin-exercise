//this file control game screen, where players can see their boards and play the game

export function renderGameScreen(player1, player2) {
    const app = document.getElementById("div-app");

    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");

    const title = document.createElement("h2");
    title.textContent = `${player1} vs ${player2}`;

    const boards = document.createElement("div");
    boards.classList.add("boards");

    const board1 = createBoard(player1);
    const board2 = createBoard(player2);

    boards.append(board1, board2);
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

    // tablero 10x10
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
    }

    board.append(label, grid);
    return board;
}