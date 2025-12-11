const btnOne = document.getElementById("btn-1");
const btnTwo = document.getElementById("btn-2");
const btnThree = document.getElementById("btn-3");
const btnFour = document.getElementById("btn-4");
const btnFive = document.getElementById("btn-5");
const btnSix = document.getElementById("btn-6");
const btnSeven = document.getElementById("btn-7");
const btnEight = document.getElementById("btn-8");
const btnNine = document.getElementById("btn-9");
const btnZero = document.getElementById("btn-0");

let currentNumber = "";
const screen = document.getElementById("screen-text");



function getNumber(){
    btnOne.addEventListener("click", () => printNumber(1));
    btnTwo.addEventListener("click", () => printNumber(2));
    btnThree.addEventListener("click", () => printNumber(3));
    btnFour.addEventListener("click", () => printNumber(4));
    btnFive.addEventListener("click", () => printNumber(5));
    btnSix.addEventListener("click", () => printNumber(6));
    btnSeven.addEventListener("click", () => printNumber(7));
    btnEight.addEventListener("click", () => printNumber(8));
    btnNine.addEventListener("click", () => printNumber(9));
    btnZero.addEventListener("click", () => printNumber(0));
}

getNumber();

function printNumber(num){
    currentNumber += num;   
    screen.innerText = currentNumber; 
    console.log(currentNumber)
}

function plusFunction(){

}

function restFunction(){
    
}

function divFunction(){
    
}

function multFunction(){
    
}

function OnFunction(){
    
}

function ACFunction(){

}

function C(){

}