let BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
let CONTACT_PATH = "/contacts";
let TASK_PATH = "/tasks";
let contactsData = {};

document.addEventListener("DOMContentLoaded", initializeApp);

/**
 * Initializes the application by fetching contacts and setting up event listeners.
 */
function initializeApp() {
    fetchContacts();
    setupEventListeners();
    setMinDate();
}

/**
 * Sets up event listeners for the form submission, checkbox changes, and window click events.
 */
function setupEventListeners() {
    document.getElementById("add-task-form").addEventListener("submit", handleFormSubmit);
    document.querySelectorAll('.dropdown-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedInitials);
    });
    window.onclick = closeDropdownOnClickOutside;
}

/**
 * Handles the form submission event.
 * @param {Event} event - The form submission event.
 */
function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        createTask();
    }
}

/**
 * Validates the form by checking if a category is selected.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
function validateForm() {
    let dropdownButton = document.getElementById("dropdownCategoryButton");
    let selectedCategory = dropdownButton.getAttribute("data-selected");
    let requiredText = document.getElementById("required-text");

    let isValid = !!selectedCategory;
    if (!isValid) {
        dropdownButton.parentElement.classList.add("invalid");
        requiredText.style.display = "unset";
    } else {
        dropdownButton.parentElement.classList.remove("invalid");
        requiredText.style.display = "none";
    }
    return isValid;
}

/**
 * Clears the form by resetting all inputs and selected values.
 */
function clearForm() {
    document.querySelector(".form-body").reset();
    document.getElementById("selected-initials").innerHTML = '';
    document.getElementById("textList").innerHTML = '';
    resetCategoryDropdown();
}

/**
 * Resets the category dropdown to its default state.
 */
function resetCategoryDropdown() {
    let dropdownButton = document.getElementById("dropdownCategoryButton");
    dropdownButton.innerHTML = "Select a category";
    dropdownButton.removeAttribute("data-selected");
}

/**
 * Creates a new task by gathering form data and posting it to the server.
 */
function createTask() {
    let newTask = {
        title: getInputValue("title"),
        description: getInputValue("description"),
        dueDate: getInputValue("date"),
        priority: getCheckedRadioButton("priority"),
        category: getAttributeValue("dropdownCategoryButton", "data-selected"),
        assignment: getAssignedContacts(),
        subtasks: getSubtasks()
    };

    postTask(newTask)
        .then(() => clearForm())
}

/**
 * Gets the value of an input field by its ID.
 * @param {string} elementId - The ID of the input element.
 * @returns {string} - The value of the input field.
 */
function getInputValue(elementId) {
    return document.getElementById(elementId).value;
}

/**
 * Gets the ID of the selected radio button within a named group.
 * @param {string} name - The name of the radio button group.
 * @returns {string} - The ID of the selected radio button.
 */
function getCheckedRadioButton(name) {
    return document.querySelector(`input[name="${name}"]:checked`).id;
}

/**
 * Gets the value of a specified attribute from an element by its ID.
 * @param {string} elementId - The ID of the element.
 * @param {string} attribute - The attribute to retrieve.
 * @returns {string} - The value of the specified attribute.
 */
function getAttributeValue(elementId, attribute) {
    return document.getElementById(elementId).getAttribute(attribute);
}

/**
 * Retrieves a list of assigned contacts based on checked checkboxes.
 * @returns {Array} - An array of assigned contact objects.
 */
function getAssignedContacts() {
    let assignedContacts = [];
    document.querySelectorAll('.dropdown-checkbox:checked').forEach(checkbox => {
        let contactId = checkbox.getAttribute('data-id');
        assignedContacts.push(contactId);
    });
    return assignedContacts;
}

/**
 * Retrieves a list of subtasks from the task list.
 * @returns {Array} - An array of subtask strings.
 */
function getSubtasks() {
    let subtasks = [];
    document.querySelectorAll('#textList li').forEach(subtask => {
        subtasks.push(subtask.innerText.trim());
    });
    return subtasks;
}

/**
 * Posts a new task to the server.
 * @param {Object} task - The task object to be posted.
 * @returns {Promise} - A promise that resolves to the server response.
 */
