let rememberMeChecked = false;
let rememberedUserMail;
let rememberedUserPsw;

let loggedIn = false;
let policyAccepted = false;

let timestampOut;
let timestampIn;

let userLoginData = [];


function init() {
    console.log("Initializing..."); // DEBUG
    if (localStorage.getItem("userLoginData") == null) {
        saveUserLoginData();
    }
    loadUserLoginData();

    if (window.location.href.includes("signup")) {
        document.getElementById('signup-form').addEventListener('submit', checkUserInput);
    } else if (window.location.href.includes("login")) {
        document.getElementById('login-form').addEventListener('submit', checkIfMailIsRegitered);
    }
    

    timestampOutData = localStorage.getItem("timestampOut");
    timestampOut = Number(timestampOutData);

}


function saveUserLoginData() {
    console.log("Saving loggedIn:", loggedIn); // DEBUG

    let loggedInStatus = JSON.stringify(loggedIn);
    localStorage.setItem("loggedIn", loggedInStatus);

    let localUserLoginData = JSON.stringify(userLoginData);
    localStorage.setItem("userLoginData", localUserLoginData);

    let timestampOutData = JSON.stringify(timestampOut);
    localStorage.setItem("timestampOut", timestampOutData);

    let timestampInData = JSON.stringify(timestampIn);
    localStorage.setItem("timestampIn", timestampInData);
}


function loadUserLoginData() {
    let localUserLoginData = localStorage.getItem("userLoginData");
    const loggedInStatus = localStorage.getItem("loggedIn");

    if (localUserLoginData) {
        userLoginData = JSON.parse(localUserLoginData);
    }

    if (loggedInStatus) {
        loggedIn = JSON.parse(loggedInStatus);
    }

    console.log("Loaded loggedIn:", loggedIn); // DEBUG
}


// Listen for page show event to handle refresh
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        loadUserLoginData();
    }
    setTimestempIn();
});


window.addEventListener("beforeunload", function () {
    setTimestempOut();
});


function setTimestempOut() {
    timestampOut = Date.now(); 
    saveUserLoginData();
}


function setTimestempIn() {
    timestampIn = Date.now(); 
    saveUserLoginData();
    compareTimeStamps();
}


function compareTimeStamps() {
    if (timestampOut && timestampIn)
        if (timestampOut + 1000 > timestampIn) {
            console.log("same session:", timestampOut + 100, timestampIn);        
        } else {
            console.log("new session");
            loggedIn = false;
            localStorage.setItem("loggedIn", false);
        }
}


// #region : sign-up feature
function checkUserInput(event) {
    event.preventDefault();

    const checkbox = document.querySelector(".signup-card-checkbox input[type='checkbox']");

    if (checkbox.checked) {
        checkIfMailIstaken();
    } 
}


function checkIfMailIstaken() {
    let localUserLoginData = localStorage.getItem("userLoginData");
    const inputMail = document.getElementById("mailInput").value;

    if (localUserLoginData) {
        let parsedUserLoginData = JSON.parse(localUserLoginData);
        let mailTaken = false;
        console.log("in");

        for (let i = 0; i < parsedUserLoginData.length; i++) {
            if (inputMail === parsedUserLoginData[i].mail) {
                alert("This mail is already registered.");
                mailTaken = true;
            }
        }
        if (!mailTaken) {
            checkIfPassordIsTheSame(inputMail)
        }
    }
}


function checkIfPassordIsTheSame(inputMail) {
    const inputName = document.getElementById("nameInput").value;
    const inputPassword = document.getElementById("passwordInput").value;
    const inputConfirmPassword = document.getElementById("confirmPasswordInput").value;

    if (inputPassword === inputConfirmPassword) {
        const newUserData = {
            name: inputName,
            mail: inputMail,
            password: inputPassword,
            remberMeChecked: "false"
        }
        userLoginData.push(newUserData);
        saveUserLoginData();
        loadLoginPage();
    } else {
        alert("The password and the confirmed password are not the same. Please use the same password for both input fields.");
    }
}


function loadLoginPage() {
    window.location = "login.html";
}
// #endregion : sign-up feature


// #region : log-in feature
function checkIfMailIsRegitered(event) {
    event.preventDefault();

    let mailInput = document.querySelector(".email-input").value;
    let passwordInput = document.querySelector(".password-input").value;

    if (mailInput && passwordInput) {
        let mailRegistered = false;
        let savedPassword;

        for (let i = 0; i < userLoginData.length; i++) {
            if (mailInput === userLoginData[i].mail) {
                mailRegistered = true;
                savedPassword = userLoginData[i].password;
            }
        }
        if (mailRegistered) {
            checkIfPasswordIsCorrect(passwordInput, savedPassword);
        } else {
            alert("There is no account with this eamial adress yet. Check your input for typos or concider creating a new Account.")
        }
    }
}


function checkIfPasswordIsCorrect(passwordInput, savedPassword) {
    if(savedPassword == passwordInput) {
        const remberMeCheckbox = document.querySelector(".login-card-checkbox input[type='checkbox']");

        if (remberMeCheckbox.checked) {
            console.log("Setting loggedIn to true"); // DEBUG
            rememberMeChecked = true;
            console.log("worked!");
        } 
        loggedIn = true;
        saveUserLoginData();
        console.log(loggedIn);
        setTimestempOut();
        window.location = "contacts.html";
    } else {
        alert("Either the password and/or the email adress is incorrect! Please try again.");
    }
}
// #endregion : log-in feature
