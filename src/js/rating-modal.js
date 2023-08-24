import TastyTreatsAPI from './tasty-treats-api';

const tastyTreatsApi = new TastyTreatsAPI();

const formRating = document.querySelector('#ratingForm')
const btnSubmit = document.querySelector('.rating-send-btn');
const inputStar = document.querySelectorAll('.star-rating');
const inputEmail = document.querySelector('.rating-email-input');
const closeModal = document.querySelector('.rating-backdrop');
const ratingEl = document.querySelector('.rating-rating-value');
const starEl = document.querySelectorAll('.star')

btnSubmit.setAttribute('disabled', true);

async function updateTreats(id, data) {
    try{
        const response = await tastyTreatsApi.updateTreats(`/recipes/${id}/rating`, data);
        console.log(response);
    }catch(error){
        console.error(error);
    }

};

btnSubmit.addEventListener('click', handleBtnClick);

function handleBtnClick() {
    const id = btnSubmit.id;
    console.log(id);
    const emailValue = inputEmail.value.trim();
    
let ratingValue = 0;

inputStar.forEach(input => {
            if (input.checked) {
            ratingValue = input.value;
        console.log(ratingValue);
        }});
        
const data = {
    rate: parseInt(ratingValue),
    email: emailValue,
};
    updateTreats(id, data);
    resetRating();
};

inputEmail.addEventListener('input', function() {
    const emailValue = inputEmail.value.trim();
    if (emailValue) {
        btnSubmit.removeAttribute('disabled');
  } else {
    btnSubmit.setAttribute('disabled', 'disabled');
  }
});

// Оновлення рейтингу
inputStar.forEach((input) => {
    input.addEventListener('click', function() {
        ratingEl.textContent = parseInt(input.value) + '.0';
        starEl.forEach((star, index) => {
                if (index < ratingEl.textContent) {
                  star.classList.add('js-stars');
                }else{
                    star.classList.remove('js-stars');
                }
              });
    });
});


function resetRating() {
    formRating.reset()
    inputEmail.value = '';
    ratingEl.textContent = '0.0';
    closeModal.classList.remove('is-open')
};

