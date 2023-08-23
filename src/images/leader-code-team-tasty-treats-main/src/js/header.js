const burger = document.querySelector('.js-open-menu');
const menuLinks = document.querySelectorAll('.nav-link');
const burgerMenu = document.querySelector('.mobil-menu-wrapper');
const currentPath = window.location.pathname;

markCurrentLink();

function markCurrentLink() {
  if (menuLinks.length > 0 && currentPath !== '/') {
    menuLinks.forEach(link => {
      link.classList.remove('current');
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('current');
      }
    });
  }
}

burger.addEventListener('click', openBurgerMenu);
burgerMenu.addEventListener('click', menuOnClick);

function openBurgerMenu() {
  burgerMenu.classList.add('is-open');
  document.body.classList.add('locked');
}

function menuOnClick(e) {
  if (e.target.classList.contains('mobil-menu-wrapper') || e.target.classList.contains('js-close-menu')) {
    closeBurgerMenu();
  }
}

function closeBurgerMenu() {
  burgerMenu.classList.remove('is-open');
  document.body.classList.remove('locked');
}
