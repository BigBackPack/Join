let rememberMeChecked = false;
let rememberedUserMail;
let rememberedUserPsw;
let rememberedUserName;

let loggedIn = false;
let policyAccepted = false;

let timestampOut;
let timestampIn;

let userLoginData = [];


function init() {
    if (localStorage.getItem("userLoginData") == null) {
        saveUserLoginData();
    }
    loadUserLoginData();

    if (window.location.href.includes("signup")) {
        document.getElementById('signup-form').addEventListener('submit', checkUserInput);
    } else if (window.location.href.includes("login")) {
        document.getElementById('login-form').addEventListener('submit', checkIfMailIsRegitered);
        checkIfRemembeMeState();
    }

    timestampOutData = localStorage.getItem("timestampOut");
    timestampOut = Number(timestampOutData);
}


function saveUserLoginData() {
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
        if (timestampOut + 1000 < timestampIn) {
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
    const inputName = document.getElementById("nameInput").value.trim();
    const inputPassword = document.getElementById("passwordInput").value.trim();
    const inputConfirmPassword = document.getElementById("confirmPasswordInput").value.trim();

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


// handle sign-up button activation
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('nameInput');
    const mailInput = document.getElementById('mailInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const checkbox = document.querySelector('.signup-card-checkbox input[type="checkbox"]');
    const submitButton = document.getElementById("sign-up-btn");

    if (submitButton) {
        submitButton.style.backgroundColor = "var(--mainColorInactive)";
    }

    function validateForm() {
        if (nameInput.value 
            && mailInput.value 
            && passwordInput.value 
            && confirmPasswordInput.value 
            && checkbox.checked) {
                submitButton.style.backgroundColor = "var(--mainColor)";
        } else {
            submitButton.style.backgroundColor = "var(--mainColorInactive)";
        }
    }

    if (submitButton) {
        nameInput.addEventListener('input', validateForm);
        mailInput.addEventListener('input', validateForm);
        passwordInput.addEventListener('input', validateForm);
        confirmPasswordInput.addEventListener('input', validateForm);
        checkbox.addEventListener('change', validateForm);
    }
});
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

                updateTemopraryUserData(i);
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
        loggedIn = true;
        saveUserLoginData();
        setTimestempOut();
        window.location = "summary.html";
    } else {
        alert("Either the password and/or the email adress is incorrect! Please try again.");
    }
}


function updateTemopraryUserData(i) {
    rememberedUserMail = userLoginData[i].mail;
    rememberedUserName = userLoginData[i].name;
    rememberedUserPsw = userLoginData[i].password;

    let temporaryMail = JSON.stringify(rememberedUserMail);
    localStorage.setItem("rememberedUserMail", temporaryMail);
    
    let temporaryName = JSON.stringify(rememberedUserName);
    localStorage.setItem("rememberedUserName", temporaryName);

    let temporaryPsw = JSON.stringify(rememberedUserPsw);
    localStorage.setItem("rememberedUserPsw", temporaryPsw);
}


function checkIfRemembeMeState() {
    let localRememberMeCheck = localStorage.getItem("rememberMeChecked");

    if (localRememberMeCheck) {
        rememberMeChecked = localRememberMeCheck;
    }

    rememberedLogin()
}


function rememberedLogin() {
    const remberedUser = localStorage.getItem("rememberMeChecked");
    const remberedUserMail = localStorage.getItem("rememberedUserMail");
    const remberedUserName = localStorage.getItem("rememberedUserName");
    const rememberedUserPsw = localStorage.getItem("rememberedUserPsw");

    if (remberedUser == "true" && remberedUserName != "Guest") {
        document.getElementById("rememberMeCheckbox").checked = true;
        localStorage.setItem("rememberMeChecked", true);
        document.querySelector(".email-input").value = remberedUserMail.replace(/["']/g, '');
        document.querySelector(".password-input").value = rememberedUserPsw.replace(/["']/g, '');
    } else if (remberedUser == "false" && remberedUserName == "Guest")  {
        alert("the last user was a Guest user. There are no login data saved.")
    }
}


function rememberMe() {
    if (rememberMeChecked == "true") {
        rememberMeChecked = false;
        localStorage.setItem("rememberMeChecked", false);
    } else if (rememberMeChecked == "false") {
        rememberMeChecked = true;
        localStorage.setItem("rememberMeChecked", true);
        localStorage.setItem("rememberedUserPsw", rememberedUserPsw);
    }
}
// #endregion : log-in feature


// #region : guest login feature
function guestLogin(event) {
    event.preventDefault();
    loggedIn = true;

    localStorage.setItem("rememberedUserName", "Guest");
    setTimestempOut();
    window.location = "summary.html";
}
// #endregion : guest login featur