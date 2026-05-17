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
