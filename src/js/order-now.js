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
  if (refs.orderBackdrop.classList.contains('hidden')) {
    refs.orderBackdrop.classList.remove('hidden');
    refs.headerOpenCartBtn.removeEventListener('click', openOrderModal);
    refs.heroOrderBtn.removeEventListener('click', openOrderModal);
    refs.orderBtnClose.addEventListener('click', closeOrderModal);
  } else {
    return;
  }
}

function closeOrderModal() {
  if (!refs.orderBackdrop.classList.contains('hidden')) {
    refs.orderBackdrop.classList.add('hidden');
    refs.headerOpenCartBtn.addEventListener('click', openOrderModal);
    refs.heroOrderBtn.addEventListener('click', openOrderModal);
    refs.headerOpenCartBtn.removeEventListener('click', closeOrderModal);
  } else {
    return;
  }
}
