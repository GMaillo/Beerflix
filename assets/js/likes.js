'use strict';

import api from './api.js';

const { getBeersDetail } = api();

const renderLikes = async id => {
    try {
        const likesList = document.querySelector('#likesList');
        const beer = await getBeersDetail(id);
        likesList.innerHTML = beer.likes;
    } catch (err) {
        console.error(err);
    }
};

const { addLike, getBeersDetail } = api();

export const likesTemplate = ({ likes }) => `
<div class="likes-item">
    <p>${likes}</p>
</div>
`;

const addLikesListener = id => {
    const likesForm = document.querySelector('#likes-form');
    const likesList = document.querySelector('#likesList');

    likesForm.addEventListener('submit', async evt => {
        evt.preventDefault();
        try {
            const responseFail = await addLike(id);
            const beer = await getBeersDetail(id);
            likesList.innerHTML += likesTemplate(beer);

        } catch (err) {
            console.error(err);
        }
    });

};

export default addLikesListener;
export { renderLikes };
