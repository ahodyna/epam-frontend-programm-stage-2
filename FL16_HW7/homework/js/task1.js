const money = parseInt(prompt('Enter amount of money: '), 10);
const initialAmountMaxValue = 1000
if(isNaN(money) || money < initialAmountMaxValue){
     alert('Invalid input data')
}

let years = parseInt(prompt('Enter number of years: '));
if(isNaN(years) || years < 1){
    alert('Invalid input data');
}

const hundredPercent = 100
const moneyPrecision = 2

let percentage = parseInt(prompt('Enter percentage of a year: '));
if(isNaN(percentage) || percentage > hundredPercent){
    alert('Invalid input data');
}

let totalSum = Math.pow(1 + percentage/hundredPercent, years) * money;
let totalProfit = totalSum - money;
alert(`Total profit: ${totalProfit.toFixed(moneyPrecision)} \n Total amount: ${totalSum.toFixed(moneyPrecision)}` );