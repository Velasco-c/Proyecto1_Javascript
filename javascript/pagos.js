const tablaBody = document.getElementById('cuerpoTabla');
const vehiculosLiquidados = JSON.parse(localStorage.getItem('vehiculoLiquidado')) || [];

const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "N/A";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-GT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
const cargarDatos = () => {
    tablaBody.innerHTML = '';

    vehiculosLiquidados.forEach(vehiculo => {
        const fila = document.createElement('tr');

        const fechaEntrada = formatearFecha(vehiculo.ahora);
        const fechaSalida = formatearFecha(vehiculo.horaSalidaSinFormato);
        fila.innerHTML = `
            <td data-label="Tipo">${vehiculo.tipoIngreso}</td>
            <td data-label="Vehículo">${vehiculo.tipoVehiculo}</td>
            <td data-label="Placa">${vehiculo.placa}</td>
            <td data-label="Fecha Ingreso">${fechaEntrada}</td>
            <td data-label="Hora Ingreso">${vehiculo.horaIngreso}</td>
            <td data-label="Hora Salida">${vehiculo.horaSalida}</td>
            <td data-label="Fecha Salida">${fechaSalida}</td> 
            <td data-label="Pago Total"><strong>Q${vehiculo.totalPagar}</strong></td>
        `;
        tablaBody.appendChild(fila);
    });

};

cargarDatos();