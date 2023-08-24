export function saveIdToLocaleStorage() {
  const heartButtons = document.querySelectorAll('.btn-heard-icone');

  heartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.cards-item');
      const buttonId = card.querySelector('.cards-item-btn').getAttribute('id');
      let savedData = localStorage.getItem('localRecipes');
      savedData = savedData ? JSON.parse(savedData) : [];
      const cardData = {
        _id: buttonId,
        category: card.getAttribute('data-category'),
        preview: card.querySelector('.card-img').getAttribute('src'),
        title: card.querySelector('.cards-item-title').textContent,
        rating: card.querySelector('.cards-raiting').textContent,
        description: card.querySelector('.cards-item-text').textContent,
      };

      if (savedData.some(data => data._id === buttonId)) {
        savedData = savedData.filter(data => data._id !== buttonId);
        button.querySelector('path').classList.remove('js-fill');
      } else {
        savedData.push(cardData);
        button.querySelector('path').classList.add('js-fill');
      }

      localStorage.setItem('localRecipes', JSON.stringify(savedData));
    });
  });
}
