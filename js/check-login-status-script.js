function loaduserLoginStatus() {
    let loggedInStatus = localStorage.getItem("loggedIn");
    if(loggedInStatus) {loggedIn = JSON.parse(loggedInStatus);}
       
    checkUserLoginStatus(loggedInStatus);
 }


function checkUserLoginStatus(loggedInStatus) {
    if (loggedInStatus === "false") {
    window.location = "login.html";
    }
}


// logges user out if window was closed
window.addEventListener("beforeunload", function () {
    localStorage.setItem("loggedIn", "false");
});