const btn = document.getElementById('button');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

btn.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
