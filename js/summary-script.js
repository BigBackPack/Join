/**
 * The base URL for the Firebase database.
 */
const BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";


/*
* Array of paths for the contacts and tasks for the load-functions.
*/
const PATH_SUFFIX = ["/contacts", "/tasks"];

summaryInit();


/**
 * Array of colors for the signatures from users.
 */
const signatureColors = [
  "#FF5733", // Red-Orange
  "#FF8D33", // Orange
  "#FFC300", // Yellow-Orange
  "#FFD700", // Yellow
  "#ADFF2F", // Green-Yellow
  "#7FFF00", // Green
  "#32CD32", // Lime Green
  "#00FF7F", // Spring Green
  "#00FA9A", // Medium Spring Green
  "#40E0D0", // Turquoise
  "#00CED1", // Dark Turquoise
  "#1E90FF", // Dodger Blue
  "#4169E1", // Royal Blue
  "#6A5ACD", // Slate Blue
  "#8A2BE2", // Blue Violet
  "#9400D3", // Dark Violet
  "#9932CC", // Dark Orchid
  "#BA55D3", // Medium Orchid
  "#C71585", // Medium Violet Red
  "#FF1493"  // Deep Pink
];


/**
 * Holds the list of contacts and tasks in json.
 * seperated per entries and as well as their value and key.
 */
let contactList = [];
let contactListIds = [];
let contactListValues = [];
let taskList = {};
let taskListIds = {};
let taskListValues = {};


/**
 * Initializes the summary page.
 * Loads the contacts and tasks data from the server.
 * @returns {Promise<void>} returns the data from specified sources
 * 
 */
function summaryInit() {
  loadContactsData(PATH_SUFFIX[0]);
  loadTasksData(PATH_SUFFIX[1]);
  // login user - f()
  // updateUserName(); // greet user - GET NAME from Db
}


/**
 * Fetches the data from the contacts section from Firebase.
 * async function - returns a promise
 * 
 * @param {string} path - The path to the JSON file, see CONTACT_PATH_SUFFIX 
 * @returns {Promise} - A promise that resolves to the server response.
 * 
 * Object.value() - fills in contactList[] with the indexed-data, without the keys from Firebase
 */
async function loadContactsData(path) {
  let resp = await fetch(BASE_URL + path + ".json");
  let respToJson = await resp.json();

  if (respToJson) {
    contactList = respToJson;
    contactList = Object.entries(contactList);
    contactListIds = Object.keys(contactList);
    contactListValues = Object.values(contactList);
  }
  // Call updateUserName() after populating contactList
  updateUserName();

}


/**
 * Fetches the data from the tasks section from Firebase.
 * async function - returns a promise
 * 
 * @param {string} path - The path to the JSON file, see CONTACT_PATH_SUFFIX 
 */
async function loadTasksData(path) {
  let resp = await fetch(BASE_URL + path + ".json");
  let respToJson = await resp.json();

  if (respToJson) {
    taskList = respToJson;
    taskList = Object.entries(taskList);
    taskListIds = Object.keys(taskList);
    taskListValues = Object.values(taskList);
    console.log(taskListValues);
  }
  
  showSumofTasks();
  showSumofAllBoardTasks();

  // Call updateUserName() after populating taskList
  // updateUserName();
}


/**
 * Updates the user name at the summary page.
 * Source: Firebase-Db, but atm contactList{}
 */
function updateUserName() { 
  // contactList[1]['name'] 
  // result: "Michael Jordan" 
  const userNameElement = document.getElementById("user-name"); 
  const userName = contactListValues[2][1]["name"]; 
  userNameElement.innerHTML = userName; 
}


/**
 * Shows the overall-sum of (open)tasks in the summary page.
 * Source: Firebase-Db
 */
function showSumofTasks() {
  const sumOfTasks = document.getElementById("amount-todo");
  sumOfTasks.innerHTML = '';
  sumOfTasks.textContent = taskListValues.length;
}


/**
 * Shows the overall-sum of (done)tasks in the summary page.
 * Source: Firebase-Db
 */
function showTasksDone() {
  const tasksDone = document.getElementById("amount-done");
  tasksDone.innerHTML = '';
  // tasksDone.textContent = ;
}


/**
 * Shows the sum of (progress)tasks in the summary page.
 * Source: Firebase-Db
 */
function showTaskInProgress() {
  const taskInProgress = document.getElementById("task-in-progress");
  taskInProgress.innerHTML = '';
  // taskInProgress.textContent = ;
}


/**
 * Shows the sum of (feedback)tasks in the summary page.
 * Source: Firebase-Db
 */
function showTaskInFeedback() {
  const taskInFeedback= document.getElementById("task-feedback");
  taskInFeedback.innerHTML = '';
  // taskInFeedback.textContent = ;
}


/**
 * Shows the overall-sum of (urgent)tasks in the summary page.
 * Source: Firebase-Db
 */
function showUrgentTask() {
  const urgentTask = document.getElementById("overview-urgent-amount");
  urgentTask.innerHTML = '';
  // urgentTask.textContent = ;
}


/**
 * Shows the overall-sum of -all- tasks (at the board) in the summary page.
 * Source: Firebase-Db
 */
function showSumofAllBoardTasks() {
  const sumOfAllTasks = document.getElementById("task-on-board");
  sumOfAllTasks.innerHTML = '';
  sumOfAllTasks.textContent = taskListValues.length;
}