let playerTag = document.getElementById("player-tag");
let cpuTag = document.getElementById("cpu-tag");
let pointTag = document.getElementById("points-tag");

let choice = "";

let points = 0;
pointTag.innerHTML = "P = " + points;

let initialRound = 0;
let rounds = prompt("Rounds: ");
while(isNaN(rounds) || rounds == '' || rounds > 10){
    alert("Only numbers and rounds <= 10")
    rounds = prompt("Rounds: ")
}
console.log(rounds)

function RockChoice(){
    choice = "Rock";
    playerTag.innerHTML = "Player: Rock";
    console.log(choice);
}

function RockChoice(){
    choice = "Rock";
    playerTag.innerHTML = "Player: Rock";
    console.log(choice);
}

function PaperChoice(){
    choice = "Paper";
    playerTag.innerHTML = "Player: Paper";
    console.log(choice);
}

function ScissorsChoice(){
    choice = "Scissors";
    playerTag.innerHTML = "Player: Scissors";
    console.log(choice);
}

function CpuChoice(){
    let opc = ["Rock","Paper","Scissors"];
    let random = Math.floor(Math.random() * opc.length);
    console.log(opc[random]);
    return opc[random];
}


function Round(){
    let cpuChoice = CpuChoice();
    cpuTag.innerHTML = "CPU: " + cpuChoice
    if (choice == cpuChoice){
        console.log("Tie");
        initialRound += 0;
        console.log(initialRound);
    }
    else if ((choice == "Rock" && cpuChoice == "Scissors") || (choice == "Paper" && cpuChoice == "Rock") || (choice == "Scissors" && cpuChoice == "Paper")){
        console.log("Win");
        points += 1;
        initialRound += 1;
        console.log(initialRound);
    }
    else{
        console.log("Lose");
        initialRound += 1;
        console.log(initialRound);
    }

    CheckCondition();
}

function CheckCondition(){
    if (initialRound >= rounds) {
        alert("Juego terminado");
        initialRound = 0 ;
    }
}