import { fetchDataByPath } from './request-handler';

const API_URL = '/recipes/popular';

const recipesContainer = document.querySelector('.popular-recipes-container');

async function createMarkup() {
  try {
    const recipesData = await fetchDataByPath(API_URL);
    const markup = recipesData
      .map(
        ({ title, description, preview }) => `<div class="popular-recipes-wrap">
      <img src="${preview}" alt="${title}" loading="lazy" class="popular-recipes-img" width="64px" height="64px" />
      <div class="popular-recipes-info-wrap">
      <h3 class="popular-recipes-subtitle">${title}</h3>
      <p class="popular-recipes-text">${description}</p>
      </div>
       </div>`
      )
      .join('');

    recipesContainer.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error.message);
  }
}

createMarkup();
