function reverseNumber(num) {
    const ten = 10;
    const zero = 0;
    
    let number, result = 0
    while (num) {
        number = num % ten
        result = result * ten + number
        num = num / ten | zero
    }
    return result
}

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i])
    }
}

function map(arr, func) {
    let transformArr = []
    forEach(arr, (el) => {
        let transformItem = func(el)
        transformArr.push(transformItem)
    })
    return transformArr
}

function filter(arr, func) {
    let filteredArr = [];
    forEach(arr, (el) => {
        if (func(el)) {
            filteredArr.push(el)
        }
    })
    return filteredArr
}

function getAdultAppleLovers(data) {
    let age = 18;
    let filtered = filter(data, (el) => {
        return el.age > age && el.favoriteFruit === 'apple'
    })
    let nameArr = map(filtered, (el) => {
        return el.name
    })
    return nameArr
}

function getKeys(obj) {
    let arr = [];

    for (const item in obj) {
        arr.push(item)
    }
    return arr
}

function getValues(obj) {
    let arr = [];

    for (const item in obj) {
        arr.push(obj[item])
    }
    return arr
}

function showFormattedDate(dateObj) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let month = monthNames[dateObj.getMonth()]
    let date = dateObj.getDate();
    let year = dateObj.getFullYear()
    return `It is ${date} of ${month}, ${year} `
}