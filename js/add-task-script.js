

// filter dropdown funktion
function filterDropdown() {
    let input = document.getElementById("dropdown");
    let filter = input.value.toLowerCase();
    let div = document.getElementById("dropdownContent");
    let a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


// dropdown funktion
document.addEventListener("DOMContentLoaded", function () {
    let dropdownButton = document.querySelector(".dropbtn");
    dropdownButton.addEventListener("click", function () {
        document.getElementById("dropdownContent").classList.toggle("show");
    });

    let categoryDropdownButton = document.querySelector("#dropdownCategoryButton");
    categoryDropdownButton.addEventListener("click", function () {
        document.getElementById("dropdownCategoryContent").classList.toggle("show");
    });

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-checkbox') && !event.target.closest('.dropdown-item')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    let checkboxes = document.querySelectorAll('.dropdown-checkbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateSelectedInitials();
        });
    });
});



// anzeigen der auswahl
function updateSelectedInitials() {
    let selectedInitialsContainer = document.getElementById('selected-initials');
    selectedInitialsContainer.innerHTML = '';
    let checkboxes = document.querySelectorAll('.dropdown-checkbox:checked');
    checkboxes.forEach(function(checkbox) {
        let initials = checkbox.getAttribute('data-initials');
        let initialsDiv = document.createElement('div');
        initialsDiv.className = 'selected-initials-item';
        initialsDiv.innerText = initials;
        selectedInitialsContainer.appendChild(initialsDiv);
    });
}

//ausgewählte kategorie anzeigen im dropdown div
function selectCategory(category) {
    let categoryDropdownButton = document.getElementById("dropdownCategoryButton");
    categoryDropdownButton.innerHTML = category;
    document.getElementById("dropdownCategoryContent").classList.remove("show");
}