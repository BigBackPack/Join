/**
 * Calling that function for to display the actual date
 */
displayCurrentDate();

/**
 * Calling that function for to greet the user.
 */
displayHelloDayTime();

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
  sumOfAllTasks.innerHTML = taskList.length;
}


/**
 * Counts the amount of urgent tasks in the summary page.
 * Source: Firebase-Db
 */
function showSumOfUrgent() {
  let countUrgent = 0;
  const urgentTask = document.getElementById("overview-urgent-amount");
  urgentTask.innerHTML = '';

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i][1].priority == 'urgent') {
      countUrgent++;
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

//#region URGENT-DATE
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

}

/**
 * This function displays the nearest urgent deadline as a date.
 * @returns - a date
 */
// function displayUrgentDeadline() {
//   console.log('displayUrgentDeadline triggered!');
//   let urgentList = [];  
//   let dateList = [];
//   for (let i = 0; i < taskList.length; i++) {
//     if (taskList[i][1].priority == 'urgent') {
//       urgentList.push(taskList[i]);
//       for (let j = 0; j < urgentList.length; j++) {
//         const element = urgentList[j];
//         dateList.push(element[1].dueDate);
//       }
//     }
//   } 
//   if (urgentList.length > 0) {
//     findNearestDate(dateList);
//   }
// }

// function findNearestDate(dateList) {
//   console.log('findNearestDate triggered!');
//   let today = new Date();
//   let nearestDate;
//   let minDiff = Infinity;

//   dateList.forEach(dateStr => {
//     let date = new Date(dateStr);
//     let diff = Math.abs(date - today);   
//     if (diff < minDiff) {
//       minDiff = diff;
//       nearestDate = date;
//     }
//   });
//   if (nearestDate) {
//     const formattedDate = nearestDate.toLocaleDateString('de-DE', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//     document.getElementById('urgent-subline').textContent = formattedDate;
//   } else {
//     document.getElementById('urgent-subline').textContent = 'No nearest date found';
//   }
// }
function displayNearestDeadline() {
  let today = new Date();
  let nearestDate;
  let minDiff = Infinity;
  let dateList = [];
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i][1].priority === 'urgent' && taskList[i][1].dueDate) {
      dateList.push(taskList[i][1].dueDate);
    }
  }
  dateList.forEach(dateStr => {
    let date = new Date(dateStr);
    let diff = Math.abs(date - today);

    if (diff < minDiff) {
      minDiff = diff;
      nearestDate = date;
    }
  });
  if (nearestDate) {
    const formattedDate = nearestDate.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    document.getElementById('urgent-subline').textContent = formattedDate;
  } else {
    document.getElementById('urgent-subline').textContent = 'No nearest date found';
  }
}

//#endregion

//#region Hello Day Time
/**
 * Displays a greeting depending on the time of the day.
 */
function displayHelloDayTime() {
  const greeting = document.getElementById('greeting-user');
  const time = new Date();
  const hour = time.getHours();
  if (hour < 12) {
    greeting.textContent = 'Good Morning';
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon';
  } else {
    greeting.textContent = 'Good Evening';
  }
}
//endregion