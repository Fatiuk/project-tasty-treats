import Notiflix from 'notiflix';
import { openPopupById } from '../js/custom-popup';
import { closeOllPopups } from '../js/custom-popup';

const recipeModalWindow = document.querySelector('.js-backend-info');
const popularRecipeList = document.querySelector('.popular-recipes-js');
const favoritesRecipeList = document.querySelector('.favorites-recipes-js');
const addFavoriteBtn = document.querySelector('.favorite-btn');
const recipeList = document.querySelector('.recipe-list');
const favoriteArr = [];
const KEY_FAVORITE = 'favorite';

if (popularRecipeList) {
  popularRecipeList.addEventListener('click', onPopularRecipe);
}

if (favoritesRecipeList) {
  favoritesRecipeList.addEventListener('click', onCatalogRecipe);
}

if (recipeList) {
  recipeList.addEventListener('click', onCatalogRecipe);
}

if (addFavoriteBtn) {
  addFavoriteBtn.addEventListener('click', onFavoriteBtn);
}

let recipeId = '';
let recipes = {};

function onCatalogRecipe(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  recipeId = evt.target.dataset.id;
  fetchRecipes(recipeId);
  renderModalWindow(recipeId);
}

function onPopularRecipe(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  recipeId = evt.target.dataset.id;
  fetchRecipes(recipeId);
  renderModalWindow(recipeId);
}

async function fetchRecipes(id) {
  const response = await fetch(`https://tasty-treats-backend.p.goit.global/api/recipes/${id}`);

  return response;
}

async function renderModalWindow(id) {
  openPopupById('loading');
  try {
    const response = await fetchRecipes(recipeId);
    recipes = await response.json();
    recipeModalWindow.innerHTML = modalWindowRecipesMarkUp(recipes);
    setTimeout(() => {
      openPopupById('recepie');
    }, 350);
  } catch (err) {
    setTimeout(() => {
      closeOllPopups();
      Notiflix.Report.failure(err);
    }, 350);
  }
}

function modalWindowRecipesMarkUp(obj) {
  const { title, instructions, youtube, ingredients, rating, tags, time, preview, category, description, _id } = obj;
  const addHtml = `
      <h2 
        class="js-recepie-popup-title js-data-info"
        data-id="${_id}"
        data-category="${category}"
        data-preview="${preview}" 
        data-title="${title}"
        data-description="${description}"
        data-rating="${rating}" 
      >${title.toUpperCase()}</h2>
      <div class="video-recipe">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${youtube.split('?v=')[1]}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="info-panel">
        <div class="tags">
          <ul class="tags-list">
          ${tags.map(tag => `<li><span class="tag-item"><p class="modal-text">#${tag}</p></span></li>`).join('')}
          </ul>
        </div>
        
        <div class="rating">
        <div class="rating-value">${rating}</div>
        <div class="rating-body">
          <div class="rating-active" style="width:${(rating * 100) / 5}%">
            <div class="rating-items">
              <input type="radio" class="rating-item" value="1" name="rating" />
              <input type="radio" class="rating-item" value="2" name="rating" />
              <input type="radio" class="rating-item" value="3" name="rating" />
              <input type="radio" class="rating-item" value="4" name="rating" />
              <input type="radio" class="rating-item" value="5" name="rating" />
            </div>
          </div>
        </div>
        <p class="modal-text">
  ${time} min
  </p>
      </div>
  
      </div>
      <div class="ingredients">
        <ul class="ingredients-list">
        ${ingredients
          .map(
            ({ name, measure } = ingredients) =>
              `<li class="ingredients-item"><div><p class="modal-text">${name}</p></div><div><pclass="modal-text">${measure}</pclass=></div></li>`
          )
          .join('')}
        </ul>
      </div>
      <div class="instructions-container">
      <p class="instructions-text">${instructions}</p></div>
      <button type="button" class="favorite-btn btn">Add to favorite</button>
      `;
  return addHtml;
}

function onFavoriteBtn(evt) {
  evt.preventDefault();

  favoriteArr.push(recipes);
  localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
}
