import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { register } from 'swiper/element/bundle';
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
  if (notification) {
    notification.innerText = msg;
    notification.style.display = 'block';
    setTimeout(() => (notification.style.display = 'none'), 3000);
  }
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

    if (wrapper) {
      wrapper.innerHTML = '';

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
    }

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
    slidesPerGroup: 1,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Добавлены брейкпоинты для управления навигацией
    breakpoints: {
      0: {
        navigation: {
          enabled: false, // Отключаем навигацию на мобильных
        },
      },
      769: {
        // На экранах шире 768px
        navigation: {
          enabled: true, // Включаем навигацию
        },
      },
    },
    on: {
      init: function () {
        createPagination();
        updatePagination(this);
      },
      slideChange: function () {
        updatePagination(this);
      },
    },
  });
}

function createPagination() {
  const container = document.querySelector('.custom-pagination');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
      let slideIndex;
      if (dot.dataset.index == 0) {
        slideIndex = 0;
      } else if (dot.dataset.index == 1) {
        slideIndex = 3;
      } else if (dot.dataset.index == 2) {
        slideIndex = 6;
      }
      if (swiperInstance) {
        swiperInstance.slideTo(slideIndex);
      }
    });

    container.appendChild(dot);
  }
}

function updatePagination(swiper) {
  const dots = document.querySelectorAll('.custom-pagination .dot');
  if (dots.length === 0) return;

  dots.forEach(dot => dot.classList.remove('active'));

  let activeIndex;
  if (swiper.realIndex >= 0 && swiper.realIndex <= 2) {
    activeIndex = 0;
  } else if (swiper.realIndex >= 3 && swiper.realIndex <= 5) {
    activeIndex = 1;
  } else if (swiper.realIndex >= 6 && swiper.realIndex <= 9) {
    activeIndex = 2;
  }

  if (dots[activeIndex]) {
    dots[activeIndex].classList.add('active');
  }
}

function initStars() {
  $('.star-rating').raty({
    readOnly: true,
    starType: 'i',
    score: function () {
      return $(this).attr('data-score');
    },
    starOn: '★', // Заполненная звезда
    starOff: '☆', // Пустая звезда
    starHalf: '★', // Половинная звезда
  });
}

console.log('🚀 Страница загружена, вызываем loadFeedbacks()');
loadFeedbacks();
