let playerTag = document.getElementById("player-tag");
let cpuTag = document.getElementById("cpu-tag");
let pointTag = document.getElementById("points-tag");
let conditionTag = document.getElementById("condition-tag");
let finalConditionTag = document.getElementById("finalcondition-tag");
let roundTag = document.getElementById("round-tag");

let choice = "";
let points = 0;
let initialRound = 0;

let rounds = prompt("Rounds: ");
while(isNaN(rounds) || rounds == '' || rounds > 10){
    alert("Only numbers and rounds <= 10")
    rounds = prompt("Rounds: ")
}
roundTag.innerHTML = "Round: " + initialRound + "/" + rounds;


function CpuChoice(){
    let opc = ["🗿","📄","✂️"];
    let random = Math.floor(Math.random() * opc.length);
    return opc[random];
}

function playWithAnimation(playerEmoji){
    conditionTag.innerHTML = "";
    finalConditionTag.innerHTML = "";

    // choices
    choice = playerEmoji;
    const cpuRealChoice = CpuChoice();

    // estado default
    playerTag.innerHTML = "✊";
    cpuTag.innerHTML = "✊";

    playerTag.classList.add("hand-anim");
    cpuTag.classList.add("hand-anim");

    // 3 rebotes * 0.4s = 1200ms - 100ms para que quede mas prolijo
    setTimeout(() => {
        playerTag.classList.remove("hand-anim");
        cpuTag.classList.remove("hand-anim");

        playerTag.innerHTML = choice;
        cpuTag.innerHTML = cpuRealChoice;

        // Ejecutar ronda con la jugada real del CPU
        RoundWith(cpuRealChoice);

    }, 1100);
}

function RockChoice(){ 
    playWithAnimation("🗿"); 
}

function PaperChoice(){ 
    playWithAnimation("📄"); 
}

function ScissorsChoice(){ 
    playWithAnimation("✂️"); 
}


function RoundWith(cpuChoice){
    if (choice == cpuChoice){
        conditionTag.innerHTML = "Tie";
    }
    else if ((choice == "🗿" && cpuChoice == "✂️") ||(choice == "📄" && cpuChoice == "🗿") ||(choice == "✂️" && cpuChoice == "📄")){
        conditionTag.innerHTML = "Win";
        points++;
        initialRound++;
    }
    else{
        conditionTag.innerHTML = "Lose";
        initialRound++;
    }

    roundTag.innerHTML = `Round: ${initialRound}/${rounds}`;
    CheckCondition();
}


function CheckCondition(){
    pointTag.innerHTML = "P = " + points;

    if (OptimizedMatch()) return;

    if (initialRound >= rounds) {
        CheckWinner();
        pointTag.innerHTML = "P = 0";
        points = 0;
        initialRound = 0;
    }
}

function CheckWinner(){
    if(points > (rounds / 2)){
        finalConditionTag.innerHTML = "You Win!";
    }
    else if(points === (rounds / 2)){
        finalConditionTag.innerHTML = "Tie!";
    }
    else{
        finalConditionTag.innerHTML = "You Lose!";
    }
}

function OptimizedMatch(){
    let cpuPoints = initialRound - points;
    let roundsLeft = rounds - initialRound;

    if(points > cpuPoints + roundsLeft){
        finalConditionTag.innerHTML = "You Automatically Win!";
        resetPoints();
        return true;
    }

    if (cpuPoints > points + roundsLeft){
        finalConditionTag.innerHTML = "You Automatically Lose!";
        resetPoints();
        return true;
    }
    return false;
}

function resetPoints(){
    pointTag.innerHTML = "P = 0";
    points = 0;
    initialRound = 0;
}
