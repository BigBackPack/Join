let BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
let CONTACT_PATH = "/contacts";
let TASK_PATH = "/tasks";

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
    fetchContacts();
    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById("add-task-form").addEventListener("submit", handleFormSubmit);
    document.querySelectorAll('.dropdown-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedInitials);
    });
    window.onclick = closeDropdownOnClickOutside;
}

function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        createTask();
    }
}

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

function clearForm() {
    document.querySelector(".form-body").reset();
    document.getElementById("selected-initials").innerHTML = '';
    document.getElementById("textList").innerHTML = '';
    resetCategoryDropdown();
}

function resetCategoryDropdown() {
    let dropdownButton = document.getElementById("dropdownCategoryButton");
    dropdownButton.innerHTML = "Select a category";
    dropdownButton.removeAttribute("data-selected");
}

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

function getInputValue(elementId) {
    return document.getElementById(elementId).value;
}

function getCheckedRadioButton(name) {
    return document.querySelector(`input[name="${name}"]:checked`).id;
}

function getAttributeValue(elementId, attribute) {
    return document.getElementById(elementId).getAttribute(attribute);
}

function getAssignedContacts() {
    let assignedContacts = [];
    document.querySelectorAll('.dropdown-checkbox:checked').forEach(checkbox => {
        assignedContacts.push({
            name: checkbox.parentNode.querySelector('span').innerText,
            bgColor: checkbox.getAttribute('data-bgcolor'),
            initials: checkbox.getAttribute('data-initials')
        });
    });
    return assignedContacts;
}

function getSubtasks() {
    let subtasks = [];
    document.querySelectorAll('#textList li').forEach(subtask => {
        subtasks.push(subtask.innerText.trim());
    });
    return subtasks;
}

function postTask(task) {
    return fetch(`${BASE_URL}${TASK_PATH}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }).then(response => response.json());
}

function fetchContacts() {
    fetch(`${BASE_URL}${CONTACT_PATH}.json`)
        .then(response => response.json())
        .then(renderContacts)
        .catch(error => console.error('Error fetching contacts:', error));
}

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


function setupCheckboxListeners() {
    document.querySelectorAll('.dropdown-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedInitials);
    });
}

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

function toggleDropdown(dropdownId) {
    let dropdown = document.getElementById(dropdownId);
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    } else {
        dropdown.classList.add("show");
    }
}

function selectCategory(category) {
    let dropdownButton = document.getElementById("dropdownCategoryButton");
    dropdownButton.innerHTML = category;
    dropdownButton.setAttribute("data-selected", category);
    document.getElementById("dropdownCategoryContent").classList.remove("show");
    validateForm();
}

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

// Subtask handling
function showIcons() {
    document.getElementById("plus-icon").classList.add("hidden");
    document.getElementById("x-icon").classList.remove("hidden");
    document.getElementById("tick-icon").classList.remove("hidden");
}

function hideIconsIfEmpty() {
    let input = document.getElementById("subtask-input");
    if (input.value === "") {
        document.getElementById("plus-icon").classList.remove("hidden");
        document.getElementById("x-icon").classList.add("hidden");
        document.getElementById("tick-icon").classList.add("hidden");
    }
}

function focusInput() {
    document.getElementById("subtask-input").focus();
}

function clearInput() {
    let input = document.getElementById("subtask-input");
    input.value = "";
    input.focus();
}

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


function editItem(element) {
    let listItem = element.closest('li');
    let currentText = listItem.querySelector('.item-text').textContent.trim();
    listItem.innerHTML = createEditItemHTML(currentText);
    listItem.querySelector('.edit-input').focus();
}

function saveEdit(element) {
    let listItem = element.closest('li');
    let newText = element.value;
    listItem.innerHTML = createSubtaskItemHTML(newText);
}


function removeItem(element) {
    element.closest('li').remove();
}

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
