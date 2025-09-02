import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

import $ from 'jquery';
import 'raty-js';

// --- Логика отзывов ---
const loader = document.getElementById('loader');
const notification = document.getElementById('feedback');
const wrapper = document.querySelector('.feedback-swiper .swiper-wrapper');

const showLoader = () => (loader.style.display = 'block');
const hideLoader = () => (loader.style.display = 'none');

const showNotification = msg => {
  notification.innerText = msg;
  notification.style.display = 'block';
  setTimeout(() => (notification.style.display = 'none'), 3000);
};

async function loadFeedbacks() {
  showLoader();
  try {
    const res = await fetch(
      'https://sound-wave.b.goit.study/api/feedbacks?limit=10&page=1',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error('Помилка завантаження відгуків');

    const data = await res.json();
    hideLoader();

    // Очищаем wrapper
    wrapper.innerHTML = '';

    // Добавляем отзывы в слайды
    data.data.forEach(fb => {
      const roundedRating = Math.round(fb.rating);

      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      slide.innerHTML = `
        <div class="feedback-card">
          <div class="star-rating" data-score="${roundedRating}"></div>
          <p class="feedback-text">${fb.descr}</p>
          <p class="feedback-user">— ${fb.name}</p>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    initSwiper();
    initStars();
  } catch (err) {
    hideLoader();
    showNotification(err.message);
  }
}

let swiperInstance = null;

function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.feedback-swiper', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function () {
        createPagination(this.slides.length);
        updatePagination(this);
      },
      slideChange: function () {
        updatePagination(this);
      },
    },
  });
}

function createPagination(total) {
  const container = document.querySelector('.custom-pagination');
  container.innerHTML = '';

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    container.appendChild(dot);
  }
}

function updatePagination(swiper) {
  const dots = document.querySelectorAll('.custom-pagination .dot');
  dots.forEach(dot => dot.classList.remove('active'));

  if (dots[swiper.activeIndex]) {
    dots[swiper.activeIndex].classList.add('active');
  }
}

function initStars() {
  $('.star-rating').raty({
    readOnly: true,
    starType: 'i',
    score: function () {
      return $(this).attr('data-score');
    },
  });
}

console.log('🚀 Страница загружена, вызываем loadFeedbacks()');
loadFeedbacks();
