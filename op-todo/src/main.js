import "./style.css";

const addTaskBtn = document.getElementById("add-task-btn");
const createClassDiv = document.querySelector(".div-create-class");
const overlay = document.querySelector(".overlay");
const input = document.getElementById("task-input");
const doneBtn = document.getElementById("done-btn");
const typeInput = document.getElementById("type-input");

const messAppear = document.getElementById("h3-messages");
const btnMission = document.getElementById("create-mission");

const divTask = document.querySelector(".div-task");

let tasks = [];

/* =======================
   MISSIONS (por ahora solo data)
======================= */
const dailyMissions = [
  { id: 1, text: "Complete 1 task" },
  { id: 2, text: "Complete 3 tasks" },
  { id: 3, text: "Complete 5 tasks" },
  { id: 4, text: "Complete all tasks for the day" },
  { id: 5, text: "Create a new task" },
  { id: 6, text: "Complete an important task" },
  { id: 7, text: "Leave no pending tasks today" }
];

const weeklyMissions = [
  { id: 1, text: "Complete 10 tasks this week" },
  { id: 2, text: "Complete 20 tasks this week" },
  { id: 3, text: "Use the app 5 days this week" },
  { id: 4, text: "Complete all your tasks for 3 consecutive days" },
  { id: 5, text: "Organize all your tasks by priority" },
  { id: 6, text: "Create at least 10 new tasks" }
];

const monthlyMissions = [
  { id: 1, text: "Complete 50 tasks this month" },
  { id: 2, text: "Complete 100 tasks this month" },
  { id: 3, text: "Use the app for 20 days this month" },
  { id: 4, text: "Do not abandon any important task this month" },
  { id: 5, text: "Complete all your tasks on at least 5 different days" },
  { id: 6, text: "Maintain a 7-day consecutive streak" }
];

/*LOCAL STORAGE*/
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (!storedTasks) return;

  tasks = JSON.parse(storedTasks);

  tasks.forEach(task => {
    generateTask(task);

    if (task.completed) {
      const taskDiv = document.querySelector(`.task[data-id="${task.id}"]`);
      const checkbox = taskDiv.querySelector("input[type='checkbox']");
      checkbox.checked = true;
      taskDiv.classList.add("completed");
    }
  });
}

loadTasks();


addTaskBtn.addEventListener("click", () => {
  createClassDiv.style.display = "flex";
  overlay.style.display = "block";
});

input.addEventListener("input", () => {
  doneBtn.disabled = input.value.trim() === "";
});

doneBtn.addEventListener("click", () => {
  const valueTask = input.value.trim();
  const valueInput = typeInput.value;

  if (!valueTask) return;

  const task = {
    id: Date.now(),
    text: valueTask,
    type: valueInput,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  generateTask(task);

  createClassDiv.style.display = "none";
  overlay.style.display = "none";
  input.value = "";
  typeInput.value = "";
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
    saveTasks();

    const { timeoutId, intervalId } = deleteTask(taskId, taskDiv);
    task.timeoutId = timeoutId;
    task.intervalId = intervalId;
  } else {
    task.completed = false;
    taskDiv.classList.remove("completed");
    saveTasks();

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
    <div class="task" data-id="${task.id}" style="margin-bottom:8px">
      <label>
        <input type="checkbox">
        [${task.type || "task"}] ${task.text}
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
    saveTasks();
    taskDiv.remove();
  }, 5000);

  return { timeoutId, intervalId };
}

// placeholder para misiones personalizadas
function handleMissions() {
  messAppear.innerHTML = "";
}
