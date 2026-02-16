class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    //insert first node
    insertFirst(data){
        this.head = new Node(data, this.head)
        this.size++
    }

    //insert last node
    insertLast(data){
        let node = new Node(data)
        let current;

        if(!this.head){
            this.head = node
        }
        else{
            current = this.head;

            while(current.nextMode){
                current = current.nextMode;
            }

            current.nextMode = node;
        }
        this.size++
    }

    //insert at index
    insertAt(data, index){
        if(index > 0 && index > this.size){
            return
        }

        if(index === 0){
            this.head = new Node(data, this.head)
            return;
        }

        const node = new Node(data)
        let current, previous;

        current = this.head;

        let count = 0

        while(count < index){
            previous = current;
            count++;
            current = current.nextMode;
        }

        node.nextMode = current;
        previous.nextMode = node;

        this.size++
    }


    //get at index
    getAt(index){
        let current = this.head;
        let count = 0

        while(current){
            if(count == index){
                console.log(current.value)
            }
            count++;
            current = current.next
        }

        return null;
    }

    //remove at index
    removeAt(index){
        if (index > 0 && index > this.size){
            return
        }
        let current = this.head
        let previous;
        let count = 0;

        if(index === 0){
            this.head = current.nextMode
        }
        else{
            while(count < index){
                count++;
                previous = current;
                current = current.next;
            }

            previous.next = current.next;
        }
        this.size--
    }


    //clear list
    clearList(){
        this.head = null;
        this.size = 0;
    }


    //print last data
    printListData(){
        let current = this.head;
        while (current){
            console.log(current.data);
            current = current.nextMode
        }
    }
}

class Node{
    constructor(value, nextModeMode = null){
        this._value = value;
        this._nextModeMode = nextModeMode; 
    }
}

const n1 = new Node(100);
console.log(n1)