function openAddTaskOverlay(boardStatus) {
    fetch('board-task-overlay.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('task-overlay').innerHTML = html;
            document.getElementById('task-overlay').classList.remove('d-none');
            initializeApp(boardStatus);
        });
}


function fetchAddTaskOverlay(status) {
    fetch('board-task-overlay.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('task-overlay').innerHTML = html;
                document.getElementById('task-overlay').classList.remove('d-none');
                initializeApp(status);
            });
}

function closeAddTaskOverlay() {
    document.getElementById('task-overlay').classList.add('d-none');
    document.getElementById('task-overlay').innerHTML = '';
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