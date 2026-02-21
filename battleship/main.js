//this file is for take control of screens

import "./src/style.css";
import { renderStartScreen } from "./src/modules/ui_start.js";
import { renderGameScreen } from "./src/modules/ui_game.js";

const savedPlayers = localStorage.getItem("battleship_players");

if (savedPlayers) {
    renderGameScreen();
} else {
    renderStartScreen((player1, player2) => {
        renderGameScreen(player1, player2);
    });
}