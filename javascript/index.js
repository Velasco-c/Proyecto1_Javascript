// formulario para el ingreso de vehículos al parqueadero
//  con validación de campos y cálculo de tarifa según el tipo de vehículo y horas de estacionamiento.
const formularioIngreso = document.getElementById('formulario-agregar');

const registro = (e) => {
    e.preventDefault();
    const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    const tipoIngreso = document.getElementById('tipo-ingreso').value;
    const horas = document.getElementById('horas').value;
    const placa = document.getElementById('placa').value.trim().toUpperCase();
    const espaciosDisponibles = document.getElementById('estacionamiento').value;
    let tablaBody = document.getElementById('tablaVehiculos');
    let tipoVehiculo = '';
    let tarifaHora = 0;

    if (!tipoIngreso || !horas || !placa) {
        alert('Por favor, complete todos los campos para registrar el ingreso.');
        return;
    }

    switch (tipoIngreso) {
        case 'MTO': tipoVehiculo = 'Moto'; tarifaHora = 10; break;
        case 'CAR': tipoVehiculo = 'Carro'; tarifaHora = 20; break;
        case 'SUV': tipoVehiculo = 'Camioneta'; tarifaHora = 30; break;
        default: alert(' Tipo de vehículo no reconocido.'); return;
    }
    const totalPagar = tarifaHora * horas;

    console.log(`✅ Registro: ${tipoIngreso} | ${tipoVehiculo} | ${horas}h | ${placa} | Total: Q${totalPagar.toFixed(2)}`);
    console.log('Registro de ingreso funcionando');
    if (tablaBody) {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${tipoIngreso}</td>
            <td>${tipoVehiculo}</td>
            <td><strong>${placa}</strong></td>
            <td>${horas} hrs</td>
            <td><strong>Q${totalPagar.toFixed(2)}</strong></td>
            <td>
                <a href="#modificar" class="btn-scroll"><img src="/imagenes/iconos/pencil.svg" alt="editar"width="18"></a>
                <button class="btn-borrar"><img src="/imagenes/iconos/trash.svg" alt="eliminar" width="18"></button>
            </td>
        `;
        tablaBody.appendChild(nuevaFila);
    }
    datos = { tipoIngreso, tipoVehiculo, horas, placa, totalPagar, espaciosDisponibles }
    listaVehiculos.push(datos);
    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));
    console.log('Datos guardados en localStorage');
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
            
            console.log(`Espacio ${vehiculo.espaciosDisponibles} ocupado por ${vehiculo.placa}`);
        } else {
            console.log(`El espacio ${vehiculo.espaciosDisponibles} no existe en el HTML.`);
        }
    });
}


formularioIngreso.addEventListener('submit', registro);
formularioIngreso.addEventListener('submit', contenedores);