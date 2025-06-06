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
  try {
    event.preventDefault();
    console.log('handleSubmit: Intentando enviar email...');

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    };
    console.log('handleSubmit: Datos del formulario:', formData);

    if (typeof emailjs === 'undefined') {
      console.error('handleSubmit: EmailJS SDK (emailjs) no está definido.');
      alert('Error crítico: El servicio de correo no está cargado. Revisa la consola.');
      return;
    }

    // Nota: JSON.parse(JSON.stringify(formData)) es usualmente innecesario aquí.
    // EmailJS espera un objeto simple para los parámetros de la plantilla.
    // Lo mantenemos por ahora si fue una solución a un problema previo, pero considera `formData` directamente.
    emailjs.send('service_4fyhgsf', 'template_skcrvg2', JSON.parse(JSON.stringify(formData)), 'Zebq3EYvfuMyUHuPs')
        .then(function(response) {
            console.log('EmailJS Éxito:', response.status, response.text);
            alert('¡Hola!. Tu Mensaje ha sido enviado con éxito! Revise su correo.');
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.reset();
            }
        }, function(error) {
            console.error('EmailJS Error en la promesa:', error);
            let mensajeError = 'Error al enviar el mensaje.';
            if (error && typeof error === 'object') {
                if (error.text) {
                    mensajeError += ` Detalles: ${error.text}`;
                } else if (error.status) {
                    mensajeError += ` Código de estado: ${error.status}.`;
                }
            } else if (error) {
                mensajeError += ` Detalles: ${String(error)}.`;
            }
            mensajeError += ' Por favor, revisa la consola del navegador para más información.';
            alert(mensajeError);
        });
  } catch (e) {
    console.error('Error síncrono en handleSubmit:', e);
    alert('Ocurrió un error inesperado al procesar el formulario: ' + e.message + '. Revisa la consola.');
  }
}
// Inicializar EmailJS
document.addEventListener('DOMContentLoaded', function() {
  try {
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS Init: SDK (emailjs) no está definido. Asegúrate de que el script de EmailJS se carga antes que este.');
      alert('Error crítico al inicializar: EmailJS SDK no encontrado. El envío de correos no funcionará.');
      return;
    }
    console.log('Inicializando EmailJS...');
    emailjs.init("Zebq3EYvfuMyUHuPs");
    console.log('EmailJS inicializado correctamente.');
  } catch (initError) {
    console.error('Error durante la inicialización de EmailJS:', initError);
    alert('Error al inicializar el servicio de correo: ' + (initError.message || initError) + '. El envío de correos no funcionará.');
  }
});

