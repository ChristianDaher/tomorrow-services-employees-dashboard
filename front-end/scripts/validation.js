const INPUT_REGEX = /^[ a-zA-Z\-\'\.]{0,70}$/;
const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

function create() {
    inputName.value = checkName(inputName.value);
    if (findUserByName(inputName.value) != undefined) warning.textContent = 'Name already exists';
    let permission = checkInputs();
    let user = {
        status: false,
        name: inputName.value,
        age: inputAge.value,
        position: inputPosition.value,
        gender: isChecked(inputGender),
        date: inputDate.value,
        password: inputPassword.value,
        admin: adminIsChecked()
    }
    if (permission) {
        createUpdateDialog.close();
        add.classList.remove('filter-darkblue-to-red');
        console.log(users)
        postRequest(USERS_URL, user)
            .then((response) => {
                users.push(response.user)
            })
            .then(() => console.log(users))
        createRow(user);
    }
}

function update() {
    inputName.value = checkName(inputName.value);
    if (findUserByName(inputName.value) != undefined && inputName.value != initialUser.name) warning.textContent = 'Name already exists';
    let permission = checkInputs();
    let newUser = {
        id: initialUser.id,
        status: updatedStatus.checked,
        name: inputName.value,
        age: inputAge.value,
        position: inputPosition.value,
        gender: isChecked(inputGender),
        date: inputDate.value,
        admin: adminIsChecked(),
        password: inputPassword.value,
        created_at: initialUser.created_at
    }
    if (JSON.stringify(initialUser) != JSON.stringify(newUser) && permission) {
        createUpdateDialog.close();
        updateUser(USERS_URL, newUser, newUser.id)
            .then((updatedUser) => {
                let index = users.findIndex(user => user.id === updatedUser.id);
                users[index] = updatedUser;
            })
        tableBody.removeChild(rowToUpdate);
        createRow(newUser);
    }
    else if (JSON.stringify(initialUser) == JSON.stringify(newUser)) warning.textContent = 'Nothing to change';
}

function checkInputs() {
    inputName.value = checkName(inputName.value);
    if (isEmpty(inputName.value)) return false;
    inputAge.value = checkAge(inputAge.value);
    if (isEmpty(inputAge.value)) return false;
    inputPosition.value = checkPosition(inputPosition.value);
    if (isEmpty(inputPosition.value)) return false;
    inputDate.value = checkDate(inputDate.value);
    if (isEmpty(inputDate.value)) return false;
    inputPassword.value = checkPassword(inputPassword.value);
    if (isEmpty(inputPassword.value)) {
        inputConfirmPassword.value = '';
        return false;
    }
    inputConfirmPassword.value = matchPassword(inputConfirmPassword.value);
    if (isEmpty(inputConfirmPassword.value)) return false;
    return (warning.textContent.length == 0);
}

function checkName(input) {
    value = input.trim();
    value = value.replace(/  +/g, ' ');

    let regexedValue = INPUT_REGEX.exec(value);
    if (regexedValue == null || isEmpty(value)) {
        warning.textContent = 'Invalid name';
        return '';
    }
    else {
        let words = regexedValue[0].split(' ');
        return camelCase(words);
    }
}

function checkAge(input) {
    if (isEmpty(input)) {
        warning.textContent = 'Empty age';
        return '';
    }
    else if (Number(input) < 16 || Number(input) > 99) {
        warning.textContent = 'Invalid age';
        return '';
    }
    else return Number(input);
}

function checkPosition(input) {
    value = input.trim();
    value = value.replace(/  +/g, ' ');

    let regexedValue = INPUT_REGEX.exec(value);
    if (regexedValue == null) {
        warning.textContent = 'Invalid position';
        return '';
    } else if (isEmpty(value)) {
        warning.textContent = 'Empty position';
        return '';
    }
    else {
        let words = regexedValue[0].split(' ');
        return camelCase(words);
    }
}

function checkDate(input) {
    let regexedValue = DATE_REGEX.exec(input);
    if (isEmpty(input)) {
        warning.textContent = 'Empty date';
        return '';
    }
    else if (regexedValue == null || regexedValue[1] > 2023 || regexedValue[1] < 2018) {
        warning.textContent = 'Invalid date';
        return '';
    }
    return regexedValue[0];
}

function checkPassword(input) {
    if (isEmpty(input)) {
        warning.textContent = 'Empty password';
        return '';
    }
    else if (input.length > 0 && input.length < 8) {
        warning.textContent = 'Password too short';
        return '';
    }
    else if (input.length > 24) {
        warning.textContent = 'Password too long';
        return '';
    }
    else return input;
}

function matchPassword(input) {
    if (input == inputPassword.value) return input;
    else {
        warning.textContent = "Passwords don't match";
        return '';
    }
}

function isChecked(radioButtons) { for (let radioButton of radioButtons) if (radioButton.checked) return radioButton.value; }
function adminIsChecked() {
    let boolean = isChecked(inputAdmin);
    return (boolean == 'true');
}

function camelCase(array) {
    let camelCaseWords = array.map(element => {
        element = element.toLowerCase();
        element = element.replace(/\-[a-z]/g, match => match.toUpperCase());
        return element[0].toUpperCase() + element.substring(1);
    })
    return camelCaseWords.join(' ');
}

function isEmpty(value) { return (value.trim().length == 0) }