export class Ship {
    constructor(length) {
        this._length = length;
        this._hits = 0;
    }

    hit() {
        this._hits++;
        if (this._hits >= this._length) {
            this._isSunk = true;
        }
    }

    isSunk() {
        return this._hits >= this._length;
    }
}