fetch('https://jsonplaceholder.typicode.com/users')
    .then(showSpinner())
    .then(response => response.json())
    .then(json => {
        let li = '';

        json.forEach(user => {
            li += `<div id='${user.id}a'>
                <span id='${user.id}'>${user.name}</span>
                <button onclick="editUser('${user.name}', ${user.id})">Edit</button>
                <button onclick='deleteUser(${user.id})'>Delete</button>
            </div>`;
        });
        setTimeout(hideSpinner, timeSetTimeout)

        document.getElementById('users').innerHTML = li;

    });

let timeSetTimeout = 300;
function editUser(userName, id) {
    let name = prompt('Change your name:', `${userName}`);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            name: name
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(showSpinner())
        .then((response) => response.json())
    setTimeout(hideSpinner, timeSetTimeout)
    document.getElementById(`${id}`).innerText = name

}

function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    })
        .then(showSpinner())

    document.getElementById(`${id}a`).remove()
    setTimeout(hideSpinner, timeSetTimeout)
}


function showSpinner() {
    document.getElementById('spinner').style.display = 'block'
}

function hideSpinner() {
    document.getElementById('spinner').style.display = 'none'
}