import TastyTreatsAPI from './tasty-treats-api';

const tastyTreatsApi = new TastyTreatsAPI();

const formOrderNow = document.querySelector('.order-form-modal');
const inputsEl = document.querySelectorAll('.order-form-input');
const formBtnEl = document.querySelector('.order-form-btn');

formBtnEl.setAttribute('disabled', true);

async function addOrder(data) {
  try {
    const response = await tastyTreatsApi.createTreats('/orders/add', data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

formOrderNow.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);
  const newOrder = {};

  formData.forEach((value, name) => {
    if (name === 'comment' && value.trim() === '') {
      newOrder[name] = ' ';
    } else {
      newOrder[name] = value;
    }
  });

  formOrderNow.reset();
  addOrder(newOrder);
}

inputsEl.forEach(input => {
  input.addEventListener('input', function () {
    formaValidation();
  });
});

function formaValidation() {
  const areAllInputsFilled = Array.from(inputsEl).every(input => {
    if (input.hasAttribute('required')) {
      return input.value.trim() !== '';
    }
    return true;
  });

  if (areAllInputsFilled) {
    formBtnEl.removeAttribute('disabled');
  } else {
    formBtnEl.setAttribute('disabled', 'disabled');
  }
}

inputsEl.forEach(input => {
  input.addEventListener('input', formaValidation);
});

formaValidation();