async function postTask(task) {
    let response = await fetch(`${BASE_URL}${TASK_PATH}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    return await response.json();
}

/**
 * Fetches contacts from the server and renders them in the dropdown.
 */
function fetchContacts() {
    fetch(`${BASE_URL}${CONTACT_PATH}.json`)
        .then(response => response.json())
        .then(data => {
            contactsData = data;
            renderContacts(data);
        })
        .catch(error => console.error('Error fetching contacts:', error));
}

/**
 * Renders contacts in the dropdown.
 * @param {Object} contacts - The contacts object fetched from the server.
 */
function renderContacts(contacts) {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.innerHTML = '';
    for (let key in contacts) {
        if (contacts.hasOwnProperty(key)) {
            let contact = contacts[key];
            let contactItem = createContactItem(contact, key);
            dropdownContent.innerHTML += contactItem;
        }
    }
    setupCheckboxListeners();
}


/**
 * Sets up event listeners for the checkboxes in the dropdown.
 */
function setupCheckboxListeners() {
    document.querySelectorAll('.dropdown-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedInitials);
    });
}

/**
 * Updates the display of selected initials based on checked checkboxes.
 */
function updateSelectedInitials() {
    let selectedInitialsContainer = document.getElementById('selected-initials');
    selectedInitialsContainer.innerHTML = '';
    document.querySelectorAll('.dropdown-checkbox:checked').forEach(checkbox => {
        let initials = checkbox.getAttribute('data-initials');
        let bgColor = checkbox.getAttribute('data-bgcolor');
        let initialsDiv = document.createElement('div');
        initialsDiv.className = 'selected-initials-item';
        initialsDiv.innerText = initials;
        initialsDiv.style.backgroundColor = bgColor;
        selectedInitialsContainer.appendChild(initialsDiv);
    });
}

/**
 * Toggles the visibility of a dropdown menu.
 * @param {string} dropdownId - The ID of the dropdown element.
 */
function toggleDropdown(dropdownId) {
    let dropdown = document.getElementById(dropdownId);
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    } else {
        dropdown.classList.add("show");
    }
}

/**
 * Selects a category and updates the category button.
 * @param {string} category - The selected category.
 */
function selectCategory(category) {
    let dropdownButton = document.getElementById("dropdownCategoryButton");
    dropdownButton.innerHTML = category;
    dropdownButton.setAttribute("data-selected", category);
    document.getElementById("dropdownCategoryContent").classList.remove("show");
    validateForm();
}

/**
 * Filters the items in a dropdown menu based on the input value.
 * @param {string} dropdownContentId - The ID of the dropdown content element.
 */
function filterDropdown(dropdownContentId) {
    let input = document.getElementById("dropdown");
    let filter = input.value.toLowerCase();
    let div = document.getElementById(dropdownContentId);
    let a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        let txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

/**
 * Shows the icons for adding, clearing, and confirming subtasks.
 */
function showIcons() {
    document.getElementById("plus-icon").classList.add("hidden");
    document.getElementById("x-icon").classList.remove("hidden");
    document.getElementById("tick-icon").classList.remove("hidden");
}

/**
 * Hides the icons if the subtask input is empty.
 */
function hideIconsIfEmpty() {
    let input = document.getElementById("subtask-input");
    if (input.value === "") {
        document.getElementById("plus-icon").classList.remove("hidden");
        document.getElementById("x-icon").classList.add("hidden");
        document.getElementById("tick-icon").classList.add("hidden");
    }
}

/**
 * Focuses the subtask input field.
 */
function focusInput() {
    document.getElementById("subtask-input").focus();
}

/**
 * Clears the subtask input field and focuses it.
 */
function clearInput() {
    let input = document.getElementById("subtask-input");
    input.value = "";
    input.focus();
}

/**
 * Displays the entered subtask in the subtask list.
 */
function displayText() {
    let input = document.getElementById("subtask-input");
    if (input.value !== "") {
        let textList = document.getElementById("textList");
        let newItem = createSubtaskItem(input.value);
        textList.appendChild(newItem);
        input.value = "";
        hideIconsIfEmpty();
    }
}

/**
 * Edits a subtask item.
 * @param {HTMLElement} element - The edit icon element.
 */
function editItem(element) {
    let listItem = element.closest('li');
    let currentText = listItem.querySelector('.item-text').textContent.trim();
    listItem.innerHTML = createEditItemHTML(currentText);
    listItem.querySelector('.edit-input').focus();
}

/**
 * Saves the edited subtask item.
 * @param {HTMLElement} element - The input element containing the new text.
 */
function saveEdit(element) {
    let listItem = element.closest('li');
    let newText = element.value;
    listItem.innerHTML = createSubtaskItemHTML(newText);
}

/**
 * Removes a subtask item.
 * @param {HTMLElement} element - The delete icon element.
 */
function removeItem(element) {
    element.closest('li').remove();
}

/**
 * Closes any open dropdowns when clicking outside of them.
 * @param {Event} event - The window click event.
 */
function closeDropdownOnClickOutside(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-item')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/**
* Sets the minimum date for the date picker to today's date.
*/
function setMinDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    let todayString = `${year}-${month}-${day}`;

    document.getElementById("date").setAttribute("min", todayString);
}