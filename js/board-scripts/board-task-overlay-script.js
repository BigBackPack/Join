// function openTaskOverlay(boardStatus) {
//     fetch('board-task-overlay.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById('task-overlay').innerHTML = html;
//             document.getElementById('task-overlay').classList.remove('d-none');
//             initializeApp(boardStatus);
//         });
// }

function openTaskOverlay(boardStatus, i, param = '') {
    // param=crud coming from overlay - edit-btn
    if (param == 'crud') {
        let task = taskList[i];
    
        document.getElementById('title').value = task[1]['title'];
        document.getElementById('description').value = task.description;
        document.getElementById('date').value = task.dueDate;
        document.getElementById('priority').value = '';
        document.getElementById('category').value = '';
        
        fetchAddOverlay(boardStatus);
    } else {
        fetchAddOverlay(boardStatus);
    }
}

function fetchAddOverlay(status) {
    fetch('board-task-overlay.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('task-overlay').innerHTML = html;
                document.getElementById('task-overlay').classList.remove('d-none');
                initializeApp(status);
            });
}


// name changed due to problems with existent one
function closeOverlayAdd() {
    document.getElementById('task-overlay').classList.add('d-none');
    document.getElementById('task-overlay').innerHTML = '';
}
