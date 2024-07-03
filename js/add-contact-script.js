const BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACT_PATH_SUFFIX = "/contacts";
const TASKS_PATH_SUFFIX = "/tasks";
const contactsPreview = document.getElementById("alphabetic-sorting-container");
const detailedContactDisplay = document.getElementById("deatailed-contact-container");

const nameInput = document.getElementById("name-input");
const mailInput = document.getElementById("mail-input");
const telInput = document.getElementById("tel-input");

const nameEditInput = document.getElementById("name-edit-input");
const mailEditInput = document.getElementById("mail-edit-input");
const telEditInput = document.getElementById("tel-edit-input");

let nameTaken = false;
let mailTaken = false;
let telTaken = false;

let contactList = {};
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


window.addEventListener("resize", checkWindowSize);


function init() {
    addContactsToPreview();
    loadContactsData(CONTACT_PATH_SUFFIX);
}


function checkWindowSize(){
    if(window.innerWidth  > 800){
        document.getElementById("contacts-content-left").style.display = "block";
        document.querySelector(".edit-contact-radio-btn").style.display = "none";
    } else if(window.innerWidth  < 800){
        document.getElementById("contacts-content-right").style.display = "block";
    }
}


function turnOnAddContactOverlay() {
    document.getElementById("fullscreen-overlay").style.display = "flex";
}


function turnOffAllOverlays() {
    document.getElementById("fullscreen-overlay").style.display = "none";
    document.getElementById("fullscreen-overlay-edit-contact").style.display = "none";
    document.getElementById("fullscreen-overlay-mobile-edit-options").style.display = "none";
    turnOffEditContactOptions();
}


function turnOnDetailedContactView() {
    if(window.innerWidth  < 800){
        document.getElementById("contacts-content-right").style.display = "block";
        document.getElementById("contacts-content-left").style.display = "none";
    }
}


function turnOffDetailedContactView() {
    document.getElementById("contacts-content-right").style.display = "none";
    document.getElementById("contacts-content-left").style.display = "block";
}


function turnOnEditContactOptions() {
    document.getElementById("edit-contact-options-popup").style.display = "flex";
    document.getElementById("fullscreen-overlay-mobile-edit-options").style.display = "flex";
}


function turnOffEditContactOptions() {
    document.getElementById("edit-contact-options-popup").style.display = "none";
}


async function loadContactsData(path, editedContactFirebaseId) {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    contactList = responseToJson;
    addContactsToPreview(editedContactFirebaseId);
}


async function postContactData(path, data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Failed to post contact data');
    }
    return response.json();
}


function storeContactInputs(event) {
    event.preventDefault();

    const bgColor = pickBgColorInitials();
    const nameInput = document.getElementById('name-input');
    const mailInput = document.getElementById('mail-input');
    const telInput = document.getElementById('tel-input');

    const nameValue = nameInput.value.trim();
    const mailValue = mailInput.value.trim();
    const telValue = telInput.value.trim();

    if (!mailInput.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(nameValue)) {
        alert("Please enter a valid name (letters and spaces only).");
        return;
    }

    const telPattern = /^[0-9-+\s()]+$/;
    if (!telPattern.test(telValue)) {
        alert("Please enter a valid phone number (numbers and special characters only).");
        return;
    }


    if (nameValue && mailValue && telValue) {
        nameTaken = false;
        mailTaken = false;
        telTaken = false;

        checkIfContactAlreadyExists(nameValue, mailValue, telValue);

        if (nameTaken) {
            alert("This name is already taken. Please choose a different one.");
        } else if (mailTaken) {
            alert("This email is already taken. Please choose a different one.");
        } else if (telTaken) {
            alert("This phone number is already taken. Please choose a different one.");
        } else {
            saveNewContact(nameValue, mailValue, telValue, bgColor);
            const message = "contact added..."
            showToastMessage(message);
        }        
    } else {
        alert("Your input is incomplete. Please fill out all of the input fields");
    }
}


function checkIfContactAlreadyExists(nameValue, mailValue, telValue) {
    for(let firebaseId in contactList) {
        if (contactList[firebaseId].name === nameValue) {
            nameTaken = true;
            break;
        } else if (contactList[firebaseId].mail === mailValue) {
            mailTaken = true;
            break;
        } else if (contactList[firebaseId].tel === telValue) {
            telTaken = true;
            break;
        }
    } 
}


function saveNewContact(nameValue, mailValue, telValue, bgColor) {
    postContactData("/contacts", {
        "name": nameValue,
        "mail": mailValue,
        "tel": telValue,
        "bgColor": bgColor
    }).then(() => {
        turnOffAllOverlays();
        loadContactsData(CONTACT_PATH_SUFFIX); 
        nameInput.value = "";
        mailInput.value = "";
        telInput.value = "";
    }).catch(error => {
        throw new Error("Error posting contact data:");
    });
}


function addContactsToPreview(editedContactFirebaseId) {
    contactsPreview.innerHTML = "";
    let contactsArray = Object.entries(contactList);

    sortAlphabetically(contactsArray);

    let displayedInitials = new Set(); // Keep track of displayed initials

    contactsArray.forEach(([firebaseId, contact]) => {
        let contactInitials = createInitials(contact.name);
        let firstLetter = contact.name.trim().charAt(0).toUpperCase();

        let displayIndicator = !displayedInitials.has(firstLetter);
        if (displayIndicator) {
            displayedInitials.add(firstLetter);
        }

        addNewContactEntry(firebaseId, displayIndicator, 
                            firstLetter, contact, contactInitials);
    });

    selectLastEditedContact(editedContactFirebaseId);
}


