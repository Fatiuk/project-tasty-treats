import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';
import { createFavPagination } from './pagination';
import { formatTitle, formatDescription } from './catalog';

const favoritesPage = document.querySelector('.favorites-main-wrapper');
const paginationWrap2 = document.querySelector('#pagination2');

let favoritesData = [];
if (localStorage.favorites) {
  favoritesData = JSON.parse(localStorage.favorites);
}

let PER_PAGE_FAV = 0;
if (document.documentElement.clientWidth < 768) {
  PER_PAGE_FAV = 9;
} else {
  PER_PAGE_FAV = 12;
}

let totalFavItems = 0;
if (localStorage.favorites) {
  favoritesData = JSON.parse(localStorage.favorites);
  totalFavItems = favoritesData.length;
}

window.addEventListener('click', catchAddToFavoritesButtons);
renderFavoritesMarkup();

function catchAddToFavoritesButtons(e) {
  if (e.target.classList.contains('icon-heart') || e.target.classList.contains('favorite-btn')) {
    addToFavorites(e.target);

    if (localStorage.favorites) {
      totalFavItems = JSON.parse(localStorage.favorites).length;
    } else {
      totalFavItems = 0;
    }

    if (totalFavItems > PER_PAGE_FAV && paginationWrap2.classList.contains('is-hidden')) {
      paginationWrap2.classList.remove('is-hidden');
    }

    if (totalFavItems <= PER_PAGE_FAV && !paginationWrap2.classList.contains('is-hidden')) {
      paginationWrap2.classList.add('is-hidden');
    }
  }
}

function addToFavorites(card) {
  const cardElement = card.closest('.recipe-item');
  if (cardElement.classList.contains('is-favorite')) {
    daleteFromFavorites(cardElement.dataset.id);
    cardElement.classList.remove('is-favorite');
    return;
  }
  cardElement.classList.add('is-favorite');
  const cardInfo = {
    id: cardElement.dataset.id,
    category: cardElement.dataset.category,
    preview: cardElement.dataset.preview,
    title: cardElement.dataset.title,
    description: cardElement.dataset.description,
    rating: cardElement.dataset.rating,
  };
  favoritesData.push(cardInfo);
  localStorage.favorites = JSON.stringify(favoritesData);
}

function daleteFromFavorites(id) {
  favoritesData = favoritesData.filter(data => data.id !== id);
  localStorage.favorites = JSON.stringify(favoritesData);
  if (favoritesPage) {
    renderFavoritesMarkup();
  }
}

export function addFavoritesClasses() {
  if (localStorage.favorites) {
    const ollRecepiesCards = document.querySelectorAll('.recipe-item');
    ollRecepiesCards.forEach(recepie => {
      favoritesData.forEach(currentIdList => {
        if (currentIdList.id === recepie.dataset.id) {
          recepie.classList.add('is-favorite');
        }
      });
    });
  }
}

function renderFavoritesMarkup() {
  if (favoritesPage) {
    if (favoritesData.length === 0) {
      renderEmptyFavoritesMarkup();
      return;
    }
    renderFavoritesFilterNavigationMarkup();
    renderFavoritesCartsListMarkup();
  }
}

function renderEmptyFavoritesMarkup() {
  document.querySelector('.fav-def-img').classList.add('del_in_mobil');
  favoritesPage.innerHTML = `
      <div class="fav-default">
        <svg xmlns="http://www.w3.org/2000/svg" class="fav-icon" width="68" height="58" viewBox="0 0 97 83" fill="none">
          <path d="M19 33H79V79H19V33Z" fill="#9BB537"/>
          <path d="M43 29.5C43 41.3741 33.3741 51 21.5 51C9.62588 51 0 41.3741 0 29.5C0 17.6259 9.62588 8 21.5 8C33.3741 8 43 17.6259 43 29.5Z" fill="#9BB537"/>
          <path d="M70 21.5C70 33.3741 60.3741 43 48.5 43C36.6259 43 27 33.3741 27 21.5C27 9.62588 36.6259 0 48.5 0C60.3741 0 70 9.62588 70 21.5Z" fill="#9BB537"/>
          <path d="M97 29.5C97 41.3741 87.3741 51 75.5 51C63.6259 51 54 41.3741 54 29.5C54 17.6259 63.6259 8 75.5 8C87.3741 8 97 17.6259 97 29.5Z" fill="#9BB537"/>
          <path d="M19 76H79V81.2807C79 82.2302 78.1605 83 77.125 83H20.875C19.8395 83 19 82.2302 19 81.2807V76Z" fill="#F8F8F8"/>
          <path d="M37 26.8705C37 25.2852 38.1193 24 39.5 24C40.8807 24 42 25.2852 42 26.8705V40.1295C42 41.7148 40.8807 43 39.5 43C38.1193 43 37 41.7148 37 40.1295V26.8705Z" fill="#F8F8F8"/>
          <path d="M45 26.8705C45 25.2852 46.567 24 48.5 24C50.433 24 52 25.2852 52 26.8705V40.1295C52 41.7148 50.433 43 48.5 43C46.567 43 45 41.7148 45 40.1295V26.8705Z" fill="#F8F8F8"/>
          <path d="M55 26.8705C55 25.2852 56.1193 24 57.5 24C58.8807 24 60 25.2852 60 26.8705V40.1295C60 41.7148 58.8807 43 57.5 43C56.1193 43 55 41.7148 55 40.1295V26.8705Z" fill="#F8F8F8"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1035 8.12123C73.8519 8.04342 74.6116 8.00354 75.3806 8.00354C85.0139 8.00354 93.1756 14.2612 95.9703 22.9072C95.2219 22.985 94.4622 23.0248 93.6931 23.0248C84.0599 23.0248 75.8982 16.7672 73.1035 8.12123Z" fill="#050505"/>
        </svg>
        <p class="favorites-text">
          It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for
          easier access in the future.
        </p>
      </div>
      `;
}

