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
    // almaceneen de índices carrusel
    const indices = {
        bar: 0,
        moc: 0,
        dev: 0,
        man: 0,
    };
    function cambiarImagen(direccion, id) {
        const items = document.querySelectorAll(`#${id} .carrusel-item`);
        indices[id] += direccion;
        // índice dentro límites
        if (indices[id] < 0) {
            indices[id] = items.length - 1; // va al último elemento
        } else if (indices[id] >= items.length) {
            indices[id] = 0; // Regresa al primer elemento
        }
        const offset = -indices[id] * 100; // desplazamiento (calculo)
        document.querySelector(`#${id} .carrusel-inner`).style.transform = `translateX(${offset}%)`;
    }
    
    document.querySelectorAll('.prev').forEach(button => {
        button.onclick = () => cambiarImagen(-1, button.closest('.service-info').id);
    });
    document.querySelectorAll('.next').forEach(button => {
        button.onclick = () => cambiarImagen(1, button.closest('.service-info').id);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  //overlay 
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';
  document.body.appendChild(overlay);
  //close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '×';
  overlay.appendChild(closeButton);
  // fullscreen image 
  const fullscreenImage = document.createElement('img');
  fullscreenImage.className = 'fullscreen-image';
  overlay.appendChild(fullscreenImage);
  // Manejar clic en imágenes 
  document.querySelectorAll('.carrusel-item img').forEach(img => {
      img.addEventListener('click', () => {
          fullscreenImage.src = img.src;
          overlay.classList.add('active');
      });
  });
  //cierre del overlay
  closeButton.addEventListener('click', () => {
      overlay.classList.remove('active');
  });
  // Cerrar también  xD
  overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
          overlay.classList.remove('active');
      }
  });
});

// Función para manejar el envío del formulario
function handleSubmit(event) {
  event.preventDefault();
  
  const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
  };
  // Enviar el correo usando EmailJS
  emailjs.send('service_4fyhgsf', 'template_skcrvg2', formData, 'TIplNNvv_Ilxv8nlB')
      .then(function(response) {
          alert('¡Hola!. Tu Mensaje ha sido enviado con éxito! Revise su correo.');
          document.getElementById('contactForm').reset();
      }, function(error) {
          alert('Error al enviar el mensaje: ' + error);
      });
}
// Inicializar EmailJS
document.addEventListener('DOMContentLoaded', function() {
  emailjs.init("TIplNNvv_Ilxv8nlB");
});

