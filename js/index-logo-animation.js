function animateLogo() {
    const logo = document.getElementById("logo");
    logo.addEventListener("animationend", function() {
        window.location.href = "login.html";
    });
}