const loginWarning = document.querySelector('#loginWarning');
const loginNameDOM = document.querySelector('#loginName');
const loginPasswordDOM = document.querySelector('#loginPassword');

let token;
let loggedInUser;

function logIn() {
    let credentials = {
        name: loginNameDOM.value.trim(),
        password: loginPasswordDOM.value.trim()
    }
    if (credentials.name.length == 0 || credentials.password.length == 0) loginWarning.textContent = 'Empty fields'
    else {
        postRequest(LOGIN_URL, credentials).then((response) => {
            if (response.user != undefined) {
                token = response.token;
                window.localStorage.setItem('token', token);
                loggedInUser = response.user;
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                location.assign("http://localhost:5500/employees-dashboard/employees-dashboard/home.html");
            }
            else loginWarning.textContent = response;
        })
    }
}