function renderFavoritesFilterNavigationMarkup() {
  const favoritesFilter = document.querySelector('.js-favorites-filter');
  if (favoritesFilter) {
    favoritesFilter.innerHTML = '';
    let categories = [
      {
        category: 'all',
        text: 'All categories',
      },
    ];
    favoritesData.forEach(data => {
      categories.push({
        category: data.category,
        text: data.category,
      });
    });
    let favoritesFilterMarkup = categories.map(
      ({ categorie, text }) =>
        `<div class="swiper-slide"><button type="button" data-category="${categorie}" class="fav-categoty-btn">${text}</button></div>`
    );
    favoritesFilter.insertAdjacentHTML('beforeend', favoritesFilterMarkup.join(''));
    initFavoriteSlider();
  }
}

function renderFavoritesCartsListMarkup() {
  const favoritesCards = document.querySelector('.favorite-render-cards');
  if (favoritesCards) {
    favoritesCards.innerHTML = '';

    let favoritesCardsMarkup = '';

    if (favoritesData.length <= PER_PAGE_FAV) {
      favoritesCardsMarkup = favoritesData.map(
        ({ id, category, preview, title, description, rating }) =>
          `
          <li
          class="recipe-item js-data-info is-favorite"
          data-title="${title}"
          data-description="${description}"
          data-preview="${preview}"
          data-rating="${rating}"
          data-id="${id}"
          data-category="${category}"
          >
            <a href="${preview}" class="recipe-link">
              <img
                src="${preview}"
                alt="Lamb Rogan josh"
                class="recipe-image"
              />
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
                      <div class="rating-value-white">${Number(rating).toFixed(1)}</div>
                      <div class="rating-body">
                        <div class="rating-active" style="width: 79.6%">
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
                    <button type="button" class="open-recipe-btn" data-id="${id}">See recipe</button>
                  </div>
                </div>
              </div>
            </a>
          </li>  
          `
      );
    } else {
      let newFavoritesData = favoritesData.filter((recipe, index) => index < PER_PAGE_FAV);

      favoritesCardsMarkup = newFavoritesData.map(
        ({ id, category, preview, title, description, rating }) =>
          `
          <li
          class="recipe-item js-data-info is-favorite"
          data-title="${title}"
          data-description="${description}"
          data-preview="${preview}"
          data-rating="${rating}"
          data-id="${id}"
          data-category="${category}"
          >
            <a href="${preview}" class="recipe-link">
              <img
                src="${preview}"
                alt="Lamb Rogan josh"
                class="recipe-image"
              />
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
                      <div class="rating-value-white">${Number(rating).toFixed(1)}</div>
                      <div class="rating-body">
                        <div class="rating-active" style="width: 79.6%">
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
                    <button type="button" class="open-recipe-btn" data-id="${id}">See recipe</button>
                  </div>
                </div>
              </div>
            </a>
          </li>  
          `
      );
    }

    favoritesCards.insertAdjacentHTML('beforeend', favoritesCardsMarkup.join(''));
  }
}

function initFavoriteSlider() {
  new Swiper('.swiper-favorite-navigation', {
    speed: 400,
    slidesPerView: 'auto',
    spaceBetween: 12,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
    },
  });
}

// =============== PAGINATION=============

if (document.title === 'Favorites tasty treats' && totalFavItems > PER_PAGE_FAV) {
  createFavPagination(totalFavItems);
}

export function renderFavoritesCartsListMarkupPerPage(page) {
  const favoritesCards = document.querySelector('.favorite-render-cards');

  if (favoritesCards) {
    favoritesCards.innerHTML = '';

    let favoritesCardsMarkup = '';
    let newfavoritesData = [];
    let startPoint = (page - 1) * PER_PAGE_FAV;
    let endPoint = startPoint + PER_PAGE_FAV - 1;

    newfavoritesData = favoritesData.filter((recipe, index) => index >= startPoint && index <= endPoint);

    favoritesCardsMarkup = newfavoritesData.map(
      ({ id, category, preview, title, description, rating }) =>
        `
          <li
          class="recipe-item js-data-info is-favorite"
          data-title="${title}"
          data-description="${description}"
          data-preview="${preview}"
          data-rating="${rating}"
          data-id="${id}"
          data-category="${category}"
          >
            <a href="${preview}" class="recipe-link">
              <img
                src="${preview}"
                alt="Lamb Rogan josh"
                class="recipe-image"
              />
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
                      <div class="rating-value-white">${Number(rating).toFixed(1)}</div>
                      <div class="rating-body">
                        <div class="rating-active" style="width: 79.6%">
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
                    <button type="button" class="open-recipe-btn" data-id="${id}">See recipe</button>
                  </div>
                </div>
              </div>
            </a>
          </li>  
          `
    );

    favoritesCards.insertAdjacentHTML('beforeend', favoritesCardsMarkup.join(''));
  }
}
