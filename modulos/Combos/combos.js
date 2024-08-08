/* global fetch, combo */

fetch('./combos.json')
  .then(response => response.json())
  .then(combosData => {
    const menu = document.querySelector('.menu');
    let combosHTML = '';
    combosData.forEach(combo => {
      combosHTML += `
        <div class="combo" data-id="${combo.id}">
          <h2>${combo.nombre}</h2>
          <img src="${combo.imagen}" alt="${combo.nombre}">
          <div class="descripcion">
            <p>${combo.descripcion}</p>
            <p><strong>Precio:</strong> $${combo.precio}</p>
            <button class="btn-modificar">Modificar</button>
          </div>
        </div>
      `;
    });
    menu.innerHTML = combosHTML;

    const combos = document.querySelectorAll('.combo');
    combos.forEach((combo) => {
      const btnModificar = combo.querySelector('.btn-modificar');
      btnModificar.addEventListener('click', () => {
        modificarCombo(combo);
      });
    });
  });

function modificarCombo(combo) {
  const formData = `
  <div class="modal">
    <form>
      <label for="nombre">Nombre del combo:</label>
      <input type="text" id="nombre" value="${combo.querySelector('h2').textContent}">
      <br>
      <label for="imagen">Imagen del combo:</label>
      <input type="file" id="imagen" accept="image/*">
      <br>
      <label for="descripcion">Descripción del combo:</label>
      <textarea id="descripcion">${combo.querySelector('.descripcion p').textContent}</textarea>
      <br>
      <label for="precio">Precio del combo:</label>
      <input type="number" id="precio" value="${combo.querySelector('.descripcion p strong').textContent.replace('$', '')}">
      <br>
      <button type="submit">Guardar cambios</button>
    </form>
  </div>
`;
  const modal = document.createElement('div');
  modal.innerHTML = formData;
  document.body.appendChild(modal);

  const form = modal.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.querySelector('#nombre').value;
    const imagen = form.querySelector('#imagen').files[0];
    const descripcion = form.querySelector('#descripcion').value;
    const precio = form.querySelector('#precio').value;

    // Actualizar la información del combo en la página
    combo.querySelector('h2').textContent = nombre;
    const reader = new FileReader();
    reader.onload = () => {
      combo.querySelector('img').src = reader.result;
    };
    reader.readAsDataURL(imagen);

    combo.querySelector('.descripcion p').textContent = descripcion;
    combo.querySelector('.descripcion p strong').textContent = `$${precio}`;

    // Cerrar el modal
    modal.remove();
  });
}

const botonesModificar = document.querySelectorAll('.btn-modificar');

botonesModificar.forEach(boton => {
  boton.addEventListener('click', () => {
    const comboId = boton.getAttribute('data-combo');
    modificarCombo(comboId);
  });
});

function modificarCombo(comboId) {
  // Lógica para modificar el combo con el ID especificado
  console.log(`Modificando combo con ID ${comboId}`);
}