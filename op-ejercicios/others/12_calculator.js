const add = function(a,b) {
    return a + b;
};

const subtract = function(a,b) {
    return a - b;
};

const sumOfArray = function(array) {
	return array.reduce((total,current) => total+current, 0);
};

const multiply = function(array) {
    return array.reduce((total,current) => total * current);
};

const power = function(a,b) {
    return a ** b;
};

const factorial = function(a) {
    let init = 1;
    for(let i = a; i>0 ; i--){
        init = init*i
    }
    return a
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sumOfArray,
  multiply,
  power,
  factorial
};