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

function closeAddTaskOverlay() {
    let overlay = document.getElementById('task-overlay');
    overlay.classList.add('slide-out');
}




async function openAndFillTaskOverlay(task, isEditMode = false) {
    await openAddTaskOverlay();
    fillTaskOverlayForm(task, isEditMode);
}



function fillTaskOverlayForm(task, isEditMode) {
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('date').value = task.dueDate;
    document.getElementById(task.priority).checked = true;
    selectCategory(task.category);

    // Setze die zugewiesenen Kontakte
    task.assignment.forEach(contactId => {
        let checkbox = document.querySelector(`.dropdown-checkbox[data-id="${contactId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
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
    }
}

function escapeTaskData(task) {
    return JSON.stringify(task).replace(/"/g, '&quot;');
}







//code von Johannes (habe dem funktionsnamen ein "Backup" hinzugefügt)
function openTaskOverlayBackup(i, param='') {
    const taskRef = `${BASE_URL}${PATH_SUFFIX[1]}${taskList[i][0]}`;
    console.log('url ref from start openTaskOverlay: ', taskRef);
    // param=crud coming from overlay - edit-btn
    if (param == 'crud') {
        let task = taskList[i];
        /*
        @BILAL: 
        diese con.logs werden NUR ausgeführt, wenn BOARDSTATUS weg is..
        aber dann:
        
        cons.error: 
        Uncaught TypeError: Cannot set properties of null (setting 'value')
        at openTaskOverlay (board-task-overlay-script.js:21:48)
        
        brauchst du des? 
        wenn ja, müßen wir eine 2./doppelte funktion bauen, die als Ziel eben auch dieses Overlay hat...
        */
        console.log('task inside IF - ',task);
        console.log('task-index inside IF - ',task[0]);
        document.getElementById('title').value = task[1]['title'];
        document.getElementById('description').value = task.description;
        document.getElementById('date').value = task.dueDate;
        document.getElementById('priority').value = '';
        document.getElementById('category').value = '';
        
        fetchTaskOverlay();
    } else {
        fetchTaskOverlay(boardStatus);
    }
}