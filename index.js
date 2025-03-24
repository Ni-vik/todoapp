// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
const taskList = document.getElementById("task-list");
const sidebar = document.getElementById("sidebar");
const taskTitle = document.getElementById("task-title");
const taskDescContainer = document.getElementById("task-desc-container");
const taskDesc = document.getElementById("task-desc");
const saveBtn = document.querySelector(".save-btn");
const appContainer = document.getElementById("app-container");
const welcomeCard = document.getElementById("welcome-card");
const newTaskInput = document.getElementById("new-task-input");
const themesDropdown = document.getElementById("themes-dropdown");

// Set current date
function setCurrentDate() {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById("current-date").textContent = date.toLocaleDateString('en-US', options);
}

// Toggle themes dropdown
function toggleThemesDropdown() {
    themesDropdown.classList.toggle("active");
    
    // Close dropdown when clicking outside
    if (themesDropdown.classList.contains("active")) {
        document.addEventListener('click', closeDropdownOutside);
    } else {
        document.removeEventListener('click', closeDropdownOutside);
    }
}

// Close dropdown when clicking outside
function closeDropdownOutside(e) {
    if (!themesDropdown.contains(e.target) && !e.target.classList.contains('themes-button')) {
        themesDropdown.classList.remove("active");
        document.removeEventListener('click', closeDropdownOutside);
    }
}

// Change theme
function changeTheme(theme) {
    // Update body class
    document.body.classList.remove('theme-mountains', 'theme-forest');
    if (theme !== 'default') {
        document.body.classList.add('theme-' + theme);
    }
    
    // Update active theme in dropdown
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    const selectedOption = document.querySelector(`.theme-option[onclick="changeTheme('${theme}')"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }
    
    // Save theme preference
    localStorage.setItem('selectedTheme', theme);
    
    // Close dropdown
    themesDropdown.classList.remove("active");
}

// Add new task
function addTask() {
    const taskInput = document.getElementById("new-task-input");
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        return; // Don't add empty tasks
    }
    
    const task = { id: Date.now(), title: taskText, desc: "", completed: false };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
}

// Allow adding task with Enter key
newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Render all tasks
function renderTasks() {
    taskList.innerHTML = "";
    
    // Toggle welcome card based on tasks
    if (tasks.length > 0) {
        appContainer.classList.add('has-tasks');
    } else {
        appContainer.classList.remove('has-tasks');
    }
    
    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const checkboxClass = task.completed ? 'task-checkbox checked' : 'task-checkbox';
        
        div.innerHTML = `
            <div class="${checkboxClass}" onclick="toggleComplete(${task.id})"></div>
            <span onclick="openTask(${task.id})">${task.title}</span>
            <div class="delete-icon" onclick="deleteTask(${task.id}, event)">×</div>
        `;
        
        taskList.appendChild(div);
    });
}

// Open task details in sidebar
function openTask(id) {
    selectedTask = tasks.find(task => task.id === id);
    if (!selectedTask) return;
    
    taskTitle.value = selectedTask.title;
    taskTitle.readOnly = true;
    taskTitle.classList.remove("editable");
    
    taskDesc.value = selectedTask.desc;
    taskDescContainer.innerText = selectedTask.desc || "";
    taskDesc.style.display = "none";
    taskDescContainer.style.display = selectedTask.desc ? "block" : "none";
    
    saveBtn.innerText = "Edit";
    sidebar.classList.add("active");
}

// Save or toggle edit mode for task description
function saveDescription() {
    if (!selectedTask) return;
    
    if (saveBtn.innerText === "Edit") {
        // Switch to edit mode
        taskTitle.readOnly = false;
        taskTitle.classList.add("editable");
        taskTitle.focus();
        
        taskDesc.style.display = "block";
        taskDescContainer.style.display = "none";
        saveBtn.innerText = "Save";
        return;
    }
    
    // Save mode
    const newTitle = taskTitle.value.trim();
    const newDesc = taskDesc.value.trim();
    
    if (newTitle === "") {
        alert("Title cannot be empty!");
        return;
    }
    
    selectedTask.title = newTitle;
    selectedTask.desc = newDesc;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    taskTitle.readOnly = true;
    taskTitle.classList.remove("editable");
    
    taskDescContainer.innerText = newDesc;
    taskDescContainer.style.display = "block";
    taskDesc.style.display = "none";
    
    saveBtn.innerText = "Edit";
    renderTasks();
}

// Close the sidebar
function closeSidebar() {
    sidebar.classList.remove("active");
}

// Delete a task
function deleteTask(id, event) {
    if (event) {
        event.stopPropagation();
    }
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    sidebar.classList.remove("active");
    renderTasks();
}

// Toggle task completion status
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

// Load saved theme preference
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
}

// Initialize
setCurrentDate();
renderTasks();
loadSavedTheme();