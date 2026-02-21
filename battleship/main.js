//this file is for take control of screens

import "./src/style.css";
import { renderStartScreen } from "./src/modules/ui_start.js";
import { renderGameScreen } from "./src/modules/ui_game.js";

renderStartScreen((player1, player2) => {
    console.log("Starting game...");
    renderGameScreen(player1, player2);
});