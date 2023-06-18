const table = document.querySelector('.table');
const tableBody = table.tBodies[0];
const edit = document.querySelector('.edit');
const refreshButton = document.querySelector('.refresh');
const deleteUserDialog = document.querySelector('#deleteUserDialog');
const createUpdateDialog = document.querySelector('#createUpdateDialog');
const closeBtns = document.querySelectorAll('.close');
const deleteBtn = document.querySelector('.delete-btn');
const createUpdateBtn = document.querySelector('.create-update-btn');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const warning = createUpdateDialog.querySelector('.warning');
const title = createUpdateDialog.querySelector('.title');
const select = document.querySelector('.select');
const tableHeaders = document.querySelectorAll('.sort');
const spanPicture = document.querySelector('.span-picture');
const spanStatus = document.querySelector('.span-status');
const form = document.querySelector('#form');
const inputFields = Array.from(form.getElementsByTagName('input'));
const categories = Array.from(tableHeaders);
let initialRows;
let updates = [];
let deletes = [];
let updatedPicture;
let updatedStatus;
let inputName;
let inputAge;
let inputPosition;
let inputGender;
let inputDate;
let inputPassword;
let inputConfirm;
let inputAdmin;

let userToDelete;
let rowToDelete;
let initialUser;
let rowToUpdate;

insertTable();

closeDialog(deleteUserDialog, closeBtns[0]);
closeDialog(deleteUserDialog, cancelBtns[0]);
closeDialog(createUpdateDialog, closeBtns[1]);
closeDialog(createUpdateDialog, cancelBtns[1]);

add.addEventListener('click', () => {
    add.classList.add('filter-darkblue-to-red');
    title.textContent = 'Create User';
    createUpdateBtn.textContent = 'Create';
    spanPicture.style.display = 'none';
    spanStatus.style.display = 'none';
    reinitialize();
    inputDate.value = fetchDate();
    createUpdateDialog.showModal();
});

edit.addEventListener('click', () => {
    edit.classList.toggle('filter-darkblue-to-red');
    if (edit.classList.contains('filter-darkblue-to-red')) {
        deletes.forEach(del => del.style.visibility = 'visible');
        updates.forEach(update => update.style.visibility = 'visible');
    }
    else {
        deletes.forEach(del => del.style.visibility = 'hidden');
        updates.forEach(update => update.style.visibility = 'hidden');
    }
});

refreshButton.addEventListener('click', () => {
    add.classList.remove('filter-darkblue-to-red');
    edit.classList.remove('filter-darkblue-to-red');
    insertTable(USERS_URL);
});

function closeDialog(dialog, button) {
    button.addEventListener('click', () => {
        add.classList.remove('filter-darkblue-to-red');
        warning.textContent = '';
        dialog.close();
    })
}



categories.forEach(category => {
    let option = document.createElement('option');
    option.innerHTML = category.innerHTML;
    select.appendChild(option);
})

function insertTable() {
    deleteTable();
    getUsers(USERS_URL).then(() => { for (let user of users) createRow(user) }).catch(() => location.assign("http://localhost:5500/employees-dashboard/employees-dashboard/index.html"))
}

function createRow(element) {
    let row = tableBody.insertRow(0);
    let cellPicture = row.insertCell(0);
    cellPicture.innerHTML = '<img src="images/profile.svg" alt="profile" class="center user-select filter-white-to-grey big">';
    cellPicture.classList.add('picture');

    let cellStatus = row.insertCell(1);
    cellStatus.innerHTML = '<input type="checkbox" class="checkbox" disabled="true">';
    let checkbox = cellStatus.querySelector('.checkbox')
    cellStatus.classList.add('status');
    checkbox.checked = element.status ? true : false;

    let cellName = row.insertCell(2);
    cellName.textContent = element.name;
    cellName.classList.add('name');

    let cellAge = row.insertCell(3);
    cellAge.textContent = element.age;
    cellAge.classList.add('age');

    let cellPosition = row.insertCell(4);
    cellPosition.textContent = element.position;
    cellPosition.classList.add('position');

    let cellGender = row.insertCell(5);
    cellGender.textContent = element.gender;
    cellGender.classList.add('gender');

    let cellDate = row.insertCell(6);
    cellDate.textContent = element.date;
    cellDate.classList.add('date');

    let cellLast = row.insertCell(7);
    cellLast.classList.add('last');
    cellLast.innerHTML = `
        <img src="images/update.svg" onclick="showUpdateUserDialog(this)" alt="update" class="update user-select">
        <img src="images/delete.svg" onclick="showDeleteUserDialog(this)" alt="delete" class="delete user-select">`;

    initialRows = Array.from(tableBody.querySelectorAll('tr'));
    let updateIcon = document.querySelector('.update');
    let deleteIcon = document.querySelector('.delete');
    updates.push(updateIcon);
    deletes.push(deleteIcon);
    if (edit.classList.contains('filter-darkblue-to-red')) {
        deleteIcon.style.visibility = 'visible';
        updateIcon.style.visibility = 'visible';
    }
}


