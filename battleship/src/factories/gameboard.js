import { Ship } from "./ship.js";

export class Gameboard {
    constructor(boardSize = 10) {
        this.boardSize = boardSize;
        this.board = Array(boardSize * boardSize).fill(null);
        this.ships = [];
    }
    receiveAttack(position) {
        const ship = this.board[position]
        if (ship) {
            ship.hit()
            if (ship.isSunk()) {
                return "sunk"
            }
            return "hit"
        }
        return "miss"
    }

    placeShip(length, position) {
        const ship = new Ship(length);
        this.ships.push(ship);

        position.forEach(pos => {
            this.board[pos] = ship;
        })
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
