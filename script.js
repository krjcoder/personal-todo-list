
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load saved tasks, or start with an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Add a new task
addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

// Restore tasks when the page opens
displayTasks();
