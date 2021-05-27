function getAge(birthdayDate) {
    let year = 2020;
    let month = 9;
    let day = 22;

    let firstYear = 1970;

    let today = new Date(year, month, day)
    let msDiff = today - birthdayDate.getTime();
    let age = new Date(msDiff);
    return Math.abs(age.getUTCFullYear() - firstYear);

}

function getWeekDay(dateObj) {

    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(dateObj)
    let numberOfWeek = date.getDay();

    for (let i = 0; i < daysOfWeek.length; i++) {
        if (i === numberOfWeek) {
            return daysOfWeek[i]
        }
    }
}

function getAmountDaysToNewYear() {
    let year = 2022;
    let month = 0;
    let day = 1;

    let newYear = new Date(year, month, day);
    let today = new Date();

    let msec = 1000;
    let sec = 60;
    let min = 60;
    let hour = 24;

    let oneDay = msec * sec * min * hour;
    return Math.round((newYear - today) / oneDay)
}

function getProgrammersDay(year) {
    let firstMonth = 0;
    let day = 256;

    let shortNameOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(year, firstMonth, day);
    let dayWeek = getWeekDay(date)
    let month = date.getMonth();
    let datePr = date.getDate()
    return `${datePr} ${shortNameOfMonth[month]}, ${year} (${dayWeek})`
}

function howFarIs(specifiedWeekday) {
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let today = new Date()
    let todayWeekName = getWeekDay(today)
    let numberWeekDay = null;
    let numberToday = null;

    for (let i = 0; i < daysOfWeek.length; i++) {
        if (daysOfWeek[i].toUpperCase() === specifiedWeekday.toUpperCase()) {
            numberWeekDay = i
        }

        for (let j = 0; j < daysOfWeek.length; j++) {
            if (daysOfWeek[j].toUpperCase() === todayWeekName.toUpperCase()) {
                numberToday = j
            }
        }
    }

    if (numberToday < numberWeekDay) {
        let num = numberWeekDay - numberToday;
        return `It's ${num} day(s) left till ${specifiedWeekday}`
    } else if (numberToday > numberWeekDay) {
        let num = daysOfWeek.length - numberToday + numberWeekDay
        return `It's ${num} day(s) left till ${specifiedWeekday}`
    } else {
        return `Hey,today is ${specifiedWeekday} =)`
    }
}

function isValidIdentifier(str) {
    return /^\D[$\w]+$/gi.test(str)
}

function capitalize(str) {
    return str.replace(/\b\w/g, fL => fL.toUpperCase());
}

function isValidAudioFile(str) {
    return /^[a-zA-Z]+\.(mp3|flac|alac|aac)$/i.test(str);
}

function getHexadecimalColors(str) {
    let regex = /#([a-f0-9]{3}){1,2}\b/gi;
    if (regex.test(str)) {
        return str.match(regex)
    } else {
        return []
    }
}

function isValidPassword(str) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return regex.test(str)
}

function addThousandsSeparators(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getAllUrlsFromText(text) {
    let regex = /(https:[/][/]|http:[/][/]|www.)[\w\-.]+\.[a-zA-Z]{2,3}/g;

    if (regex.test(text)) {
        return text.match(regex)
    } else if (text === undefined) {
        return 'error'
    } else {
        return []
    }
}