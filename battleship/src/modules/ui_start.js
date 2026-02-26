// this file controls the start screen of the game

const app = document.getElementById("div-app");

export function renderStartScreen(onStart) {
    const container = document.createElement("div");
    container.classList.add("container");

    const title = document.createElement("h1");
    title.textContent = "Battleship Game";

    const creator = document.createElement("p");
    creator.textContent = "by Marco";

    const input1 = document.createElement("input");
    input1.placeholder = "Player 1";

    const input2 = document.createElement("input");
    input2.placeholder = "Player 2";

    const botWrapper = document.createElement("div");
    botWrapper.classList.add("bot-wrapper");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "bot-check";
    checkbox.classList.add("checker");

    const checkBot = document.createElement("label");
    checkBot.textContent = "Play against Bot";
    checkBot.htmlFor = "bot-check";

    botWrapper.append( checkbox, checkBot);

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            input2.value = "Bot";
            input2.disabled = true;
            input2.classList.add("disabled");
        } else {
            input2.value = "";
            input2.disabled = false;
            input2.classList.remove("disabled");
        }
    });

    const button = document.createElement("button");
    button.textContent = "Start Game";
    shake(button);

    button.addEventListener("click", () => {
        const p1 = input1.value.trim();
        const p2 = input2.value.trim();

        if (!p1 || !p2) {
            alert("Enter both player names");
            return;
        }

        localStorage.setItem("battleship_players",JSON.stringify({ player1: p1, player2: p2 }));

        onStart(p1, p2);
        container.remove();
    });

    container.append(title,creator,input1,input2,botWrapper,button);

    app.appendChild(container);
}

function shake(element) {
    element.classList.remove("shake");
    void element.offsetWidth;
    element.classList.add("shake");
}