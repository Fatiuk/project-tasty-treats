import axios from 'axios';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createAllRecipesMarkUp, searchedTitle } from './catalog';
import { PER_PAGE } from './pagination';
import { searchInput, recipeList } from './catalog';
import { createPagination } from './pagination';
import { paginationWrap } from './catalog';
import { recipeList } from './catalog';
import { addFavoritesClasses } from '../js/favorites';

const categoryContainer = document.querySelector('all-categories-js');
const categoriesAll = document.querySelector('.categories-wrapper');
const btnCategory = document.querySelector('.btn-all');
//const recipeList = document.querySelector('.recipe-list');
export const allCategories = document.querySelector('.all-categories');
const blokCategory = document.querySelector('.categories-container');
const itemCat = document.querySelector('.categories-item');
const reserWrap = document.querySelector('.reset-wrap');

//------
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
export let searchedCategory = '';

//------
async function getFetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}categories`);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Ooops! No categories found');
  }
}
//-----
async function getCategoriesAll() {
  try {
    const data = await getFetchCategories();
    const categoriesList = createAllCategoriesMarkup(data);
    categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
  } catch (error) {
    Notiflix.Notify.failure('Ooops! No categories found');
  }
}
if (categoriesAll) {
  getCategoriesAll();
}
//------
function createAllCategoriesMarkup(categories) {
  return categories
    .map(({ _id, name }) => {
      return `
        <li class="categories-item" data-id=${_id}>
        <button class="btn-all">${name}</button>
        </li>`;
    })
    .join('');
}
//-----------------------------------------//

if (categoriesAll) {
  categoriesAll.addEventListener('click', handleCategoriesListClick);
}

function handleCategoriesListClick(event) {
  if (!event.target.classList.contains('btn-all')) {
    return;
  }

  // Прибираємо активний клас з попередньої кнопки
  const previousActiveBtn = document.querySelector('.category-btn-active');
  if (previousActiveBtn) {
    previousActiveBtn.classList.remove('category-btn-active');
  }

  // Встановлюємо активний клас на нову кнопку
  event.target.classList.add('category-btn-active');

  // Прибираємо активний клас з головної кнопки
  allCategories.classList.remove('active');

  // Очищаємо інпут
  searchInput.value = '';

  searchedCategory = event.target.innerText;

  renderRecipeByCategory(searchedCategory);
}
if (allCategories) {
  allCategories.addEventListener('click', handleAllCategoriesClick);
}
   function handleAllCategoriesClick() {
    if (searchedCategory) {
      searchedCategory = '';
     }
     if (paginationWrap.classList.contains('is-hidden')) {
    paginationWrap.classList.remove('is-hidden');
     }
     const previousActiveBtn = document.querySelector('.category-btn-active');
  if (previousActiveBtn) {
    previousActiveBtn.classList.remove('category-btn-active');
  }
}
if (reserWrap) {
  reserWrap.addEventListener('click', onResetClick);
}

function onResetClick() {
  if (searchedCategory) {
    searchedCategory = '';
  }
}

async function fetchRecipeByCategory(category) {
  const response = await axios.get(`${BASE_URL}recipes?category=${category}&limit=${PER_PAGE}`);
  return response;
}

export async function fetchRecipeByCategoryPerPage(category, page) {
  const response = await axios.get(`${BASE_URL}recipes?category=${category}&limit=${PER_PAGE}&page=${page}`);
  return response;
}

export async function renderRecipeByCategory(category) {
  try {
    let category = searchedCategory;
    const response = await fetchRecipeByCategory(category);
    if (!response.data.totalPages) {
      recipeList.innerHTML = '';
      Notiflix.Notify.failure('Ooops! No recipes found');
      paginationWrap.classList.add('is-hidden');
      return;
    }
    const pickedRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
    addFavoritesClasses();

    // Додаємо пагінацію
    let totalPages = response.data.totalPages;

    let title = '';

    if (allCategories) {
      allCategories.addEventListener('click', handleAllCategoriesClick);
    }
    function handleAllCategoriesClick() {
      if (searchedCategory) {
        searchedCategory = '';
      }
    }
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

export async function renderRecipeByCategoryPerPage(category, page) {
  try {
    const response = await fetchRecipeByCategoryPerPage(category, page);

    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }

    const pickedRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
    addFavoritesClasses();
  } catch (error) {
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

