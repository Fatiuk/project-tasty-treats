//ФУНКЦІЯ ЯКА ФАРБУЄ ЗІРКИ В ЗАЛЕЖНОСТІ ВІД РЕЙТИНГУ
export function fillStars() {
  const starRatings = document.querySelectorAll('.card_star-rating');
  starRatings.forEach(starRating => {
    
    //Отримую рейтинг(текст контент) з елемента який має клас'star-rating_value'
    const rating = parseFloat(
      starRating.querySelector('.cards-raiting').textContent
    );

    //Округлюю до цілого числа
    const roundedRating = Math.round(rating);

    //Знахожу всі зірки в даній 'card_star-rating' через айдішку
    const stars = starRating.querySelectorAll('#all-stars');

    // Циклом по кожній зірці замальовую 
    stars.forEach((star, index) => {
      if (index < roundedRating) {
        star.classList.add('js-stars');
      }
    });
  });
};
