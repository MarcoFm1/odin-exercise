class Node {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;

        this.footPrint = [x, y];
        this.moves = [];
        this.visited = false;
    }
}

class Board {
    constructor(size) {
        this.size = size;
        this.numberOfFileds = size * size;
        this.matrix = this.make(this.size);
    }

    make(size) {
        let value = 0;
        const matrix = [];

        for (let i = 0; i < size; i++) {
            matrix[i] = i;
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                let node = new Node(i, j, value);
                matrix[i].push(node);
                value++;
            }
        }
        return matrix;
    }

    getNode(x, y) {
        return this.matrix[x][y];
    }

    addEdges() {
        const factorX = [-2, -1, 1, 2, 2, 1, -1, -2];
        const factorY = [1, 2, 2, 1, -1, -2, -2, -1];
        let tempMatrix = this.matrix;
        function addEdge(node, size) {
            for (let i = 0; i < size; i++) {
                let resX = node.x + factorX[i];
                if (resX >= 0 && resX < size) {
                    let resY = node.y + factorY[i];
                    if (resY >= 0 && resY < size) {
                        node.moves.push(tempMatrix[resX][resY]);
                    }
                }
            }
        }

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                addEdge(this.matrix[i][j], this.size);
            }
        }
    }
}

const board = new Board(8);
board.addEdges();

function knightMoves(start, end) {
  try {
    let checkXYArray = [start[0], start[1], end[0], end[1]];
    let xyIndex = checkXYArray.findIndex(
      (element) => element < 0 || element > board.size - 1
    );
    if (xyIndex >= 0) {
      throw new TypeError(
        `Your coordinte ${
          checkXYArray[xyIndex]
        } cannot be lower than 0 and bigger than ${board.size - 1}`
      );
    }

    const startNode = board.getNode(start[0], start[1]);
    const endNode = board.getNode(end[0], end[1]);

    const queue = [[startNode]];
    startNode.visited = true;

    while (queue[0]) {
      const path = queue.shift();
      const node = path[path.length - 1];

      if (node === endNode) {
        console.log(
          `You made it in ${path.length - 1} moves! Here is your path: `
        );
        let array = [];
        path.map((element) => array.push(element.footPrint));

        array.forEach((element) => console.log(element));
      }
      //if the node is not the endNode, we add all its moves to the queue
      for (const move of node.moves) {
        if (!move.visited) {
          move.visited = true;
          queue.push([...path, move]);
        }
      }
    }

    return [];
  } catch (e) {
    console.log("TypeError: ", e.message);
  }
}

knightMoves([3, 3], [4, 3]);