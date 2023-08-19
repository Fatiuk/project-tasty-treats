import { fillStars } from "./fill-stars";
import { save, load, remove } from "./localStorage";
import { fetchDataByPath } from "./request-handler";


import Notiflix from 'notiflix';

const startList = document.querySelector(".cards-list");
console.log(startList)
// startList.innerHTML = '';
// function createCard(data) {
//     const murcup = data.map(({ results }) => {
//         return `
//         <li class="cards-item">
//                 <img src="./images/test-card-img.png" alt="" class="card-img">
//                 <svg class="cards-heard-icon">
//                     <use href="./images/icons.svg#icon-heart-card"></use>
//                 </svg>
//                 <h2 class="cards-item-title">BANANA PANCAKES</h2>
//                 <p class="cards-item-text">
//                     Banana pancakes are a fluffy and sweet breakfast dish made with mashed ripe bananas, eggs, flour,
//                     and a touch of cinnamon, cooked to perfection on a skillet and served with toppings of your choice.

//                 </p>
//                 <!-- <div class="cards-wrapper"> -->
//                 <p class="cards-raiting">4.5</p>
//                 <div class="rating-wrapper">
//                     <svg class="card-rating-icon">
//                         <use href="./images/icons.svg#star"></use>
//                     </svg>
//                     <svg class="card-rating-icon">
//                         <use href="./images/icons.svg#star"></use>
//                     </svg>
//                     <svg class="card-rating-icon">
//                         <use href="./images/icons.svg#star"></use>
//                     </svg>
//                     <svg class="card-rating-icon">
//                         <use href="./images/icons.svg#star"></use>
//                     </svg>
//                     <svg class="card-rating-icon">
//                         <use href="./images/icons.svg#star"></use>
//                     </svg>
//                 </div>
//                 <button type="button" class="cards-item-btn">See recipe</button>

//                 <!-- </div> -->
//             </li>
//     `
//     })
//     startList.innerHTML = murcup.joun('')
// }
// // fetchDataByPath('/recipes');
// createCard(fetchDataByPath('/recipes'));
let fetchRecipes = null;

const viewportWidth = window.innerWidth;
if (viewportWidth < 768) {
     fetchRecipes = fetchDataByPath('/recipes');
    
} else if (viewportWidth >= 768 && viewportWidth < 1280) {
     fetchRecipes = fetchDataByPath('/recipes', null, 8);    
} else {
     fetchRecipes = fetchDataByPath('/recipes', null, 9);

}


// const fetchRecipes = fetchDataByPath('/recipes');
console.log('fetchRecipes', fetchRecipes)

fetchRecipes.then((data) => {
    console.log(data.results)
    createCard(data.results);
}).catch((err) => {
    Notiflix.Notify.failure(err.message);
    
})
function createCard(data) {
        
    
    const murcup = data.map(({ _id, title, description, rating, preview, thumb }) => {
        return `
        <li class="cards-item">
                <img src="${preview}" alt="${title}" class="card-img">
                <div class="test-div"></div>
                <button type="button" class="btn-heard-icone">
                    <svg class="cards-heard-icon" width="22" height="22" viewBox="0 0 32 32">
                        <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2.909" d="M15.991 6.848C13.325 3.731 8.88 2.893 5.54 5.747s-3.81 7.625-1.187 11c2.181 2.806 8.781 8.725 10.944 10.641.242.214.363.321.504.364a.668.668 0 0 0 .381 0c.141-.042.262-.149.504-.364 2.163-1.916 8.763-7.834 10.944-10.641 2.623-3.375 2.21-8.177-1.187-11.001s-7.785-2.015-10.451 1.101z" opacity=".5"/>
                    </svg>
                </button>
                <h2 class="cards-item-title">${title}</h2>
                <p class="cards-item-text">
                    ${description}
                </p>
                
                 <div class="card_star-rating"> 
                <p class="cards-raiting">${rating}</p>
                <div class="rating-wrapper">
                    <svg class="card-rating-icon" data-raiting="one" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon" data-raiting="two" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon" data-raiting="three" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon" data-raiting="four" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon" data-raiting="five" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                </div>
                <button type="button" class="cards-item-btn" id="${_id}">See recipe</button>

                 </div> 
            </li>
    `
    })
    
    startList.innerHTML = murcup.join('')
    fillStars()
    const btnIconeHeardEl = document.querySelector(".btn-heard-icone");
console.log( btnIconeHeardEl)

    btnIconeHeardEl.addEventListener("click", handlerIconeClick);

}


//по кліку на сердечко замальовую сердечко карточки
// console.log( btnIconeHeardEl)


function handlerIconeClick(e) {
    console.log('target',e.target)
    const svgHeardEl = document.querySelector('.cards-heard-icon');
    console.log('svgHeardEl',svgHeardEl)
    svgHeardEl.classList.toggle('js-fill')
}
  
/*-----------------------------------------------------------------*/
//  function heartsFillStorage() {

//   const cardFavouritesBtns = document.querySelectorAll('.btn-heard-icone');

//   let storedData = load('cardData');
//   if (storedData) {

//     const identArray = storedData.map(item => item.ident);

//     cardFavouritesBtns.forEach(button => {

//       const cardId = button.parentNode.querySelector('.cards-item-btn').id;
//       const hertWaihte = button.parentNode.querySelector('.cards-heard-icon');

//      if (identArray.includes(cardId)) {
//       button.classList.add('js-fill');
//       hertWaihte.classList.add('js-fill');
//      } else {
//       button.classList.remove('js-fill');
//       hertWaihte.classList.remove('js-fill');
//       }

//     })
//   } else {
//     cardFavouritesBtns.forEach(button => {
//       const hertWaihte = button.parentNode.querySelector('.cards-heard-icon');
//       button.classList.remove('js-fill');
//       hertWaihte.classList.remove('js-fill');
//     })

//     }
//     console.log('Функція heartsFillStorage відпрацювала')
// }; 



