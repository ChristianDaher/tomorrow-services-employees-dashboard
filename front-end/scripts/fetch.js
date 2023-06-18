const URL = 'http://127.0.0.1:8000/api';
const USERS_URL = URL + '/users';
const LOGIN_URL = URL + '/login';
let users;

async function getUsers(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    users = await data.data;
    return users;
}

async function postRequest(url, input) { //used for register // login // logout
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    })
    let data = await response.json();
    return data
}

async function deleteUser(url, id) {
    url = url + `/${id}`
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    })
    let data = await response.json();
    return data.data
}

async function updateUser(url, input, id) {
    url = url + `/${id}`
    let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    })
    let data = await response.json();
    return data.data
}

async function getUser(url, id) {
    url = url + `/${id}`
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    return data.data;
}