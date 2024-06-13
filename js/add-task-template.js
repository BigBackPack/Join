export function createContactItem(key, contact, initials) {
    return /*html*/`
    <a href="#" data-value="${key}">
        <div class="dropdown-item">
            <div class="dropdown-image" style="background-color: ${contact.bgColor};">
                <p>${initials}</p>
            </div>
            <span>${contact.name}</span>
            <input type="checkbox" class="dropdown-checkbox" data-initials="${initials}" data-bgcolor="${contact.bgColor}">
        </div>
    </a>
    `;
}

export function createSubtaskItem(text) {
    return /*html*/`
    <li>
        <span class="item-text">${text}</span>
        <div class="feature-icons">
            <span class="edit-icon" onclick="editItem(this)"><img src="/img/edit_icon.svg"></span>
            <div class="separator-list"></div>
            <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
        </div>
    </li>
    `;
}

export function createEditSubtaskItem(currentText) {
    return /*html*/`
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
