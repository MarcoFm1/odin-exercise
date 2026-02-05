import "./style.css";

const addTaskBtn = document.getElementById("add-task-btn");
const createClassDiv = document.querySelector(".div-create-class");
const overlay = document.querySelector(".overlay");
const input = document.getElementById("task-input");
const doneBtn = document.getElementById("done-btn");

const divTask = document.querySelector(".div-task")
//const btnDelete = document.querySelector(".btn-delete")

let tasks = []

addTaskBtn.addEventListener("click", () => {
    createClassDiv.style.display = "flex";
    overlay.style.display = "block";
});

input.addEventListener("input", () => {
    doneBtn.disabled = input.value.trim() === "";
});


doneBtn.addEventListener("click", () => { 
    const valueTask = input.value.trim() 
    if (!valueTask) return 
    const task = { 
        id: Date.now(), 
        text: valueTask, 
        completed: false 
    } 
    tasks.push(task) 

    generateTask(task) 

    createClassDiv.style.display = "none"; 
    overlay.style.display = "none"; 
    input.value = ""; 
    doneBtn.disabled = true; 
});

divTask.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;

    const taskDiv = e.target.closest(".task");
    const taskId = Number(taskDiv.dataset.id);

    const task = tasks.find(t => t.id === taskId);

    if (e.target.checked) {
        task.completed = true;
        taskDiv.classList.add("completed");

        const { timeoutId, intervalId } = deleteTask(taskId, taskDiv);
        task.timeoutId = timeoutId;
        task.intervalId = intervalId;
    } else {
        task.completed = false;
        taskDiv.classList.remove("completed");

        clearTimeout(task.timeoutId);
        clearInterval(task.intervalId);

        task.timeoutId = null;
        task.intervalId = null;

        const timerSpan = taskDiv.querySelector(".timer");
        timerSpan.textContent = "";
    }
});



function generateTask(task) {
    divTask.insertAdjacentHTML(
        "beforeend",
        `
        <div class="task" data-id="${task.id}">
            <label>
                <input type="checkbox">
                ${task.text}
            </label>
            <span class="timer"></span>
        </div>
        `
    );
}

function deleteTask(taskId, taskDiv) {
    const timerSpan = taskDiv.querySelector(".timer");
    let seconds = 5;

    timerSpan.textContent = `(${seconds})`;

    const intervalId = setInterval(() => {
        seconds--;
        timerSpan.textContent = `(${seconds})`;
    }, 1000);

    const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        tasks = tasks.filter(task => task.id !== taskId);
        taskDiv.remove();
    }, 5000);

    return { timeoutId, intervalId };
}
