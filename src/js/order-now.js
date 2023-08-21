const refs = {
  headerOpenCartBtn: document.querySelector('.cart-button'),
  heroOrderBtn: document.querySelector('.button-hero'),
  orderBackdrop: document.querySelector('.order-backdrop'),
  orderBtnClose: document.querySelector('.order-btn-close'),
};
console.log(refs.orderBtnClose);

refs.headerOpenCartBtn.addEventListener('click', openOrderModal);
refs.heroOrderBtn.addEventListener('click', openOrderModal);

function openOrderModal() {
  refs.orderBackdrop.classList.add('is-open');
  refs.headerOpenCartBtn.removeEventListener('click', openOrderModal);
  refs.heroOrderBtn.removeEventListener('click', openOrderModal);
  refs.orderBtnClose.addEventListener('click', closeOrderModal);
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  refs.orderBackdrop.classList.remove('is-open');
  refs.orderBtnClose.removeEventListener('click', closeOrderModal);
  refs.headerOpenCartBtn.addEventListener('click', openOrderModal);
  refs.heroOrderBtn.addEventListener('click', openOrderModal);
  document.body.style.overflow = 'auto';
}
