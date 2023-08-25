import { fetchDataByPath } from './request-handler';
import { fillStars } from './fill-stars.js';
import { closeModal, createMarkupModal, openModal } from './modal';

const API_URL = '/recipes/popular';

const recipesContainer = document.querySelector('.popular-recipes-container');
const modalCardCont = document.querySelector('.card-markup-modal');
const addToFavorite = document.querySelector('.modal-add-favorite');

async function createMarkup() {
  try {
    const recipesData = await fetchDataByPath(API_URL);
    const markup = recipesData
      .map(
        ({ _id, title, description, preview }) => `
    <div class="popular-recipes-wrap" data-id="${_id}">
      <picture>
        <source srcset="${preview}" type="image/webp">
        <source srcset="${preview}" type="image/jpeg">
        <img src="${preview}" alt="${title}" loading="lazy" class="popular-recipes-img" width="64px" height="64px">
      </picture>
      <div class="popular-recipes-info-wrap">
        <h3 class="popular-recipes-subtitle">${title}</h3>
        <p class="popular-recipes-text">${description}</p>
      </div>
    </div>`
      )
      .join('');

    recipesContainer.insertAdjacentHTML('beforeend', markup);
    recipesContainer.addEventListener('click', handleRecipeClick);
  } catch (error) {
    Notify.error(error.message);
  }
}

async function handleRecipeClick(event) {
  const clickedRecipe = event.target.closest('.popular-recipes-wrap');
  if (!clickedRecipe) return;

  const recipeId = clickedRecipe.dataset.id;
  const dataRecipe = await fetchDataByPath(`/recipes/${recipeId}`);
  modalCardCont.innerHTML = createMarkupModal(dataRecipe);
  addToFavorite.id = recipeId;
  fillStars();
  openModal();
}

createMarkup();
