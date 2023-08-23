import { fetchDataByPath } from './request-handler';
import { fillStars } from './fill-stars.js';
import { saveIdToLocaleStorage } from './local-storage';

const startList = document.querySelector('.cards-list');

function fetchCardsFromLocal() {
  const localData = localStorage.getItem('heartedButtons');

  if (localData !== null) {
    const parsedData = JSON.parse(localData);
    createCard(parsedData);
    saveIdToLocaleStorage();
    removeIdToLocaleStorage();
  }
}

fetchCardsFromLocal();
function createCard(data) {
  const murcup = data.map(
    ({ _id, title, description, rating, preview, thumb }) => {
      return `
        <li class="cards-item favorites-li">
                <picture>
                  <source srcset="${preview}" type="image/webp">
                  <source srcset="${preview}" type="image/jpeg">
                  <img src="${preview}" width="335" height="335" alt="${title}" class="card-img" loading="lazy">
                </picture>
                <div class="test-div"></div>
                <button type="button" class="btn-heard-icone favorites-icone-btn" aria-label="Add to Favorites">
                    <svg class="cards-heard-icon favorites-heart-icone js-fill" width="22" height="22" viewBox="0 0 32 32">
                        <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2.909" d="M15.991 6.848C13.325 3.731 8.88 2.893 5.54 5.747s-3.81 7.625-1.187 11c2.181 2.806 8.781 8.725 10.944 10.641.242.214.363.321.504.364a.668.668 0 0 0 .381 0c.141-.042.262-.149.504-.364 2.163-1.916 8.763-7.834 10.944-10.641 2.623-3.375 2.21-8.177-1.187-11.001s-7.785-2.015-10.451 1.101z" opacity=".5"/>
                    </svg>
                </button>
                <h2 class="cards-item-title favorites-item-title">${title}</h2>
                <p class="cards-item-text favorites-item-text">${description}</p>
                
                 <div class="card_star-rating favorites_star-rating"> 
                <p class="cards-raiting favorites-rating">${rating}</p>
                <div class="rating-wrapper wrapper favorites-rating-wrap">
                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="one" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="two" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="three" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="four" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                    <svg class="card-rating-icon favorites-rating-icon" data-raiting="five" id="all-stars">
                        <path id="Star 1" d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z" sroke="black"></path>
                    </svg>
                </div>
                <button type="button" class="cards-item-btn favorites-item-btn" id="${_id}">See recipe</button>

                 </div> 
            </li>
    `;
    }
  );

  startList.innerHTML = murcup.join('');
  fillStars();
}

function removeIdToLocaleStorage() {
  const heartButtons2 = document.querySelectorAll('.btn-heard-icone');

  heartButtons2.forEach(button => {
    button.addEventListener('click', () => {
      const card2 = button.closest('.cards-item');
      card2.style.display = 'none';
    });
  });
}
