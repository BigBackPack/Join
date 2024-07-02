/**
* Generates html - Helper-f() for the generateContactBar()
* @param {string} name of user
* @returns 
*/
function getInitials(name) {
 return name.split(' ').map(word => word[0]).join('');
}

/**
* Generate a name badge/profile-icon with the initials and full name of user
* @param {string} contact - contact data 
* @returns {string} - HTML for the contact badge
*/
function generateContactBadge(contact) {
 let initials = getInitials(contact.name);
 return `
   <div class="profile-badge-container">
     <div class="profile-badge" style="background-color: ${contact.bgColor};">
         <span class="initials">${initials}</span>
     </div>
         <span id="fullName" class="full-name">${contact.name}</span>
   </div>
 `;
}

/**
* Gets the respective user to be displayed
* @param {Id} assignment - index-value 
* @returns 
*/
function getAssignedContactsHtml(assignment = []) {
 return assignment.map(contactId => {
     const contactEntry = contactList.find(contact => contact[0] === contactId);
     if (contactEntry) {
         const contactData = contactEntry[1];
         return generateContactBadge(contactData);
     }
     return '';
 }).join('');
}