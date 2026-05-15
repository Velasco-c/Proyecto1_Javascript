// formulario para el ingreso de vehículos al parqueadero
//datos del formulario como de tabla a usar
const formularioIngreso = document.getElementById('formulario-agregar');
const tablaBody = document.getElementById('datos');

const registro = (e) => {
    e.preventDefault();
    const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    const tipoIngreso = document.getElementById('tipo-ingreso').value;
    const ahora = new Date();
    const horaIngreso = ahora.toLocaleTimeString('es-GT', {hour: '2-digit', minute: '2-digit', hour12: true });

    const placa = document.getElementById('placa').value.trim().toUpperCase();
    const espaciosDisponibles = document.getElementById('estacionamiento').value;
    let tipoVehiculo = '';

    if (!tipoIngreso || !placa || !espaciosDisponibles) {
        alert('Por favor, complete todos los campos para registrar el ingreso.');
        return;
    }

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
        nuevaFila.innerHTML += `
            <td>${tipoIngreso}</td>
            <td>${tipoVehiculo}</td>
            <td><strong>${placa}</strong></td>
            <td>${horaIngreso}</td>
            <td>
                <a href="#modificar" class="btn-scroll">
                    <img src="/imagenes/iconos/pencil.svg" alt="editar" width="18">
                </a>
                <button class="btn-borrar">
                    <img src="/imagenes/iconos/trash.svg" alt="eliminar" width="18">
                </button>
            </td>
        `;
        tablaBody.appendChild(nuevaFila);
    }

    const datos = { tipoIngreso, tipoVehiculo, placa, horaIngreso, espaciosDisponibles ,ahora}
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

