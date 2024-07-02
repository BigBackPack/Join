// this calls the board-data -> summaryInit : loading the data from firebase */
summaryInit();

/** - STARTING THE BOARD-DATA -
 * Initializes the board.
 * Loads the tasks data from Firebase.
 * Deciding, if data -> loads them , if not, loads dummyCards.
 */
function startBoard(tasks) {
  if (true) {
    // load dummy card
    // renderDummyCard();
    // renderLive(tasks);
  } else {
    // data in firebase, loading respective data 
    // renderLive();
  }
}

/**
 * This function will display(starting the resp. render-f() ) the respective cards.
 * @param {string} tasks - The tasks data. 
 */
function renderLive(tasks) {
  const cardLiveDiv1 = document.getElementById('column-1');
  const cardLiveDiv2 = document.getElementById('column-2');
  const cardLiveDiv3 = document.getElementById('column-3');
  const cardLiveDiv4 = document.getElementById('column-4');
  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    if (element[1].board == 'progress') {
      document.getElementById('empty-task-col-2').classList.add('d-none');
      cardLiveDiv2.innerHTML += renderLiveProgressCard(element,i);
    } if (element[1].board == 'feedback') {
      document.getElementById('empty-task-col-3').classList.add('d-none');
      cardLiveDiv3.innerHTML += renderLiveFeedbackCard(element,i);
    } if (element[1].board == 'done') {
      document.getElementById('empty-task-col-4').classList.add('d-none');
      cardLiveDiv4.innerHTML += renderLiveDoneCard(element,i);
    } if (element[1].board == 'todo') {
      document.getElementById('empty-task-col-1').classList.add('d-none');
      cardLiveDiv1.innerHTML +=   renderLiveTodoCard(element, i);
    }
  }
}


//#region UPDATE-HTML
/**
 * This function updates the HTML of the board.
 */
function updateHTML() {
  // console.log('taskList from start updateHTML(): ', taskList) - CHECK
  addTodo();
  addProgress();
  addFeedback(); 
  addDone();
}

/**
 * This function will render the todo tasks in column-1
 */
function addTodo() {
  let todo = taskList.filter(t => t[1]['board'] == 'todo');
  document.querySelector('#column-1').innerHTML = '';
  for (let i = 0; i < todo.length; i++) {
      const task = todo[i];
      document.querySelector('#column-1').innerHTML += renderLiveTodoCard(task, i);
  }
  if (todo.length === 0) {
    document.querySelector('#column-1').innerHTML = renderEmptyRow();
  }
}

/**
 * This function will render an empty row.
 * @returns {string} - empty row
 */
function renderEmptyRow() {
  return `
          <div id="empty-task-col-1" class="empty-task">
            <div id="empty-task-txt-col-1" class="">No task To do</div>
          </div>`;
}

/**
 * This function will render the progress tasks in column-2
 */
function addProgress() {
  let progress = taskList.filter(t => t[1]['board'] == 'progress');
  document.querySelector('#column-2').innerHTML = '';
  for (let i = 0; i < progress.length; i++) {
      const task = progress[i];
      document.querySelector('#column-2').innerHTML += renderLiveProgressCard(task, i);
  }
  if (progress.length === 0) {
    document.querySelector('#column-2').innerHTML = renderEmptyRow();
  }
}

/**
 * This function will render the feedback tasks in column-3
 */
function addFeedback() {
  let feedback = taskList.filter(t => t[1]['board'] == 'feedback');
  document.querySelector('#column-3').innerHTML = '';
  for (let i = 0; i < feedback.length; i++) { 
      const task = feedback[i];
      document.getElementById('column-3').innerHTML += renderLiveFeedbackCard(task, i);
  }
  if (feedback.length === 0) {
    document.querySelector('#column-3').innerHTML = renderEmptyRow();
  }
}

/**
 * This function will render the done tasks in column-4
 */
function addDone() {
  let done = taskList.filter(t => t[1]['board'] == 'done');
  document.querySelector('#column-4').innerHTML = '';
  for (let i = 0; i < done.length; i++) {
      const task = done[i];
      document.querySelector('#column-4').innerHTML += renderLiveDoneCard(task, i);
  }
  if (done.length === 0) {
    document.querySelector('#column-4').innerHTML = renderEmptyRow();
  }
}
//#endregion

