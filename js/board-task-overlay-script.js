/**
 * This function opens the overlay and initializes the application - openAddTask for Overlay
 * @param {*} boardStatus - the status of the board
 * @returns 
 */
function openAddTaskOverlay(boardStatus) {
    return new Promise((resolve, reject) => {
        fetch('board-task-overlay.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('task-overlay').innerHTML = html;
                document.getElementById('task-overlay').classList.remove('d-none');
                document.getElementById('task-overlay').classList.remove('slide-out');
                initializeApp(boardStatus);
                resolve();
            })
            .catch(error => reject(error));
    });
}

/**
 * This function opens the overlay and initializes the application - fetching data- openAddTask
 * @param {*} status - the status of the board 
 */
function fetchAddTaskOverlay(status) {
    fetch('board-task-overlay.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('task-overlay').innerHTML = html;
            document.getElementById('task-overlay').classList.remove('d-none');
            document.getElementById('task-overlay').classList.remove('slide-out');
            initializeApp(status);
        });
}

/**
 * This function closes the overlay
 */
function closeAddTaskOverlay() {
    let overlay = document.getElementById('task-overlay');
    overlay.classList.add('slide-out');
}

/**
 * This function opens the overlay and initializes the application - openAddTask
 * @param {*} task  
 * @param {*} isEditMode 
 */
async function openAndFillTaskOverlay(task, isEditMode = false) {
    closeCardOverlay();
    await openAddTaskOverlay();
    setTimeout(() => fillTaskOverlayForm(task, isEditMode), 300);
    initializeApp(currentBoardStatus);
}

/**
 * Füllt das Overlay-Formular mit den Task-Daten und aktiviert die entsprechenden Checkboxen.
 * @param {*} task - Die Task-Daten.
 * @param {*} isEditMode - Ob der Edit-Modus aktiviert ist.
 */
function fillTaskOverlayForm(task, isEditMode) {
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('date').value = task.dueDate;
    document.getElementById(task.priority).checked = true;
    selectCategory(task.category);

    // Prüfe, ob die Checkboxen vorhanden sind
    let allCheckboxes = document.querySelectorAll('.dropdown-checkbox');
    if (allCheckboxes.length === 0) {
        console.warn('Keine Checkboxen gefunden. Stellen Sie sicher, dass die Kontakt-Elemente generiert wurden.');
    }

    // Setze die zugewiesenen Kontakte, falls vorhanden
    if (task.assignment && task.assignment.length > 0) {
        task.assignment.forEach(contactId => {
            let checkbox = document.querySelector(`.dropdown-checkbox[data-id="${contactId}"]`);
            if (checkbox) {
                checkbox.checked = true;
                let contactInitials = checkbox.dataset.initials;
                let contactColor = checkbox.dataset.color;
                document.getElementById('selected-initials').innerHTML += `<div class="contact-initials" style="background-color: ${contactColor}">${contactInitials}</div>`;
            }
        });
    }

    // Aktualisiere die Anzeige der ausgewählten Initialen
    updateSelectedInitials();

    // Setze die Subtasks
    let subtasksContainer = document.getElementById('textList');
    subtasksContainer.innerHTML = '';
    task.subtasks.forEach(subtask => {
        let newItem = document.createElement('li');
        newItem.innerHTML = createSubtaskItemHTML(subtask.text, subtask.checked);
        subtasksContainer.appendChild(newItem);
    });

    // Anpassungen für den Edit-Modus
    if (isEditMode) {
        document.querySelector('.tol-primary-button').style.display = 'none';
        document.querySelector('.tol-secondary-button').style.display = 'none';
        document.querySelector('.tol-secondary-button').style.display = 'none';
        document.querySelector('.page-title').style.display = 'none';
        document.querySelector('.tol-header').style.justifyContent = 'flex-end';
        document.querySelector('.ok-button').style.display = 'flex';
    }
    // Aktualisiere die Checkboxen im Dropdown
    updateDropdownCheckboxes(task.assignment);
}


/**
 * This function escapes the task data
 * @param {*} task 
 * @returns 
 */
function escapeTaskData(task) {
    return JSON.stringify(task).replace(/"/g, '&quot;');
}


function updateDropdownCheckboxes(assignments) {
    document.querySelectorAll('.dropdown-checkbox').forEach(checkbox => {
        let parentLink = checkbox.closest('.dropdown-link');
        let customCheckbox = parentLink.querySelector('.custom-checkbox');
        if (assignments.includes(checkbox.dataset.id)) {
            checkbox.checked = true;
            parentLink.classList.add('checked');
            customCheckbox.classList.add('checked');
        } else {
            checkbox.checked = false;
            parentLink.classList.remove('checked');
            customCheckbox.classList.remove('checked');
        }
    });
}
