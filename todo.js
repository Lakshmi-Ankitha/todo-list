const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const completedTasksButton = document.getElementById('completedTasksButton');

// Load pending tasks from localStorage or initialize empty array
let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];

// Load completed tasks from localStorage or initialize empty array
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// Function to save pending tasks to localStorage
function savePendingTasks() {
  localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
}

// Function to save completed tasks to localStorage
function saveCompletedTasks() {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to render pending tasks
function renderPendingTasks() {
  taskList.innerHTML = '';
  pendingTasks.forEach((taskValue, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskText = document.createElement('span');
    taskText.textContent = taskValue;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        taskText.classList.add('completed-text');
        completedTasks.push(taskValue);
        saveCompletedTasks();

        // Remove from pending tasks
        pendingTasks.splice(index, 1);
        savePendingTasks();

        renderPendingTasks();
      }
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(checkbox);
    taskList.appendChild(taskItem);
  });
}

// Function to add a new task
function addTask() {
  const taskValue = taskInput.value.trim();

  if (taskValue === '') {
    alert('Please enter a task!');
    return;
  }

  pendingTasks.push(taskValue);
  savePendingTasks();
  renderPendingTasks();

  taskInput.value = '';
}

// Function to view completed tasks
completedTasksButton.addEventListener('click', () => {
  saveCompletedTasks();
  window.location.href = 'completed.html';
});

// Initial render of pending tasks on page load
renderPendingTasks();

// Add task on button click
addTaskButton.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});