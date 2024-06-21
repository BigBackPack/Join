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