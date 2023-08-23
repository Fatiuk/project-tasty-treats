import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';
import axios from 'axios';
import { alertError } from '../js/custom-popup';

const EVENTS_API = 'https://tasty-treats-backend.p.goit.global/api/events';
const heroSlider = document.querySelector('.js-events');

if (heroSlider) {
  initEvents();
}

async function initEvents() {
  try {
    const eventsData = await fetchEvents();
    renderEvents(eventsData);
    initSlider();
  } catch (error) {
    showError(error);
  }
}

async function fetchEvents() {
  try {
    const response = await axios.get(EVENTS_API);
    return response.data;
  } catch (error) {
    showError(error);
  }
}

function renderEvents(events) {
  const sliderMarkup = events.map(
    ({ cook, topic, _id }) =>
      `
    <div class="swiper-slide" data-id="${_id}">
      <div class="event event--cook">
        <picture>
          <source srcset="${cook.imgWebpUrl}" type="image/webp" />
          <source srcset="${cook.imgUrl}" type="image/jpeg" />
          <img src="${cook.imgUrl}" alt="${cook.name}" width="137" height="442" />
        </picture>
      </div>
      <div class="event event--preview">
        <picture>
          <source srcset="${topic.previewWebpUrl}" type="image/webp" />
          <source srcset="${topic.previewUrl}" type="image/jpeg" />
          <img src="${topic.previewUrl}" alt="${topic.name}" width="304" height="271" />
        </picture>
        <div class="info">
          <strong>${topic.name}</strong>
          <p>${topic.area}</p>
        </div>
      </div>
      <div class="event event--image">
        <picture>
          <source srcset="${topic.imgWebpUrl}" type="image/webp" />
          <source srcset="${topic.imgUrl}" type="image/jpeg" />
          <img src="${topic.imgUrl}" alt="${topic.name}" width="137" height="442" />
        </picture>
      </div>
    </div>
    `
  );
  heroSlider.insertAdjacentHTML('afterbegin', sliderMarkup.join(''));
}

function showError(error) {
  alertError(error.request.statusText, error.message);
}

function initSlider() {
  new Swiper('.swiper-hero', {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 8,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: '.js-hero-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
  });
}
