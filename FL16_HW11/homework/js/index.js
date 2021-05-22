function visitLink(path) {

	if (localStorage.getItem(`${path}`) !== null) {
		let value = parseInt(localStorage.getItem(`${path}`)) + 1

		localStorage.setItem(`${path}`, JSON.stringify(value));
	} else {
		localStorage.setItem(`${path}`, JSON.stringify(1));
	}


}

function viewResults() {
	let page1 = localStorage.getItem('Page1')
	let page2 = localStorage.getItem('Page2')
	let page3 = localStorage.getItem('Page3')


	let divNode = document.createElement('div');
	divNode.id = 'resultsView';
	let content = document.getElementById('content')
	content.appendChild(divNode)
	if (page1 === null) {
		page1 = 0;
	}
	if (page2 === null) {
		page2 = 0;
	}
	if (page3 === null) {
		page3 = 0;
	}
	divNode.innerHTML = `<li>You visited Page1 ${page1} time(s)</li>` +
		`<li>You visited Page2 ${page2} time(s)</li>` +
		`<li>You visited Page3 ${page3} time(s)</li>`

		localStorage.clear()
}
