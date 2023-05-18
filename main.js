"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee col-6 my-3">';
    html += '<div class="d-none">' + coffee.id + '</div>';
    html += '<h2 class="float-start mx-2 h3">' + coffee.name + '</h2>';
    html += '<p class="my-2">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var inputName = roastName.value.toLowerCase()
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (selectedRoast === 'all') {
            if (coffee.name.toLowerCase().includes(inputName)  || '' === inputName){
                filteredCoffees.push(coffee);
            }
        } else if (coffee.roast === selectedRoast) {
            if (coffee.name.toLowerCase().includes(inputName)  || '' === inputName){
                filteredCoffees.push(coffee);
            }
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function createCoffee() {
    let idValue = coffees.length + 1
    let nameValue = roastName2.value;
    let typeValue = roastType.value;
    nameValue = createCoffeeNames(nameValue)
    let newCoffee = {
        id: idValue,
        name: nameValue,
        roast: typeValue
    }
    console.log(newCoffee)
    coffees.push(newCoffee);
}

function createCoffeeNames(str) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
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

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var submitButton2 = document.querySelector('#submit2');
var roastSelection = document.querySelector('#roast-selection');
var roastType = document.querySelector('#roast-type');
var roastName = document.querySelector('#input');
var roastName2 = document.querySelector('#input2');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
submitButton2.addEventListener('click', createCoffee);
submitButton2.addEventListener('click', updateCoffees);
roastSelection.addEventListener(`change`, updateCoffees)
roastName.addEventListener(`input`, updateCoffees)