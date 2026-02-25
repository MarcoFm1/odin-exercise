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
    placeFleet() {
        const ships = [5, 4, 3, 3, 2];

        ships.forEach(length => {
            let placed = false;

            while (!placed) {
                const horizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * this.boardSize);
                const col = Math.floor(Math.random() * this.boardSize);

                const positions = [];

                for (let i = 0; i < length; i++) {
                    let r;
                    let c;
                    if (horizontal) {
                        r = row;
                    } else {
                        r = row + i;
                    }

                    if (horizontal) {
                        c = col + i;
                    } else {
                        c = col;
                    }
                    if (r >= this.boardSize || c >= this.boardSize) {
                        break;
                    }

                    const index = r * this.boardSize + c;

                    if (this.board[index] !== null) {
                        break;
                    }

                    positions.push(index);
                }

                if (positions.length === length) {
                    this.placeShip(length, positions);
                    placed = true;
                }
            }
        });
    }

    placeShipManual(length, startIndex, orientation) {
        const positions = [];

        for (let i = 0; i < length; i++) {
            const pos =
                orientation === "horizontal"
                    ? startIndex + i
                    : startIndex + i * this.size;

            if (pos >= this.board.length || this.board[pos]) return false;
            positions.push(pos);
        }

        const ship = { length, hits: 0 };
        this.ships.push(ship);

        positions.forEach(pos => {
            this.board[pos] = ship;
        });

        return true;
    }
}

