import axios from 'axios';
import _ from 'lodash';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PER_PAGE } from './pagination';
import { pagination } from './pagination';
import { createPagination } from './pagination';
import { allCategories } from './all-categories';
import { searchedCategory } from './all-categories';
import { addFavoritesClasses } from '../js/favorites';

export const recipeList = document.querySelector('.recipe-list');
export const searchInput = document.querySelector('.search-input');
const reset = document.querySelector('.reset-wrap');
const categoriesList = document.querySelector('.categories-wrapper');
export const paginationWrap = document.querySelector('.tui-pagination');

// ==================VARIABLES================
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

export let totalPages = 0;
if (document.documentElement.clientWidth < 768) {
  totalPages = 48;
} else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
  totalPages = 36;
} else {
  totalPages = 32;
}

export let searchedTitle = '';

// ================EVENT LISTENERS=================

if (searchInput) {
  searchInput.addEventListener('input', _.debounce(handleSearchInput, 500));
}

function handleSearchInput(event) {
  searchedTitle = event.target.value.trim();
  renderSearchedRecipes(searchedTitle);

  // Забираємо виділення з кнопки категорії
  const previousActiveBtn = document.querySelector('.category-btn-active');
  if (previousActiveBtn) {
    previousActiveBtn.classList.remove('category-btn-active');
  }

  allCategories.classList.remove('active');
}

if (reset) {
  reset.addEventListener('click', handleResetClick);
}

function handleResetClick() {
  searchInput.value = '';
  searchedTitle = '';
  allCategories.classList.add('active');

  if (paginationWrap.classList.contains('is-hidden')) {
    paginationWrap.classList.remove('is-hidden');
  }
  renderAllRecipes();

  // Забираємо виділення з кнопки категорії
  const previousActiveBtn = document.querySelector('.category-btn-active');
  if (previousActiveBtn) {
    previousActiveBtn.classList.remove('category-btn-active');
  }
}

if (allCategories) {
  allCategories.addEventListener('click', handleAllCategoriesClick);
}

function handleAllCategoriesClick() {
  searchInput.value = '';
  allCategories.classList.add('active');
  renderAllRecipes();
}

// if (categoriesList) {
//   categoriesList.addEventListener('click', handleCategoriesListClick);
// }

// function handleCategoriesListClick(event) {
//   if (!event.target.classList.contains('btn')) {
//     return;
//   }
//   searchInput.value = '';
//   searchedCategory = event.target.innerText;
//   console.log(searchedCategory);
// }

// =================FETCH FUNCTIONS===================
export async function fetchAllRecipes() {
  const response = await axios.get(`${BASE_URL}recipes?limit=${PER_PAGE}`);
  return response;
}

async function fetchRecipeByTitle(title) {
  const response = await axios.get(`${BASE_URL}recipes?limit=${PER_PAGE}&title=${title}`);
  return response;
}

async function fetchRecipeByTitlePerPage(title, page) {
  const response = await axios.get(`${BASE_URL}recipes?title=${title}&limit=${PER_PAGE}&page=${page}`);
  return response;
}

// async function fetchRecipeByCategory(category) {
//   const response = await axios.get(`${BASE_URL}recipes?category=${category}&limit=${PER_PAGE}&page=${page}`);
//   return response;
// }

// async function fetchRecipeByCategoryPerPage(category, page) {
//   const response = await axios.get(`${BASE_URL}recipes?category=${category}&limit=${PER_PAGE}&page=${page}`);
//   return response;
// }

export async function fetchRecipesByPage(page) {
  const response = await axios.get(`${BASE_URL}recipes?limit=${PER_PAGE}&page=${page}`);
  return response;
}

// ================= CREATE MARK-UP FUNCTIONS=================
export function createAllRecipesMarkUp(allRecipesObj) {
  return allRecipesObj.results
    .map(({ title, description, preview, rating, _id, category }) => {
      return `
          <li
            class="recipe-item js-data-info"
            data-title="${title}" 
            data-description="${description}" 
            data-preview="${preview}" 
            data-rating="${rating}" 
            data-id="${_id}" 
            data-category="${category}"
          >
            <a href="${preview}" class="recipe-link">
              <img src="${preview}" alt="${title}" class="recipe-image" />
              <div class="recipe-card-bg-cover">
                <svg class="icon-heart">
                  <path
                  d="M15.991 6.848c-2.665-3.117-7.111-3.956-10.449-1.103-3.34 2.854-3.811 7.625-1.187 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.503 0.364 0.057 0.017 0.123 0.027 0.191 0.027s0.134-0.010 0.195-0.029l-0.005 0.001c0.141-0.042 0.262-0.15 0.505-0.364 2.163-1.916 8.764-7.834 10.944-10.64 2.623-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.786-2.016-10.452 1.101z"
                  ></path>
                </svg>
                <div class="recipe-card-text-wrap">         
                  <h3 class="recipe-title">${formatTitle(title)}</h3>
                  <p class="recipe-description">${formatDescription(description)}</p>
                  <div class="ratio-btn-wrap">
                    <div class="rating">
                      <div class="rating-value-white">${rating}</div>
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
                    </div>
                    <button type="button" class="open-recipe-btn" data-id=${_id}>See recipe</button>
                  </div>
                </div>
              </div>
            </a>
          </li>
      `;
    })
    .join('');
}

