import Notiflix from 'notiflix';
import { fetchDataByPath } from './request-handler.js';

const categoryContainer = document.querySelector('.category-container');
const allCategoriesBtn = categoryContainer.querySelector('.all-categories');
const categoriesList = categoryContainer.querySelector('.category-list');

// allCategoriesBtn.addEventListener('click', () => {
//   setActiveCategory(allCategoriesBtn);
//   fetchDataByCategory(null);
// });

fetchDataByPath('/categories')
  .then(categories => {
    createCategoryList(categories);
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
    // Тут можна використовувати Notiflix.Notify.failure() для відображення повідомлення про помилку
  });

function createCategoryList(categories) {
  categoriesList.innerHTML = '';
  categories.forEach(category => {
    console.log();
    const categoryItem = document.createElement('li');

    const categoryButton = document.createElement('button');
    categoryButton.textContent = category.name;
    categoryButton.classList.add('category-button');
    categoryItem.appendChild(categoryButton);

    categoryButton.addEventListener('click', () => {
      setActiveCategory(categoryButton.parentElement);
      // fetchDataByCategory(category.id);
    });

    categoriesList.appendChild(categoryItem);
  });
}

// function fetchDataByCategory(categoryId) {
//   clearRecipes();
//   // Ваш код для виконання запиту на бекенд за рецептами за обраною категорією або всіма категоріями
//   // .then(recipes => {
//   //   displayRecipes(recipes);
//   // })
//   // .catch(error => {
//   //   console.error('Error fetching recipes by category:', error);
//   //   // Тут можна використовувати Notiflix.Notify.failure() для відображення повідомлення про помилку
//   // });
// }

function setActiveCategory(activeItem) {
  const categoryItems = categoriesList.querySelectorAll('.category-button');
  categoryItems.forEach(item => item.classList.remove('active'));
  activeItem.classList.add('active');
}

// function clearRecipes() {
//   // Ваш код для очищення попередніх рецептів тут
// }

// // Функція для відображення рецептів
// function displayRecipes(recipes) {
//   // Ваш код для відображення рецептів тут
// }
