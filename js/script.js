document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  window.onscroll = () => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const top = window.scrollY;
      sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
          const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
          return; // Salir del bucle una vez que se encuentra la sección activa
        }
      });
    }, 100); // Ajusta el tiempo según sea necesario
  };
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };
});
