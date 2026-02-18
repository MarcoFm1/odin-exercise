class Node {
    constructor(data, left, right) {
        this._data = data
        this._left = left
        this._right = right
    }
}

class Tree {
    constructor(root) {
        this._root = root
    }

    // minor elements to the left, major elements to the right
    buildTree(arr) {
        let sortedArr = arr.sort((a, b) => a - b) // minor to major
        let mid = Math.floor(sortedArr.length / 2)
        if (sortedArr.length === 0) {
            return null
        }
        let mainNode = new Node(sortedArr[mid], null, null) // initialize without left and right
        mainNode._left = this.buildTree(sortedArr.slice(0, mid)) // minor elements to the left
        mainNode._right = this.buildTree(sortedArr.slice(mid + 1)) // major elements to the right
        return mainNode
    }

    // returns true if the given value is in the tree
    includes(value) {
        if (this._root === null) {
            return false
        }
        let currentNode = this._root
        while (currentNode) {
            if (currentNode._data === value) {
                return true
            }
            else {
                return false
            }
        }
    }

    //inserts a new node with that value into the tree
    insert(value) {
        if (this._root === null) {
            this._root = new Node(value, null, null)
            return
        }
        let currentNode = this._root
        while (currentNode) {
            if (value < currentNode._data) {
                currentNode = currentNode._left
            }
            else if (value > currentNode._data) {
                currentNode = currentNode._right
            }
            else {
                return
            }
        }

    }

    //accepts a value and removes it from the tree
    deleteItem(value) {
        if (this._root === null) {
            return
        }
        //if value exist, pop it out from the array and generate the new tree

    }

    // traverse the tree in breadth-first level order and call the callback on each value as it traverses
    levelOrderForEach(callback) {

    }

    // traverse the tree in their respective depth-first order and pass each value to the provided callback
    inOrderForEach(callback) {

    }


    preOrderForEach(callback) {

    }


    postOrderForEach(callback) {

    }

    // returns the height of the node containing the given value
    height(value) {
        if (this._root === null) {
            return "Nothing"
        }

    }

    // returns the depth of the node containing the given value
    depth(value) {
        let currentDepth = 0
        let currentNode = this._root

        if (this._root === null) {
            return "Nothing"
        }
        while (currentNode) {
            if (currentNode._data === value) {
                return currentDepth
            }
            else if (value < currentNode._data) {
                currentNode = currentNode._left
                currentDepth++
            }
            else {
                currentNode = currentNode._right
                currentDepth++
            }
        }
        return "Value not found"
    }

    // checks if the tree is balanced
    isBalanced() {
        return this.isBalanced(this._root)
    }

}