//#region DRAG-n-DROP
/**
 * This variable stores the id of the dragged element.
 */
let currentDraggedElement;
let type;
let place;
/**
 * This function starts the drag-n-drop
 * @param {*} id - id of dragged element
 */
function startDragging(id) {
  // console.log('start startDragging - id: ', id);
  currentDraggedElement = id; //todo-0
  let parts = id.split('-');
  type = parts[0];
  place = parseInt(parts[1], 10);  
  // console.log('type =', type);  
  // console.log('place =', place); 
  // if (parts.length === 2) {
  //   type = parts[0];
  //   place = parseInt(parts[1], 10);  
  //   console.log('type =', type);  
  //   console.log('place =', place);  
  // }
}

/**
 * This function allows the drag-n-drop, otherwise it  will not work as intended
 * @param {*} ev - event parameter - activating listening of event.Listener 
 */
function allowDrop(ev) {
  ev.preventDefault();
}

// WORKING moveTO()
// function moveTo(category) {
//   const draggedTaskId = [];
//   let parts = currentDraggedElement.split('-');
//   let type1 = parts[0];
//   let place1 = parseInt(parts[1], 10); 
//   let tasks = taskList.filter(t => t[1]['board'] == type1);
//   for (let i = 0; i < tasks.length; i++) {
//     draggedTaskId.push(tasks[i][0]); 
//   }
//   if (tasks[place1]) { 
//     tasks[place1][1]['board'] = category;
//     console.log('board has changed!');
//   }
//   updateHTML();
//   //showDataEnd();
// }  

/**
 * This function updates a task in the Firebase
 * @param {*} taskId - id of specific task
 * @param {*} updatedData - data to be updated
 */
async function updateTaskInFirebase(taskId, updatedData) {
  const url = `${BASE_URL}tasks/${taskId}.json`; 
  //console.log('DnD - url: ', url);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  });
  if (!response.ok) {
    console.error('Failed to update task in Firebase:', response.statusText);
  } else {
    console.log('Task updated successfully in Firebase');
  }
}

/**
 * This function moves a task from one category to another, needed for Drag-n-Drop
 * @param {string} param - name of specific category of task, i.e. todo or done 
 */
function moveTo(category) {
  const draggedTaskId = [];
  let parts = currentDraggedElement.split('-');
  let type1 = parts[0];
  let place1 = parseInt(parts[1], 10); 
  let tasks = taskList.filter(t => t[1]['board'] == type1);
  for (let i = 0; i < tasks.length; i++) {
    draggedTaskId.push(tasks[i][0]);
  }
  
  if (tasks[place1]) {
    tasks[place1][1]['board'] = category;
    console.log('board has changed!');

    const taskId = draggedTaskId[place1];
    const updatedData = { board: category };
    updateTaskInFirebase(taskId, updatedData);
  }
  
  updateHTML();
  //showDataEnd();
}

//#endregion

//#region SUBTASK-COUNT
/**
 * Shows the total amount of subtasks. Needed for the progress bar.
 */
let total = 0;

/**
 * Calc and displays the width/length of the progress bar in comp. to the qty of subtasks.
 * @param {number} sumTotal - The total amount of subtasks.
 */
function showSubTaskCount1(sumTotal) {
  total = sumTotal; 
  const sumSubTaskElements = document.getElementById('subtask-sum-todo');
  for (let elem of sumSubTaskElements) {
    elem.innerHTML = total;
  }
}

/**
 * This function updates a subtask in the Firebase
 * @param {*} taskId - id of specific task
 * @param {*} subTaskIndex - id of specific subtask
 * @param {*} updatedData - data to be updated
 */
async function updateSubTaskInFirebase(task, subQty, index, updatedData) {
  console.log('subQ and Index: ',subQty, index); // number, whole subT
  console.log('Task ID:', task);
  console.log('Subtask Quantity:', subQty);
  const url = `${BASE_URL}tasks/${task}/1/subtasks/${subQty}.json`;
  console.log('Constructed URL:', url);
  console.log('SubCount - url: ', url);
  const response = await fetch(url, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) {
    console.error('Failed to update subtask in Firebase:', response.statusText);
  } else {
    console.log('Subtask updated successfully in Firebase');
  }
}

