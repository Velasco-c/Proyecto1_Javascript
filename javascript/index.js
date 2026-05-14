// formulario para el ingreso de vehículos al parqueadero
const formularioIngreso = document.getElementById('formulario-agregar');
const tablaBody = document.getElementById('tablaVehiculos');

const registro = (e) => {
    e.preventDefault();

    const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    const tipoIngreso = document.getElementById('tipo-ingreso').value;
    const ahora = new Date();
    const horaIngreso = ahora.toLocaleTimeString('es-GT', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });

    const placa = document.getElementById('placa').value.trim().toUpperCase();
    const espaciosDisponibles = document.getElementById('estacionamiento').value;
    let tipoVehiculo = '';

    if (!tipoIngreso || !placa || !espaciosDisponibles) {
        alert('Por favor, complete todos los campos para registrar el ingreso.');
        return;
    }

    // 🔒 NUEVO: Validar si el espacio YA está ocupado en localStorage
    const espacioOcupado = listaVehiculos.some(
        v => v.espaciosDisponibles === espaciosDisponibles && v.placa !== placa
    );

    if (espacioOcupado) {
        alert(`⚠️ Espacio ${espaciosDisponibles} ya está ocupado.`);
        return;
    }

    // ✅ Validación opcional: placa repetida (por si acaso)
    const placaRepetida = listaVehiculos.some(v => v.placa === placa);
    if (placaRepetida) {
        alert(`⚠️ La placa ${placa} ya está registrada.`);
        return;
    }

    switch (tipoIngreso) {
        case 'MTO': tipoVehiculo = 'Moto'; break;
        case 'CAR': tipoVehiculo = 'Carro'; break;
        case 'SUV': tipoVehiculo = 'Camioneta'; break;
        default: alert('Tipo de vehículo no reconocido.'); return;
    }

    console.log(`✅ Registro: ${tipoVehiculo} | ${placa} | ${horaIngreso}`);

    if (tablaBody) {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${tipoIngreso}</td>
            <td>${tipoVehiculo}</td>
            <td><strong>${placa}</strong></td>
            <td>${horaIngreso}</td>
            <td>
                <a href="#modificar" class="btn-scroll">
                    <img src="/imagenes/iconos/pencil.svg" alt="editar" width="18">
                </a>
                <button class="btn-borrar"  id="eliminar-dato">
                    <img src="/imagenes/iconos/trash.svg" alt="eliminar" width="18">
                </button>
            </td>
        `;
        tablaBody.appendChild(nuevaFila);
    }

    const datos = { tipoIngreso, tipoVehiculo, placa, horaIngreso, espaciosDisponibles }
    listaVehiculos.push(datos);
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    formularioIngreso.reset();
}

const contenedores = () => {
    const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    listaVehiculos.forEach(vehiculo => {
        const espacioElemento = document.getElementById(`espacio-${vehiculo.espaciosDisponibles}`);

        if (espacioElemento) {
            const parrafos = espacioElemento.querySelectorAll('p');
            const estadoActual = parrafos[2].textContent.toLowerCase();

            if (estadoActual === 'ocupado') {
                alert(`El espacio ${vehiculo.espaciosDisponibles} ya está ocupado por ${parrafos[1].textContent}.`);
                return;
            }

            parrafos[1].textContent = vehiculo.placa;
            parrafos[2].textContent = "ocupado";
            espacioElemento.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        }
    });
}

formularioIngreso.addEventListener('submit', registro);
formularioIngreso.addEventListener('submit', contenedores);


//función para eliminar un vehículo registrado
// btn para eliminar el dato ingreso por id
const borrar = document.getElementById('eliminar-dato'); 