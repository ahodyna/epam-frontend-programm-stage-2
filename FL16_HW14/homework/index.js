const tableState = [
    [{ text: 'Cell', type: 'white' }, { text: 'Cell', type: 'white' }, { text: 'Cell', type: 'white' }],
    [{ text: 'Cell', type: 'white' }, { text: 'Special Cell', type: 'white' }, { text: 'Cell', type: 'white' }],
    [{ text: 'Cell', type: 'white' }, { text: 'Cell', type: 'white' }, { text: 'Cell', type: 'white' }]
]

const table = document.getElementById('table');

function createCell(i, j, text, typeClass) {
    let cell = document.createElement('td');
    cell.innerText = text;
    cell.className = typeClass;
    cell.onclick = () => {
        onCellClick(i, j)
    };
    return cell;
}

function onCellClick(i, j) {
    const cellsRow = 3;
    if (i === 0 && j === 0) {
        if (tableState[i][j].type === 'blue') {
            tableState[i][j].type = 'yellow'
        } else {
            if (tableState[i][j].type === 'white') {
                for (let k = 0; k < cellsRow; k++) {
                    if (tableState[0][k].type === 'white') {
                        tableState[0][k].type = 'blue'
                    }

                }
            }
        }
    } else if (i === 1 && j === 1) {
        for (let i = 0; i < tableState.length; i++) {
            for (let j = 0; j < tableState[i].length; j++) {
                if (tableState[i][j].type === 'white') {
                    tableState[i][j].type = 'yellow'
                }
            }
        }
    } else {
        if (tableState[i][j].type === 'white') {
            tableState[i][j].type = 'yellow';
        } else if (tableState[i][j].type === 'blue') {
            tableState[i][j].type = 'yellow';
        }
    }
    drawTable()
}

function drawTable() {
    table.innerHTML = ''
    for (let i = 0; i < tableState.length; i++) {
        const trFirstRow = document.createElement('tr');
        table.appendChild(trFirstRow);

        for (let j = 0; j < tableState[i].length; j++) {
            let tdFirstRowF = createCell(i, j, tableState[i][j].text, tableState[i][j].type);
            trFirstRow.appendChild(tdFirstRowF);
        }
    }
}
drawTable();

const numberRegex = /^\+380\d{9}$/

document.getElementById('input').addEventListener('keyup', () => {
    const inputValue = document.getElementById('input').value;
    if (numberRegex.test(inputValue)) {
        let placeNotification = document.getElementById('notification');
        placeNotification.innerText = 'Data was successfully sent';
        placeNotification.className = 'greenNotification';
        let input = document.getElementById('input');
        input.className = 'input';
        document.getElementById('button').disabled = false;
    } else {
        let placeNotification = document.getElementById('notification');
        placeNotification.innerText = 'Type number does not follow format +380*********';
        placeNotification.className = 'redNotification';
        let input = document.getElementById('input');
        input.className = 'redBorder';
        document.getElementById('button').disabled = true;
    }
})

const two = 2;

let ball = document.getElementById('ball');
let basketballField = document.getElementById('field')

function getBallCenter() {
    ball.style.left = Math.round(basketballField.clientWidth / two - ball.offsetWidth / two) + 'px'
    ball.style.top = Math.round(basketballField.clientHeight / two - ball.offsetHeight / two) + 'px'
}
getBallCenter()

function createGoalEvent(teamName) {
    return new CustomEvent('goal', {
        bubbles: true, cancelable: false, composed: false,
        detail: { 'teamName': teamName }
    })
}

const basket1Element = document.getElementById('basket1')
basket1Element.addEventListener('click', () => {
    basket1Element.dispatchEvent(createGoalEvent('teamA'))
})

const basket2Element = document.getElementById('basket2')
basket2Element.addEventListener('click', () => {
    basket2Element.dispatchEvent(createGoalEvent('teamB'))
})

document.getElementById('generalDivTask3').addEventListener('goal', (event) => {
    let count = Number(document.getElementById(event.detail.teamName).innerHTML)
    document.getElementById(event.detail.teamName).innerText = count + 1;
    const gameResult = document.getElementById('gameResult')
    if (event.detail.teamName === 'teamA') {
        gameResult.className = 'red'
        gameResult.innerHTML = 'Team A score!'
    } else {
        gameResult.className = 'blue'
        gameResult.innerHTML = 'Team B score!'
    }
     const interval = 3000;
    setTimeout(() => {
        document.getElementById('gameResult').innerHTML = '';
        getBallCenter()
    }, interval)
})

basketballField.onclick = function (event) {
    let fieldCoords = this.getBoundingClientRect();
    let ballCoords = {
        top: event.clientY - fieldCoords.top - basketballField.clientTop - ball.clientHeight / two,
        left: event.clientX - fieldCoords.left - basketballField.clientLeft - ball.clientWidth / two
    }
    if (ballCoords.top < 0) {
        ballCoords.top = 0
    }
    if (ballCoords.left < 0) {
        ballCoords.left = 0
    }
    if (ballCoords.left + ball.clientWidth > basketballField.clientWidth) {
        ballCoords.left = basketballField.clientWidth - ball.clientWidth;
    }
    if (ballCoords.top + ball.clientHeight > basketballField.clientHeight) {
        ballCoords.top = basketballField.clientHeight - ball.clientHeight;
    }
    ball.style.left = ballCoords.left + 'px';
    ball.style.top = ballCoords.top + 'px';
}