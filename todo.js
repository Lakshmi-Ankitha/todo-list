let tasks = [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('addTaskBtn');
const allTasksBtn = document.getElementById('allTasksBtn');
const completedTasksBtn = document.getElementById('completedTasksBtn');
const pendingTasksBtn = document.getElementById('pendingTasksBtn');
const progressBar = document.getElementById('progress');

addTaskBtn.addEventListener('click', addTask);
allTasksBtn.addEventListener('click', showAllTasks);
completedTasksBtn.addEventListener('click', showCompletedTasks);
pendingTasksBtn.addEventListener('click', showPendingTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
        updateProgress();
    }
}

function renderTasks(taskArray = tasks) {
    taskList.innerHTML = '';
    taskArray.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `taskItem ${task.completed ? "completed" : ""}`;
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="icons">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <img src="images/bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    updateProgress();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    updateProgress();
}

function showAllTasks() {
    renderTasks();
    setActiveButton(allTasksBtn);
}

function showCompletedTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    renderTasks(completedTasks);
    setActiveButton(completedTasksBtn);
}

function showPendingTasks() {
    const pendingTasks = tasks.filter(task => !task.completed);
    renderTasks(pendingTasks);
    setActiveButton(pendingTasksBtn);
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed);
    const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

function setActiveButton(activeButton) {
    [allTasksBtn, completedTasksBtn, pendingTasksBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Initial render
renderTasks();
updateProgress();