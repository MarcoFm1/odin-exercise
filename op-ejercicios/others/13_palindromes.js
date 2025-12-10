const palindromes = function (word) {
    let wordStart = word.split("").join()
    let wordReverse = word.split("").reverse().join()
    if(wordStart == wordReverse){
        return true
    }
    else{
        return false
    }
};

palindromes("reconocer")

// Do not edit below this line
module.exports = palindromes;