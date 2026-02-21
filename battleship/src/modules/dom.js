const app = document.getElementById('div-app');

export default function createDomElements() {
    renderModeSelect();
}

const renderModeSelect = () => {
    app.innerHTML = '';
    const container = el('div', ['screen', 'screen--mode']);

    const title = el('h1', ['title'], 'BATTLESHIP');
    const subtitle = el('p', ['subtitle'], 'Choose your game mode');

    const btnGroup = el('div', ['btn-group']);

    const vsComputerBtn = el('button', ['btn', 'btn--primary'], 'vs Computer');
    vsComputerBtn.addEventListener('click', () => {
        game.startGame('Player');
        currentShipIndex = 0;
        orientation = 'horizontal';
        renderSetup();
    });

    const vsPlayerBtn = el('button', ['btn', 'btn--secondary'], 'vs Player');
    vsPlayerBtn.addEventListener('click', () => {
        game.startGame('Player 1', 'Player 2');
        currentShipIndex = 0;
        orientation = 'horizontal';
        setupPlayer = game.getState().player1;
        renderSetup();
    });

    btnGroup.appendChild(vsComputerBtn);
    btnGroup.appendChild(vsPlayerBtn);

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(btnGroup);
    app.appendChild(container);
};