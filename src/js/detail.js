'use strict';

import { getBeerDetail } from './api.js';
import { renderCommentBox } from './commentsForm.js';
import { renderComments } from './comments.js';
import { renderLoader } from './ui.js';

let beerDetailTemplate = ({beerId, image, name, price, firstBrewed,ingredients, description, brewersTips, contributedBy, likes, commentsCounter }) => 
`
  <div class="detail-beer-image-container">
    <input type="hidden" id="beer-id" value="${beerId}"/>
    <img class="detail-beer-image" src="${image}" alt="beer-image" srcset="">
    <div class="detail-social-container">
      <div id="likes-counter-container">
        <span id="detail-social-like-counter">${likes}</span>
        <img class="detail-like-btn" src="/img/icons/like.png" alt="">
      </div>
      <div id="comment-counter-container">
        <span id="detail-social-comment-counter">${commentsCounter}</span>
        <img class="detail-comment-btn" src="/img/icons/comment.png" alt="">
      </div>
    </div>
  </div>
  <h1 class="detail-beer-name">${name}</h1>
  <div class="detail-beer-row-inline">
    <div class="row-item row-item-left">
      <img class="detail-beer-price" src="/img/icons/money.png" alt="">
      <span>${price}</span>
    </div>
    <div class="row-item row-item-right">
      <img class="detail-beer-firstBrewed" src="/img/icons/calendar.png" alt="">
      <span>${firstBrewed}</span>
    </div>
  </div>
  <div class="detail-beer-process">
    <div class="detail-beer-info-section">
      <h2>Ingredients</h2>

      <ul class="detail-beer-ingredients">
        ${ingredients}
      </ul>
    </div>
    <div class="detail-beer-description-tips">
      <div class="detail-beer-info-section">
        <h2>Description</h2>
        <p class="detail-beer-description">${description}</p>
      </div>  
      <div class="detail-beer-info-section">
        <h2>Brewer tips</h2>
        <p class="detail-beer-brewerTips">${brewersTips}</p>
      </div>
    </div>
  </div>
  <div class="detail-beer-info-section">
    <h2>Contributed by</h2>
    <p class="detail-beer-contributed-by">${contributedBy}</p>
  </div>
`;

const parseIngredientesToHTML = beer => {  
  const getArrayIngredients = (ingredient, mainName) => {
    let ingredientText = '';
    ingredient.forEach(({ name, amount: { value, unit} } = ingr) => {
      ingredientText += `<li>${value} ${unit} of '${name}' ${mainName}</li>`;
    });

    return ingredientText;
  };

  const ingredients = beer.ingredients;

  const malt = getArrayIngredients(ingredients.malt, 'malt');
  const hops = getArrayIngredients(ingredients.hops, 'hops');
  const yeast = `<li>${ingredients.yeast} yeast</li>`;

  return malt + hops + yeast;
};

const addCustomFields = beer => {
  beer.commentsCounter = beer.comment ? beer.comment.length : 0;
  beer.ingredients = parseIngredientesToHTML(beer);
};

const renderDetail = async id => {
  try {
    renderLoader('hide', 'show');
    const selector = document.querySelector('.detail-beer-section');
    const beer = await getBeerDetail(id);

    addCustomFields(beer);

    selector.innerHTML = beerDetailTemplate(beer);
    renderCommentBox();
    renderComments(beer.comment);
  } catch(err) {
    console.error(err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export { renderDetail };