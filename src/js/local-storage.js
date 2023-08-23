export function saveIdToLocaleStorage() {
  //Знайшов всі кнопки з сердечками
  const heartButtons = document.querySelectorAll('.btn-heard-icone');

  //Даю кожній кнопці слухача
  heartButtons.forEach(button => {
    button.addEventListener('click', () => {
      //Шукаю карточку для кнопки
      const card = button.closest('.cards-item');

      //id кнопки
      const buttonId = card.querySelector('.cards-item-btn').getAttribute('id');

      //Достаю дані з локал стореджа
      let savedData = localStorage.getItem('heartedButtons');

      //Якщо є, то парсю, якщо ні - роблю пустий масив
      savedData = savedData ? JSON.parse(savedData) : [];

      //Якщо айдішка кнопки є в масиві локал стореджа, то удаляю її
      if (savedData.includes(buttonId)) {
        savedData = savedData.filter(id => id !== buttonId);
        button.querySelector('path').classList.remove('js-fill');
      } else {
        savedData.push(buttonId);
        button.querySelector('path').classList.add('js-fill');
      }

      localStorage.setItem('heartedButtons', JSON.stringify(savedData));
    });
  });
}
