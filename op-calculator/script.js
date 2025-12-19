const displayBox = document.querySelector(".div-screen");
const displayInput = document.querySelector(".display-input");
const displayResult = document.querySelector(".display-result");
const buttons = document.querySelectorAll("button");
const operators = ["%", "/", "x", "-", "+"];

let input = "";
let result = "";

let lastCalculation = false;

function calculate(btnValue) {
    const lastChar = input.slice(-1);
    const isLastCharOperation = operators.includes(lastChar);
    const withoutLastChar = input.slice(0, -1);
    const isInvalidResult = ["Error", "Infinity"].includes(result)


    //cambiar al apretar igual
    if (btnValue === "=") {
        if (input === "" || lastChar === "." || lastChar === "(" || isLastCharOperation && lastChar !== "%" || lastCalculation) {
            return
        }
        const formattedInput = replaceOperators(input);
        try {
            const calculatedValue = eval(formattedInput);
            result = parseFloat(calculatedValue.toFixed(6).toString());
        }
        catch {
            result = "error"
        }
        input += btnValue
        lastCalculation = true;
        displayBox.classList.add("active");
    }
    else if (btnValue === "AC") {
        resetCalculator("")
    }
    else if (btnValue === "C") {
        if (lastCalculation) {
            if (isInvalidResult) {
                resetCalculator("")
            }
            resetCalculator(result.slice(0, -1))
        }
        input = withoutLastChar;
    }
    else if (operators.includes(btnValue)) {
        if (lastCalculation) {
            resetCalculator(result + btnValue);
        }
        else if ((input === "" || lastChar === "(") && btnValue !== "-" || input === "-" || lastChar === "." || secondToLastChar === "(" && lastChar === "-" || lastChar === "%" && btnValue === "%") {
            return
        }
        else if(lastChar==="%"){
            input += btnValue;
        }
        else if(isLastCharOperation){
            input = withoutLastChar + btnValue;
        }
        else {
            input += btnValue
        }
    }
    else {
        if (lastCalculation) {
            if (isInvalidResult) {
                return
            }
            resetCalculator(btnValue)
        }
        else {
            input += btnValue
        }

    }
    displayInput.value = input;
    displayResult.value = result;

    //desliza cuando se llena el espacio
    displayInput.scrollLeft = displayInput.scrollWidth;

}

const replaceOperators = input => input.replaceAll("x", "*");

buttons.forEach(button => {
    button.addEventListener("click", e => calculate(e.target.textContent))
})

function resetCalculator(newInput) {
    input = newInput;
    result = "";
    lastCalculation = false;
    displayBox.classList.remove("active")
}