'use strict';

import { setBeerLike } from './api.js';

let likeCounterDiv;
let likeCounterNum;

const createLikesListener = beerId => {
    likeCounterDiv = document.querySelector('#likes-counter-container');
    likeCounterNum = document.querySelector('#detail-social-like-counter');
    
    likeCounterDiv.addEventListener('click', async evt => {
        evt.preventDefault();
        await setBeerLike( beerId );
        updateLikeCounter();
    } );
}

const updateLikeCounter = () => {
    likeCounterNum.innerText = Number.parseInt(likeCounterNum.innerText) + 1;   
};

export { createLikesListener };