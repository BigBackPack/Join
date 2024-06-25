let timestampIn;


function start() {
    loadUserLoginStatus();

    timestampOutData = localStorage.getItem("timestampOut");
    timestampOut = Number(timestampOutData);

    console.log(timestampOut);
}


function loadUserLoginStatus() {
    let loggedInStatus = localStorage.getItem("loggedIn");
    if (loggedInStatus) {
        loggedIn = JSON.parse(loggedInStatus);
    }
    checkUserLoginStatus(loggedInStatus);
}


function checkUserLoginStatus(loggedInStatus) {
    console.log("Checking login status, loggedIn:", loggedInStatus);
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
        if (timestampOut + 1000 > timestampIn) {
            console.log("same session","in:"+ (timestampOut + 100), "out:" + timestampIn);
        } else {
            console.log("new session", "in:"+ (timestampOut + 100), "out:" + timestampIn);

            localStorage.setItem("loggedIn", false);
        }
}
// #endregion : time stamp management


// #region : generate user initial


// #endregion : generate user initial