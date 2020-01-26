'use strict';
import { getBeers } from './api.js';
import { renderLoader } from './ui.js';
import { getDate } from './utils.js';


const beerTemplate = ({ beerId, image, name, price, firstBrewed, brewersTips }) => `
    <article class="beer-card">
        <a href="/detail/${beerId}">
            <div class="beer-img-container">
                <img src="${image}" alt="beer-img-${beerId}" class="beer-content-img" />
            </div>
            <div class="beer-content-text">
                <h2 class="beer-name">${name}</h2>
                <div class="beer-extra-fields">
                    <div>
                        <img src="/img/icons/money.png" alt="money-icon">
                        <span class="beer-extra-field">${price}</span> 
                    </div>
                    <div>
                        <img src="/img/icons/calendar.png" alt="calendar-icon">
                        <span class="beer-extra-field">${firstBrewed}</span>
                    </div>
                </div>
                <p class="beer-tips">${brewersTips}</p>
            </div>
        </a>
    </article>
`;

const renderBeersDOM = async (filters) => {
    try {
        renderLoader('hide', 'show');
        
        let beers = await getBeers( filters );
        beers = applyLocalFilters(beers, filters);

        renderBeers(beers);
    } catch (error) {
        console.error(error);
    }
     finally {
        renderLoader('show', 'hide');
    }
};

const renderBeers = beers => {
    const beersSection = document.querySelector('.beers-container');

    const htmlBeers = beers.slice(0, 10).map((beer, index) => {
        return beerTemplate( { ...beer } );
    }).join('');

    beersSection.innerHTML = ` ${htmlBeers} `;
};


const applyLocalFilters = (beers, filters) => {
    if ( filters ) {
        if ( filters.date )
            beers = getBeersByDate( beers, filters.date );
    }

    return beers;
}
const getBeersByDate = (beers, filteredDate) => {
    let filteredBeers = [];
    if ( beers.length > 0 ) {
        const _filteredDate = getDate(filteredDate);
        filteredBeers = beers.filter( beer => ( getDate(beer.firstBrewed).getTime() >= _filteredDate.getTime() ) );
    } 
    return filteredBeers;
};

export { renderBeersDOM };
