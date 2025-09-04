export function initHeroScroll() {
  const scrollButton = document.querySelector('.hero-btn-js');
  const targetSection = document.getElementById('artists');

  function smoothScrollTo(target) {
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    const duration = 800; // время анимации в мс
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  if (scrollButton && targetSection) {
    scrollButton.addEventListener('click', function () {
      smoothScrollTo(targetSection);
    });
  }
}
