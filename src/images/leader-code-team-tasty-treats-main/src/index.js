import './js/preload.js';
import './js/header.js';
import './js/hero.js';
import './js/catalog.js';
import './js/pagination.js';
import './js/popular-recipes.js';
import './js/all-categories.js';
import './js/favorites.js';
import './js/modal-window-recipe.js';
import './js/order.js';
import './js/custom-popup.js';
import './js/theme-switcher.js';
import './js/scroll-to-top.js';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//Initialize the Notify Module with some options
Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});

//Опції SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  disableScroll: true,
});

//Опції Intersection Observer API
let options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};
