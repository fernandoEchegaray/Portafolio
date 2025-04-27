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
    // Inicializa un objeto para almacenar índices de cada carrusel
    const indices = {
        bar: 0,
        moc: 0,
        dev: 0,
        man: 0,
    };
    function cambiarImagen(direccion, id) {
        const items = document.querySelectorAll(`#${id} .carrusel-item`);
        indices[id] += direccion;
        // Asegúrate de que el índice esté dentro de los límites
        if (indices[id] < 0) {
            indices[id] = items.length - 1; // Regresa al último elemento
        } else if (indices[id] >= items.length) {
            indices[id] = 0; // Regresa al primer elemento
        }
        const offset = -indices[id] * 100; // Calcula el desplazamiento
        document.querySelector(`#${id} .carrusel-inner`).style.transform = `translateX(${offset}%)`;
    }
    // Asignar eventos a los botones (si no se hace en el HTML)
    document.querySelectorAll('.prev').forEach(button => {
        button.onclick = () => cambiarImagen(-1, button.closest('.service-info').id);
    });
    document.querySelectorAll('.next').forEach(button => {
        button.onclick = () => cambiarImagen(1, button.closest('.service-info').id);
    });
});
