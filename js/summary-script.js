/**
 * Calling that function for to display the actual date
 */
displayCurrentDate();

/* Initializes the summary page - fetching the needed data */
summaryInit();

/**
 * Updates the user name at the summary page.
 * Source: Firebase-Db, but atm contactList{}
 */
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

/**
 * Displays the current date in the summary page.
 */
function displayCurrentDate() {
  const dateElement = document.getElementById('overview-urgent-date');
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  dateElement.textContent = formattedDate;

  displayUrgentDeadline();
}

/**
 * This function displays the nearest urgent deadline as a date.
 * @returns - a date
 */
function displayUrgentDeadline() {
  const urgentTasks = Object.values(taskList).filter(task => task[1].priority === 'urgent');
  if (urgentTasks.length === 0) {
    document.getElementById('urgent-subline').textContent = 'No urgent tasks';
    return;
  }
  let nearestDueDate = new Date(urgentTasks[0][1].dueDate);
  for (let i = 1; i < urgentTasks.length; i++) {
    const currentDueDate = new Date(urgentTasks[i][1].dueDate);
    if (currentDueDate < nearestDueDate) {
      nearestDueDate = currentDueDate;
    }
  }
  const formattedDate = nearestDueDate.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  document.getElementById('urgent-subline').textContent = formattedDate;
}