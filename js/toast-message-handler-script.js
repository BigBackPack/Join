const toastMessage = document.getElementById("toast-message");


function showToastMessage(message) {
    toastMessage.style.display = "flex";
    toastMessage.innerHTML = message;

    setTimeout(hideToastMessage, 2000);
}


function hideToastMessage() {
    toastMessage.style.display = "none";
    toastMessage.innerHTML = "...";
}