function selectLastEditedContact(editedContactFirebaseId) {
    if(editedContactFirebaseId){
        selectContact(editedContactFirebaseId);
    }
}


function sortAlphabetically(contactsArray) {
    contactsArray.sort((a, b) => { // sort array alphabetically by name
        let nameA = a[1].name.toUpperCase(); // Ignore upper and lowercase
        let nameB = b[1].name.toUpperCase(); // Ignore upper and lowercase

        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        
        return 0; // Names must be equal
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


function pickBgColorInitials() {
    const ranBumSelector = Math.floor(Math.random() * 20);
    return signatureColors[ranBumSelector];
}


function selectContact(firebaseId) {
    resetAllContactPreviewsToDefaultState();
    turnOnDetailedContactView(); 

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
                contactPreviewContainer.style.backgroundColor = "";
                contactPreviewContainer.style.color = "";
            }
        }
    }
}


function displayDetailedContactInfo(firebaseId ) {
    const editContactContainer = document.getElementById("edit-contact-container");
    const deleteContactContainer = document.getElementById("delete-contact-container");
    const editContactMobileOption = document.querySelector(".edit");
    const deleteContactMobileOption = document.querySelector(".delte");
    const contactSignatur = document.getElementById("signatur-display");
    const contactName = document.getElementById("name-display");
    const contactMail = document.getElementById("email-deisplay");
    const contactPhone = document.getElementById("phone-deisplay");
    const contact = contactList[firebaseId];

    manageEditContactRadioBtnVisability();

    detailedContactDisplay.style.display = "block";
    contactSignatur.innerHTML = createInitials(contact.name);
    contactSignatur.style.backgroundColor = contact.bgColor;
    contactName.innerHTML = contact.name;
    contactMail.innerHTML = contact.mail;
    contactPhone.innerHTML = contact.tel;

    deleteContactContainer.onclick = function() {
        deleteContact(firebaseId);
    };

    editContactContainer.onclick = function() {
        editContact(firebaseId);
    };
    
    deleteContactMobileOption.onclick = function() {
        deleteContact(firebaseId);
    };

    editContactMobileOption.onclick = function() {
        editContact(firebaseId);
    };
}


function manageEditContactRadioBtnVisability() {
    if (window.innerWidth  < 800) {
        document.querySelector(".edit-contact-radio-btn").style.display = "flex";
    }
}


function editContact(firebaseId) {
    document.getElementById("fullscreen-overlay-edit-contact").style.display = "flex";
    document.getElementById("fullscreen-overlay-mobile-edit-options").style.display = "none";
    const deleteContactBtn = document.getElementById("delete-contact-btn");
    const saveEditedContactBtn = document.getElementById("save-edited-contact-btn");
    const contactSignatur = document.getElementById("edit-signatur-display");
    const contact = contactList[firebaseId];

    deleteContactBtn.onclick = function() {
        deleteContact(firebaseId);
    };

    saveEditedContactBtn.onclick = function() {
        overrideContactData(event, firebaseId);
    };

    contactSignatur.innerHTML = createInitials(contact.name);
    contactSignatur.style.backgroundColor = contact.bgColor;
    contactSignatur.style.minWidth = "80px";
    contactSignatur.style.minHeight = "80px";
    contactSignatur.style.marginLeft = "32px";
    nameEditInput.value = contact.name;
    mailEditInput.value = contact.mail;
    telEditInput.value = contact.tel;
}


async function overrideContactData(event, firebaseId) {
    event.preventDefault();

    const nameEditInput = document.getElementById('name-edit-input');
    const mailEditInput = document.getElementById('mail-edit-input');
    const telEditInput = document.getElementById('tel-edit-input');

    const nameValue = nameEditInput.value.trim();
    const mailValue = mailEditInput.value.trim();
    const telValue = telEditInput.value.trim();

    if (!mailEditInput.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(nameValue)) {
        alert("Please enter a valid name (letters and spaces only).");
        return;
    }

    const telPattern = /^[0-9-+\s()]+$/;
    if (!telPattern.test(telValue)) {
        alert("Please enter a valid phone number (numbers and special characters only).");
        return;
    }

    if (nameValue && mailValue && telValue) {
        const updatedContact = {
            name: nameValue,
            mail: mailValue,
            tel: telValue,
            bgColor: contactList[firebaseId].bgColor
        };

        try {
            const response = await fetch(`${BASE_URL}${CONTACT_PATH_SUFFIX}/${firebaseId}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedContact)
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }
            turnOffAllOverlays();
            detailedContactDisplay.style.display = "none";
            
            loadContactsData(CONTACT_PATH_SUFFIX, firebaseId); 
        } catch (error) {
            console.error("Error updating contact data:", error);
        }
        const message = "Contact edited...";
        showToastMessage(message);
    } else {
        alert("Your input is incomplete. Please fill out all of the input fields");
    }
}



async function deleteContact(firebaseId) {
    const detailedContactDisplay = document.getElementById("deatailed-contact-container");

    try {
        const response = await fetch(`${BASE_URL}${CONTACT_PATH_SUFFIX}/${firebaseId}.json`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        loadContactsData(CONTACT_PATH_SUFFIX);
        detailedContactDisplay.style.display = "none";
        const message = "contact deleted..."
        showToastMessage(message);
    } catch (error) {
        throw new Error("Error deleting contact data:");
    }
}


function stopPropagation(event) {
    event.stopPropagation();
}