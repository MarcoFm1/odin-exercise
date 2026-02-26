export class Ship {
    constructor(length) {
        this._length = length;
        this._hits = 0;
    }

    hit() {
        this._hits++;
    }

    isSunk() {
        if(this._hits >= this._length){
            return true;
        } ;
    }

    
}