const cargarDatos = () => {
    const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    listaVehiculos.forEach(vehiculo => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${vehiculo.tipoIngreso}</td>
            <td>${vehiculo.tipoVehiculo}</td>
            <td><strong>${vehiculo.placa}</strong></td>
            <td>${vehiculo.horaIngreso}</td>
            <td>
                <a href="#modificar" class="btn-scroll">
                    <img src="/imagenes/iconos/pencil.svg" alt="editar" width="18">
                </a>
                <button class="btn-borrar">
                    <img src="/imagenes/iconos/trash.svg" alt="eliminar" width="18">
                </button>
            </td>
        `;
        tablaBody.appendChild(nuevaFila);
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
cargarDatos();
formularioIngreso.addEventListener('submit', registro);
formularioIngreso.addEventListener('submit', contenedores);


//función para eliminar un vehículo registrado
// ===== ELIMINAR REGISTRO =====
tablaBody?.addEventListener('click', (e) => {
    const btnBorrar = e.target.closest('.btn-borrar');
    if (!btnBorrar) return;

    const fila = btnBorrar.closest('tr');
    const placa = fila.querySelector('td:nth-child(3) strong').textContent;

    if (!confirm(`¿Eliminar vehículo con placa ${placa}?`)) return;

    let listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

    // 2. Encontrar el vehículo a eliminar (para saber su espacio)
    // crea un copia de seguridad del vehículo a eliminar antes de filtrarlo para liberar el espacio después
    const vehiculoEliminar = listaVehiculos.find(v => v.placa === placa);

    // 3. Filtrar y guardartextContent
    listaVehiculos = listaVehiculos.filter(v => v.placa !== placa);
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    fila.remove();

    // 5. Liberar el espacio de estacionamiento
    if (vehiculoEliminar && vehiculoEliminar.espaciosDisponibles) {
        console.log(`Liberando espacio ${vehiculoEliminar.espaciosDisponibles} para placa ${placa}`);
        liberarEspacio(vehiculoEliminar.espaciosDisponibles);
    }

    console.log(`✅ Vehículo ${placa} eliminado`);
});

// Función para marcar espacio como disponible
const liberarEspacio = (numeroEspacio) => {
    const espacioElemento = document.getElementById(`espacio-${numeroEspacio}`);
    if (espacioElemento) {
        const parrafos = espacioElemento.querySelectorAll('p');
        if (parrafos[1]) parrafos[1].textContent = 'Disponible';
        if (parrafos[2]) parrafos[2].textContent = 'sin registro';
        espacioElemento.style.backgroundColor = '';
    }
};

// funcion para realizar cambios en el registro de un vehículo
// btn para modificar el dato ingreso por placa
const formularioModificar = document.getElementById('formulario-modificacion');
const modificarRegistro = (e) => {
    e.preventDefault();
    const placaBuscar = document.getElementById('placa2').value.trim().toUpperCase();
    const nuevoEspacio = document.getElementById('estacionamiento1').value;
    const nuevaplaca = document.getElementById('placas3').value.trim().toUpperCase();
    let listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

    const vehiculoModificar = listaVehiculos.find(v => v.placa === placaBuscar);
    if (!vehiculoModificar) {
        alert(`No se encontró la placa ${placaBuscar}.`);
        return;
    }

    if (listaVehiculos.some(v => v.placa === nuevaplaca && v.placa !== placaBuscar)) {
        alert("⚠️ Esa nueva placa ya existe."); return;
    }
    if (listaVehiculos.some(v => v.espaciosDisponibles === nuevoEspacio && v.placa !== placaBuscar)) {
        alert("⚠️ Espacio ocupado."); return;
    }

    const espacioViejo = vehiculoModificar.espaciosDisponibles;

    vehiculoModificar.espaciosDisponibles = nuevoEspacio;
    vehiculoModificar.placa = nuevaplaca;

    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    liberarEspacio(espacioViejo);
    contenedores();

    alert(`Modificado con éxito.`);
    formularioModificar.reset();
};

formularioModificar.addEventListener('submit', modificarRegistro);

// funcion para solventar pago


const fomularioliquidar = document.getElementById('formulario-liquidar');
const pago = (e) => {
    e.preventDefault();
    const placaLiquidacion = document.getElementById('Liquidar-placa').value.trim().toUpperCase();
    const listaVehiculosLiquidados = JSON.parse(localStorage.getItem('vehiculoLiquidado')) || [];
    let listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    
    const vehiculoSalida = listaVehiculos.find(v => v.placa === placaLiquidacion);

    if (!vehiculoSalida) {
        alert('Vehículo no encontrado.');
        return;
    }
    const hora = new Date();
    const horaEntrada = new Date(vehiculoSalida.ahora);

    const diferenciaMs = hora - horaEntrada;

    const minutosTotales = Math.floor(diferenciaMs / (1000 * 60));

    let tarifaPorHora = 0;
    switch (vehiculoSalida.tipoIngreso) {
        case 'MTO': tarifaPorHora = 10; break;
        case 'CAR': tarifaPorHora = 20; break;
        case 'SUV': tarifaPorHora = 30; break;
    }

    tarifaPorminuto = tarifaPorHora / 60;
    const totalPagar = minutosTotales * tarifaPorminuto;

    const horaSalidaFormateada = hora.toLocaleTimeString('es-GT', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });

    const nuevosDatos = {
        ...vehiculoSalida,
        horaSalida: horaSalidaFormateada,
        horaSalidaSinFormato: hora,
        minutosTotales: minutosTotales,
        totalPagar: totalPagar.toFixed(2)
    };
    listaVehiculos = listaVehiculos.filter(v => v.placa !== placaLiquidacion);
    liberarEspacio(vehiculoSalida.espaciosDisponibles);
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));
    listaVehiculosLiquidados.push(nuevosDatos);
    localStorage.setItem('vehiculoLiquidado', JSON.stringify(listaVehiculosLiquidados));   
    console.log(`✅ Vehículo ${placaLiquidacion} liquidado. Total a pagar: Q${totalPagar.toFixed(2)} por ${minutosTotales} minutos.`);
    cargarDatos();
    location.reload();
};

fomularioliquidar.addEventListener('submit', pago);