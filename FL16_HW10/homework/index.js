function isEquals(arg1, arg2) {
    return JSON.stringify(arg1) === JSON.stringify(arg2)
}

function isBigger(arg1, arg2) {
    return arg1 > arg2
}

function storeNames(...arg) {
    let arrNames = [];
    for (let argument of arg) {
        arrNames.push(argument)
    }
    return arrNames
}

function getDifference(num1, num2) {
    if (num1 < num2) {
        return num2 - num1
    } else {
        return num1 - num2
    }
}

function negativeCount(arr) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (parseFloat(arr[i]) < 0) {
            count = count + 1
        }
    }
    return count

}

function letterCount(str1, str2) {
    let countLetter = 0

    for (let i = 0; i < str1.length; i++) {
        if (str1[i] === str2) {
            countLetter = countLetter + 1
        }
    }
    return countLetter
}


function countPoints(arr) {
    let countPointsNumber = 0;
    let win = 3;
    let loose = 0;
    let equal = 1;

    for (let i = 0; i < arr.length; i++) {
        let arrResult = arr[i].split(':');
        let numberEl1Arr = Number(arrResult[0])
        let numberEl2Arr = Number(arrResult[1])
        if (numberEl1Arr > numberEl2Arr) {
            countPointsNumber += win;
        } else if (numberEl1Arr === numberEl2Arr) {
            countPointsNumber += equal;
        } else {
            countPointsNumber += loose;
        }
    }
    return countPointsNumber
}