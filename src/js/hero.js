export function initScrollToArtists() {
  const btn = document.querySelector(".hero-btn-js");
  const target = document.getElementById("artists");

  if (btn && target) {
    btn.addEventListener("click", function () {
      target.scrollIntoView({
        behavior: "smooth"
      });
    });
  }
}
