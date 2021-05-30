const appRoot = document.getElementById('app-root');

const container = document.createElement('div');
container.className = 'container';
appRoot.appendChild(container);

const mainTitle = document.createElement('h2');
mainTitle.innerText = 'Countries Search';
container.appendChild(mainTitle);

const divFormFirstParagraph = document.createElement('div');
divFormFirstParagraph.className = 'divFormFirstParagraph';
container.appendChild(divFormFirstParagraph);

const textDescription = document.createElement('p');
textDescription.innerText = 'Please choose the type of search:';
divFormFirstParagraph.appendChild(textDescription);

const divFormFP = document.createElement('div');
divFormFP.className = 'formInput';
divFormFirstParagraph.appendChild(divFormFP);

const divFormFirstDiv = document.createElement('div');
divFormFP.appendChild(divFormFirstDiv);

const radioButtonRegion = document.createElement('input');
radioButtonRegion.name = 'modeSelector';
radioButtonRegion.dataset.mode = 'by_region';
radioButtonRegion.type = 'radio';
radioButtonRegion.value = 'By region';
radioButtonRegion.id = 'regionInput';
radioButtonRegion.onclick = updateMode
divFormFirstDiv.appendChild(radioButtonRegion);

const labelForButtonRegion = document.createElement('label');
labelForButtonRegion.htmlFor = 'regionInput'
labelForButtonRegion.innerText = 'By region'
divFormFirstDiv.appendChild(labelForButtonRegion)

const divFormSecondDiv = document.createElement('div');
divFormSecondDiv.className = 'divFormSecondDiv';
divFormFP.appendChild(divFormSecondDiv);

const radioButtonLanguage = document.createElement('input');
radioButtonLanguage.name = 'modeSelector';
radioButtonLanguage.dataset.mode = 'by_language';
radioButtonLanguage.type = 'radio';
radioButtonLanguage.value = 'By language';
radioButtonLanguage.id = 'languageInput'
radioButtonLanguage.onclick = updateMode
divFormSecondDiv.appendChild(radioButtonLanguage);

const labelForButtonLanguage = document.createElement('label');
labelForButtonLanguage.htmlFor = 'languageInput'
labelForButtonLanguage.innerText = 'By language'
divFormSecondDiv.appendChild(labelForButtonLanguage)


const divFormSecondParagraph = document.createElement('div');
divFormSecondParagraph.className = 'divFormSecondParagraph';
container.appendChild(divFormSecondParagraph);

const divFormSecondParagraphText = document.createElement('div');
divFormSecondParagraph.appendChild(divFormSecondParagraphText);

const textDescriptionSelectParagraph = document.createElement('p');
textDescriptionSelectParagraph.innerText = 'Please choose search query:';
divFormSecondParagraphText.appendChild(textDescriptionSelectParagraph);

const divFormSelectParagraph = document.createElement('div');
divFormSelectParagraph.id = 'selectParagraph';
divFormSelectParagraph.className = 'selectParagraphDiv';
divFormSecondParagraph.appendChild(divFormSelectParagraph);

const select = document.createElement('select');
select.id = 'select';
select.disabled = true;
divFormSelectParagraph.appendChild(select);

const option = document.createElement('option');
option.innerHTML = 'Select value';
select.appendChild(option);

let tableDiv = document.createElement('div');
tableDiv.id = 'tablePlace';
tableDiv.className = 'tableDiv';
container.appendChild(tableDiv);


const countryColumnName = 'country'
const areaColumnName = 'area'
const sortByOrderNoneValue = 'none'
const sortByOrderAscendingValue = 'asc'
const sortByOrderDescendingValue = 'desc'


const tableState = {
    mode: null,
    modeState: {
        selected: null,
        sortBy: 'country',
        sortOrder: 'asc'
    },

    subscriptions: [],
    subscribe: function (subscriptionCallback) {
        this.subscriptions.push(subscriptionCallback)
    },
    notify: function () {
        console.log('notify: ', this.mode, this.modeState.selected, this.modeState.sortOrder, this.modeState.sortBy)
        for (let i = 0; i < this.subscriptions.length; i++) {
            let subscription = this.subscriptions[i]
            subscription(this.mode, this.modeState)
        }
    },

    getMode: function getMode() {
        return this.mode
    },
    getMode: function getModeState() {
        return this.modeState
    },

    updateMode: function (newMode) {

        if (this.mode !== newMode) {
            this.modeState.selected = null;
            this.modeState.sortBy = countryColumnName;
            this.modeState.sortOrder = sortByOrderAscendingValue;
        }

        this.mode = newMode
        this.notify()
    },
    updateSelected: function (newSelected) {
        this.modeState.selected = newSelected
        this.notify()
    },
    updateSortBy: function (newSortBy) {
        if (this.modeState.sortBy === newSortBy) {
            nextSortOrder = getNextSortOrder(this.modeState.sortOrder)
            this.modeState.sortOrder = nextSortOrder
        } else {
            this.modeState.sortOrder = getNextSortOrder(null)
        }

        this.modeState.sortBy = newSortBy
        this.notify()
    },
    updateSortOrder: function (newSortOrder) {
        this.modeState.sortOrder = newSortOrder
        this.notify()
    }
}

