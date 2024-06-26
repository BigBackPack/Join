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


//#region DRAG-n-DRP - EVENT-LISTENER

/*
** Event-Listener - drag-n-drop 
*/
// document.addEventListener('DOMContentLoaded', function () {
//   const columns = document.querySelectorAll('.all-columns');
//   columns.forEach(function (column) {
//       new Sortable(column, {
//           group: 'shared',
//           animation: 150
//       });
//   });
// });

let currentDraggedElement;


function updateHTML() {
  // console.log('taskList from start updateHTML(): ', taskList) - CHECK
  addTodo();

  addProgress();

  addFeedback();
  
  addDone();

}

function addTodo() {
  let todo = taskList.filter(t => t[1]['board'] == 'todo');
  document.querySelector('#column-1').innerHTML = '';
  for (let i = 0; i < todo.length; i++) {
      const task = todo[i];
      document.querySelector('#column-1').innerHTML += renderLiveTodoCard(task, i);
  }
}

function addProgress() {
  let progress = taskList.filter(t => t[1]['board'] == 'progress');
  document.querySelector('#column-2').innerHTML = '';
  for (let i = 0; i < progress.length; i++) {
      const task = progress[i];
      document.querySelector('#column-2').innerHTML += renderLiveProgressCard(task, i);
  }
}

function addFeedback() {
  let feedback = taskList.filter(t => t[1]['board'] == 'feedback');
  document.querySelector('#column-3').innerHTML = '';
  for (let i = 0; i < feedback.length; i++) { 
      const task = feedback[i];
      document.getElementById('column-3').innerHTML += renderLiveFeedbackCard(task, i);
  }
}

function addDone() {
  let done = taskList.filter(t => t[1]['board'] == 'done');
  document.querySelector('#column-4').innerHTML = '';
  for (let i = 0; i < done.length; i++) {
      const task = done[i];
      document.querySelector('#column-4').innerHTML += renderLiveDoneCard(task, i);
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(param) {
  let tasks = taskList;
  tasks[currentDraggedElement][1]['board'] = param;
  updateHTML();
  
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
function showSubTaskCount(sumTotal) {
  total = sumTotal; 
  // for (let i = 0; i < tasks.length; i++) {
  //   console.log('showSubCount - start FOR');
  //   const task = tasks[i];
  //   const subtasks = task[1]['subtasks'];
  //   total = subtasks.length;
  //   console.log('showSubCount - total - ',total);
  //   console.log('showSubCount - totalTasks - ',subtasks);
  // }
  const sumSubTaskElements = document.getElementsByClassName('subtask-sum');
  for (let elem of sumSubTaskElements) {
    elem.innerHTML = total;
  }
}
//#endregion


//#region PROGRESS-BAR
/**
 * Checkes the status of the checkbox at the subtask (in overlay only)
 * @param {boolean} type - is checkbox on subtask checked or not
 */
function updateBar(type) {
  console.log('type: ',type);
  const checkboxes = document.querySelectorAll('.ol-sub-task-checkbox');
  const total = checkboxes.length;
  let completed = 0;
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      completed++;
    }
  });

  const progressPercentage = (completed / total) * 100;

  if (type == 'progress') {
    document.getElementById('progress-bar-fill-pr').setAttribute('width', `${progressPercentage}%`);
  } else if (type == 'done') {
    document.getElementById('progress-bar-fill-do').setAttribute('width', `${progressPercentage}%`);
  } else if (type == 'todo') {
    document.getElementById('progress-bar-fill-to').setAttribute('width', `${progressPercentage}%`);
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

const searchInput = document.getElementById('search-task');

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

/**
 * Shows the number of subtasks in the task list.
 */
showSubTaskCount(taskList);


// ------------- v1 - throws FUCKING CORS ------------------------
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
