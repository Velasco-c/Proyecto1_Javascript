const obtenerValor = (id) => document.getElementById(id)?.value.trim();
const obtenerElemento = (id) => document.getElementById(id);
document.addEventListener('DOMContentLoaded', () => {
    const textoBienvenida = obtenerElemento('Bienvenido');
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const usuario = obtenerElemento('user-name');
    const email = obtenerElemento('user-email')
    const datosUsuario = JSON.parse(localStorage.getItem('usuarios')) || [];
    const datosEncontrado = datosUsuario.find(v => v.username === usuarioLogueado);
    if (!datosEncontrado) {
        alert('usario no encontrado');
    }

    if (usuarioLogueado && textoBienvenida) {
        textoBienvenida.textContent = `${usuarioLogueado}`;
        usuario.textContent = `${usuarioLogueado}`
        email.textContent = `${datosEncontrado.email}`
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const vehiculosLiquidados = JSON.parse(localStorage.getItem('vehiculoLiquidado')) || [];
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
    const Ganancias = obtenerElemento('ganancias');
    const Espacios = obtenerElemento('espacios');
    let total = 0;
    let disponible = 0;
    vehiculosLiquidados.forEach(v => {
        total += parseFloat(v.totalPagar || 0);
    });
    disponible = vehiculos.length;
    if (Ganancias) {
        Ganancias.textContent = `Q. ${total.toFixed(2)}`;
    }
    if (Espacios) {
        Espacios.textContent = `${disponible} / 20`;
    }
});

// --- LÓGICA DEL MODAL DE REGISTRO ---
const btnAbrirRegistro = document.getElementById('btn-abrir-modificar');
const btnCerrarRegistro = document.getElementById('btn-cerrar-registro');
const modalRegistro = document.getElementById('modal-registro');
const formRegistro = document.getElementById('form-registro');

if (btnAbrirRegistro && modalRegistro) {
    btnAbrirRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        modalRegistro.classList.add('activo');
    });
}

// Evento para cerrar
if (btnCerrarRegistro && modalRegistro) {
    btnCerrarRegistro.addEventListener('click', () => {
        modalRegistro.classList.remove('activo');
        if (formRegistro) formRegistro.reset(); 
    });
}

if (formRegistro) {
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoUsuario = obtenerValor('new-username');
        const nuevopassword = obtenerValor('new-password');
        if (nuevoUsuario) {
            const usuarioActualSesion = localStorage.getItem('usuarioLogueado');
            const datosUsuario = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioAEditar = datosUsuario.find(v => v.username === usuarioActualSesion);
            if (usuarioAEditar) {
                usuarioAEditar.username = nuevoUsuario;
                usuarioAEditar.contrasenia = nuevopassword;
                localStorage.setItem('usuarios', JSON.stringify(datosUsuario));
            }

            localStorage.setItem('usuarioLogueado', nuevoUsuario);
            const txtBienvenido = document.getElementById('Bienvenido');
            const txtUserName = document.getElementById('user-name');
            if (txtBienvenido) txtBienvenido.textContent = nuevoUsuario;
            if (txtUserName) txtUserName.textContent = nuevoUsuario;

            modalRegistro.classList.remove('activo');
            formRegistro.reset();
            alert('¡Usuario actualizado exitosamente!');
            location.reload(); 
        }
    });
}