function getNextSortOrder(currentSortOrder) {
    if (currentSortOrder === null || currentSortOrder === sortByOrderNoneValue) {
        return sortByOrderAscendingValue
    } else if (currentSortOrder === sortByOrderAscendingValue) {
        return sortByOrderDescendingValue
    } else if (currentSortOrder === sortByOrderDescendingValue) {
        return sortByOrderNoneValue
    }
}

function updateMode() {
    const checkedInputs = document.querySelectorAll('div.formInput input:checked')
    const newMode = checkedInputs[0].dataset.mode

    if (newMode === 'by_region') {
        countries = externalService.getRegionsList()
        createSelect(countries)
    } else if (newMode === 'by_language') {
        countries = externalService.getLanguagesList()
        createSelect(countries)
    }

    tableState.updateMode(newMode)
}

function comparatorValueSelector(firstBigger, direction) {
    let negativeIndex = -1;

    if (direction === sortByOrderAscendingValue) {
        return firstBigger ? 1 : negativeIndex
    } else if (direction === sortByOrderDescendingValue) {
        return firstBigger ? negativeIndex : 1
    } else {
        throw 'Unknown direction: ' + direction
    }
}

tableState.subscribe((mode, modeState) => {

    if (mode === null || modeState.selected === null || modeState.selected === 'Select value') {
        resetTable()
    } else {
        let countriesArray = null;
        if (mode === 'by_region') {
            countriesArray = externalService.getCountryListByRegion(modeState.selected)
        } else if (mode === 'by_language') {
            countriesArray = externalService.getCountryListByLanguage(modeState.selected)
        } else {
            throw 'Unknown mode: ' + mode
        }

        if (modeState.sortOrder === sortByOrderAscendingValue || modeState.sortOrder === sortByOrderDescendingValue) {
            if (modeState.sortBy === countryColumnName) {
                countriesArray.sort((country1, country2) => {
                    const firstBigger = country1.name > country2.name
                    return comparatorValueSelector(firstBigger, modeState.sortOrder);
                })
            } else if (modeState.sortBy === areaColumnName) {
                countriesArray.sort((country1, country2) => {
                    const firstBigger = country1.area > country2.area
                    return comparatorValueSelector(firstBigger, modeState.sortOrder);
                })
            }
        }

        createTable(countriesArray)
    }
})

function resetTable() {
    const tablePlace = document.getElementById('tablePlace');
    tablePlace.innerHTML = 'No items, please choose search query'
}


function createSelect(options) {
    const select = document.createElement('select');
    select.disabled = false;

    selectParagraph = document.getElementById('selectParagraph')
    selectParagraph.innerHTML = ''
    selectParagraph.appendChild(select);

    const option = document.createElement('option');
    option.innerHTML = 'Select value';
    select.appendChild(option);

    for (let i = 0; i < options.length; i++) {

        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = options[i];
        select.appendChild(opt);
    }
    select.addEventListener('click', () => {
        let selectedValue = select.options[select.selectedIndex].text;
        tableState.updateSelected(selectedValue)
    })
}

const upArrow = '&#8593'
const downArrow = '&#8595'
const doubleArrow = '&#8597'

function getArrow(columnName, modeState) {
    if (columnName !== modeState.sortBy) {
        return doubleArrow
    } else {
        if (modeState.sortOrder === sortByOrderAscendingValue) {
            return upArrow
        } else if (modeState.sortOrder === sortByOrderDescendingValue) {
            return downArrow
        } else if (modeState.sortOrder === null || modeState.sortOrder === sortByOrderNoneValue) {
            return doubleArrow
        } else {
            throw 'Unexpected sort order'
        }
    }
}

function createTable(arr) {
    const tablePlace = document.getElementById('tablePlace');

    let tableHtml = '<table>'
        + '<thead>'
        + '<tr>'
        + '  <th>Country name <span onclick="tableState.updateSortBy(countryColumnName)">'
        + getArrow(countryColumnName, tableState.modeState) + '</span></th>'
        + '  <th>Capital</th>'
        + '  <th>World Region</th>'
        + '  <th>Languages</th>'
        + '  <th>Area<span onclick="tableState.updateSortBy(areaColumnName)">'
        + getArrow(areaColumnName, tableState.modeState) + '</span></th>'
        + '  <th>Flag</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody>'

    let rows = ''
    for (let i = 0; i < arr.length; i++) {

        rows += '<tr>'
            + `  <td>${arr[i].name}</td>`
            + ` <td>${arr[i].capital} </td>`
            + `  <td> ${arr[i].region}</td>`
            + `  <td> ${Object.values(arr[i].languages)}</td>`
            + `  <td> ${arr[i].area}</td>`
            + `  <td> <img src=${arr[i].flagURL}></td>`
            + '</tr>'

    }

    tableHtml += rows
    tableHtml += '</tbody>'
        + '</table>'

    tablePlace.innerHTML = tableHtml

}