'use strict';

import api from './api.js';

const { getBeersDetail } = api();

const renderQuotes = async id => {
    try {
        const quotesList = document.querySelector('#quoteList');
        const quotes = await getBeersDetail(id);
        const quotesElements = quotes.comment.map(quoteTemplate).join('');
        quotesList.innerHTML = quotesElements;

    } catch (err) {
        console.error(err);
    }
};

const { createQuote, getBeersDetail } = api();

export const quoteTemplate = ( { comment, dateComment } ) => `
<div class="list-item">
    <p>${comment}</p>
    <span> ${dateComment} </span>
</div>
`;

const addQuoteListener = id => {
    const quotesForm = document.querySelector('#quote-form');
    const quotesInput = document.querySelector('#quote');
    const quotesList = document.querySelector('#quoteList');

    quotesForm.addEventListener('submit', async evt => {
        evt.preventDefault();
        try {
            
            if (quotesInput.validity.valid) {
                const responseFail = await createQuote(id, quotesInput.value);
                const response = await getBeersDetail(id);
                quotesList.innerHTML += quoteTemplate(response.comment[response.comment.length - 1]);
           
            }        
        } catch (err) {
            console.error(err);
        }
    });

};

export default addQuoteListener;
export { renderQuotes };
