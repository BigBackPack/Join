

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
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            updateSelectedInitials();
        });
    });
});


function updateSelectedInitials() {
    let selectedInitialsContainer = document.getElementById('selected-initials');
    selectedInitialsContainer.innerHTML = '';
    let checkboxes = document.querySelectorAll('.dropdown-checkbox:checked');
    checkboxes.forEach(function (checkbox) {
        let initials = checkbox.getAttribute('data-initials');
        let initialsDiv = document.createElement('div');
        initialsDiv.className = 'selected-initials-item';
        initialsDiv.innerText = initials;
        selectedInitialsContainer.appendChild(initialsDiv);
    });
}


function selectCategory(category) {
    let categoryDropdownButton = document.getElementById("dropdownCategoryButton");
    categoryDropdownButton.innerHTML = category;
    document.getElementById("dropdownCategoryContent").classList.remove("show");
}


function showIcons() {
    document.getElementById("plus-icon").classList.add("hidden");
    document.getElementById("x-icon").classList.remove("hidden");
    document.getElementById("tick-icon").classList.remove("hidden");
}


function hideIconsIfEmpty() {
    let input = document.getElementById("toggleInput");
    if (input.value === "") {
        document.getElementById("plus-icon").classList.remove("hidden");
        document.getElementById("x-icon").classList.add("hidden");
        document.getElementById("tick-icon").classList.add("hidden");
    }
}


function focusInput() {
    document.getElementById("toggleInput").focus();
}


function clearInput() {
    let input = document.getElementById("toggleInput");
    input.value = "";
    input.focus();
}


function displayText() {
    let input = document.getElementById("toggleInput");
    let textList = document.getElementById("textList");
    if (input.value !== "") {
        let newItem = document.createElement("li");
        newItem.innerHTML = `
            <span class="item-text">${input.value}</span>
            <div class="feature-icons">
                <span class="edit-icon" onclick="editItem(this)"><img  src="/img/edit_icon.svg"></span>
                <div class="separator-list"></div>
                <span class="delete-icon" onclick="removeItem(this)"><img  src="/img/delete_icon.svg"></span>
            </div>
        `;
        textList.appendChild(newItem);
        input.value = "";
        hideIconsIfEmpty();
    }
}


function editItem(element) {
    let listItem = element.closest('li');
    let currentText = listItem.querySelector('.item-text').textContent.trim();
    listItem.innerHTML = `
        <div class="edit-container">
            <input type="text" class="edit-input" value="${currentText}" onblur="saveEdit(this)">
            <div class="feature-icons">
                <span class="edit-icon" onclick="saveEdit(this)"><img src="/img/check_black_icon.svg"></span>
                <div class="separator-list"></div>
                <span class="delete-icon" onclick="removeItem(this)"><img src="/img/delete_icon.svg"></span>
            </div>
        </div>
    `;
    listItem.querySelector('.edit-input').focus();
}


function saveEdit(element) {
    let listItem = element.closest('li');
    let newText = element.value;
    listItem.innerHTML = `
        <span class="item-text">${newText}</span>
        <div class="feature-icons">
            <span class="edit-icon" onclick="editItem(this)"><img  src="/img/edit_icon.svg"></span>
            <div class="separator-list"></div>
            <span class="delete-icon" onclick="removeItem(this)"><img  src="/img/delete_icon.svg"></span>
        </div>
    `;
}


function removeItem(element) {
    element.closest('li').remove();
}