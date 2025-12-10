const fibonacci = function(n) {
    let a = 0;
    let b = 1;
    for(let i = 0; i <= n; i++){
        let next = a + b;
        a = b;
        b = next;
    }
    return b;
};

fibonacci(3);

// Do not edit below this line
module.exports = fibonacci;