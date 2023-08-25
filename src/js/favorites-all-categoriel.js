import { Notify } from 'notiflix';

const ulElement = document.querySelector('.favorites-category-list');

if (localStorage.getItem('localRecipes')) {
  const localRecipes = JSON.parse(localStorage.getItem('localRecipes'));

  localRecipes.forEach(recipe => {
    if (
      !ulElement.querySelector(`button[data-category="${recipe.category}"]`)
    ) {
      const liElement = document.createElement('li');
      const categoryButton = document.createElement('button');
      categoryButton.textContent = recipe.category;
      categoryButton.classList.add('favorites-category-button');
      categoryButton.setAttribute('data-category', recipe.category);

      categoryButton.addEventListener('click', () => {
        Notify.info(`Selected category: ${recipe.category}`);

        const category = recipe.category;
        const cards = document.querySelectorAll('.cards-item');
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory !== category) {
            card.style.display = 'none';
          } else {
            card.style.display = 'block';
          }
        });
      });

      const allCategoriesButton = document.querySelector(
        '.all-categories.fav-btn'
      );

      allCategoriesButton.addEventListener('click', () => {
        const cards = document.querySelectorAll('.cards-item');
        cards.forEach(card => {
          card.style.display = 'block';
        });
      });

      liElement.appendChild(categoryButton);
      ulElement.appendChild(liElement);
    }
  });

  const favoritesIconButtons = document.querySelectorAll(
    '.favorites-icone-btn'
  );

  favoritesIconButtons.forEach(button => {
    button.addEventListener('click', () => {
      location.reload();
    });
  });
} else {
  Notify.warning('In favorites, there is no data about recipes.');
}
