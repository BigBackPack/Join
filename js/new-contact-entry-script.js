function addNewContactEntry(firebaseId, displayIndicator, firstLetter, contact, contactInitials) {
    contactsPreview.innerHTML += /*html*/`
    <!-- alphabetical identificator -->
    <div id="aphabetical-indicator-${firebaseId}" class="aphabetical-indicator" style="display: ${displayIndicator ? 'block' : 'none'}">
        <p>${firstLetter}</p>
    </div>
    
    <!-- contact preview -->
    <div id="contact-preview-${firebaseId}" class="contact-preview" onclick="selectContact('${firebaseId}')">
        <div class="sorted-contact-icon" style="background-color: ${contact.bgColor}">
            ${contactInitials}
        </div>
        <div>
            <div class="contac-name-preview">
                ${contact.name}
            </div>
            <div>
                ${contact.mail}
            </div>
        </div>    
    </div>
`;
}