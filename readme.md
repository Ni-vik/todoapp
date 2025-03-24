# My Day - Task Management Web Application

## Overview

My Day is a responsive, browser-based task management application designed to help users organize their daily tasks. The application features a clean, visually appealing interface with customizable themes, task management capabilities, and persistent local storage.


## Features

### Core Functionality
- **Task Management**: Create, view, edit, complete, and delete tasks
- **Task Details**: Add and edit detailed descriptions for each task
- **Persistence**: All tasks and settings are saved to localStorage
- **Daily Focus**: Fresh, clean interface that emphasizes today's tasks
- **Visual Themes**: Three background themes to personalize the experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Theme Options
- **Beach**: Calming ocean view (default)
- **Mountains**: Scenic mountain landscape
- **Forest**: Serene forest environment

## Technical Implementation

### File Structure
- HTML,CSS and Javascipt files 
- Self-contained application with no external dependencies (except background images)

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling including flexbox, animations, and responsive design
- **JavaScript**: DOM manipulation and application logic
- **localStorage API**: Client-side data persistence

## How It Works

### Task Management

#### Adding Tasks
1. Enter text in the input field at the bottom of the screen
2. Press Enter or click the "+" button to add the task
3. The task will appear in the task list with an unchecked status

#### Completing Tasks
1. Click the circle checkbox next to any task to mark it as complete
2. Completed tasks are visually distinguished with strikethrough text and reduced opacity
3. Click again to mark as incomplete

#### Viewing and Editing Task Details
1. Click on any task text to open the sidebar
2. The sidebar displays the task title and description
3. Click "Edit" to modify the task details
4. Make changes and click "Save" to update the task

#### Deleting Tasks
- Click the "×" button on any task to remove it from the list

### Theme Management

#### Changing Themes
1. Click the "Themes" button in the top-right corner
2. Select one of three theme options from the dropdown
3. The background will immediately change to reflect your selection
4. Theme preference is saved to localStorage

### Data Persistence

All data is stored locally in the browser using localStorage:
- `tasks`: Array of task objects with properties for id, title, description, and completion status
- `selectedTheme`: Current theme preference

## JavaScript Functions

### Task Management
- `addTask()`: Creates a new task object and adds it to storage
- `renderTasks()`: Renders the current list of tasks to the DOM
- `openTask(id)`: Opens the sidebar with details for a specific task
- `saveDescription()`: Saves changes to task title and description
- `toggleComplete(id)`: Toggles the completion status of a task
- `deleteTask(id, event)`: Removes a task from storage

### Theme Management
- `toggleThemesDropdown()`: Shows or hides the themes dropdown menu
- `closeDropdownOutside(e)`: Closes the dropdown when clicking elsewhere
- `changeTheme(theme)`: Updates the current theme and saves preference
- `loadSavedTheme()`: Loads the saved theme on application start

### Utility Functions
- `setCurrentDate()`: Sets the current date in the header

## Responsive Design

The application adjusts layout for different screen sizes:
- **Desktop**: Full layout with sidebar
- **Tablet**: Adjusted spacing and full-width sidebar
- **Mobile**: Stacked header elements and compacted UI elements

## Getting Started

1. Open the HTML file in any modern web browser
2. Begin adding tasks using the input field at the bottom
3. Customize your experience with the themes button
4. All changes are automatically saved in your browser


## Tasks remaining
- [ ] Refactoring of code and adding relevant comments 
- [ ] The categories bar is not responsive. Works for tablets, laptop not for phone
- [ ] The delete button's cross is not centered 
- [ ] No filtering based on priority 
- [ ] No filtering based on completed tasks and pending tasks 
- [ ] Send alert when task is empty 
- [ ] Theme can also be stored in local storage (low priority)
- [ ] The priority and completed button should be added to the categories bar 
