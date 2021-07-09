function getMaxEvenElement(arr) {
    let maxElement;
    let newArr = arr.map((i) => Number(i))
    let evenArrNum = newArr.filter(num => num % evenNum === 0)
    evenArrNum.reduce((acc, val) => {
        maxElement = val > acc ? val : acc
        return maxElement
    })
    return maxElement
}

let evenNum = 2;

let a = 3;
let b = 5;

[a, b] = [b, a]

function getValue(value) {
    let val = value ?? '-'
    return val

}

function getObjFromArray(arrayOfArrays) {

    return arrayOfArrays.reduce(function (acc, elem) {
        acc[elem[0]] = elem[1];
        return acc;
    }, {});

}

const obj1 = { name: 'nick' };

function addUniqueId(obj) {
    let newObj = { ...obj }
    newObj.id = Symbol()
    return newObj
}

function getRegroupedObject(oldObj) {
    let {
        name: name,
        details: {
            id, age, university
        }
    } = oldObj;

    let user = { age, name, id }
    return { university, user }
}


function getArrayWithUniqueElements(arr) {
    return [...new Set(arr)]
}

function hideNumber(phoneNumber) {
    let newNumber = phoneNumber.slice(indexItem)
    return newNumber.padStart(targetLength, '*')
}

let targetLength = 10;
let indexItem = 6

function add(...vals) {
    if (vals.length < 1) {
        throw 'error'
    } else {
        return vals.reduce((acc, elem) => acc + elem)
    }
}

function* generateIterableSequence(arr) {
    yield* arr
}

const generatorObject = generateIterableSequence(['I', 'love', 'Epam']);

for (let value of generatorObject) {
    console.log(value)
}