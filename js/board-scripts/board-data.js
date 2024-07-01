/**
 * The base URL for the Firebase database.
 */
const BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";


/*
* Array of paths for the contacts and tasks for the load-functions.
*/
const PATH_SUFFIX = ["contacts/", "tasks/"];


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
let taskList = [];


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
  try {
    const response = await fetch(`${BASE_URL}${path}.json`);
    const data = await response.json();
    if (data) {
      contactList = Object.entries(data);
    }
  } catch (error) {
    console.error('Error loading contacts data:', error);
  }
}


/**
 * Fetches the data from the tasks section from Firebase.
 * async function - returns a promise
 * 
 * @param {string} path - The path to the JSON file, see CONTACT_PATH_SUFFIX 
 */
async function loadTasksData(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}.json`);
    const data = await response.json();

    if (data) {
      taskList = Object.entries(data);
      // startBoard(taskList);
      updateHTML();
      // console.log('task-list: ', taskList); - CHECK
    }
  } catch (error) {
    console.error('Error loading tasks data:', error);
  }
}