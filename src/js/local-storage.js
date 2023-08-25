export function saveIdToLocaleStorage() {
  const heartButtons = document.querySelectorAll('.btn-heard-icone');
  const savedData = JSON.parse(localStorage.getItem('localRecipes')) || [];

  heartButtons.forEach(button => {
    const buttonId = button
      .closest('.cards-item')
      .querySelector('.cards-item-btn').id;

    if (savedData.some(data => data._id === buttonId)) {
      button.querySelector('path').classList.add('js-fill');
    }

    button.addEventListener('click', () => {
      const card = button.closest('.cards-item');
      const cardData = {
        _id: buttonId,
        category: card.getAttribute('data-category'),
        preview: card.querySelector('.card-img').getAttribute('src'),
        title: card.querySelector('.cards-item-title').textContent,
        rating: card.querySelector('.cards-raiting').textContent,
        description: card.querySelector('.cards-item-text').textContent,
      };

      const index = savedData.findIndex(data => data._id === buttonId);

      if (index !== -1) {
        savedData.splice(index, 1);
        button.querySelector('path').classList.remove('js-fill');
      } else {
        savedData.push(cardData);
        button.querySelector('path').classList.add('js-fill');
      }

      localStorage.setItem('localRecipes', JSON.stringify(savedData));
    });
  });
}
