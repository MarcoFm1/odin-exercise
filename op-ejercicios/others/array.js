const a = ["A","B","C","D"];

//get element
console.log(a[1]);

//push element
a.push("E");
a.push([1,2]); // ["A", "B", "C", "D", "E", [1,2]]

const b = [["A","B"],[0,1]];
console.log(b[0][1]); //b[row][col]    ; output = B

delete a[3];


//=================================================== splice
let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now ["Let's", "dance", "right", "now"]


//==================================================== slice
let arr2 = ["t", "e", "s", "t"];

alert( arr2.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr2.slice(-2) ); // s,t (copy from -2 till the end)


//===================================================== concat : creates a new array that includes values from other arrays and additional items
let arr3 = [1, 2];

// create an array from: arr and [3,4]
alert( arr3.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr3.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6


//====================================================== forEach : run a function for every element of the array
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});

//===================================================== indexOf : looks for item starting from index from, and returns the index where it was found, otherwise -1
let arr4 = [1, 0, false];

alert( arr4.indexOf(0) ); // 1
alert( arr4.indexOf(false) ); // 2
alert( arr4.indexOf(null) ); // -1

//===================================================== includes : looks for item starting from index from, returns true if found

alert( arr4.includes(1) ); // true


