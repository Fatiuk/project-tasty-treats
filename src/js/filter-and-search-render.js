import { fetchDataByPath } from './request-handler.js';
import debounce from 'lodash.debounce';
import { createCard } from './cards-recipes-tmpl.js';

const API_PATH = '/recipes';
const searchEl = document.querySelector('.input');
const areasSelectForm = document.querySelector('.area');
const ingredientsSelectForm = document.querySelector('.ingredients');
const timeSelectForm = document.querySelector('.time-select');
const allCategoriesBtn = document.querySelector('.all-categories');
const categoriesSelectorList = document.querySelector('.category-list');
const viewportWidth = window.innerWidth;

let inputValueArea = null;
let inputValueTime = null;
let inputValueIngredients = null;
let inputValueSearch = null;
let selectedCategory = null;
let clickedCategoryBtn = null;

async function viewportAnalizer(API_PATH) {
  if (viewportWidth < 768) {
    return await fetchDataByPath(
      API_PATH,
      null,
      null,
      selectedCategory,
      inputValueTime,
      inputValueArea,
      inputValueIngredients,
      inputValueSearch
    );
  } else if (viewportWidth >= 768 && viewportWidth < 1280) {
    return await fetchDataByPath(
      API_PATH,
      null,
      8,
      selectedCategory,
      inputValueTime,
      inputValueArea,
      inputValueIngredients,
      inputValueSearch
    );
  } else {
    return await fetchDataByPath(
      API_PATH,
      null,
      9,
      selectedCategory,
      inputValueTime,
      inputValueArea,
      inputValueIngredients,
      inputValueSearch
    );
  }
}

console.log('Filter and search file on');

async function handleFilterChange(event, filterType) {
  event.preventDefault();

  let inputValue = null;

  switch (filterType) {
    case 'search':
      inputValue = event.target.value.trim();
      break;
    case 'area':
      inputValue = areasSelectForm.value.trim();
      break;
    case 'time':
      inputValue = timeSelectForm.value.trim();
      break;
    case 'ingredients':
      inputValue = ingredientsSelectForm.value.trim();
      break;
    default:
      break;
  }

  if (!inputValue) {
    return;
  }

  switch (filterType) {
    case 'search':
      inputValueSearch = inputValue;
      break;
    case 'area':
      inputValueArea = inputValue;
      break;
    case 'time':
      inputValueTime = inputValue;
      break;
    case 'ingredients':
      inputValueIngredients = inputValue;
      break;
    default:
      break;
  }

  const data = await viewportAnalizer(API_PATH);
  createCard(data.results);
}



function resetAllParams() {
  inputValueArea = null;
  inputValueTime = null;
  inputValueIngredients = null;
  inputValueSearch = null;
  selectedCategory = null;
}

function clearAllFilters() {
  searchEl.value = '';
  console.log('Filters are clear');
}

async function handleAllCategoriesBtn(event) {
  event.preventDefault();
  resetAllParams();
  clearAllFilters();
  allCategoriesBtn.classList.add('active-all');
  
  if (!selectedCategory && clickedCategoryBtn) {
    clickedCategoryBtn.classList.remove('active');
  }
  
  const data = await viewportAnalizer(API_PATH);
  createCard(data.results);
}

async function handleCategoriesSelectorList(event) {
  event.preventDefault();
  
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  
  if (!selectedCategory) {
    allCategoriesBtn.classList.remove('active-all');
  }
  
  if (clickedCategoryBtn != null) {
    clickedCategoryBtn.classList.remove('active');
  }
  
  clickedCategoryBtn = event.target;
  clickedCategoryBtn.classList.add('active');
  selectedCategory = clickedCategoryBtn.textContent;
  
  const data = await viewportAnalizer(API_PATH);
  createCard(data.results);
}

searchEl.addEventListener(
  'input',
  debounce(event => handleFilterChange(event, 'search'), 300)
);
areasSelectForm.addEventListener('change', event =>
  handleFilterChange(event, 'area')
);
timeSelectForm.addEventListener('change', event =>
  handleFilterChange(event, 'time')
);
ingredientsSelectForm.addEventListener('change', event =>
  handleFilterChange(event, 'ingredients')
);
allCategoriesBtn.addEventListener('click', handleAllCategoriesBtn);
categoriesSelectorList.addEventListener('click', handleCategoriesSelectorList);
