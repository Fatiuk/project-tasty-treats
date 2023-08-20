import TastyTreatsAPI from './tasty-treats-api';
import Notiflix from 'notiflix';


const tastyTreatsApi = new TastyTreatsAPI();

const formOrderNow = document.querySelector('.order-form-modal');

async function addOrder(data) {
    try{
        const response = await tastyTreatsApi.createTreats('/orders/add', data) 
        console.log(response);
        
    }catch(error) {
        console.log(error);
    }
   
}

formOrderNow.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const newOrder = {};

    formData.forEach((value, name) => {
        newOrder[name] = value;
    });
    formOrderNow.reset();
    console.log(newOrder);
    addOrder(newOrder)
const {name, phone, email, comment} = evt.target.elements;
console.log(name.value);
// if(!name.value || !phone.value || !email.value || !comment.value){
//     Notiflix.Notify.warning('Всі поля повинні бути заповнені')
//     return
//    };
//    Notiflix.Notify.success('Success');
}

