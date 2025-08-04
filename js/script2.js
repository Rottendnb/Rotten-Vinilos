
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('formulario');

  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const telefono = document.getElementById('telefono');
  const email = document.getElementById('email');
  const condiciones = document.getElementById('condiciones');

  const errorNombre = document.getElementById('error-nombre');
  const errorApellidos = document.getElementById('error-apellidos');
  const errorTelefono = document.getElementById('error-telefono');
  const errorEmail = document.getElementById('error-email');
  const errorCondiciones = document.getElementById('error-condiciones');

  const producto = document.getElementById('producto');
  const plazo = document.getElementById('plazo');
  const extras = document.querySelectorAll('.extra');
  const totalSpan = document.getElementById('total');

  function calcularPresupuesto() {
    let base = parseFloat(producto.value);
    let extrasTotal = 0;
    extras.forEach(e => {
      if (e.checked) extrasTotal += parseFloat(e.value);
    });

    let total = base + extrasTotal;

    const dias = parseInt(plazo.value);
    if (dias >= 15) total *= 0.9;
    else if (dias >= 10) total *= 0.95;

    totalSpan.textContent = total.toFixed(2) + " €";
  }

  producto.addEventListener('change', calcularPresupuesto);
  plazo.addEventListener('input', calcularPresupuesto);
  extras.forEach(e => e.addEventListener('change', calcularPresupuesto));
  calcularPresupuesto();

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío real

    let valido = true;

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{1,15}$/.test(nombre.value)) {
      errorNombre.style.display = 'inline';
      valido = false;
    } else {
      errorNombre.style.display = 'none';
    }

    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{1,40}$/.test(apellidos.value)) {
      errorApellidos.style.display = 'inline';
      valido = false;
    } else {
      errorApellidos.style.display = 'none';
    }

    if (!/^\d{9}$/.test(telefono.value)) {
      errorTelefono.style.display = 'inline';
      valido = false;
    } else {
      errorTelefono.style.display = 'none';
    }

    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
      errorEmail.style.display = 'inline';
      valido = false;
    } else {
      errorEmail.style.display = 'none';
    }

    if (!condiciones.checked) {
      errorCondiciones.style.display = 'inline';
      valido = false;
    } else {
      errorCondiciones.style.display = 'none';
    }

    if (valido) {
      alert("Presupuesto enviado correctamente.");
      form.reset();
      calcularPresupuesto();
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(calcularPresupuesto, 100);
    document.querySelectorAll('.error').forEach(e => e.style.display = 'none');
  });
});