function showDeleteUserDialog(button) {
    let account = document.querySelector('.account');
    rowToDelete = button.parentElement.parentElement;
    let name = button.parentElement.parentElement.children[2].textContent;
    userToDelete = findUserByName(name);
    account.innerHTML = `Are you sure do you want to delete <b class="red">${name} </b>'s account?`;
    deleteUserDialog.showModal();
}

function showUpdateUserDialog(button) {
    let name = button.parentElement.parentElement.children[2].textContent;
    rowToUpdate = button.parentElement.parentElement;
    initialUser = findUserByName(name);
    if (initialUser != undefined) {
        delete initialUser["updated_at"];
        initialUser.status = Boolean(initialUser.status);
        initialUser.admin = Boolean(initialUser.admin);
    }
    title.textContent = 'Update User';
    createUpdateBtn.textContent = 'Update';
    spanPicture.style.display = '';
    spanStatus.style.display = '';
    getInputs();
    let picture = button.parentElement.parentElement.children[0];
    updatedPicture.innerHTML = picture.innerHTML;
    let profilePic = updatedPicture.querySelector('.center.user-select');
    profilePic.classList.add('bigger');
    updatedStatus.checked = initialUser.status;
    inputName.value = initialUser.name;
    inputAge.value = initialUser.age;
    inputPosition.value = initialUser.position;
    inputDate.value = initialUser.date;
    inputPassword.value = inputConfirmPassword.value = initialUser.password;
    initialUser.gender == 'male' ? inputGender[0].checked = true : inputGender[1].checked = true;
    initialUser.admin == 'male' ? inputAdmin[0].checked = true : inputAdmin[1].checked = true;
    createUpdateDialog.showModal();
}

function fetchDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getInputs() {
    updatedPicture = document.querySelector('#update-picture');
    updatedStatus = document.querySelector('#update-status');
    inputName = document.querySelector('#name');
    inputAge = document.querySelector('#age');
    inputPosition = document.querySelector('#position');
    inputGender = document.querySelectorAll('.gender-radio');
    inputDate = document.querySelector('#date');
    inputPassword = document.querySelector('#password');
    inputConfirmPassword = document.querySelector('#confirm-password');
    inputAdmin = document.querySelectorAll('.admin-radio');
}

function reinitialize() {
    getInputs();
    inputName.value = '';
    inputAge.value = '';
    inputPosition.value = '';
    inputGender.value = '';
    inputDate.value = '';
    inputPassword.value = '';
    inputConfirmPassword.value = '';
    inputAdmin.value = '';
}

document.addEventListener('keyup', (e) => { if (e.key == 'Escape') add.classList.remove('filter-darkblue-to-red') });
deleteBtn.addEventListener('click', () => {
    deleteUser(USERS_URL, userToDelete.id);
    tableBody.removeChild(rowToDelete);
    deleteUserDialog.close();
})
inputFields.forEach(input => input.addEventListener('keyup', () => warning.textContent = ''));
createUpdateBtn.addEventListener('click', () => {
    warning.textContent = '';
    createUpdateBtn.textContent == 'Create' ? create() : update();
});
function findUserByName(name) { return users.find(user => user.name === name) };
function deleteTable() { while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild) };