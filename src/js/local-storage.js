export function saveIdToLocaleStorage() {
  const heartButtons = document.querySelectorAll('.btn-heard-icone');

  heartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.cards-item');
      const buttonId = card.querySelector('.cards-item-btn').getAttribute('id');
      let savedData = localStorage.getItem('heartedButtons');
      savedData = savedData ? JSON.parse(savedData) : [];

      const cardData = {
        _id: buttonId,
        categories: card.querySelector('.cards-item-title').textContent,
        preview: card.querySelector('.card-img').getAttribute('src'),
        title: card.querySelector('.cards-item-title').textContent,
        rating: card.querySelector('.cards-raiting').textContent,
        description: card.querySelector('.cards-item-text').textContent,
      };

      if (savedData.some(data => data.id === buttonId)) {
        savedData = savedData.filter(data => data.id !== buttonId);
        button.querySelector('path').classList.remove('js-fill');
      } else {
        savedData.push(cardData);
        button.querySelector('path').classList.add('js-fill');
      }

      localStorage.setItem('heartedButtons', JSON.stringify(savedData));
    });
  });
}
