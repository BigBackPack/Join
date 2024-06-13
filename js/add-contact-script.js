const BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACT_PATH_SUFFIX = "/contacts";
const contactsPreview = document.getElementById("alphabetic-sorting-container");

let contactList = {};


function init() {
    addContactsToPreview();
    loadContactsData(CONTACT_PATH_SUFFIX);
}


function turnOnAddContactOverlay() {
    document.getElementById("fullscreen-overlay").style.display = "flex";
}


function turnOffAddContactOverlay() {
    document.getElementById("fullscreen-overlay").style.display = "none";
}


async function loadContactsData(path) {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    contactList = responseToJson;
    addContactsToPreview();
}


async function postContactData(path, data = {}) {
    console.log("Posting contact data:", data);
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        console.error('Failed to post contact data:', response.statusText);
        throw new Error('Failed to post contact data');
    }
    
    console.log("Contact data posted successfully");
    return response.json();
}


function storeContactInputs(event) {
    event.preventDefault(); // Prevent default form submission

    const nameInput = document.getElementById("name-input");
    const mailInput = document.getElementById("mail-input");
    const telInput = document.getElementById("tel-input");
    const nameValue = nameInput.value.trim();
    const mailValue = mailInput.value.trim();
    const telValue = telInput.value.trim();

    if (nameValue && mailValue && telValue) {
        postContactData("/contacts", {
            "name": nameValue,
            "mail": mailValue,
            "tel": telValue
        }).then(() => {
            turnOffAddContactOverlay();
            loadContactsData(CONTACT_PATH_SUFFIX); 
            nameInput.value = "";
            mailInput.value = "";
            telInput.value = "";
        }).catch(error => {
            console.error("Error posting contact data:", error);
        });
    } else {
        alert("Your input is incomplete. Please fill out all of the input fields");
    }
}


function addContactsToPreview() {
    contactsPreview.innerHTML = "";

    let contactsArray = Object.entries(contactList);

    // Sort the array alphabetically by contact name
    contactsArray.sort((a, b) => {
        let nameA = a[1].name.toUpperCase(); // Ignore upper and lowercase
        let nameB = b[1].name.toUpperCase(); // Ignore upper and lowercase

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // Names must be equal
        return 0;
    });

    contactsArray.forEach(([firebaseId, contact]) => {
        let contactInitials = createInitials(contact.name);

        contactsPreview.innerHTML += /*html*/`
            <div id="contact-preview-${firebaseId}" class="contact-preview" onclick="selectContact('${firebaseId}')">
                <div class="sorted-contact-icon">${contactInitials}</div>
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
    });
}


function createInitials(fullName) {
    const nameParts = fullName.trim().split(' ');
    let initials = '';
    for (let i = 0; i < 2; i++) {
        if (nameParts[i]) { // Check if nameParts[i] exists
            initials += nameParts[i].charAt(0).toUpperCase();
        }
    }
    return initials;
}


function selectContact(firebaseId) {
    resetAllContactPreviewsToDefaultState()

    const contactPreviewContainer = document.getElementById("contact-preview-" + firebaseId );
    contactPreviewContainer.style.backgroundColor = "var(--mainColorSelect)";
    contactPreviewContainer.style.color = "var(--white)";

    displayDetailedContactInfo(firebaseId);
}


function resetAllContactPreviewsToDefaultState() {
    for (let firebaseId  in contactList) {
        if (contactList.hasOwnProperty(firebaseId )) {
            let contactPreviewContainer = document.getElementById("contact-preview-" + firebaseId );
            if (contactPreviewContainer) {
                contactPreviewContainer.style.backgroundColor = "var(--white)";
                contactPreviewContainer.style.color = "var(--black)";
            }
        }
    }
}


function displayDetailedContactInfo(firebaseId ) {
    const detailedContactDisplay = document.getElementById("deatailed-contact-container");
    const contactSignatur = document.getElementById("signatur-display");
    const contactName = document.getElementById("name-display");
    const contactMail = document.getElementById("email-deisplay");
    const contactPhone = document.getElementById("phone-deisplay");
    const contact = contactList[firebaseId];

    detailedContactDisplay.style.display = "block";
    contactSignatur.innerHTML = createInitials(contact.name);
    contactName.innerHTML = contact.name;
    contactMail.innerHTML = contact.mail;
    contactPhone.innerHTML = contact.tel;
}


function stopPropagation(event) {
    event.stopPropagation();
}