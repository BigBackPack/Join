let timestampIn;


function start() {
    loadUserLoginStatus();

    timestampOutData = localStorage.getItem("timestampOut");
    timestampOut = Number(timestampOutData);

    // generateInitiasl();
}


function loadUserLoginStatus() {
    let loggedInStatus = localStorage.getItem("loggedIn");
    if (loggedInStatus) {
        loggedIn = JSON.parse(loggedInStatus);
    }
    checkUserLoginStatus(loggedInStatus);
}


function checkUserLoginStatus(loggedInStatus) {
    if (loggedInStatus === "false" || loggedInStatus === null) {
        window.location = "login.html";
    }
}


window.addEventListener("beforeunload", function () {
    setTimestempOut();
});


window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        loadUserLoginData();
    }
    setTimestempIn();
});


document.addEventListener('DOMContentLoaded', start);


// #region : time stamp management
function setTimestempOut() {
    timestampOut = Date.now(); 
    let timestampOutData = JSON.stringify(timestampOut);
    localStorage.setItem("timestampOut", timestampOutData);
}


function setTimestempIn() {
    timestampIn = Date.now(); 
    let timestampInData = JSON.stringify(timestampIn);
    localStorage.setItem("timestampIn", timestampInData);
    compareTimeStamps();
}


function compareTimeStamps() {
    if (timestampOut && timestampIn)
        if (timestampOut + 1000 < timestampIn) {
            logOut();
        } 
}
// #endregion : time stamp management


// #region : generate user initial
document.addEventListener('DOMContentLoaded', function() {
    function checkElement() {
        const profileIcon = document.getElementById("profile-icon");
        if (profileIcon) {
            generateInitiasl(profileIcon);
        } else {
            setTimeout(checkElement, 100); // Check again after 100ms
        }
    }
    checkElement();
});


function generateInitiasl(profileIcon) {
    let userFullName = localStorage.getItem("rememberedUserName");
    userFullName = userFullName.replace(/["']/g, '');

    const nameParts = userFullName.trim().split(' ');
    let initials = '';
    for (let i = 0; i < 2; i++) {
        if (nameParts[i]) { // Check if nameParts[i] exists
            initials += nameParts[i].charAt(0).toUpperCase();
        }
    }
    profileIcon.innerHTML = initials;
}
// #endregion : generate user initial


// #region : log out UI
function toggleProfileMenuOn() {
    const profileMenu = document.getElementById("profile-menu-container");
    const profileMenuOverlay = document.querySelector(".full-screen-overlay-profile-menu");
    profileMenu.style.display = "flex"
    profileMenuOverlay.style.display = "block"
}


function toggleProfileMenuOff() {
    const profileMenu = document.getElementById("profile-menu-container");
    const profileMenuOverlay = document.querySelector(".full-screen-overlay-profile-menu");
    profileMenu.style.display = "none"
    profileMenuOverlay.style.display = "none"
}



function logOut() {
    localStorage.setItem("loggedIn", false);
    window.location = "index.html";
    console.log("should go to index");
}
// #endregion : generate user initial


