export function initHeroScroll() {
  const scrollButton = document.querySelector('.hero-btn-js');
  const targetSection = document.getElementById('artists');

  if (scrollButton && targetSection) {
    scrollButton.addEventListener('click', function () {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
