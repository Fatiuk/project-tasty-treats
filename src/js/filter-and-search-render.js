import { fetchDataByPath } from './request-handler.js';
import debounce from 'lodash.debounce';
import { createCard } from './cards-recipes-tmpl.js';
import Pagination from 'tui-pagination';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_PATH = '/recipes';
const searchEl = document.querySelector('.input');
const areasSelectForm = document.querySelector('.area');
const ingredientsSelectForm = document.querySelector('.ingredients');
const timeSelectForm = document.querySelector('.time-select');
const allCategoriesBtn = document.querySelector('.all-categories');
const categoriesSelectorList = document.querySelector('.category-list');
const container = document.getElementById('pagination');
const resetBtn = document.querySelector('.reset-btn');
const failureTextEl = document.querySelector('.failure-wrap');
const viewportWidth = window.innerWidth;

let inputValueArea = null;
let inputValueTime = null;
let inputValueIngredients = null;
let inputValueSearch = null;
let selectedCategory = null;
let clickedCategoryBtn = null;
let itemsPerPage = 9;
let totalItems = 360;
let page = 1;
let visiblePages = 3;

if (viewportWidth < 768) {
  itemsPerPage = 6;
  visiblePages = 2;
} else if (viewportWidth >= 768 && viewportWidth < 1280) {
  itemsPerPage = 8;
} else {
  itemsPerPage = 9;
}

const options = {
  totalItems: totalItems,
  itemsPerPage: itemsPerPage,
  visiblePages: visiblePages, // Кількість видимих сторінок в пагінаторі
  page: 1, // Початкова активна сторінка
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#recipes" class="tui-page-btn" aria-label="Go to page {{page}}">{{page}}</a>',
    currentPage:
      '<span class="tui-page-btn tui-is-selected" aria-label="Current page {{page}}">{{page}}</span>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}" aria-label="{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}" aria-label="Disabled {{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip" aria-label="More {{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(container, options);

function getCurrentPage() {
  pagination.on('afterMove', async event => {
    page = event.page;
    Loading.standard('Loading...', { svgColor: '#9bb537' });
    const data = await viewportAnalizer(API_PATH);
    createCard(data.results);
    Loading.remove();
  });
}

async function viewportAnalizer(API_PATH) {
  return await fetchDataByPath(
    API_PATH,
    page,
    itemsPerPage,
    selectedCategory,
    inputValueTime,
    inputValueArea,
    inputValueIngredients,
    inputValueSearch
  );
}

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
  page = 1;
  dataAndPagination();
}
function checkInTotalPages(totalItems) {
  if (totalItems < itemsPerPage) {
    container.classList.add('hide');
    failureTextEl.classList.remove('hide');
    Notiflix.Notify.failure('We have no matches for this query');
  } else if (totalItems == itemsPerPage) {
    container.classList.add('hide');
  } else {
    container.classList.remove('hide');
    failureTextEl.classList.add('hide');
  }
}
function resetAllParams() {
  inputValueArea = null;
  inputValueTime = null;
  inputValueIngredients = null;
  inputValueSearch = null;
  selectedCategory = null;
  totalItems = 360;
}

function clearAllFilters() {
  searchEl.value = '';
}

async function handleAllCategoriesBtn(event) {
  event.preventDefault();
  resetAllParams();
  clearAllFilters();
  allCategoriesBtn.classList.add('active-all');

  if (!selectedCategory && clickedCategoryBtn) {
    clickedCategoryBtn.classList.remove('active');
  }
  page = 1;
  dataAndPagination();
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
  page = 1;
  dataAndPagination();
}
async function dataAndPagination() {
  Loading.standard('Loading...', { svgColor: '#9bb537' });
  const data = await viewportAnalizer(API_PATH);
  totalItems = Number(data.totalPages) * itemsPerPage;
  pagination.reset(totalItems);
  checkInTotalPages(totalItems);
  createCard(data.results);
  Loading.remove();
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
resetBtn.addEventListener('click', handleAllCategoriesBtn);
document.addEventListener(
  'DOMContentLoaded',
  dataAndPagination(),
  getCurrentPage()
);
