document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu-toggle').checked = false;
  });
});