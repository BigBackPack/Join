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
    await openAddTaskOverlay();
    setTimeout(() => fillTaskOverlayForm(task, isEditMode), 500);
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

    // Setze die zugewiesenen Kontakte
    task.assignment.forEach(contactId => {
        let checkbox = document.querySelector(`.dropdown-checkbox[data-id="${contactId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        } else {
            console.warn(`Checkbox mit data-id="${contactId}" nicht gefunden.`);
        }
    });

    // Aktualisiere die Anzeige der ausgewählten Initialen
    updateSelectedInitials();

    // Setze die Subtasks
    task.subtasks.forEach(subtask => {
        let newItem = createSubtaskItem(subtask.text);
        document.getElementById('textList').appendChild(newItem);
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
}


/**
 * This function escapes the task data
 * @param {*} task 
 * @returns 
 */
function escapeTaskData(task) {
    return JSON.stringify(task).replace(/"/g, '&quot;');
}