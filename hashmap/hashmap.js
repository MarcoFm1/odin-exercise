export class HashMap {
    constructor(load_factor = 0.75, capacity = 16) {
        this._load_factor = load_factor;
        this._capacity = capacity;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value){
        if(key){

        }
    }

    get(key){

    }

    has(key){

    }

    remove(key){

    }

    length(){

    }

    clear(){

    }

    keys(){

    }

    values(){

    }

    entries(){

    }

    

}