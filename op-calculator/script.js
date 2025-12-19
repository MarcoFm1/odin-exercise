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
    const secondToLastChar = input.slice(-2, -1)
    let { openBracketsCount, closeBracketsCount } = countBrackets(input);

    //cambiar al apretar igual
    if (btnValue === "=") {
        if (input === "" || lastChar === "." || lastChar === "(" || isLastCharOperation && lastChar !== "%" || lastCalculation) {
            return
        }

        while (openBracketsCount > closeBracketsCount) {
            input += ")";
            closeBracketsCount++;
        }

        const formattedInput = replaceOperators(input);
        try {
            const calculatedValue = input.includes("%") ? calculatePercentage(input) : eval(formattedInput);
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
        else if ((input === "" || lastChar === "(") && btnValue !== "-" || input === "-" || lastChar === "." || secondToLastChar === "(" && lastChar === "-" || (secondToLastChar === "%" || lastChar === "%") && btnValue === "%") {
            return
        }
        else if (lastChar === "%") {
            input += btnValue;
        }
        else if (isLastCharOperation) {
            input = withoutLastChar + btnValue;
        }
        else {
            input += btnValue
        }
    }
    //controlar decimales
    else if (btnValue === ".") {
        const decimalValue = "0.";
        if (lastCalculation) {
            resetCalculator(decimalValue);
        }
        else if (lastChar === ")" || lastChar === "%") {
            input += "x" + decimalValue;
        }
        else if (input === "" || isLastCharOperator || lastChar === "(") {
            input += decimalValue;
        }
        else {
            let lastOperatorIndex = -1;
            for (const operator of operators) {
                const index = input.lastIndexOf(operator);
                if (index > lastOperatorIndex) {
                    lastOperatorIndex = index;
                }
            }

            if (!input.slice(lastOperatorIndex + 1).includes(".")) {
                input += btnValue
            }
            input += btnValue;

        }
    }

    //controlador de parentesis
    else if (btnValue === "( )") {
        if (lastCalculation) {
            if (isInvalidResult) {
                resetCalculator("(")
            }
            else resetCalculator(result + "x(");
        }
        else if (lastChar === "(" || lastChar === ".") {
            return
        }
        else if (input === "" || isLastCharOperation && lastChar !== "%") {
            input += "("
        }
        else if (openBracketsCount > closeBracketsCount) {
            input += ")"
        }
        else {
            input += "x(";
        }
    }

    else {
        if (lastCalculation) {
            if (isInvalidResult) {
                return
            }
            resetCalculator(btnValue)
        }
        else if (input === "0") {
            input = btnValue
        }
        else if ((operators.includes(secondToLastChar) || secondToLastChar === "(") && lastChar === "0") {
            input = withoutLastChar + btnValue
        }
        else if (lastChar === ")" || lastChar === "%") {
            input += "x" + btnValue
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

function calculatePercentage(input) {
    let processedInput = "";
    let numberBuffer = "";
    const bracketsState = [];
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (!isNaN(char) || char === ".") {
            numberBuffer = numberBuffer + char;

        } else if (char === "%") {

            const percentValue = parseFloat(numberBuffer) / 100;

            let prevOperator = "";
            if (i > 0) {
                prevOperator = input[i - numberBuffer.length - 1];
            }

            let nextOperator = "";
            if (i + 1 < input.length && operators.includes(input[i + 1])) {
                nextOperator = input[i + 1];
            }

            if (
                prevOperator === "" ||
                prevOperator === "*" ||
                prevOperator === "("
            ) {
                processedInput = processedInput + percentValue;

            } else if (
                prevOperator === "-" ||
                prevOperator === "+"
            ) {

                if (
                    nextOperator === "+" ||
                    nextOperator === "-"
                ) {
                    processedInput = processedInput + percentValue;

                } else {
                    processedInput =
                        "(" +
                        processedInput.slice(0, -1) +
                        ")*" +
                        percentValue;
                }
            }

            numberBuffer = "";
        }
        else if (operators.includes(char) || char === "(" || char === ")") {
            if (numberBuffer) {
                processedInput += numberBuffer;
                numberBuffer = "";
            }
            if (operators.includes(char)) processedInput += char;
            else if (char === "(") {
                processedInput += "(";
                bracketsState.push(processedInput);
                processedInput = "";
            }
            else {
                processedInput += ")";
                processedInput = bracketsState.pop() + processedInput;
            }
        }
    }
    if(numberBuffer){
        processedInput += numberBuffer
    }
    return eval(replaceOperators(processedInput));
}

function countBrackets(input) {
    let openBracketsCount = 0;
    let closeBracketsCount = 0;
    for (const char of input) {
        if (char === "(") {
            openBracketsCount++
        }
        else if (char === ")") {
            closeBracketsCount++
        }
    }
    return { openBracketsCount, closeBracketsCount }
}