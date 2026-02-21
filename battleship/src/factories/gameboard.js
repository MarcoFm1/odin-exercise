export class Gameboard {
    constructor(boardSize) {
        this._boardSize = boardSize;
        this._ships = [];

    }
    reciveAttack(x, y) {
        // Logic to handle receiving an attack at position (x, y)
        // This method would check if a ship is hit and update the gameboard state accordingly
        if (this._ships.some(ship => ship.isHit(x, y))) {
            console.log(`Hit at (${x}, ${y})!`);
        } else {
            console.log(`Miss at (${x}, ${y}).`);
        }
    }

    

}
