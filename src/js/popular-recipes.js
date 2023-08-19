import axios from 'axios';

const API_URL =
  'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

const getRecipes = async () => {
  try {
    const { data } = await axios(API_URL);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const recipesContainer = document.querySelector('.popular-recipes-container');

async function createMarkup() {
  try {
    const recipesData = await getRecipes();
    const sortedRecipes = recipesData.sort(
      (a, b) => b.popularity - a.popularity
    );
    recipesContainer.innerHTML = '';
    const viewportWidth = window.innerWidth;
    let maxDescriptionLength, maxTitleLength;

    if (viewportWidth < 768) {
      maxDescriptionLength = 80;
      maxTitleLength = 11;
    } else if (viewportWidth >= 768 && viewportWidth < 1280) {
      maxDescriptionLength = 64;
      maxTitleLength = 10;
    } else {
      maxDescriptionLength = 85;
      maxTitleLength = 9;
    }

    const markup = sortedRecipes
      .map(({ _id, title, description, preview, popularity }) => {
        const reducedDescription =
          description.length > maxDescriptionLength
            ? description.substring(0, maxDescriptionLength) + '...'
            : description;
        const reducedTitle =
          title.length > maxTitleLength
            ? title.substring(0, maxTitleLength) + '...'
            : title;

        return `<div class="popular-recipes-wrap">
      <img src="${preview}" alt="${title}" loading="lazy" class="popular-recipes-img" width="64px" height="64px" />
      <div class="popular-recipes-info-wrap">
      <h3 class="popular-recipes-subtitle">${reducedTitle}</h3>
      <p class="popular-recipes-text">${reducedDescription}</p>
      </div>
       </div>`;
      })
      .join('');

    recipesContainer.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error.message);
  }
}

createMarkup();
window.addEventListener('resize', createMarkup);
