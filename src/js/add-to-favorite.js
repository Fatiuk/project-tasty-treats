import { fetchDataByPath } from './request-handler';
import { Notify } from 'notiflix';

const addToFavorite = document.querySelector('.modal-add-favorite');

addToFavorite.addEventListener('click', addToLocalStorage);

async function addToLocalStorage() {
  const addButtonId = addToFavorite.getAttribute('id');
  const recipeData = await fetchDataByPath(`/recipes/${addButtonId}`);

  const { category, description, preview, rating, title, _id } = recipeData;

  const recipeObject = {
    category,
    description,
    preview,
    rating: rating.toFixed(1),
    title,
    _id,
  };

  let savedData = localStorage.getItem('localRecipes');
  savedData = savedData ? JSON.parse(savedData) : [];

  const existingRecipeIndex = savedData.findIndex(data => data._id === _id);

  if (existingRecipeIndex !== -1) {
    savedData.splice(existingRecipeIndex, 1);
    console.log();
    Notify.warning(`Recipe removed from local storage:, ${recipeObject.title}`);
  } else {
    savedData.push(recipeObject);
    Notify.success(`Recipe added from local storage:, ${recipeObject.title}`);
  }
  localStorage.setItem('localRecipes', JSON.stringify(savedData));
}
