import "./style.css";
export class Ship {
    constructor(length, isSunk) {
        this._length = length;
        this._isSunk = isSunk;
    }

    hit() {
        this._length--;
        if (this._length <= 0) {
            this._isSunk = true;
        }
    }

    isSunk() {
        return this._isSunk;
    }
}