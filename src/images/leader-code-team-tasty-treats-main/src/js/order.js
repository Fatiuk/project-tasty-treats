import { openPopupById } from '../js/custom-popup';
import { alertError } from '../js/custom-popup';
import axios from 'axios';
const ORDERS_API = 'https://tasty-treats-backend.p.goit.global/api/orders/add';

const orderForm = document.querySelector('.order-form');
const inputs = document.querySelectorAll('.custom-input');
const addErrorText = true;

if (orderForm) {
  orderForm.addEventListener('submit', orderSend);
}

async function orderSend(e) {
  e.preventDefault();
  const orderForm = this;
  const formIsValid = formValidation(orderForm);
  if (formIsValid === true) {
    openPopupById('loading');
    const formData = {
      name: orderForm.name.value,
      phone: orderForm.phone.value,
      email: orderForm.email.value,
      comment: orderForm.comment.value,
    };
    if (orderForm.comment.value === '') {
      delete formData.comment;
    }
    axios({
      method: 'POST',
      url: ORDERS_API,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(request => {
        setTimeout(() => {
          openPopupById('ok');
          orderForm.reset();
        }, 500);
      })
      .catch(error => {
        setTimeout(() => {
          alertError(error.request.statusText, error.message);
        }, 500);
      });
  }
}

inputs.forEach(input => {
  input.addEventListener('focus', clearInput);
});

function clearInput() {
  const label = this.closest('.label');
  const labelError = label.querySelector('.label__error');
  if (labelError) {
    labelError.classList.remove('active');
    setTimeout(() => {
      labelError.remove();
    }, 250);
  }
  this.classList.remove('red');
}

//form validation
function formValidation(formId) {
  let checker = true;
  formId.querySelectorAll('[required]').forEach(required => {
    const requiredLabel = required.closest('.label');
    if (required.value.length === 0) {
      addErrorMarkup(requiredLabel, 'The field is empty!');
    } else {
      //Name
      if (required.name == 'name' && /[^A-zА-яЁё\+ ()\-]/.test(required.value)) {
        addErrorMarkup(requiredLabel, 'Name cannot contain digits!');
      }
      //type tel
      if (required.type == 'tel' && /[^0-9\+ ()\-]/.test(required.value)) {
        addErrorMarkup(requiredLabel, 'Wrong phone format!');
      }
      //email
      if (required.type == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(required.value)) {
        addErrorMarkup(requiredLabel, 'Wrong E-mail format!');
      }
    }

    //add error text to markup
    function addErrorMarkup(correntLabel, text) {
      if (addErrorText === true) {
        const errors = correntLabel.querySelectorAll('.label__error').length;
        if (errors < 1) {
          correntLabel.insertAdjacentHTML('beforeend', `<div class="label__error">${text}</div>`);
          setTimeout(function () {
            correntLabel.querySelector('.label__error').classList.add('active');
          }, 5);
        }
      }
      checkerFalse();
    }

    //ADD "RED" CLASS TO INPUTS
    function checkerFalse() {
      required.classList.add('red');
      checker = false;
    }
  });
  return checker;
}
