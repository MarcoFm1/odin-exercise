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

//===================================================== find : If it returns true, the search is stopped, the item is returned. If nothing is found, undefined is returned.

let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John

//===================================================== filter : returns an array of all matching elements

let users2 = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users2.filter(item => item.id < 3);

alert(someUsers.length); // 2

//===================================================== map : It calls the function for each element of the array and returns the array of results

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths);

//===================================================== split : It splits the string into an array by the given delimiter delim
let names = 'Bilbo, Gandalf, Nazgul';

let arr5 = names.split(', '); // .split(', ', 2) -> Bilbo, Gandalf

for (let name of arr5) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

//===================================================== join : does the reverse to split. It creates a string of arr items joined by glue between them.

let arr6 = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr6.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul

//===================================================== reduce : It are used to calculate a single value based on the array (ver)

let arr7 = [1, 2, 3, 4, 5];

let result = arr7.reduce((sum, current) => sum + current, 0); // sintaxis : let value = arr.reduce(function(accumulator, item, index, array) {

alert(result); // 15


