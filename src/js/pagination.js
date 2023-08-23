// import Pagination from 'tui-pagination';

// const container = document.getElementById('pagination');
// const itemsPerPage = 9; // Кількість об'єктів на сторінці
// const totalItems = 360; // Загальна кількість об'єктів
// const API_PATH = '/recipes';

// const options = {
//   totalItems: totalItems,
//   itemsPerPage: itemsPerPage,
//   visiblePages: 3, // Кількість видимих сторінок в пагінаторі
//   page: 1, // Початкова активна сторінка
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<span class="tui-page-btn tui-is-selected">{{page}}</span>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}"></span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}"></span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };

// const pagination = new Pagination(container, options);

// function getCurrentPage() {
//   pagination.on('afterMove', event => {
//     const currentPage = event.page;
//     console.log('Current page:', currentPage);
    
//   });

// }

// getCurrentPage();
