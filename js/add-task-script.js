const BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACT_PATH_SUFFIX = "/contacts";
const TASK_PATH_SUFFIX = "/tasks";


function handleSubmit() {
    return validateForm() && createTask();
}

function validateForm() {
    let dropdownButton = document.getElementById("dropdownCategoryButton");
    let selectedCategory = dropdownButton.getAttribute("data-selected");
    let requiredText = document.getElementById("required-text");

    if (!selectedCategory) {
        dropdownButton.parentElement.classList.add("invalid");
        requiredText.style.display = "unset"; 
        return false; 
    } else {
        dropdownButton.parentElement.classList.remove("invalid");
        requiredText.style.display = "none"; 
        return true; 
    }
}

function clearForm() {
    document.querySelector(".form-body").reset();
    document.getElementById("selected-initials").innerHTML = '';
    document.getElementById("textList").innerHTML = '';

    // Reset category dropdown
    let dropdownCategoryButton = document.getElementById("dropdownCategoryButton");
    dropdownCategoryButton.innerHTML = "Select a category";
    dropdownCategoryButton.removeAttribute("data-selected");
}


function createTask() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let priority = document.querySelector('input[name="priority"]:checked').id;
    let category = document.getElementById("dropdownCategoryButton").getAttribute("data-selected");
    let assignedTo = [];
    document.querySelectorAll('.dropdown-checkbox:checked').forEach(checkbox => {
        assignedTo.push({
            idMail: checkbox.parentNode.querySelector('span').innerText, 
            bgColor: checkbox.getAttribute('data-bgcolor'),
            initials: checkbox.getAttribute('data-initials')
        });
    });

    let subtasks = [];
    document.querySelectorAll('#textList li').forEach(subtask => {
        subtasks.push(subtask.innerText.trim());
    });

    let newTask = {
        title: title,
        description: description,
        dueDate: date,
        priority: priority,
        category: category,
        assignment: assignedTo,
        subtasks: subtasks
    };

    fetch(`${BASE_URL}${TASK_PATH_SUFFIX}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Error creating task:", error);
    });
    clearForm();
    return false; 
}

// Fetch contacts from Firebase
function fetchContacts() {
    fetch(`${BASE_URL}${CONTACT_PATH_SUFFIX}.json`)
        .then(response => response.json())
        .then(contacts => {
            let dropdownContent = document.getElementById('dropdownContent');
            dropdownContent.innerHTML = ''; 

            for (let key in contacts) {
                if (contacts.hasOwnProperty(key)) {
                    let contact = contacts[key];
                    let initials = contact.name.split(' ').map(word => word[0]).join('');
                    let contactItem = `
                        <a href="#" data-value="${key}">
                            <div class="dropdown-item">
                                <div class="dropdown-image" style="background-color: ${contact.bgColor};">
                                    <p>${initials}</p>
                                </div>
                                <span>${contact.name}</span>
                                <input type="checkbox" class="dropdown-checkbox" data-initials="${initials}" data-bgcolor="${contact.bgColor}">
                            </div>
                        </a>`;
                    dropdownContent.innerHTML += contactItem;
                }
            }

            
            let checkboxes = document.querySelectorAll('.dropdown-checkbox');
            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener('change', function () {
                    updateSelectedInitials();
                });
            });
        })
        .catch(error => console.error('Error fetching contacts:', error));
}

function updateSelectedInitials() {
    let selectedInitialsContainer = document.getElementById('selected-initials');
    selectedInitialsContainer.innerHTML = '';
    let checkboxes = document.querySelectorAll('.dropdown-checkbox:checked');
    checkboxes.forEach(function (checkbox) {
        let initials = checkbox.getAttribute('data-initials');
        let bgColor = checkbox.getAttribute('data-bgcolor');
        let initialsDiv = document.createElement('div');
        initialsDiv.className = 'selected-initials-item';
        initialsDiv.innerText = initials;
        initialsDiv.style.backgroundColor = bgColor;
        selectedInitialsContainer.appendChild(initialsDiv);
    });
}

// Dropdown handling
function toggleDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.toggle("show");
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
    let textList = document.getElementById("textList");
    if (input.value !== "") {
        let newItem = document.createElement("li");
        newItem.innerHTML = `
            <span class="item-text">${input.value}</span>
            <div class="feature-icons">
                <span class="edit-icon" onclick="editItem(this)"><img src="/img/edit_icon.svg"></span>
                <div class="separator-list"></div>
                <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
            </div>
        `;
        textList.appendChild(newItem);
        input.value = "";
        hideIconsIfEmpty();
    }
}

function editItem(element) {
    let listItem = element.closest('li');
    let currentText = listItem.querySelector('.item-text').textContent.trim();
    listItem.innerHTML = `
        <div class="edit-container">
            <input type="text" class="edit-input" value="${currentText}" onblur="saveEdit(this)">
            <div class="feature-icons">
                <span class="edit-icon" onclick="saveEdit(this)"><img src="/img/check_black_icon.svg"></span>
                <div class="separator-list"></div>
                <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
            </div>
        </div>
    `;
    listItem.querySelector('.edit-input').focus();
}

function saveEdit(element) {
    let listItem = element.closest('li');
    let newText = element.value;
    listItem.innerHTML = `
        <span class="item-text">${newText}</span>
        <div class="feature-icons">
            <span class="edit-icon" onclick="editItem(this)"><img src="/img/edit_icon.svg"></span>
            <div class="separator-list"></div>
            <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
        </div>
    `;
}

function removeItem(element) {
    element.closest('li').remove();
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    fetchContacts();

    let checkboxes = document.querySelectorAll('.dropdown-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            updateSelectedInitials();
        });
    });
});

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-item')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
