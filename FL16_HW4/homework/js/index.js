'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */


class Pizza {

    extraIngredients = []

    constructor(size, type) {

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
         extra ingredients: ${getExtraIngredientsName(this.extraIngredients)}; price: ${this.getPrice()}`
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

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = { lable: 'SMALL', price: 50 }
Pizza.SIZE_M = { lable: 'MEDIUM', price: 75 }
Pizza.SIZE_L = { lable: 'LARGE', price: 100 }

Pizza.TYPE_VEGGIE = { lable: 'VEGGIE', price: 50 }
Pizza.TYPE_MARGHERITA = { lable: 'MARGHERITA', price: 60 }
Pizza.TYPE_PEPPERONI = { lable: 'PEPPERONI', price: 70 }

Pizza.EXTRA_TOMATOES = { lable: 'TOMATOES', price: 5 }
Pizza.EXTRA_CHEESE = { lable: 'CHEESE', price: 7 }
Pizza.EXTRA_MEAT = { lable: 'MEAT', price: 9 }

/* Allowed properties */
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L]
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI]
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT]


class PizzaExeption {
    constructor(log) {
        this.log = log
    }
}

/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */





// ----------------------------------------------------
// tests

/* It should work */
// small pizza, type: veggie
let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// add extra meat
pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// check price
console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// add extra corn
pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// add extra corn
pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// check price
console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// check pizza size
console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// remove extra ingredient
pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
let pizza2 = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

let pizza3 = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

let pizza4 = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
pizza4.addExtraIngredient(Pizza.EXTRA_MEAT);
pizza4.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

let pizza5 = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
pizza.addExtraIngredient(Pizza.EXTRA_CORN); // => Invalid ingredient