document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('mezcales-grid');
  const modal = document.getElementById('modal-detalle');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');

  const modalImg = document.getElementById('modal-img');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalDestileria = document.getElementById('modal-destileria');
  const modalDescripcion = document.getElementById('modal-descripcion');

  // Elementos del modal de San Dieguito
  const btnSanto = document.getElementById('btn-santo');
  const modalSanto = document.getElementById('modal-santo');
  const btnCerrarSanto = document.getElementById('btn-cerrar-santo');

  // Cargar el archivo JSON
  fetch('mezcales.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo mezcales.json');
      }
      return response.json();
    })
    .then(data => {
      renderizarTarjetas(data);
    })
    .catch(error => {
      console.error('Error:', error);
      gridContainer.innerHTML = '<p style="text-align: center; color: #1D3557; grid-column: span 4; padding: 2rem;">Error al cargar los datos de los expositores.</p>';
    });

  // Función para construir las tarjetas en el grid (Sin insignia de agave)
  function renderizarTarjetas(mezcales) {
    gridContainer.innerHTML = '';

    mezcales.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <div>
          <div class="card-img-container">
            <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'">
          </div>
          <div class="card-body">
            <h3>${item.nombre}</h3>
            <p>${item.destileria || ''}</p>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-card">Ver Descripción</button>
        </div>
      `;

      // Abrir modal al hacer clic en la tarjeta
      card.addEventListener('click', () => abrirModal(item));

      gridContainer.appendChild(card);
    });
  }

  // Abrir modal de mezcal
  function abrirModal(item) {
    modalImg.src = item.imagen;
    modalTitulo.textContent = item.nombre;
    modalDestileria.textContent = item.destileria ? `Producido por: ${item.destileria}` : '';
    modalDescripcion.textContent = item.descripcion;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Cerrar modal de mezcal
  function cerrarModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  btnCerrarModal.addEventListener('click', cerrarModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });

  // Lógica para el modal de San Dieguito
  btnSanto.addEventListener('click', () => {
    modalSanto.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  function cerrarModalSanto() {
    modalSanto.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  btnCerrarSanto.addEventListener('click', cerrarModalSanto);

  modalSanto.addEventListener('click', (e) => {
    if (e.target === modalSanto) {
      cerrarModalSanto();
    }
  });
});