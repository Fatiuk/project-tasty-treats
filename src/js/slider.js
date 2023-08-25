import { fetchDataByPath } from './request-handler.js';

import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';

// Wrap code in DOMContentLoaded event
document.addEventListener('DOMContentLoaded', async () => {
  const swiperWrapper = document.querySelector('.swiper-wrapper'); // Changed to .swiper-wrapper

  async function fetchEventsData() {
    const data = await fetchDataByPath('/events');

    const eventsCardsMarkup = createPhotoCardsMarkup(data);

    swiperWrapper.innerHTML = eventsCardsMarkup;

    const mySwiper = new Swiper('.swiper', {
      spaceBetween: 20,

      pagination: {
        el: '.js-hero-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      speed: 800,
      loop: true,
    });
    const swiperContainer = document.querySelector('.swiper-container');

    swiperContainer.addEventListener('mouseenter', function () {
      mySwiper.autoplay.stop();
    });

    swiperContainer.addEventListener('mouseleave', function () {
      mySwiper.autoplay.start();
    });
  }

  function createPhotoCardsMarkup(data) {
    let markup = '';

    data.forEach(item => {
      markup += `
<div class="swiper-slide">
  <div class="slider-cards">
    <div class="card-shef" data-aos="fade-up" data-aos-duration="1000">
      <picture>
        <source srcset="${item.cook.imgWebpUrl}" type="image/webp">
        <source srcset="${item.cook.imgUrl}" type="image/jpeg">
        <img class="img-shef" src="${item.cook.imgUrl}" width="250" height="610" alt="${item.cook.name}">
      </picture>
    </div>
    <div class="card-food" data-aos="zoom-in">
      <picture>
        <source srcset="${item.topic.previewWebpUrl}" type="image/webp">
        <source srcset="${item.topic.previewUrl}" type="image/jpeg">
        <img class="img-food" src="${item.topic.previewUrl}" width="300" height="300" alt="${item.topic.name}">
      </picture>
      <div class="swiper-title">
        <p class="swiper-name">${item.topic.name}</p>
        <p class="swiper-area">${item.topic.area}</p>
      </div>
    </div>
    <div class="card-tasty" data-aos="fade-down" data-aos-duration="1000">
      <picture>
        <source srcset="${item.topic.imgWebpUrl}" type="image/webp">
        <source srcset="${item.topic.imgUrl}" type="image/jpeg">
        <img class="img-tasty" src="${item.topic.imgUrl}" width="370" height="560" alt="${item.topic.name}">
      </picture>
    </div>
  </div>
</div>`;
    });

    return markup;
  }

  fetchEventsData();
});
