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


/* START TASK 3: Your code goes here */


/* END TASK 3 */
