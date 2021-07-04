'use strict';

class Pizza {

    constructor(size, type) {
        this.extraIngredients = []

        if (arguments.length === 1) {
            throw new PizzaExeption('Required two arguments, given 1')
        } if (!checkSize(size) || !checkType(type)) {
            throw new PizzaExeption('Invalid type')
        } else {
            this.size = size;
            this.type = type;
        }
    }

    addExtraIngredient(...ingredient) {
        if (ingredient.length > 1) {
            throw new PizzaExeption('More than 1 parametr')
        } else if (!findAllowedExtraIngredient(ingredient[0])) {
            throw new PizzaExeption('Invalid ingredient')
        } else if (findDublicateIngredient(ingredient[0], this.extraIngredients)) {
            throw new PizzaExeption('Dublicate ingredient')
        } else {

            this.extraIngredients.push(ingredient[0])

        }
    }

    removeExtraIngredient(...ingredient) {
        if (ingredient.length > 1) {
            throw new PizzaExeption('More than 1 parametr')
        } else if (!findAllowedExtraIngredient(ingredient[0])) {
            throw new PizzaExeption('Ingredient doesn`t exist in allowedIngredients')
        } else if (!findDublicateIngredient(ingredient[0], this.extraIngredients)) {
            throw new PizzaExeption('Ingredient doesn`t found')
        } else {
            for (let k = 0; k < this.extraIngredients.length; k++) {
                if (this.extraIngredients[k] === ingredient[0]) {
                    this.extraIngredients.splice(k, 1)
                }
            }
        }
    }
    getSize() {
        return this.size
    }
    getPrice() {
        if (this.extraIngredients.length === 0) {
            return this.size.price + this.type.price
        } else {
            let totalSum = this.size.price + this.type.price;
            for (let i = 0; i < this.extraIngredients.length; i++) {
                totalSum += this.extraIngredients[i].price
            }
            return totalSum
        }
    }
    getExtraIngredients() {
        return this.extraIngredients
    }
    getPizzaInfo() {
        return `Size: ${this.size.lable}, type: ${this.type.lable};
extra ingredients: ${getExtraIngredientsName(this.extraIngredients)}; 
price: ${this.getPrice()}`
    }
}

function findDublicateIngredient(ingredient, arr) {
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] === ingredient) {
            return true
        }
    }
}

function findAllowedExtraIngredient(ingredient) {
    for (let i = 0; i < Pizza.allowedExtraIngredients.length; i++) {
        if (Pizza.allowedExtraIngredients[i] === ingredient) {
            return true
        }
    }
    return false
}

function getExtraIngredientsName(arrExtraIngredients) {
    let str = ''
    for (let i = 0; i < arrExtraIngredients.length; i++) {
        str += arrExtraIngredients[i].lable + ' '
    }
    return str
}

function checkSize(size) {
    for (let i = 0; i < Pizza.allowedSizes.length; i++) {
        if (Pizza.allowedSizes[i] === size) {
            return true
        }
    }
    return false
}

function checkType(type) {
    for (let i = 0; i < Pizza.allowedTypes.length; i++) {
        if (Pizza.allowedTypes[i] === type) {
            return true
        }
    }
    return false
}

Pizza.SIZE_S = { lable: 'SMALL', price: 50 }
Pizza.SIZE_M = { lable: 'MEDIUM', price: 75 }
Pizza.SIZE_L = { lable: 'LARGE', price: 100 }

Pizza.TYPE_VEGGIE = { lable: 'VEGGIE', price: 50 }
Pizza.TYPE_MARGHERITA = { lable: 'MARGHERITA', price: 60 }
Pizza.TYPE_PEPPERONI = { lable: 'PEPPERONI', price: 70 }

Pizza.EXTRA_TOMATOES = { lable: 'TOMATOES', price: 5 }
Pizza.EXTRA_CHEESE = { lable: 'CHEESE', price: 7 }
Pizza.EXTRA_MEAT = { lable: 'MEAT', price: 9 }


Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L]
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI]
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT]


class PizzaExeption {
    constructor(log) {
        this.log = log
    }
}