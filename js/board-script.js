let BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
let TASK = "/tasks.json";
let CONTACT = "/contacts.json";
let allTasks = {};

document.addEventListener("DOMContentLoaded", function () {
    loadTasksAndContacts();
});

async function loadTasksAndContacts() {
    let tasksResponse = await fetch(BASE_URL + TASK);
    let tasks = await tasksResponse.json();
    allTasks = tasks;  // Store all tasks for filtering

    let contactsResponse = await fetch(BASE_URL + CONTACT);
    let contacts = await contactsResponse.json();

    displayTasks(tasks, contacts);
}

function displayTasks(tasks, contacts) {
    clearColumns();

    for (let taskId in tasks) {
        let task = tasks[taskId];
        let taskElement = createTaskElement(task, taskId, contacts);

        switch (task.board) {
            case "todo":
                document.getElementById('board-todo-tasks').appendChild(taskElement);
                break;
            case "progress":
                document.getElementById('board-progress-tasks').appendChild(taskElement);
                break;
            case "feedback":
                document.getElementById('board-feedback-tasks').appendChild(taskElement);
                break;
            case "done":
                document.getElementById('board-done-tasks').appendChild(taskElement);
                break;
        }
    }

    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

function createTaskElement(task, taskId, contacts) {
    let taskElement = document.createElement('div');
    taskElement.className = 'board-task-card';
    taskElement.draggable = true;
    taskElement.dataset.taskId = taskId;

    let subtasksHTML = '';
    if (task.subtasks && task.subtasks.length > 0) {
        let completedSubtasks = task.subtasks.filter(subtask => subtask.checked).length;
        let subtaskProgress = (completedSubtasks / task.subtasks.length) * 100;

        subtasksHTML = `
            <div class="board-subtask-container">
                <div class="board-subtask-bar">
                    <div class="board-subtask-progress" style="width: ${subtaskProgress}%"></div>
                </div>
                <div class="board-subtask-count">${completedSubtasks}/${task.subtasks.length}</div>
            </div>
        `;
    }

    taskElement.innerHTML = `
        <p><strong>${task.title}</strong></p>
        <p>${task.description}</p>
        <p>Due: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
        <div class="board-contacts">${createContactInitials(task.assignment, contacts)}</div>
        ${subtasksHTML}
    `;

    taskElement.addEventListener('click', () => showOverlay(task, taskId, contacts));
    addDragAndDropListeners(taskElement);
    return taskElement;
}

function createContactInitials(assignments, contacts) {
    if (!assignments || assignments.length === 0) {
        return '';
    }
    return assignments.map(contactId => {
        let contact = contacts[contactId];
        if (contact) {
            let initials = contact.name.split(' ').map(part => part[0]).join('');
            return `<div class="board-contact-initials" style="background-color: ${contact.bgColor}">${initials}</div>`;
        }
        return '';
    }).join('');
}

function clearColumns() {
    document.getElementById('board-todo-tasks').innerHTML = '';
    document.getElementById('board-progress-tasks').innerHTML = '';
    document.getElementById('board-feedback-tasks').innerHTML = '';
    document.getElementById('board-done-tasks').innerHTML = '';
}

function addDragAndDropListeners(taskElement) {
    taskElement.addEventListener('dragstart', handleDragStart);
    taskElement.addEventListener('dragover', handleDragOver);
    taskElement.addEventListener('drop', handleDrop);
    taskElement.addEventListener('dragend', handleDragEnd);
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    let taskId = event.dataTransfer.getData('text');
    let newBoard = event.target.closest('.board-section').id.split('-')[0];
    updateTaskBoard(taskId, newBoard);
    removeGhostCards();
}

function handleDragEnd(event) {
    removeGhostCards();
    loadTasksAndContacts();
}

function handleDragEnter(event) {
    event.preventDefault();
    let section = event.target.closest('.board-section');
    if (section && !section.querySelector('.board-ghost-card')) {
        let ghostCard = document.createElement('div');
        ghostCard.className = 'board-ghost-card';
        section.querySelector('.board-tasks-container').appendChild(ghostCard);
    }
}

function handleDragLeave(event) {
    let section = event.target.closest('.board-section');
    if (section && !section.contains(event.relatedTarget)) {
        removeGhostCards();
    }
}

function removeGhostCards() {
    document.querySelectorAll('.board-ghost-card').forEach(ghost => ghost.remove());
}

async function updateTaskBoard(taskId, newBoard) {
    let taskRef = `${BASE_URL}/tasks/${taskId}.json`;
    let taskResponse = await fetch(taskRef);
    let task = await taskResponse.json();

    if (task) {
        task.board = newBoard;
        let response = await fetch(taskRef, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            loadTasksAndContacts();
        } else {
            console.error("Failed to update task board");
        }
    }
}

function showOverlay(task, taskId, contacts) {
    let overlay = document.getElementById('board-card-overlay');
    let taskDetails = document.getElementById('board-card-details');

    let subtasksHTML = '';
    if (task.subtasks && task.subtasks.length > 0) {
        subtasksHTML = task.subtasks.map((subtask, index) => `
            <div>
                <input type="checkbox" id="board-subtask-${taskId}-${index}" ${subtask.checked ? 'checked' : ''} onchange="toggleSubtask('${taskId}', ${index}, this.checked)">
                <label for="subtask-${taskId}-${index}">${subtask.text}</label>
            </div>
        `).join('');
    }

    taskDetails.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.description}</p>
        <p>Due: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
        <div class="board-contacts">${createContactInitials(task.assignment, contacts)}</div>
        <div class="board-subtasks">
            ${subtasksHTML}
        </div>
    `;

    overlay.style.display = 'block';
}

function closeOverlay() {
    let overlay = document.getElementById('board-card-overlay');
    overlay.style.display = 'none';
    loadTasksAndContacts();
}

async function toggleSubtask(taskId, subtaskIndex, isChecked) {
    let taskRef = `${BASE_URL}/tasks/${taskId}.json`;
    let taskResponse = await fetch(taskRef);
    let task = await taskResponse.json();

    if (task && task.subtasks && task.subtasks[subtaskIndex]) {
        task.subtasks[subtaskIndex].checked = isChecked;
        let response = await fetch(taskRef, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            console.error("Failed to update subtask");
        }
    }
}

async function filterTasks() {
    let query = document.getElementById('board-search-input').value.toLowerCase();
    let filteredTasks = {};

    for (let taskId in allTasks) {
        let task = allTasks[taskId];
        let title = task.title ? task.title.toLowerCase() : "";
        let description = task.description ? task.description.toLowerCase() : "";
        if (title.includes(query) || description.includes(query)) {
            filteredTasks[taskId] = task;
        }
    }

    let contactsResponse = await fetch(BASE_URL + CONTACT);
    let contacts = await contactsResponse.json();

    displayTasks(filteredTasks, contacts);
}
