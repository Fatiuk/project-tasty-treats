import axios from "axios"
import Notify from "notiflix";
// import { openPopupById } from '../js/custom-popup';
const popularRecipes = document.querySelector('.popular-recipes-js');

// Асинхронна функція для отримання популярних рецептів
async function getFetchPopularRecipes() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

  try {
      const response = await axios.get(BASE_URL);
      return response.data; 
  } catch (error) {
    Notify.failure(error.message);
    throw new Error(error);
  }
}

// Виклик асинхронної функції та вставка розмітки в DOM
async function getPopularRecipes() {
  try {
    const data = await getFetchPopularRecipes();
    
    //перевірка чи приходить не пустий масив
    if (Array.isArray(data) && data.length > 0) {
      const markup = createPopularRecipesMarkup(data);
      popularRecipes.insertAdjacentHTML('beforeend', markup);
    } else {
      Notify.info('No recipes available!')
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

if (popularRecipes) {
  getPopularRecipes();
}

// Функція для створення розмітки популярних рецептів
function createPopularRecipesMarkup(recipes) {
    return recipes.map(({ title, description, preview, _id }) => {
        return `
        <li class="popular-recipes-list list" >
            <a class="popular-recipes-link" href="#!" >
                <div class="popular-recipes-item">
                  <img class="popular-recipes-img" src="${preview}" alt="${title}" data-id=${_id}>
                  <div class="popular-recipes-wraper">
                    <h3 class="popular-recipes-title">${title}</h3>
                    <p class="popular-recipes-description">${description}</p>
                </div>
            </div>
            </a>
        </li>`
    }).join("");
}
// openPopupById("recepie");
