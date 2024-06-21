let remberMeChecked = false;
let loggedIn = false;
let policyAccepted = false;


let userLoginData = [];


function init() {
    if (localStorage.getItem("userLoginData") == null) {
        saveUserLoginData();
    }
    loadUserLoginData();
    console.log(userLoginData);

    if (window.location.href.includes("signup")) {
        document.getElementById('signup-form').addEventListener('submit', checkUserInput);
    } else if (window.location.href.includes("login")) {
        document.getElementById('login-form').addEventListener('submit', checkIfMailIsRegitered);
    }
}


function saveUserLoginData() {
    let loggedInStatus = JSON.stringify(loggedIn);
    localStorage.setItem("loggedIn", loggedInStatus);

    let localUserLoginData = JSON.stringify(userLoginData);
    localStorage.setItem("userLoginData", localUserLoginData);
}


function loadUserLoginData() {
    let localUserLoginData = localStorage.getItem("userLoginData");
    if (localUserLoginData) {
        userLoginData = JSON.parse(localUserLoginData);
    }
}


// #region : creating new user login data
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
// #endregion : creating new user login data


// #region : login feature
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
        window.location = "summary.html";
    } else {
        alert("Either the password and/or the email adress is incorrect! Please try again.");
    }

}

// #endregion : login feature
