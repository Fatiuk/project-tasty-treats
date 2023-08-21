import { fetchDataByPath } from './request-handler.js';

const refs = {
  allCards: document.querySelector('.cards-list'),
  modalCardCont: document.querySelector('.card-markup-modal'),
  modalBackdrop: document.querySelector('.modal-backdrop'),
  modalCuttonClose: document.querySelector('.modal-btn-close'),
  giveRatingModalBtn: document.querySelector('.modal-give-rating'),
  ratingModal: document.querySelector('.rating-backdrop'),
  ratingButton: document.querySelector('.rating-send-btn'),
  ratingClose: document.querySelector('.modal-rating-close'),
};

refs.allCards.addEventListener('click', handlerGetIdCard);

async function handlerGetIdCard(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const buttonId = event.target.getAttribute('id');
  refs.ratingButton.id = buttonId;
  const dataById = await fetchDataByPath(`/recipes/${buttonId}`);
  const modalMarkup = createMarkupModal(dataById);
  refs.modalCardCont.innerHTML = modalMarkup;

  refs.modalBackdrop.classList.add('is-open');
  refs.allCards.removeEventListener('click', handlerGetIdCard);

  document.body.style.overflow = 'hidden';

  refs.modalCuttonClose.addEventListener('click', () => {
    refs.modalBackdrop.classList.remove('is-open');
    refs.allCards.addEventListener('click', handlerGetIdCard);
    document.body.style.overflow = 'auto';
  });
}

function createMarkupModal(data) {
  const youtubeLink = data.youtube;

  function getYoutubeVideoId(url) {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  const videoId = getYoutubeVideoId(youtubeLink);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const ingredientsMarkup = data.ingredients
    .map(
      ingredient => `
    <li class="modal-card-ingr">
      ${ingredient.name}
      <span class="modal-card-measure">${ingredient.measure}</span>
    </li>
  `
    )
    .join('');

  const modalCardMarkup = `
        <iframe
          src="${embedUrl}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="iframe-video"
        ></iframe>
        <h2 class="modal-recipe-name">${data.title}</h2>
        <div class="modal-general-inf">
          <div class="card-star-modal">
            <p class="modal-raiting">${data.rating}</p>
            <div class="starts-modal">
              <svg class="card-rating-icon" data-raiting="one" id="all-stars">
                <path
                  id="Star 1"
                  d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                  sroke="black"
                ></path>
              </svg>
              <svg class="card-rating-icon" data-raiting="two" id="all-stars">
                <path
                  id="Star 1"
                  d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                  sroke="black"
                ></path>
              </svg>
              <svg class="card-rating-icon" data-raiting="three" id="all-stars">
                <path
                  id="Star 1"
                  d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                  sroke="black"
                ></path>
              </svg>
              <svg class="card-rating-icon" data-raiting="four" id="all-stars">
                <path
                  id="Star 1"
                  d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                  sroke="black"
                ></path>
              </svg>
              <svg class="card-rating-icon" data-raiting="five" id="all-stars">
                <path
                  id="Star 1"
                  d="M6.04894 1.42705C6.3483 0.505742 7.6517 0.505741 7.95106 1.42705L8.79611 4.02786C8.92999 4.43989 9.31394 4.71885 9.74717 4.71885H12.4818C13.4505 4.71885 13.8533 5.95846 13.0696 6.52786L10.8572 8.13525C10.5067 8.3899 10.3601 8.84127 10.494 9.25329L11.339 11.8541C11.6384 12.7754 10.5839 13.5415 9.80017 12.9721L7.58779 11.3647C7.2373 11.1101 6.7627 11.1101 6.41221 11.3647L4.19983 12.9721C3.41612 13.5415 2.36164 12.7754 2.66099 11.8541L3.50604 9.25329C3.63992 8.84127 3.49326 8.3899 3.14277 8.13525L0.930391 6.52787C0.146678 5.95846 0.549452 4.71885 1.51818 4.71885H4.25283C4.68606 4.71885 5.07001 4.43989 5.20389 4.02786L6.04894 1.42705Z"
                  sroke="black"
                ></path>
              </svg>
            </div>
            <p class="modal-card-time">${data.time} min</p>
          </div>
          <ul class="modal-ingr-list">${ingredientsMarkup}</ul>
          <ul class="hashtag-btn-list-tablet list">
            <li class="hashtag-btn-item">#${data.tags[0]}</li>
            <li class="hashtag-btn-item">#${data.tags[1]}</li>
            <li class="hashtag-btn-item">#${data.tags[2]}</li>
          </ul>
          <p class="modal-recipe-instructions">${data.instructions}</p>
        </div>
  `;

  return modalCardMarkup;
}

refs.giveRatingModalBtn.addEventListener('click', handlerOpenRating);

function handlerOpenRating(event) {
  refs.modalBackdrop.classList.remove('is-open');
  refs.ratingModal.classList.add('is-open');

  refs.ratingClose.addEventListener('click', () => {
    refs.ratingModal.classList.remove('is-open');
    refs.allCards.addEventListener('click', handlerGetIdCard);
    document.body.style.overflow = 'auto';
  });
}
