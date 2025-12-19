const displayBox = document.querySelector(".div-screen");
const displayInput = document.querySelector(".display-input");
const displayResult = document.querySelector(".display-result");
const buttons = document.querySelectorAll("button");
const operators = ["%","/","x","-","+"];

let input = "";
let result = "";

function calculate(btnValue){
    input += btnValue;

    displayInput.value = input;
    displayResult.value = result;
}

buttons.forEach(button => {
    button.addEventListener("click", e => calculate(e.target.textContent))
})