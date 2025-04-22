// Element references
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskPrioritySelect = document.getElementById("taskPriority");
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.priority);
    if (task.completed) li.classList.add("completed");  // Add class for completed task

    li.innerHTML = `
      <span>${task.name} — <small>${task.deadline}</small></span>
      <span class="priority">${task.priority}</span>
      <button class="delete-btn" data-index="${index}">
        🗑️
      </button>
      <button class="complete-btn" data-index="${index}">
        ✅
      </button>
    `;

    taskList.appendChild(li);
  });

  // Add event listeners for delete and complete buttons after loading tasks
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(btn => {
    btn.addEventListener("click", deleteTask);
  });

  const completeButtons = document.querySelectorAll(".complete-btn");
  completeButtons.forEach(btn => {
    btn.addEventListener("click", completeTask);
  });
}

// Add new task
addTaskBtn.addEventListener("click", () => {
  const name = taskNameInput.value.trim();
  const deadline = taskDeadlineInput.value;
  const priority = taskPrioritySelect.value;

  if (name === "" || deadline === "") return;

  // Create task object
  const task = {
    name,
    deadline,
    priority,
    completed: false // New task starts as not completed
  };

  // Add task to task list UI
  const li = document.createElement("li");
  li.classList.add(priority);
  li.innerHTML = `
    <span>${name} — <small>${deadline}</small></span>
    <span class="priority">${priority}</span>
    <button class="delete-btn">
      🗑️
    </button>
    <button class="complete-btn">
      ✅
    </button>
  `;
  taskList.appendChild(li);

  // Save task to localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));

  // Clear input fields
  taskNameInput.value = "";
  taskDeadlineInput.value = "";
  taskPrioritySelect.value = "low";

  // Add event listener for delete and complete buttons
  const deleteButton = li.querySelector(".delete-btn");
  deleteButton.addEventListener("click", deleteTask);

  const completeButton = li.querySelector(".complete-btn");
  completeButton.addEventListener("click", completeTask);
});

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  darkModeToggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Category buttons (active state)
const categoryButtons = document.querySelectorAll(".category");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove 'active' class from all categories
    categoryButtons.forEach(btn => btn.classList.remove("active"));

    // Add 'active' class to clicked category
    button.classList.add("active");

    // Filter task list based on category (optional)
    const category = button.dataset.category;
    filterTasksByCategory(category);
  });
});

// Optional: Filter task list based on category (not implemented yet)
function filterTasksByCategory(category) {
  // Add filtering logic if needed in future
}

// Delete task from task list and localStorage
function deleteTask(event) {
  const taskElement = event.target.closest("li");
  const taskIndex = event.target.dataset.index;

  // Remove task from UI
  taskElement.remove();

  // Remove task from localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Mark task as completed
function completeTask(event) {
  const taskElement = event.target.closest("li");
  const taskIndex = event.target.dataset.index;

  // Toggle "completed" class on task
  taskElement.classList.toggle("completed");

  // Update the completed status in localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks[taskIndex].completed = !savedTasks[taskIndex].completed;
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Load tasks when page is loaded
window.addEventListener("DOMContentLoaded", loadTasks);