/**
 * This function checks if a subtask is checked
 * @param {*} type - is checkbox on subtask checked or not 
 * @param {*} param - specific category of task, i.e. todo or done
 * @param {*} subQty - total amount of subtasks
 * @param {*} index - index of specific task
 */
function subTaskIsChecked(type, param, subQty, index) {
  let showSubQty = document.querySelector(`.subtask-checked-${type}-${index}`);
  showSubQty.innerHTML = param;
  console.log('index: ',index); //0 - ?
  console.log('param: ',param); //overall qty
  console.log('type: ',type); //todo, done
  console.log('subQty: ',subQty); //index, kinda
  let taskStart = taskList.filter(t => t[1]['board'] == type);
  console.log('taskStart: ', taskStart);

  // Find the task in taskList using the type and index
  let task1 = taskList[index]; // the whole task
  console.log('task from subTaskIsChecked: ', task1[1]['subtasks'][index]);
  if (task1[1]['subtasks'][subQty]['checked'] == false ) {
    const updatedData = { checked: 'true' };
    updateSubTaskInFirebase(task1, subQty, index, updatedData);
    // updateSubTaskInFirebase(type, subQty, index, updatedData);
  }
  
 
  // Update the HTML
  updateHTML();
}

// another idea
// function subTaskIsChecked(type, param, subQty, index) {
//   let showSubQty = document.querySelector(`.subtask-checked-${type}-${index}`);
//   showSubQty.innerHTML = param;

//   let task = taskList[index];

//   if (task && task[1].board === type) {
//     if (task[1].subtasks && task[1].subtasks[subQty]) {

//       const taskId = task[0]; 
//       const updatedData = { checked: param === 'true' }; 
//       updateSubTaskInFirebase(taskId, subQty, updatedData);
//     } else {
//       console.error('Subtask not found.');
//     }
//   } else {
//     console.error('Task not found and/or mismatch.');
//   }

//   updateHTML();
// }

// my function
// function subTaskIsChecked(type, param, subQty, index) {
//   // console.log('param type: ',type);
//   // console.log('start subTaskCheck: param subInd: ',subIndex);
//   let showSubQty = document.querySelector(`.subtask-checked-${type}-${index}`);
//   showSubQty.innerHTML = param;
//   // path - taskList[0][1]['subtasks'][0]['checked']
//   updateSubTaskInFirebase(taskId, subQty, updatedData);

//   //updateHTML();
// }
//#endregion

//#region PROGRESS-BAR
/**
 * Checkes the status of the checkbox at the subtask (in overlay only)
 * @param {boolean} type - is checkbox on subtask checked or not
 */
// function updateBar(type, event, i) {
//   //const taskIndex = event.target.taskIndex;
//   const task = taskList.findIndex(t => t[1]['board'] === type);
//   // console.log('type: ',type);
//   // console.log('task from updateBar: ',task);
//   const checkboxes = document.querySelectorAll('.ol-sub-task-checkbox');
//   const total = checkboxes.length;
//   let completed = 0;
//   let subTaskChecked = 0;
//   checkboxes.forEach(checkbox => {
//     if (checkbox.checked) {
//       completed++;     

//     }
//     //let path = `taskList[${task}][1]['subtasks'][0]['checked']`;
//     taskList[task][1]['subtasks'][0]['checked'] = 'true';
//     subTaskChecked++;
//     // console.log('completed: ',completed);
//     subTaskIsChecked(type, task, completed, i);
//   });

//   const progressPercentage = (completed / total) * 100;

//   if (type == 'progress') {
//     document.getElementById(`progress-bar-fill-pr-${i}`).setAttribute('width', `${progressPercentage}%`);
//   } else if (type == 'done') {
//     document.getElementById(`progress-bar-fill-do-${i}`).setAttribute('width', `${progressPercentage}%`);
//   } else if (type == 'todo') {
//     document.getElementById(`progress-bar-fill-to-${i}`).setAttribute('width', `${progressPercentage}%`);
//   } 
  
// }
  // const progressBarId = `progress-bar-fill-${type}-${i}`;
  // const progressBar = document.getElementById(progressBarId);
  // if (progressBar) {
  //   const progressPercentage = (completed / total) * 100;
  //   progressBar.setAttribute('width', `${progressPercentage}%`);
  // } else {
  //   console.error(`Element with ID ${progressBarId} not found in the DOM.`);
  // }

