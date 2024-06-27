/* Initializes the summary page - fetching the needed data */
summaryInit();

/**
 * Updates the user name at the summary page.
 * Source: Firebase-Db, but atm contactList{}
 */
// function updateUserName() { 
//   const userNameElement = document.getElementById("user-name"); 
//   const userName = contactListValues[2][1]["name"]; 
//   userNameElement.innerHTML = userName; 
// }

function updateUserName() {
  const userNameElement = document.getElementById("user-name"); 
  let userFullName = localStorage.getItem("rememberedUserName");
  console.log('userFull from localStorage: ',userFullName);
  if (userFullName) {
    userFullName = userFullName.replace(/["']/g, '').trim();
    userNameElement.textContent = userFullName;
  } else {
    console.error("User");
  }
}

/**
 * Shows the overall-sum of (open)tasks (TO-DO) in the summary page.
 * Source: Firebase-Db
 */
function showSumOfTodos(taskList) { 
  let countTodo = 0;
  const sumOfTodos = document.getElementById("amount-todo"); 
  sumOfTodos.innerHTML = ''; 

  for (let i = 0; i < taskList.length; i++) { 
    const task = taskList[i]; 
    if (taskList[i][1].board == 'todo') { 
      countTodo++;
      sumOfTodos.innerHTML = countTodo; 
    } 
  } 
}


/**
 * Shows the overall-sum of (done)tasks in the summary page.
 * Source: Firebase-Db
 */
function showSumOfDone(taskList) { 
  let countDone = 0;
  const tasksDone = document.getElementById("amount-done"); 
  tasksDone.innerHTML = '';

  for (let i = 0; i < taskList.length; i++) { 
    const task = taskList[i]; 
    if (taskList[i][1].board == 'done') { 
      countDone++;
      tasksDone.innerHTML = countDone; 
    } 
  } 
}


/**
 * Shows the sum of (progress)tasks in the summary page.
 * Source: Firebase-Db
 */
function showSumOfProgress(taskList) { 
  let countProgress = 0;
  const taskInProgress = document.getElementById("task-in-progress");
  taskInProgress.innerHTML = '';

  for (let i = 0; i < taskList.length; i++) { 
    const task = taskList[i]; 
    if (taskList[i][1].board == 'progress') { 
      countProgress++;
      taskInProgress.innerHTML = countProgress; 
    } 
  } 
}


/**
 * Shows the sum of (feedback)tasks in the summary page.
 * Source: Firebase-Db
 */
function showSumOfFeedback(taskList) { 
  let countFeedback = 0;
  const taskInFeedback= document.getElementById("task-feedback");
  taskInFeedback.innerHTML = '';

  for (let i = 0; i < taskList.length; i++) { 
    const task = taskList[i]; 
    if (taskList[i][1].board == 'feedback') { 
      countFeedback++;
      taskInFeedback.innerHTML = countFeedback; 
    } 
  } 
}


/**
 * Shows the overall-sum of -all- tasks (at the board) in the summary page.
 * Source: Firebase-Db
 */
function showSumOfAllBoardTasks(taskList) {
  const sumOfAllTasks = document.getElementById("task-on-board");
  sumOfAllTasks.innerHTML = '';
  console.log('taskList from SumAll: ',taskList);
  sumOfAllTasks.innerHTML = taskList.length;
}


/**
 * Counts the amount of urgent tasks in the summary page.
 * Source: Firebase-Db
 */
function showSumOfUrgent(taskList) {
  let countUrgent = 0;
  const urgentTask = document.getElementById("overview-urgent-amount");
  urgentTask.innerHTML = '';

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i][1].priority == 'urgent') {
      countUrgent++;
      console.log(countUrgent);
      urgentTask.innerHTML = countUrgent;
    }
  }
}


/**
 * Links to the board page. And closes the summary page.
 * onClick-function in the HTML per tile.
 */
function referUrlBoard() {
  window.location.href = "board.html";
}