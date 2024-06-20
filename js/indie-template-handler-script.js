function handleTemplates() {
    adjustStatusBar();
    adjustNavBar();
}


function adjustStatusBar() {
    if (window.location.href.includes("indie")) {
        console.log("The URL contains the word 'indie'.");
    } else {
        console.log("The URL does not contain the word 'indie'.");
    }
}


function adjustNavBar() {
    if (window.location.href.includes("indie")) {
        console.log("The URL contains the word 'indie'.");
    } else {
        console.log("The URL does not contain the word 'indie'.");
    }
}