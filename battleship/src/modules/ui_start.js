//this file control the start screen of the game, where players can enter their names and start the game

const app = document.getElementById("div-app");

export function renderStartScreen(onStart) {
    const container = document.createElement("div");
    container.classList.add("container");

    const title = document.createElement("h1");
    title.textContent = "Battleship Game";

    const input1 = document.createElement("input");
    input1.placeholder = "Player 1";

    const input2 = document.createElement("input");
    input2.placeholder = "Player 2";

    const button = document.createElement("button");
    button.textContent = "Start Game";

    button.addEventListener("click", () => {
        const p1 = input1.value.trim();
        const p2 = input2.value.trim();

        if (!p1 || !p2) {
            alert("Enter both player names");
            return;
        }

        localStorage.setItem( "battleship_players", 
            JSON.stringify({ player1: p1, player2: p2 }));
            

        onStart(p1, p2);

        container.remove();
    });

    container.append(title, input1, input2, button);
    app.appendChild(container);
}