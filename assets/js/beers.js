'use strict';

import { renderLoader } from './ui.js';
import api from './api.js';

const { getBeers, getBeersData } = api();

const templateBeers = ({ beerId, name, image, description }) => `
    <div class="grid-item grid-item-${beerId}">
      <a href="/detail/${beerId}">
        <div class="beer ">
          <header class="beer-header">
            <h2>${name}</h2>
          </header>
          <div class="beer-content">
            <div class="beer-content-image">
              <img src="${image}">
            </div>
            <div class="beer-content-text">
              <p>${description}</p>
            </div>
          </div>
        </div>
      </a>
    </div>  
`;

const renderBeers = (element, beers) => {
  const htmlBeers = beers.map(beer => templateBeers(beer)).join('');
  element.innerHTML = `
    <div class="grid">
      ${htmlBeers}
    </div>
  `;
};

export const renderBeersDOM = async (textQuery, startDataQuery, endDataQuery) => {
  try {
    renderLoader('hide', 'show');
    var fetchBeers;
    if (!startDataQuery && !endDataQuery) {
      fetchBeers = await getBeers(textQuery);
    } else {
      fetchBeers = await getBeersData(textQuery, startDataQuery, endDataQuery);
    }
    const showSection = document.querySelector('main');
    renderBeers(showSection, fetchBeers);
  } catch (e) { 
    console.error(e);
  } finally {
    renderLoader('show', 'hide');
  }
};
