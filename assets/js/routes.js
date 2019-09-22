'use strict';

import {renderBeersDOM} from './beers.js'
import renderDetail from './detail.js';
import {showQuotesForm, showLikesForm} from './ui.js';
import addQuoteListener from './quotes.js'
import addLikesListener from './likes.js'

page('/', () => {
    console.log('Home page');
    renderBeersDOM();
});

page('/detail/:id', ctx => {
    console.log('Detail');
    const { params: { id } } = ctx;
    showQuotesForm();
    showLikesForm();
    renderDetail(id);

    addQuoteListener(id);
    addLikesListener(id);
    
    
    
});

page();