function updateBar(type, event, i, subIndex) {
  const task = taskList.findIndex(t => t[1]['board'] === type);
  const checkboxes = document.querySelectorAll('.ol-sub-task-checkbox');
  const total = checkboxes.length;
  let completed = 0;
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      completed++;
    }
    taskList[task][1]['subtasks'][0]['checked'] = 'true';
    subTaskIsChecked(type, completed, index, i, subIndex);
  });
  const progressPercentage = (completed / total) * 100;
  if (type == 'progress') {
    document.getElementById(`progress-bar-fill-pr-${i}`).setAttribute('width', `${progressPercentage}%`);
  } else if (type == 'done') {
    document.getElementById(`progress-bar-fill-do-${i}`).setAttribute('width', `${progressPercentage}%`);
  } else if (type == 'todo') {
    document.getElementById(`progress-bar-fill-to-${i}`).setAttribute('width', `${progressPercentage}%`);
  }
}
//#endregion

//#region SEARCH-TASKS
/**
 * Searches for a task in the task list.
 * Triggered through EL under this function.
 */function searchCards() {
  const searchInput = document.getElementById('search-task').value.trim().toLowerCase();
  const cardContent = document.getElementById('board-overview');
  cardContent.innerHTML = '';

  if (searchInput.length >= 3) {
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i];
      const taskName = task[1]['title'].toLowerCase();
      const taskDescription = task[1]['description'].toLowerCase();

      if ((taskName.startsWith(searchInput) || taskDescription.startsWith(searchInput)) && (task[1]['board'] == 'todo')) {
        cardContent.innerHTML += renderLiveTodoCard(taskList, i);
      } else if ((taskName.startsWith(searchInput) || taskDescription.startsWith(searchInput)) && (task[1]['board'] == 'progress')) {
        cardContent.innerHTML += renderLiveProgressCard(taskList, i);
      } else if ((taskName.startsWith(searchInput) || taskDescription.startsWith(searchInput)) && (task[1]['board'] == 'feedback')) {
        cardContent.innerHTML += renderLiveFeedbackCard(taskList, i);
      } else if ((taskName.startsWith(searchInput) || taskDescription.startsWith(searchInput)) && (task[1]['board'] == 'done')) {
        cardContent.innerHTML += renderLiveDoneCard(taskList, i);
      }
    }
  }
}

/**
 * variable for the search input
 */
const searchInput = document.getElementById('search-task');

/**
 * Event listener for the search input
 */
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const searchValue = searchInput.value.trim();
    
    if (searchValue == '') {
      location.reload();
    } else {
      // Search for matching cards/tasks when the search input is not empty
      searchCards();
    }
  }
});
//#endregion

//#region CRUD-TASK
/**
 * Lets the user delete a task in the Db from the overlay
 * @param {*} i - index of specific task
 */
function delTaskInDb(i) {
  const taskRef = `${BASE_URL}${PATH_SUFFIX[1]}${taskList[i][0]}`;
  console.log(taskRef);
  fetch(taskRef, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log('Task deleted!'))
  .catch(error => console.error('Error deleting task:', error));
}
//#endregion

//#region USER-DETAILS
/**
 * Generates html - Helper-f() for the generateContactBar()
 * @param {string} name of user
 * @returns 
 */
function getInitials(name) {
  return name.split(' ').map(word => word[0]).join('');
}

/**
 * Generate a name badge/profile-icon with the initials and full name of user
 * @param {string} contact - contact data 
 * @returns {string} - HTML for the contact badge
 */
function generateContactBadge(contact) {
  let initials = getInitials(contact.name);
  return `
    <div class="profile-badge-container">
      <div class="profile-badge" style="background-color: ${contact.bgColor};">
          <span class="initials">${initials}</span>
      </div>
          <span id="fullName" class="full-name">${contact.name}</span>
    </div>
  `;
}

/**
 * Gets the respective user to be displayed
 * @param {Id} assignment - index-value 
 * @returns 
 */
function getAssignedContactsHtml(assignment = []) {
  return assignment.map(contactId => {
      const contactEntry = contactList.find(contact => contact[0] === contactId);
      if (contactEntry) {
          const contactData = contactEntry[1];
          return generateContactBadge(contactData);
      }
      return '';
  }).join('');
}
//#endregion