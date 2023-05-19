(function(){
"use strict"

function renderCoffee(coffee) {         //refactored to use divs instead of tables
    let html = '<div class="coffee col-6 my-3">';
    html += '<div class="d-none">' + coffee.id + '</div>';
    html += '<h2 class="float-start mx-2 h3">' + coffee.name + '</h2>';
    html += '<p class="my-2 text-muted">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {       //refactored to begin at the start of the coffees array
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = searchSelection.value;
    let filteredCoffees =[];

    for (let i = 0; i < coffees.length; i++) {
        if (selectedRoast === 'all') {
            filteredCoffees = filterCoffees(coffees[i], filteredCoffees);
        } else if (coffees[i].roast === selectedRoast) {
            filteredCoffees = filterCoffees(coffees[i], filteredCoffees);
        }
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function filterCoffees(filter, bucket) { // refactored to allow more refined search\
    let inputName = searchName.value.toLowerCase();
    if (filter.name.toLowerCase().includes(inputName) || '' === inputName) {
        bucket.push(filter);
    }
    return bucket;
}

function createCoffee() {          //creates object from user input
    let idValue = coffees.length + 1
    let nameValue = enterName.value;
    let typeValue = enterType.value;

    nameValue = createCoffeeNames(nameValue)

    let newCoffee = {
        id: idValue,
        name: nameValue,
        roast: typeValue
    }
    coffees.push(newCoffee);
}

function createCoffeeNames(str) {       //checks and corrects format of manually entered coffees
    const arr = str.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

//selector list
let tbody = document.querySelector('#coffees');
let submitSearch = document.querySelector('#submitSearch');
let submitEnter = document.querySelector('#submitEnter');
let searchSelection = document.querySelector('#roast-selection');
let searchName = document.querySelector('#input');
let enterType = document.querySelector('#roast-type');
let enterName = document.querySelector('#enterName');

tbody.innerHTML = renderCoffees(coffees);

//event list
submitSearch.addEventListener('click', updateCoffees);
submitEnter.addEventListener('click', createCoffee);
submitEnter.addEventListener('click', updateCoffees);
searchSelection.addEventListener(`change`, updateCoffees)
searchName.addEventListener(`input`, updateCoffees);

})();