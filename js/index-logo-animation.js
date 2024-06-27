function animateLogo() {
    const darkLogoContainer = document.getElementById('logo-dark');
    const brightLogoContainer = document.getElementById('logo-bright'); 
    const darkLogo = document.getElementById('dark-logo'); 
    const brightLogo = document.getElementById('bright-logo'); 

    if (window.innerWidth > 800) {
        darkLogoContainer.style.display = 'flex';
        brightLogoContainer.style.display = 'none';
        darkLogo.style.display = 'block';
        darkLogo.style.animation = 'moveLogo-dark 0.8s forwards linear';
    } else {
        darkLogoContainer.style.display = 'none';
        brightLogoContainer.style.display = 'flex';
        brightLogo.style.display = 'block';
        brightLogo.style.animation = 'moveLogo-bright 0.8s forwards linear';
        brightLogo.addEventListener('animationend', swapLogo);
    }
    transitionToLogin();
}


function swapLogo() {
    const brightLogo = document.getElementById('bright-logo'); 
    const blueBG = document.querySelector(".blue-bg"); 

    // Change the src of the bright logo to the dark logo
    brightLogo.src = '../img/join_logo_dark.svg'; 
    brightLogo.alt = 'Dark Logo';

    // Remove the animation class and styles
    brightLogo.style.animation = 'none';
    brightLogo.style.transition = 'none';
    blueBG.style.display = 'none';

    // Position the dark logo exactly where the bright logo ended
    brightLogo.style.top = '80px';
    brightLogo.style.left = '80px';
    brightLogo.style.height = '100px';
    brightLogo.style.width = 'auto';
}


function transitionToLogin() {
    const logo = document.getElementById("logo-dark");
    logo.addEventListener("animationend", function() {
        window.location.href = "login.html";
    });

    const logoBright = document.getElementById("logo-bright");
    logoBright.addEventListener("animationend", function() {
        window.location.href = "login.html";
    });
}


window.addEventListener('resize', animateLogo); // Re-run animation on resize
window.addEventListener('load', animateLogo); // Run animation on page load