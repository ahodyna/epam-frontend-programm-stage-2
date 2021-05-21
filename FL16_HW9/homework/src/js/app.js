let eventName = prompt('Enter event name :', 'meeting')
if (eventName !== null) {
    document.getElementById('form').style.display = 'block';
}

function confirmData() {
    let name = document.getElementById('name').value;
    let time = document.getElementById('time').value;
    let place = document.getElementById('place').value;

    if (name === '' || place === '') {
        alert('Input all data')
    } else if (!time.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)) {
        alert('Enter time in format hh:mm')
    } else {
        console.log(`${name} has a ${eventName} today at ${time} somewhere in ${place}`)
    }
}

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}


function convertCurrency() {
    let oneEuro = 33.50;
    let oneDollar = 27.43;
    let numberToFixed = 2;
    let amountEuro = prompt('Enter amount of euro :')
    if (amountEuro !== null && isNormalInteger(amountEuro)) {
        let amountDollar = prompt('Enter amount of dollar :')
        if (isNormalInteger(amountDollar)) {
            let convertedEuro = oneEuro * Number(amountEuro);
            let convertedDollar = oneDollar * Number(amountDollar);
            alert(`${amountEuro} euros are equal ${convertedEuro.toFixed(numberToFixed)} hrns,` +
                `${amountDollar} dollars are equal ${convertedDollar.toFixed(numberToFixed)}hrns`)
        }

    }
}