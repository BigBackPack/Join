const BASE_URL = "https://join-2c971-default-rtdb.europe-west1.firebasedatabase.app/";
const CONTACT_PATH_SUFFIX = "/contacts";
const contactsPreview = document.getElementById("alphabetic-sorting-container");

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

    const bgColor = pickBgColorInitials();
    const nameInput = document.getElementById("name-input");
    const mailInput = document.getElementById("mail-input");
    const telInput = document.getElementById("tel-input");
    const nameValue = nameInput.value.trim();
    const mailValue = mailInput.value.trim();
    const telValue = telInput.value.trim();

    if (nameValue && mailValue && telValue) {
        let nameTaken = false;
        let mailTaken = false;
        let telTaken = false;

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

        if (nameTaken) {
            alert("This name is already taken. Please choose a different one.");
        } else if (mailTaken) {
            alert("This email is already taken. Please choose a different one.");
        } else if (telTaken) {
            alert("This phone number is already taken. Please choose a different one.");
        } else {
            postContactData("/contacts", {
                "name": nameValue,
                "mail": mailValue,
                "tel": telValue,
                "bgColor": bgColor
            }).then(() => {
                turnOffAddContactOverlay();
                loadContactsData(CONTACT_PATH_SUFFIX); 
                nameInput.value = "";
                mailInput.value = "";
                telInput.value = "";
            }).catch(error => {
                console.error("Error posting contact data:", error);
            });
        }
            
    } else {
        alert("Your input is incomplete. Please fill out all of the input fields");
    }
}


function addContactsToPreview() {
    contactsPreview.innerHTML = "";
    let contactsArray = Object.entries(contactList);

    contactsArray.sort((a, b) => { // sort array alphabetically by name
        let nameA = a[1].name.toUpperCase(); // Ignore upper and lowercase
        let nameB = b[1].name.toUpperCase(); // Ignore upper and lowercase

        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        
        return 0; // Names must be equal
    });

    contactsArray.forEach(([firebaseId, contact]) => {
        let contactInitials = createInitials(contact.name);

        contactsPreview.innerHTML += /*html*/`
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
    const deleteContactContainer = document.getElementById("delete-contact-container");
    const detailedContactDisplay = document.getElementById("deatailed-contact-container");
    const contactSignatur = document.getElementById("signatur-display");
    const contactName = document.getElementById("name-display");
    const contactMail = document.getElementById("email-deisplay");
    const contactPhone = document.getElementById("phone-deisplay");
    const contact = contactList[firebaseId];

    detailedContactDisplay.style.display = "block";
    contactSignatur.innerHTML = createInitials(contact.name);
    contactSignatur.style.backgroundColor = contact.bgColor;
    contactName.innerHTML = contact.name;
    contactMail.innerHTML = contact.mail;
    contactPhone.innerHTML = contact.tel;

    deleteContactContainer.onclick = function() {
        deleteContact(firebaseId);
    };
}


async function deleteContact(firebaseId) {
    // console.log(firebaseId);
    try {
        const response = await fetch(`${BASE_URL}${CONTACT_PATH_SUFFIX}/${firebaseId}.json`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.error('Failed to delete contact:', response.statusText);
            throw new Error('Failed to delete contact');
        }

        console.log("Contact deleted successfully");
        loadContactsData(CONTACT_PATH_SUFFIX); // Refresh contact list
    } catch (error) {
        console.error("Error deleting contact data:", error);
    }
}


function stopPropagation(event) {
    event.stopPropagation();
}