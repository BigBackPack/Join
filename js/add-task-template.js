/**
 * Creates a subtask item element.
 * @param {string} text - The subtask text.
 * @returns {HTMLElement} - The new subtask item element.
 */
function createSubtaskItem(text) {
    let newItem = document.createElement("li");
    newItem.innerHTML = `
        <span class="item-text">${text}</span>
        <div class="feature-icons">
            <span class="edit-icon" onclick="editItem(this)"><img src="/img/edit_icon.svg"></span>
            <div class="separator-list"></div>
            <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
        </div>
    `;
    return newItem;
}

/**
 * Creates the HTML for editing a subtask item.
 * @param {string} currentText - The current text of the subtask.
 * @returns {string} - The HTML string for editing the subtask item.
 */
function createEditItemHTML(currentText) {
    return `
        <div class="edit-container">
            <input type="text" class="edit-input" value="${currentText}" onblur="saveEdit(this)">
            <div class="feature-icons">
                <span class="edit-icon" onclick="saveEdit(this)"><img src="/img/check_black_icon.svg"></span>
                <div class="separator-list"></div>
                <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
            </div>
        </div>
    `;
}

/**
 * Creates the HTML for a subtask item.
 * @param {string} text - The text of the subtask item.
 * @returns {string} - The HTML string for the subtask item.
 */
function createSubtaskItemHTML(text) {
    return `
        <span class="item-text">${text}</span>
        <div class="feature-icons">
            <span class="edit-icon" onclick="editItem(this)"><img src="/img/edit_icon.svg"></span>
            <div class="separator-list"></div>
            <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
        </div>
    `;
}

/**
 * Creates a contact item element for the dropdown.
 * @param {Object} contact - The contact object.
 * @param {string} key - The key of the contact.
 * @returns {string} - The HTML string for the contact item.
 */
function createContactItem(contact, key) {
    let initials = contact.name.split(' ').map(word => word[0]).join('');
    return `
        <a href="#" data-value="${key}">
            <div class="dropdown-item">
                <div class="dropdown-image" style="background-color: ${contact.bgColor};">
                    <p>${initials}</p>
                </div>
                <span>${contact.name}</span>
                <input type="checkbox" class="dropdown-checkbox" data-initials="${initials}" data-bgcolor="${contact.bgColor}">
            </div>
        </a>`;
}