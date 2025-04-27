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

document.addEventListener('DOMContentLoaded', () => {
    let index = 0;
    function cambiarImagen(direccion) {
        const items = document.querySelectorAll('.carrusel-item');
        index += direccion;
        if (index < 0) {
            index = items.length - 1; // Regresa al último elemento
        } else if (index >= items.length) {
            index = 0; // Regresa al primer elemento
        }
        const offset = -index * 100; // Calcula el desplazamiento
        document.querySelector('.carrusel-inner').style.transform = `translateX(${offset}%)`;
    }
    // Asignar eventos a los botones
    document.querySelector('.prev').onclick = () => cambiarImagen(-1);
    document.querySelector('.next').onclick = () => cambiarImagen(1);
});
