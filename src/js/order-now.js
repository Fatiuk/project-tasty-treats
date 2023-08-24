const refs = {
  headerOpenCartBtn: document.querySelector('.cart-button'),
  heroOrderBtn: document.querySelector('.button-hero'),
  orderBackdrop: document.querySelector('.order-backdrop'),
  orderBtnClose: document.querySelector('.order-btn-close'),
};

refs.headerOpenCartBtn.addEventListener('click', openOrderModal);
if (!window.location.pathname.includes('favorites.html')) {
  refs.heroOrderBtn.addEventListener('click', openOrderModal);
}

function openOrderModal() {
  refs.orderBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  refs.orderBtnClose.addEventListener('click', closeOrderModal);
  refs.orderBackdrop.addEventListener('click', closeOrderModalOnBackdrop);
  window.addEventListener('keydown', handleEscClose);
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closeOrderModal();
  }
}

function closeOrderModal() {
  refs.orderBackdrop.classList.remove('is-open');
  document.body.style.overflow = 'auto';
  refs.orderBtnClose.removeEventListener('click', closeOrderModal);
  window.removeEventListener('keydown', handleEscClose);
  refs.orderBackdrop.removeEventListener('click', closeOrderModalOnBackdrop);
}

function closeOrderModalOnBackdrop() {
  if (event && event.target === refs.orderBackdrop) {
    refs.orderBackdrop.classList.remove('is-open');
    document.body.style.overflow = 'auto';
    refs.orderBtnClose.removeEventListener('click', closeOrderModal);
    window.removeEventListener('keydown', handleEscClose);
    refs.orderBackdrop.removeEventListener('click', closeOrderModalOnBackdrop);
  }
}
