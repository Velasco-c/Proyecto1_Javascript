// Constantes principales
const formularioIngreso = document.getElementById('formulario-agregar');
const tablaBody = document.getElementById('datos');
const formularioModificar = document.getElementById('formulario-modificacion');
const fomularioliquidar = document.getElementById('formulario-liquidar');

// ==========================================
// 1. FUNCIONES RECICLABLES (UI y DOM)
// ==========================================

// Función para pintar una fila en la tabla
const agregarFilaAlDOM = (vehiculo) => {
    if (!tablaBody) return;
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${vehiculo.tipoIngreso}</td>
        <td>${vehiculo.tipoVehiculo}</td>
        <td><strong>${vehiculo.placa}</strong></td>
        <td>${vehiculo.horaIngreso}</td>
        <td>
            <a href="#modificar" class="btn-scroll">
                <img src="./imagenes/iconos/pencil.svg" alt="editar" width="18">
            </a>
            <button class="btn-borrar">
                <img src="./imagenes/iconos/trash.svg" alt="eliminar" width="18">
            </button>
        </td>
    `;
    tablaBody.appendChild(nuevaFila);
};

// Función para marcar espacio como ocupado
const ocuparEspacio = (numeroEspacio, placa) => {
    const espacioElemento = document.getElementById(`espacio-${numeroEspacio}`);
    if (espacioElemento) {
        const parrafos = espacioElemento.querySelectorAll('p');
        parrafos[1].textContent = placa;
        parrafos[2].textContent = "ocupado";
        espacioElemento.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    }
};

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

// ==========================================
// 2. CARGA INICIAL DE DATOS
// ==========================================

const cargarDatos = () => {
    const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];    
    if (tablaBody) tablaBody.innerHTML = ''; 
    listaVehiculos.forEach(vehiculo => {
        agregarFilaAlDOM(vehiculo);
        ocuparEspacio(vehiculo.espaciosDisponibles, vehiculo.placa);
    });
}

// ==========================================
// 3. LÓGICA DE NEGOCIO (Ingreso, Modificación, Salida)
// ==========================================

// ===== REGISTRO =====
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

    const espacioOcupado = listaVehiculos.some(v => v.espaciosDisponibles === espaciosDisponibles);
    if (espacioOcupado) {
        alert(`⚠️ Espacio ${espaciosDisponibles} ya está ocupado.`);
        return;
    }

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

    const datos = { tipoIngreso, tipoVehiculo, placa, horaIngreso, espaciosDisponibles, ahora };
    
    // Guardar en LocalStorage
    listaVehiculos.push(datos);
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    // Actualizar Interfaz reutilizando funciones
    agregarFilaAlDOM(datos);
    ocuparEspacio(espaciosDisponibles, placa);

    console.log(`✅ Registro: ${tipoVehiculo} | ${placa} | ${horaIngreso}`);
    formularioIngreso.reset();
}

// ===== ELIMINAR REGISTRO =====
tablaBody?.addEventListener('click', (e) => {
    const btnBorrar = e.target.closest('.btn-borrar');
    if (!btnBorrar) return;

    const fila = btnBorrar.closest('tr');
    const placa = fila.querySelector('td:nth-child(3) strong').textContent;

    if (!confirm(`¿Eliminar vehículo con placa ${placa}?`)) return;

    let listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    const vehiculoEliminar = listaVehiculos.find(v => v.placa === placa);

    listaVehiculos = listaVehiculos.filter(v => v.placa !== placa);
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    fila.remove();

    if (vehiculoEliminar && vehiculoEliminar.espaciosDisponibles) {
        liberarEspacio(vehiculoEliminar.espaciosDisponibles);
    }
    console.log(`✅ Vehículo ${placa} eliminado`);
});

// ===== MODIFICAR REGISTRO =====
const modificarRegistro = (e) => {
    e.preventDefault();
    const placaBuscar = document.getElementById('placa2').value.trim().toUpperCase();
    const nuevoEspacio = document.getElementById('estacionamiento1').value;
    const nuevaPlaca = document.getElementById('placas3').value.trim().toUpperCase();
    let listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

    const vehiculoModificar = listaVehiculos.find(v => v.placa === placaBuscar);
    if (!vehiculoModificar) {
        alert(`No se encontró la placa ${placaBuscar}.`);
        return;
    }

    if (listaVehiculos.some(v => v.placa === nuevaPlaca && v.placa !== placaBuscar)) {
        alert("⚠️ Esa nueva placa ya existe."); return;
    }
    if (listaVehiculos.some(v => v.espaciosDisponibles === nuevoEspacio && v.placa !== placaBuscar)) {
        alert("⚠️ Espacio ocupado."); return;
    }

    const espacioViejo = vehiculoModificar.espaciosDisponibles;

    // Actualizar datos
    vehiculoModificar.espaciosDisponibles = nuevoEspacio;
    vehiculoModificar.placa = nuevaPlaca;
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    liberarEspacio(espacioViejo);
    cargarDatos(); 

    alert(`Modificado con éxito.`);
    formularioModificar.reset();
};

// ===== LIQUIDAR PAGO =====
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

    const tarifaPorMinuto = tarifaPorHora / 60;
    const totalPagar = minutosTotales * tarifaPorMinuto;

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
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));
    listaVehiculosLiquidados.push(nuevosDatos);
    localStorage.setItem('vehiculoLiquidado', JSON.stringify(listaVehiculosLiquidados));   
    liberarEspacio(vehiculoSalida.espaciosDisponibles);
    console.log(`✅ Vehículo ${placaLiquidacion} liquidado. Total a pagar: Q${totalPagar.toFixed(2)} por ${minutosTotales} minutos.`);    
    location.reload(); 
};
/*  username en el header   */
document.addEventListener('DOMContentLoaded', () => {
    const textoBienvenida = document.getElementById('Bienvenido');
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado && textoBienvenida) {
        textoBienvenida.textContent = `${usuarioLogueado}`;
    }
});

/*formatear la placa */
const obtenerValor = (id) => document.getElementById(id)?.value.trim().toUpperCase();

function formatearPlaca(input) {
    let valor = input.value.toUpperCase().replace(/[^0-9A-Z]/g, '');
    
    let numeros = valor.substring(0, 3).replace(/[^0-9]/g, '');
    
    let letras = valor.substring(3, 6).replace(/[^A-Z]/g, '');
    
    if (letras.length > 0) {
        input.value = `${numeros}-${letras}`;
    } else {
        input.value = numeros;
    }
}


/*  
    ==========================================
    4. INICIALIZACIÓN Y EVENT LISTENERS
    ==========================================
*/
cargarDatos();
formularioIngreso.addEventListener('submit', registro);
formularioModificar.addEventListener('submit', modificarRegistro);
fomularioliquidar.addEventListener('submit', pago);