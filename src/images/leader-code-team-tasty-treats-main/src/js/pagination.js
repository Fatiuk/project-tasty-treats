import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { renderAllRecipes, renderRecipesOnPerPage, renderRecipe, renderRecipeByTitlePerPage, searchedTitle } from './catalog';

import { renderRecipeByCategoryPerPage } from '../js/all-categories';
import { searchedCategory } from '../js/all-categories';
import { renderFavoritesCartsListMarkupPerPage } from './favorites';

const paginationElement = document.getElementById('pagination1');
const paginationElementFav = document.getElementById('pagination2');
const recipeList = document.querySelector('.recipe-list');

export let PER_PAGE = 0;
if (document.documentElement.clientWidth < 768) {
  PER_PAGE = 6;
} else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
  PER_PAGE = 8;
} else {
  PER_PAGE = 9;
}

// export const pagination = new Pagination('pagination', {
//   totalItems: 0,
//   itemsPerPage: PER_PAGE,
//   visiblePages: document.documentElement.clientWidth < 768 ? 2 : 3,
//   page: 1,
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton: '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</span>',
//     moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' + '<span class="tui-ico-ellip">...</span>' + '</a>',
//   },
// });

export function createPagination(category, title, totalPages) {
  let pagination1 = new Pagination('pagination1', {
    totalItems: totalPages * PER_PAGE,
    itemsPerPage: PER_PAGE,
    visiblePages: document.documentElement.clientWidth < 768 ? 2 : 3,
    page: 1,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' + '<span class="tui-ico-ellip">...</span>' + '</a>',
    },
  });

  pagination1.on('afterMove', event => {
    const { page } = event;
    let title = searchedTitle;
    let category = searchedCategory;
    if (title) {
      renderRecipeByTitlePerPage(title, page);
    } else if (category) {
      renderRecipeByCategoryPerPage(category, page);
    } else {
      renderRecipesOnPerPage(page);
    }
  });
}

export function createFavPagination(totalFavItems) {
  let pagination2 = new Pagination('pagination2', {
    totalItems: totalFavItems,
    itemsPerPage: document.documentElement.clientWidth < 768 ? 9 : 12,
    visiblePages: document.documentElement.clientWidth < 768 ? 2 : 3,
    page: 1,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' + '<span class="tui-ico-ellip">...</span>' + '</a>',
    },
  });

  pagination2.on('afterMove', event => {
    const { page } = event;
    renderFavoritesCartsListMarkupPerPage(page);
  });
}
