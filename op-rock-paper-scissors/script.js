let playerTag = document.getElementById("player-tag");
let cpuTag = document.getElementById("cpu-tag");
let pointTag = document.getElementById("points-tag");
let conditionTag = document.getElementById("condition-tag");
let finalConditionTag = document.getElementById("finalcondition-tag");

let choice = "";

let points = 0;

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
    conditionTag.innerHTML = "";
    finalConditionTag.innerHTML = "";

}

function PaperChoice(){
    choice = "Paper";
    playerTag.innerHTML = "Player: Paper";
    console.log(choice);
    conditionTag.innerHTML = "";
    finalConditionTag.innerHTML = "";

}

function ScissorsChoice(){
    choice = "Scissors";
    playerTag.innerHTML = "Player: Scissors";
    console.log(choice);
    conditionTag.innerHTML = "";
    finalConditionTag.innerHTML = "";

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
        conditionTag.innerHTML = "Tie"
        initialRound += 0;
        console.log(initialRound);
    }
    else if ((choice == "Rock" && cpuChoice == "Scissors") || (choice == "Paper" && cpuChoice == "Rock") || (choice == "Scissors" && cpuChoice == "Paper")){
        console.log("Win");
        conditionTag.innerHTML = "Win"
        points += 1;
        initialRound += 1;
        console.log(initialRound);
        
    }
    else{
        console.log("Lose");
        conditionTag.innerHTML = "Lose"
        initialRound += 1;
        console.log(initialRound);
    }
    
    CheckCondition();
}

function CheckCondition(){
    pointTag.innerHTML = "P = " + points
    if (initialRound >= rounds) {
        CheckWinner();
        pointTag.innerHTML = "P = 0";
        points = 0;
        initialRound = 0 ;
    }
    
}

function CheckWinner(){
    if(points > (rounds / 2)){
        finalConditionTag.innerHTML = "You Win!"
    }
    else if(points === (rounds / 2)){
        finalConditionTag.innerHTML = "Tie!"
    }
    else{
        finalConditionTag.innerHTML = "You Lose!"
    }
}
function OptimizedMatch(){
    // calcula los puntos que vas y los que quedan para asi terminarla antes. Ej: 3 rounds => ganas 2, la ultima se descarta porque no tiene chance
}

