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
radioButtonRegion.type = 'radio';
radioButtonRegion.value = 'By region';
radioButtonRegion.id = 'regionInput'
divFormFirstDiv.appendChild(radioButtonRegion);

const labelForButtonRegion = document.createElement('label');
labelForButtonRegion.htmlFor = 'regionInput'
labelForButtonRegion.innerText = 'By region'
divFormFirstDiv.appendChild(labelForButtonRegion)

const divFormSecondDiv = document.createElement('div');
divFormSecondDiv.className = 'divFormSecondDiv';
divFormFP.appendChild(divFormSecondDiv);

const radioButtonLanguage = document.createElement('input');
radioButtonLanguage.type = 'radio';
radioButtonLanguage.value = 'By language';
radioButtonLanguage.id = 'languageInput'
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

document.getElementById('regionInput').addEventListener('click', () => {
    if (document.getElementById('regionInput').checked) {
        document.getElementById('languageInput').checked = false;
        document.getElementById('selectParagraph').innerHTML = '';

        const select = document.createElement('select');
        select.id = 'selectRegion';
        select.disabled = false;
        divFormSelectParagraph.appendChild(select);

        const option = document.createElement('option');
        option.innerHTML = 'Select value';
        select.appendChild(option);

        let arrRegions = externalService.getRegionsList();

        for (let i = 0; i < arrRegions.length; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = arrRegions[i];
            select.appendChild(opt);
        }
        select.addEventListener('click', () => {

            let strUser = select.options[select.selectedIndex].text;
            let arrListRegion = externalService.getCountryListByRegion(strUser)
            if (arrListRegion.length !== 0) {
                document.getElementById('tablePlace').innerHTML = '';
                createTable(arrListRegion)

            } else {
                document.getElementById('tablePlace').innerHTML = '';
                tableDiv.innerText = 'No items, please choose search query'

            }

        })
    }

})

document.getElementById('languageInput').addEventListener('click', () => {
    if (document.getElementById('languageInput').checked) {
        document.getElementById('regionInput').checked = false;
        document.getElementById('selectParagraph').innerHTML = ''

        const select = document.createElement('select');
        select.id = 'selectLanguage';
        select.disabled = false;
        divFormSelectParagraph.appendChild(select);

        const option = document.createElement('option');
        option.innerHTML = 'Select value';
        select.appendChild(option);

        let arrLanguage = externalService.getLanguagesList();

        for (let i = 0; i < arrLanguage.length; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = arrLanguage[i];
            select.appendChild(opt);
        }
        select.addEventListener('click', () => {

            let strUser = select.options[select.selectedIndex].text;
            let arrListLanguage = externalService.getCountryListByLanguage(strUser)
            if (arrListLanguage.length !== 0) {
                document.getElementById('tablePlace').innerHTML = '';
                createTable(arrListLanguage)

            } else {

                document.getElementById('tablePlace').innerHTML = '';
                tableDiv.innerText = 'No items, please choose search query'

            }

        })
    }

})

function createTable(arr) {
    const tablePlace = document.getElementById('tablePlace');

    let tableHtml = '<table>'
        + '<thead>'
        + '<tr>'
        + '  <th>Country name <span id="countrySorter">&#11021<span></th>'
        + '  <th>Capital</th>'
        + '  <th>World Region</th>'
        + '  <th>Languages</th>'
        + '  <th>Area<span>&#11021<span></th>'
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