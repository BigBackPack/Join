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
    renderLive(tasks);
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
      cardLiveDiv2.innerHTML += renderLiveProgressCard(element,i);
    } if (element[1].board == 'feedback') {
      cardLiveDiv3.innerHTML += renderLiveFeedbackCard(element,i);
    } if (element[1].board == 'done') {
      cardLiveDiv4.innerHTML += renderLiveDoneCard(element,i);
    } if (element[1].board == 'todo') {
      document.getElementById('empty-task').classList.add('d-none');
      cardLiveDiv1.innerHTML +=   renderLiveTodoCard(element, i);

    }
    
  }
}


//#region EVENT-LISTENER
/*
** Event-Listener - drag-n-drop 
*/
document.addEventListener('DOMContentLoaded', function () {
  const columns = document.querySelectorAll('.all-columns');
  columns.forEach(function (column) {
      new Sortable(column, {
          group: 'shared',
          animation: 150
      });
  });
});
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
  const checkboxes = document.querySelectorAll('.ol-sub-task-checkbox');
  const total = checkboxes.length;
  let completed = 0;
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      completed++;
    }
  });

  const progressPercentage = (completed / total) * 100;

  if (type === 'progress') {
    document.getElementById('progress-bar-fill').setAttribute('width', `${progressPercentage}%`);
  } else if (type === 'done') {
    document.getElementById('done-bar-fill').setAttribute('width', `${progressPercentage}%`);
  } else {
    console.error('Invalid type parameter');
  }
}
//#endregion


/**
 * Searches for a task in the task list.
 */
function searchCards() {
  const searchInput = document
    .getElementById('search-task')
    .value.toLowerCase();
  const cardContent = document.getElementById('board-overview');
  cardContent.innerHTML = '';

  if (taskList.length > 0) {
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i];
      const taskName = task[1]['title'].toLowerCase();

      if (taskName.startsWith(searchInput)) {

       // load the result
        cardContent.innerHTML += renderTaskCard(taskList[i]);
      }
    }
  }
}


/**
 * Shows the number of subtasks in the task list.
 */
showSubTaskCount(taskList);