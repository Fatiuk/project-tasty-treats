import Notiflix from 'notiflix';
import { fetchDataByPath } from './request-handler.js';

const categoryContainer = document.querySelector('.category-container');
const categoriesList = categoryContainer.querySelector('.category-list');

fetchDataByPath('/categories')
  .then(categories => {
    createCategoryList(categories);
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
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
    });

    categoriesList.appendChild(categoryItem);
  });
}

function setActiveCategory(activeItem) {
  const categoryItems = categoriesList.querySelectorAll('.category-button');
  categoryItems.forEach(item => item.classList.remove('active'));
  activeItem.classList.add('active');
}