// ==============RENDER FUNCTIONS======================
export async function renderAllRecipes() {
  try {
    const response = await fetchAllRecipes();

    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }

    const allRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
    addFavoritesClasses();

    let totalPages = response.data.totalPages;

    let category = '';
    let title = '';
    if (totalPages > 1) {
      createPagination(category, title, totalPages);
    }
  } catch (error) {
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

export async function renderSearchedRecipes(searchedTitle) {
  try {
    const response = await fetchRecipeByTitle(searchedTitle);

    if (!response.data.totalPages) {
      recipeList.innerHTML = '';
      Notiflix.Notify.failure('Ooops! No recipes found');
      paginationWrap.classList.add('is-hidden');
      return;
    }

    const allRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
    addFavoritesClasses();

    let totalPages = response.data.totalPages;
    let category = '';
    let title = searchedTitle;

    if (totalPages > 1) {
      createPagination(category, title, totalPages);
      paginationWrap.classList.remove('is-hidden');
    } else {
      paginationWrap.classList.add('is-hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

// export async function renderRecipesByCategory(category) {
//   try {
//     const response = await fetchRecipeByCategory(category);
//     if (!response.data.totalPages) {
//       recipeList.innerHTML = '';
//       Notiflix.Notify.failure('Ooops! No recipes found');
//       paginationWrap.classList.add('is-hidden');
//       return;
//     }

//     const allRecipes = response.data;
//     recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);

//     let totalPages = response.data.totalPages;
//     let category = searchedCategory;
//     let title = '';
//     console.log(title);
//     console.log(response.data.totalPages);
//     if (totalPages > 1) {
//       createPagination(category, title, totalPages);
//       paginationWrap.classList.remove('is-hidden');
//     } else {
//       paginationWrap.classList.add('is-hidden');
//     }
//   } catch (error) {}
// }

export async function renderRecipeByTitlePerPage(title, page) {
  try {
    const response = await fetchRecipeByTitlePerPage(title, page);

    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }

    const pickedRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
    addFavoritesClasses();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

// export async function renderRecipeByCategoryPerPage(category, page) {
//   try {
//     const response = await fetchRecipeByCategoryPerPage(category, page);

//     if (!response.data.totalPages) {
//       Notiflix.Notify.failure('Ooops! No recipes found');
//       return;
//     }

//     const pickedRecipes = response.data;
//     recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Ooops! No recipes found');
//   }
// }

// export async function renderRecipe(category, page) {
//   try {
//     let category = pickedCategory;

//     const response = await fetchRecipeByCategory(category, page);
//     if (!response.data.totalPages) {
//       Notiflix.Notify.failure('Ooops! No recipes found');
//       return;
//     }
//     let title = '';

//     let totalPages = response.data.totalPages;
//     if (totalPages > 1) {
//       console.log(pagination);
//       createPagination(category, title, totalPages);
//     }
//     const pickedRecipes = response.data;
//     recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Ooops! No recipes found');
//   }
// }

export async function renderRecipesOnPerPage(page) {
  try {
    const response = await fetchRecipesByPage(page);
    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }
    const pickedRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
    addFavoritesClasses();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

// export async function renderRecipeByTitlePerPage(title, page) {
//   try {
//     title = searchedTitle;

//     const response = await fetchRecipeByTitlePerPage(title, 2);
//     if (!response.data.totalPages) {
//       Notiflix.Notify.failure('Ooops! No recipes found');
//       return;
//     }
//     let category = '';
//     let totalPages = response.data.totalPages;

//     if (totalPages > 1) {
//       createPagination(category, title, totalPages);
//     }
//     const pickedRecipes = response.data;
//     recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Ooops! No recipes found');
//   }
// }

// ===============HELPER FUNCTIONS============== //

export function formatDescription(description) {
  let result;
  let maxWidth = 0;
  if (document.documentElement.clientWidth < 768) {
    maxWidth = 98;
  } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
    maxWidth = 60;
  } else {
    maxWidth = 68;
  }

  result = description.length <= maxWidth ? description : description.slice(0, maxWidth) + ' ...';

  return result;
}

export function formatTitle(title) {
  let result;
  result = title.length <= 20 ? title : title.slice(0, 20) + ' ...';
  return result;
}

// ================== MAIN ACTIONS ==================
if (recipeList) {
  renderAllRecipes();
}

// pagination.on('afterMove', event => {
//   const { page } = event;
//   /* тут делаешь запрос */
//   // fetch(`https://some-site.com/products?page=${page}`)
//   renderRecipesOnPerPage(page);

//   console.log(page);
// });
// createPagination('Dessert', '', 288);
