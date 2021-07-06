let socket = new WebSocket('ws://localhost:8080')

let userName = prompt('Enter your login:', 'user')


let inputText = document.getElementById('messageText')


function sendMessage() {
    let messageObj = {
        login: userName,
        text: inputText.value,
        time: new Date().toLocaleTimeString()
    }

    let outgoingMessage = showMessage(messageObj)
    outgoingMessage.className = 'outgoing-message'

    socket.send(JSON.stringify(messageObj));

    document.getElementById('messageText').value = ''
}

socket.onmessage = function (event) {
    console.log(event)
    let incomingData = JSON.parse(event.data);

    let obj = {
        login: incomingData.login,
        time: incomingData.time,
        text: incomingData.text
    }

    let incomingMessage = showMessage(obj)
    incomingMessage.className = 'incoming-message'
}

function showMessage(message) {

    let messageElem = document.createElement('div');
    let loginElem = document.createElement('div');
    loginElem.innerText = message.login
    loginElem.className = 'login'
    messageElem.appendChild(loginElem)

    let textElem = document.createElement('div');
    textElem.innerText = message.text
    textElem.className = 'text-message'
    messageElem.appendChild(textElem)

    let timeElem = document.createElement('div');
    timeElem.innerText = message.time
    timeElem.className = 'time'
    messageElem.appendChild(timeElem)

    let node = document.getElementById('messages').appendChild(messageElem)

    return node
}