import "./style.css";

const addTaskBtn = document.getElementById("add-task-btn");
const createClassDiv = document.querySelector(".div-create-class");
const overlay = document.querySelector(".overlay");
const input = document.getElementById("task-input");
const doneBtn = document.getElementById("done-btn");

addTaskBtn.addEventListener("click", () => {
    createClassDiv.style.display = "flex";
    overlay.style.display = "block";
});

input.addEventListener("input", () => {
    doneBtn.disabled = input.value.trim() === "";
});

doneBtn.addEventListener("click", () => {
    const valueTask = input.value
    generateTask(valueTask)

    createClassDiv.style.display = "none";
    overlay.style.display = "none";
    input.value = "";
    doneBtn.disabled = true;
});

function generateTask(value){
    
}