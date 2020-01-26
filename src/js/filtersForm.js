'use strict';
import { toggle } from './ui.js';
import { renderBeersDOM } from './beers.js';

const formToggleButton = document.querySelector('.filters-toggle');
const filtersForm = document.querySelector('.filter-container');
const formSubmitBtn = document.querySelector('#submit-filters-btn');
const handleFiltersForm = toggle(filtersForm);


formToggleButton.addEventListener('click', () => {
    const classRemoved = filtersForm.classList.contains('hide') ? 'hide' : 'show';
    const classAdded = filtersForm.classList.contains('hide') ? 'show' : 'hide';

    handleFiltersForm(classRemoved, classAdded);
});


formSubmitBtn.addEventListener('click', evt => {
    evt.preventDefault();

    const filters = {
        name: document.querySelector('#name-filter').value,
        date: document.querySelector('#date-filter').value 
    };

    localStorage.setItem('filters', JSON.stringify(filters));

    if (filters.date) {
        const split =  filters.date.split('-');
        filters.date = `${split[1]}/${split[0]}`; 
    }
    
    renderBeersDOM(filters);
});


const loadFiltersInfo = () => {
    if (localStorage.getItem('filters') === null)
        return;

    const filters = JSON.parse(localStorage.getItem('filters'));

    document.querySelector('#name-filter').value = filters.name;
    document.querySelector('#date-filter').value = filters.date;    
};

loadFiltersInfo();