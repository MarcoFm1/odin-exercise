export class HashMap {
    constructor(load_factor = 0.75, capacity = 16) {
        this._load_factor = load_factor;
        this._capacity = capacity;

        this._buckets = new Array(capacity).fill(null).map(() => []);
        this._size = 0;

    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this._capacity;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this._buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this._size++;

    }

    get(key) {
        const index = this.hash(key);
        const bucket = this._buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }

        return undefined;
    }

    has(key) {
        return this.get(key)
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this._buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this._size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this._size
    }

    clear() {
        this._buckets = new Array(capacity).fill(null).map(() => []);
        this._size = 0;
    }

    keys() {
        const result = [];

        for (let bucket of this._buckets) {
            for (let pair of bucket) {
                result.push(pair[0]);
            }
        }

        return result;
    }


    values() {
        const result = [];

        for (let bucket of this._buckets) {
            for (let pair of bucket) {
                result.push(pair[1]);
            }
        }

        return result;

    }

    entries() {
        const result = [];

        for (let bucket of this._buckets) {
            for (let pair of bucket) {
                result.push(pair);
            }
        }

        return result;

    }

}