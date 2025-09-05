const API_URL = 'https://sound-wave.b.goit.study/api/feedbacks';
const TAKE = 10;


const $slidesWrapper = document.getElementById('slides');
const $prev = document.getElementById('prevBtn');
const $next = document.getElementById('nextBtn');
const $dotFirst = document.querySelector('.dot[data-kind="first"]');
const $dotMiddle = document.querySelector('.dot[data-kind="middle"]');
const $dotLast = document.querySelector('.dot[data-kind="last"]');


const roundRating = (num) => Math.round(Number(num) || 0);


function escapeHTML(str) {
return String(str || '')
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/\"/g, '&quot;')
.replace(/'/g, '&#039;');
    }

function createStarsHTML(score) {
const s = Math.max(0, Math.min(5, Number(score) || 0));
let html = '<span class="stars" aria-hidden="true">';
for (let i = 1; i <= 5; i += 1) html += `<span class="star${i <= s ? ' star--on' : ''}">★</span>`;
html += '</span>';
return html;
}


function createSlide(item) {
const slide = document.createElement('div');
slide.className = 'swiper-slide';


const rounded = roundRating(item.rating);
const username = item.name || item.author || item.user?.name || 'Anonymous';
const text = item.descr || item.comment || item.text || item.content || item.message || '';


slide.innerHTML = `
<article class="card" aria-label="Visitor feedback">
<div class="card__stars" data-score="${rounded}">
<div class="js-stars"></div>
</div>
<p class="card__text">“${escapeHTML(text)}”</p>
<div class="card__user">
<div class="name">${escapeHTML(username)}</div>
<div class="muted">Verified visitor</div>
</div>
</article>`;
return slide;
    }
function updateDots(swiper) {
const total = swiper.slides.length;
const idx = swiper.activeIndex;
const isFirst = idx === 0;
const isLast = idx === total - 1;


[$dotFirst, $dotMiddle, $dotLast].forEach((el) => { el.classList.remove('dot--active'); el.setAttribute('aria-selected', 'false'); });
if (isFirst) { $dotFirst.classList.add('dot--active'); $dotFirst.setAttribute('aria-selected', 'true'); }
else if (isLast) { $dotLast.classList.add('dot--active'); $dotLast.setAttribute('aria-selected', 'true'); }
else { $dotMiddle.classList.add('dot--active'); $dotMiddle.setAttribute('aria-selected', 'true'); }
}


function buildStarUrl(fill) {
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="${fill}" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}


function initRaty($root) {
const $ = window.jQuery;
if (!($ && $.fn && $.fn.raty)) return false;


const STAR_ON = buildStarUrl('#764191');
const STAR_OFF = buildStarUrl('#ffffff');


$($root).find('.card .js-stars').each(function () {
const score = Number($(this).closest('.card__stars').data('score')) || 0;
$(this).raty({ readOnly: true, score, starOn: STAR_ON, starOff: STAR_OFF, halfShow: false });
});
return true;
    }
async function init() {
try {
const res = await fetch(API_URL, { headers: { Accept: 'application/json' } });
if (!res.ok) throw new Error(`Failed to load feedbacks: ${res.status}`);
let payload = await res.json();
let data = Array.isArray(payload) ? payload : (payload?.data || payload?.results || payload?.feedbacks || []);
if (!Array.isArray(data)) data = [];


const list = data.slice(0, TAKE);
$slidesWrapper.innerHTML = '';
list.forEach((item) => $slidesWrapper.appendChild(createSlide(item)));


const swiper = new Swiper('#feedbacks-swiper', { slidesPerView: 1, spaceBetween: 8, speed: 450, grabCursor: true, allowTouchMove: true });


if ($prev) $prev.addEventListener('click', () => swiper.slidePrev());
if ($next) $next.addEventListener('click', () => swiper.slideNext());


swiper.on('slideChange', () => updateDots(swiper));
updateDots(swiper);



const ok = initRaty($slidesWrapper);
if (!ok) {

document.querySelectorAll('#slides .card .js-stars').forEach((el) => {
const score = Number(el.closest('.card__stars').dataset.score) || 0;
el.innerHTML = createStarsHTML(score);
});
}
} catch (err) {
console.error('Feedbacks error:', err);
$slidesWrapper.innerHTML = `<div class="swiper-slide"><article class="card"><p class="card__text">Не вдалося завантажити відгуки. Перевірте API.</p></article></div>`;
const swiper = new Swiper('#feedbacks-swiper', { slidesPerView: 1, spaceBetween: 8 });
updateDots(swiper);
}
}


document.addEventListener('DOMContentLoaded', init);
