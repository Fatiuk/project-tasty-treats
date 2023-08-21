import { fetchDataByPath } from './request-handler.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { createCard } from './cards-recipes-tmpl.js';
import '../css/filter.css';

const API_PATH = '/recipes';
const searchEl = document.querySelector('.input');
const areasSelectForm = document.querySelector('.area');
const ingredientsSelectForm = document.querySelector('.ingredients');
const timeSelectForm = document.querySelector('.time-select');
const viewportWidth = window.innerWidth;

let inputValueArea = null;
let inputValueTime = null;
let inputValueIngredients = null;
let inputValueSearch = null;
let selectedCategory = null;

async function viewportAnalizer(
  API_PATH,
) {
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

searchEl.addEventListener('input', debounce(handleFormSearching, 300));
areasSelectForm.addEventListener('change', handleAreaSelectForm);
timeSelectForm.addEventListener('change', handleTimeSelectForm);
ingredientsSelectForm.addEventListener('change', handleIngredientsSelectForm);

async function handleFormSearching(event) {
  event.preventDefault();
  inputValueSearch = event.target.value.trim();
  if (!inputValueSearch) {
    return;
  }
  const data = await viewportAnalizer(API_PATH);
  createCard(data.results);
}
async function handleAreaSelectForm(event) {
  event.preventDefault();
  inputValueArea = areasSelectForm.value.trim();
  if (!inputValueArea) {
    return;
  }
  const data = await viewportAnalizer(API_PATH);
  createCard(data.results);
}
async function handleTimeSelectForm(event) {
  event.preventDefault();
  inputValueTime = timeSelectForm.value.trim();
  if (!inputValueTime) {
    return;
  }
  const data = await viewportAnalizer(API_PATH);
  createCard(data.results);
}
async function handleIngredientsSelectForm(event) {
  event.preventDefault();
  inputValueIngredients = ingredientsSelectForm.value.trim();
  if (!inputValueIngredients) {
    return;
    }
    console.log(inputValueIngredients);
    const data = await viewportAnalizer(API_PATH);
    console.log(data.results);
  createCard(data.results);
}
