// Initialize data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || ["Work", "Personal"];
let selectedTask = null;
let currentFilter = "all";

// DOM elements
const taskList = document.getElementById("task-list");
const sidebar = document.getElementById("sidebar");
const categoriesList = document.getElementById("categories-list");
const newTaskInput = document.getElementById("new-task-input");
const themesDropdown = document.getElementById("themes-dropdown");
const addCategoryForm = document.getElementById("add-category-form");
const newCategoryInput = document.getElementById("new-category-input");
const taskCategorySelect = document.getElementById("task-category");

// Initialize app
function init() {
    setCurrentDate();
    renderCategories();
    renderTasks();
    loadSavedTheme();
    populateCategorySelect();
    
    // Event listeners
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
}

// Date functions
function setCurrentDate() {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById("current-date").textContent = date.toLocaleDateString('en-US', options);
}

// Theme functions
function toggleThemesDropdown() {
    themesDropdown.classList.toggle("active");
    if (themesDropdown.classList.contains("active")) {
        document.addEventListener('click', closeDropdownOutside);
    } else {
        document.removeEventListener('click', closeDropdownOutside);
    }
}

function closeDropdownOutside(e) {
    if (!themesDropdown.contains(e.target) && !e.target.classList.contains('themes-button')) {
        themesDropdown.classList.remove("active");
        document.removeEventListener('click', closeDropdownOutside);
    }
}

function changeTheme(theme) {
    document.body.classList.remove('theme-mountains', 'theme-forest');
    if (theme !== 'default') document.body.classList.add('theme-' + theme);
    
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    
    const selectedOption = document.querySelector(`.theme-option[onclick="changeTheme('${theme}')"]`);
    if (selectedOption) selectedOption.classList.add('active');
    
    localStorage.setItem('selectedTheme', theme);
    themesDropdown.classList.remove("active");
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) changeTheme(savedTheme);
}

// Category functions
function renderCategories() {
    categoriesList.innerHTML = `
        <div class="category-item all-tasks ${currentFilter === 'all' ? 'active' : ''}" 
             onclick="filterTasks('all')">All Tasks</div>
    `;
    
    categories.forEach(category => {
        const categoryElement = document.createElement("div");
        categoryElement.className = `category-item ${currentFilter === category ? 'active' : ''}`;
        categoryElement.textContent = category;
        categoryElement.onclick = () => filterTasks(category);
        categoriesList.appendChild(categoryElement);
    });
}

function showAddCategoryForm() {
    addCategoryForm.style.display = "flex";
    newCategoryInput.focus();
}

function hideAddCategoryForm() {
    addCategoryForm.style.display = "none";
    newCategoryInput.value = "";
}

function addCategory() {
    const categoryName = newCategoryInput.value.trim();
    if (categoryName && !categories.includes(categoryName)) {
        categories.push(categoryName);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
        populateCategorySelect();
    }
    hideAddCategoryForm();
}

function populateCategorySelect() {
    taskCategorySelect.innerHTML = '<option value="">No Category</option>';
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        taskCategorySelect.appendChild(option);
    });
}

function filterTasks(category) {
    currentFilter = category;
    renderCategories();
    renderTasks();
}

// Task functions
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === "") return;
    
    const task = { 
        id: Date.now(), 
        title: taskText, 
        desc: "", 
        completed: false,
        priority: "none",
        dueDate: null,
        category: ""
    };
    tasks.push(task);
    saveChanges();
    newTaskInput.value = "";
}

function renderTasks() {
    taskList.innerHTML = "";
    document.getElementById("app-container").classList.toggle("has-tasks", tasks.length > 0);
    
    const filteredTasks = currentFilter === "all" 
        ? tasks 
        : tasks.filter(task => task.category === currentFilter);
    
    if (filteredTasks.length === 0 && currentFilter !== "all") {
        taskList.innerHTML = `<div class="no-tasks">No tasks in this category</div>`;
        return;
    }
    
    filteredTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const priorityBadge = task.priority !== "none" ? 
            `<span class="task-priority priority-${task.priority}">${task.priority}</span>` : '';
        
        const dueDateBadge = task.dueDate ? 
            `<span class="task-due">📅 ${new Date(task.dueDate).toLocaleDateString()}</span>` : '';
        
        const categoryBadge = task.category ? 
            `<span class="task-category">🏷️ ${task.category}</span>` : '';

        div.innerHTML = `
            <div class="${task.completed ? 'task-checkbox checked' : 'task-checkbox'}" 
                 onclick="toggleComplete(${task.id})"></div>
            <span onclick="openTask(${task.id})">
                ${task.title}
                ${priorityBadge}
                ${dueDateBadge}
                ${categoryBadge}
            </span>
            <div class="delete-icon" onclick="deleteTask(${task.id}, event)">×</div>
        `;
        taskList.appendChild(div);
    });
}

function openTask(id) {
    selectedTask = tasks.find(task => task.id === id);
    if (!selectedTask) return;
    
    document.getElementById("task-title").value = selectedTask.title;
    document.getElementById("task-priority").value = selectedTask.priority;
    document.getElementById("task-due").value = selectedTask.dueDate || '';
    document.getElementById("task-desc").value = selectedTask.desc || '';
    document.getElementById("task-category").value = selectedTask.category || '';
    
    sidebar.classList.add("active");
}

function saveTitle() {
    if (!selectedTask) return;
    const newTitle = document.getElementById("task-title").value.trim();
    if (newTitle === "") {
        alert("Title cannot be empty!");
        return;
    }
    selectedTask.title = newTitle;
    saveChanges();
}

function savePriority() {
    if (!selectedTask) return;
    selectedTask.priority = document.getElementById("task-priority").value;
    saveChanges();
}

function saveDueDate() {
    if (!selectedTask) return;
    selectedTask.dueDate = document.getElementById("task-due").value || null;
    saveChanges();
}

function saveDescription() {
    if (!selectedTask) return;
    selectedTask.desc = document.getElementById("task-desc").value.trim();
    saveChanges();
}

function saveCategory() {
    if (!selectedTask) return;
    selectedTask.category = document.getElementById("task-category").value;
    saveChanges();
}

function saveChanges() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    showSaveConfirmation();
}

function showSaveConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'save-confirmation';
    confirmation.textContent = '✓ Saved';
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.classList.add('fade-out');
        setTimeout(() => confirmation.remove(), 500);
    }, 1500);
}

function closeSidebar() {
    sidebar.classList.remove("active");
}

function deleteTask(id, event) {
    if (event) event.stopPropagation();
    tasks = tasks.filter(task => task.id !== id);
    saveChanges();
    sidebar.classList.remove("active");
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveChanges();
    }
}

// Initialize the app
init();